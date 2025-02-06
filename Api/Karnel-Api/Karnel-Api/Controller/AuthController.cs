using Karnel_Api.Data;
using Karnel_Api.DTO;
using Karnel_Api.Service;
using Karnel_Api.Service.Auth;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Karnel_Api.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly AuthService _authService;

        public AuthController(AuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterDTO registerDto)
        {
            try
            {
                var user = await _authService.RegisterUserAsync(registerDto);
                return Ok(new
                    { message = "Registration successful. Please check your email to verify your account.", user });
            }
            catch (Exception e)
            {
                return BadRequest(new { message = e.Message });
            }
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDTO loginDto)
        {
            try
            {
                var user = await _authService.Login(loginDto);
                var baseUrl = "http://localhost:5128";  
                var avatarUrl = !string.IsNullOrEmpty(user.Avatar) 
                    ? $"{baseUrl}{user.Avatar}" 
                    : "/img/User_icon_2.svg.png";
                return Ok(new
                {
                  
                  id=user.Id,
                  email=user.Email,
                    name = user.Name,
                    avatar=avatarUrl,
                    role=user.Role,
                    token = user.Token
                });
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpGet("verify-email")]
        public async Task<IActionResult> VerifyEmail([FromQuery] string token)
        {
            var response = await _authService.VerifyEmail(token);
            Console.WriteLine($"Verification Response: Success={response.Success}, Message={response.Message}");
            return Ok(response);
        }
       

        [HttpPost("request-reset-password")]
        public async Task<IActionResult> RequestResetPassword([FromBody] ResetPasswordRequestDTO request)
        {
            try
            {
                await _authService.RequestResetPassword(request.Email);
                return Ok(new { message = "Reset password instructions have been sent to your email." });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpPost("reset-password")]
        public async Task<IActionResult> ResetPassword([FromQuery] string token, [FromBody] ResetPassword resetPassword)
        {
            try
            {
                await _authService.ResetPassword(token, resetPassword);
                return Ok(new { message = "Password has been reset successfully." });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var user = await _authService.GetAll();
            return Ok(user);
        }
        [HttpPost("verify-reset-token")]
        public async Task<IActionResult> VerifyResetToken([FromBody] string token)
        {
            try
            {
                await _authService.VerifyResetToken(token);
                return Ok(new { message = "Valid reset code" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }
        [HttpPut("change-password/{id}")]
        public async Task<IActionResult> ChangePassword(int id, [FromBody] ChangePassWord changePassword)
        {
            try
            {
                await _authService.ChangePassword(id, changePassword);
                return Ok(new { message = "Password changed successfully" });
            }
            catch (Exception e)
            {
                return BadRequest(new { error = e.Message });
            }
        }
    }
    
}