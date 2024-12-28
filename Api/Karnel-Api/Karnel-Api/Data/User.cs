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
    public bool IsEmailConfirmed { get; set; }
    public DateTime CreatedAt { get; set; }
    public bool Status { get; set; }
    public string ImageUrl { get; set; }
    
    public ICollection<Booking> Bookings { get; set; }
    public ICollection<Review> Reviews { get; set; }
    public ICollection<Payments> Payments { get; set; }
    public ICollection<Favorite> Favorites { get; set; }
    
}