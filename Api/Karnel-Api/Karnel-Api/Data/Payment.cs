using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Karnel_Api.Data;

public class Payment
{
    [Key]
    public int PaymentID { get; set; }

    [Required]
    public int BookingID { get; set; }

    [ForeignKey(nameof(BookingID))]
    public Booking Booking { get; set; }

    [Required]
    public DateTime PaymentDate { get; set; }

    [Required]
    [Column(TypeName = "decimal(18,2)")]  // Ensures precision for monetary values
    public decimal Amount { get; set; }

    [Required]
    [StringLength(50)]
    public string PaymentMethod { get; set; }

    public bool PaymentStatus { get; set; } = false;  // Default to false
    public string PayPalOrderID { get; set; }

    [Required]
    public int UserId { get; set; }

    [ForeignKey(nameof(UserId))]
    public User User { get; set; }
}