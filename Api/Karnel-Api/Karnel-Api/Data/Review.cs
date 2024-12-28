using System.ComponentModel.DataAnnotations;

namespace Karnel_Api.Data;

public class Review
{
    [Key]
    public int Id { get; set; }
    public int UserId { get; set; }
    public int TourId { get; set; }
    public decimal Rating { get; set; }
    public string Comment { get; set; }
    public User User { get; set; }
    public Tour Tour { get; set; }
    
}