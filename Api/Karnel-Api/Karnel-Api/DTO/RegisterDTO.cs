using System.ComponentModel.DataAnnotations;

namespace Karnel_Api.DTO;

public class RegisterDTO
{
    [Key]
    public int Id { get; set; }
    public string Name { get; set; }
    public string Email { get; set; }
    public string Password { get; set; }
    public string Role { get; set; } // User/Employee/Admin
    public bool IsEmailConfirmed { get; set; }
    public DateTime CreatedAt { get; set; }
    public bool Status { get; set; }
    public string ImageUrl { get; set; }
}