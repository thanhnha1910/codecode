using System.Security.Cryptography;
using System.Text;
using Karnel_Api.Data;
using Karnel_Api.DTO;
using MailKit.Net.Smtp;
using Microsoft.EntityFrameworkCore;
using MimeKit;

namespace Karnel_Api.Service.Auth;

    public class AuthService
    {
        private readonly DatabaseContext _context;
        private readonly IConfiguration _configuration;
        private readonly JwtService _jwtService;

        public AuthService(DatabaseContext context, IConfiguration configuration, JwtService jwtService)
        {
            _context = context;
            _configuration = configuration;
            _jwtService = jwtService;
        }

        private string HashPassword(string password)
        {
            using (var sha256 = SHA256.Create())
            {
                var hashedBytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(password));
                return Convert.ToBase64String(hashedBytes);
            }
        }
        public async Task<bool> ChangePassword(int userId, ChangePassWord changePassword)
        {
            var user = await _context.Users.FirstOrDefaultAsync(x => x.Id == userId);
            if (user == null)
            {
                throw new Exception("User not found");
            }

            
            if (!VerifyPassword(changePassword.CurrentPassWord, user.Password))
            {
                throw new Exception("Current password is incorrect");
            }

          
            if (changePassword.NewPassWord != changePassword.ConfirmPassWord)
            {
                throw new Exception("New passwords do not match");
            }

            // Update password
            user.Password = HashPassword(changePassword.NewPassWord);
            await _context.SaveChangesAsync();
    
            return true;
        }

        public async Task<bool> RegisterUserAsync(RegisterDTO registerDto)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == registerDto.Email);
            if (user != null)
            {
                throw new Exception($"Email {registerDto.Email} already exists");
            }
            if (registerDto.Password != registerDto.ConfirmPassword)
            {
                throw new Exception("Passwords do not match.");
            }
            var verificationToken = Guid.NewGuid().ToString();
            var hashedPassword = HashPassword(registerDto.Password);
            var newUser = new User
            {
                Name = registerDto.Name,
                Email = registerDto.Email,
                Password = hashedPassword,
                Role = registerDto.Role,
                IsEmailConfirmed = false,
                EmailVerificationToken = verificationToken,
                EmailVerificationTokenExpires = DateTime.UtcNow.AddMinutes(3),
                CreatedAt = DateTime.UtcNow,
                Status = true
            };
            await _context.Users.AddAsync(newUser);
            await _context.SaveChangesAsync();
            var verificationLink = $"http://localhost:5173/verify-email?token={verificationToken}";
            var emailBody = $@"
                        <h2>Welcome to Our Application!</h2>
                        <p>Please click the link below to verify your email address:</p>
                        <a href='{verificationLink}'>Verify Email</a>
                        <p>This link will expire in 3 minutes.</p>";

            await SendEmailAsync(registerDto.Email, "Email Verification", emailBody);
            return true;
        }
        private bool VerifyPassword(string password, string hashedPassword)
        {
            var hashedInputPassword = HashPassword(password);
            return hashedInputPassword == hashedPassword;
        }
        public async Task<LoginResponseDTO> Login(LoginDTO loginDto)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == loginDto.Email);
            if (user == null)
            {
                throw new Exception($"Email {loginDto.Email} not found");
            }
            if (!user.IsEmailConfirmed)
            {
                throw new Exception("Please verify your email before logging in");
            }
            if (user.LockoutEnd.HasValue && user.LockoutEnd > DateTime.UtcNow)
            {
                var remainingTime = user.LockoutEnd.Value - DateTime.UtcNow;
                throw new Exception($"Account is locked. Please try again after {Math.Ceiling(remainingTime.TotalMinutes)} minutes");
            }
            if (!VerifyPassword(loginDto.Password, user.Password))
            {
                // Tăng số lần đăng nhập sai
                user.LoginAttempts++;
        
                // Nếu đăng nhập sai 5 lần
                if (user.LoginAttempts >= 5)
                {
                    user.LockoutEnd = DateTime.UtcNow.AddMinutes(3); // Khóa 3 phút
                    await _context.SaveChangesAsync();
                    throw new Exception("Account has been locked for 3 minutes due to too many failed login attempts");
                }

                await _context.SaveChangesAsync();
                throw new Exception($"Invalid password. {5 - user.LoginAttempts} attempts remaining");
            }
            user.LoginAttempts = 0;
            user.LockoutEnd = null;
            await _context.SaveChangesAsync();

            var token = _jwtService.GenerateToken(user);
            return new LoginResponseDTO
            {
               
                Name = user.Name,
                Id = user.Id,
                Email = user.Email,
                Avatar = !string.IsNullOrEmpty(user.Avatar) 
                    ? $"/api/uploads{user.Avatar}"  
                    : "/img/User_icon_2.svg.png",
                Role = user.Role,
                Token = token
            };
        }
        public async Task<VerificationResponse> VerifyEmail(string token)
        {
            Console.WriteLine($"Verifying email with token: {token}");

            var user = await _context.Users.FirstOrDefaultAsync(u => u.EmailVerificationToken == token);

            if (user == null)
            {
                Console.WriteLine("User not found for the given token.");
                return new VerificationResponse { Success = false, Message = "INVALID_TOKEN" };
            }

            Console.WriteLine($"User found: {user.Email}, IsEmailConfirmed: {user.IsEmailConfirmed}, Token Expires: {user.EmailVerificationTokenExpires}");

            if (user.IsEmailConfirmed)
            {
                Console.WriteLine("Email is already verified.");
                return new VerificationResponse { Success = false, Message = "ALREADY_VERIFIED" };
            }

            if (user.EmailVerificationTokenExpires < DateTime.UtcNow)
            {
                Console.WriteLine("Token has expired.");
                return new VerificationResponse { Success = false, Message = "TOKEN_EXPIRED" };
            }

            Console.WriteLine("Email verified successfully.");
            user.IsEmailConfirmed = true;
            user.EmailVerificationToken = null;
            user.EmailVerificationTokenExpires = null;

            await _context.SaveChangesAsync();
            return new VerificationResponse { Success = true, Message = "Email verified successfully." };
        }
        public async Task SendEmailAsync(string email, string subject, string body)
        {
            var smtpHost = _configuration["SmtpSettings:Host"];
            var smtpPort = int.Parse(_configuration["SmtpSettings:Port"]!);
            var smtpUsername = _configuration["SmtpSettings:Username"];
            var smtpPassword = _configuration["SmtpSettings:Password"];

            var message = new MimeMessage();
            message.From.Add(new MailboxAddress("KarnelApi", smtpUsername));
            message.To.Add(new MailboxAddress(email, email));
            message.Subject = subject;
            message.Body = new TextPart("html")
            {
                Text = body
            };

            try
            {
                using var client = new SmtpClient();
                await client.ConnectAsync(smtpHost, smtpPort, MailKit.Security.SecureSocketOptions.StartTls);
                await client.AuthenticateAsync(smtpUsername, smtpPassword);
                await client.SendAsync(message);
                await client.DisconnectAsync(true);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Failed to send email: {ex.Message}");
            }
        }
        private string GenerateResetToken()
        {
            Random random = new Random();
            const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            return "E" + new string(Enumerable.Repeat(chars, 4)
                .Select(s => s[random.Next(s.Length)]).ToArray());
        }

        public async Task RequestResetPassword(string email)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == email);
            if (user == null)
            {
                throw new Exception("User not found");
            }

            if (user.IsEmailConfirmed == false)
            {
                throw new Exception($"please confirm your email before trying to reset your password");
            }

            var resetToken = GenerateResetToken(); // Generates something like "E3105"
            user.ResetPasswordToken = resetToken;
            user.ResetPasswordTokenExpires = DateTime.UtcNow.AddMinutes(3); // Token expires in 15 minutes

            await _context.SaveChangesAsync();

            var emailBody = $@"
                    <h2>Password Reset Request</h2>
                    <p>Your password reset code is: <strong>{resetToken}</strong></p>
                  <p>This link will expire in 3 minutes.</p>"";
                    <p>If you did not request this, please ignore this email.</p>";

            await SendEmailAsync(email, "Password Reset Request", emailBody);
        }

        public async Task ResetPassword(string token, ResetPassword resetPassword)
        {
            if (string.IsNullOrEmpty(token))
            {
                throw new Exception("Invalid reset token");
            }

            if (resetPassword.NewPassword != resetPassword.ConfirmPassword)
            {
                throw new Exception("Passwords do not match");
            }

            var user = await _context.Users.FirstOrDefaultAsync(u =>
                u.ResetPasswordToken == token &&
                u.ResetPasswordTokenExpires > DateTime.UtcNow);

            if (user == null)
            {
                throw new Exception("Invalid or expired reset token");
            }

            user.Password = HashPassword(resetPassword.NewPassword);
            user.ResetPasswordToken = null;
            user.ResetPasswordTokenExpires = null;

            await _context.SaveChangesAsync();
          
        }
        public async Task<IEnumerable<User>> GetAll()
        {
            var user = await _context.Users.ToListAsync();
            return user;
        }

        public async Task<bool> VerifyResetToken(string token)
        {
            if (string.IsNullOrEmpty(token))
            {
             throw new Exception("Invalid reset token");   
            }
            var user=await _context.Users.FirstOrDefaultAsync(u=>u.ResetPasswordToken == token && u.ResetPasswordTokenExpires > DateTime.UtcNow);
            if (user == null)
            {
                throw new Exception("Invalid or expired reset token");
            }

            return true;
        }

    }