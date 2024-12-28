using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Karnel_Api.Data;

public class Payments
{
    [Key]
    public int Id { get; set; }
    public int UserId { get; set; }
    public int BookingId { get; set; }
    [Column(TypeName = "decimal(18, 2)")]
    public decimal Amount { get; set; }
    public string Method { get; set; }
    public string Status { get; set; }
    public User User { get; set; }
    public Booking Booking { get; set; }
    
}