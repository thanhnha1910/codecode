using System.ComponentModel.DataAnnotations;

namespace Karnel_Api.DTO;

public class LoginDTO
{
    [Required]
    [EmailAddress]
    public string Email { get; set; }
    [Required]
    public string Password { get; set; }
    
}