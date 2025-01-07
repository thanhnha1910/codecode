using System.ComponentModel.DataAnnotations;
using Karnel_Api.DTO.Favorite;

namespace Karnel_Api.DTO.UserDTO;

public class UserDTO
{
    [Key]
    public int Id { get; set; }
    [Required(ErrorMessage = "Name is required")]
    public string Name { get; set; }
    [EmailAddress]
    public string Email { get; set; }
    public string? Avatar { get; set; }
    public bool Gender { get; set; }
    public DateTime DateOfBirth { get; set; }
    public List<FavoriteDTO> Favorites { get; set; }
}