using System.ComponentModel.DataAnnotations;

namespace Karnel_Api.Data;

public class User
{
    [Key]
    public int Id { get; set; }
    public string Name { get; set; }
    public string Email { get; set; }
    public string Password { get; set; }
    public string Role { get; set; } // User/Employee/Admin
    public DateTime DateOfBirth { get; set; }
    public bool Gender { get; set; }
    public bool IsEmailConfirmed { get; set; }
    public DateTime CreatedAt { get; set; }
    public bool Status { get; set; }    
    public string? Avatar { get; set; }
    public string? EmailVerificationToken { get; set; }
    public DateTime? EmailVerificationTokenExpires { get; set; }
    public string? ResetPasswordToken { get; set; }
    public DateTime? ResetPasswordTokenExpires { get; set; }
    public int LoginAttempts { get; set; } //Số lần đăng nhập thất bại.
    public DateTime? LockoutEnd { get; set; } //Thời điểm kết thúc khóa tài khoản.

    
    public ICollection<Booking> Bookings { get; set; }
    public ICollection<Review> Reviews { get; set; }
    public ICollection<Payment> Payments { get; set; }
    public ICollection<Favorite> Favorites { get; set; }
    
}