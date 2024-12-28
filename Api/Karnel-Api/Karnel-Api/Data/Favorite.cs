using System.ComponentModel.DataAnnotations;

namespace Karnel_Api.Data;

public class Favorite
{
    [Key]
    public int Id { get; set; }
    public int UserId { get; set; }
    public int TourId { get; set; }
    public DateTime CreatedAt { get; set; }
    public User User { get; set; }
    public Tour Tour { get; set; }
}