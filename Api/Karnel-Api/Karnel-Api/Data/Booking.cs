using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Karnel_Api.Data;

public class Booking
{
    [Key]
    public int Id { get; set; }
    public int UserId { get; set; }
    public int TourId { get; set; }
    public int Child { get; set; }
    public int Adult { get; set; }
    public int TotalPeople { get; set; }
    [Column(TypeName = "decimal(18, 2)")]
    public decimal TotalAmount { get; set; }
    public string Status { get; set; }

    public ICollection<Payments> Payments { get; set; }
    public User User { get; set; }
    public Tour Tour { get; set; }
    
}