using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Karnel_Api.Data;

public class Booking
{
    [Key]
    public int BookingID { get; set; } // Unique identifier for the booking
    public int UserID { get; set; } // Reference to the user who made the booking
    public User User { get; set; }
    public DateTime BookingDate { get; set; } // Date when the booking was made
    [Column(TypeName = "decimal(18, 4)")]
    public decimal TotalAmount { get; set; } // Total amount for the booking
    public string PaymentStatus { get; set; } // Status of the payment (e.g., "Paid", "Pending")

    // Booking Details (Embedded in the Booking Table)
    public int TourID { get; set; } // Tour being booked
    public Tour Tour { get; set; }
    public int Quantity { get; set; } // Number of people/slots booked for the tour
    [Column(TypeName = "decimal(18, 4)")]
    public decimal UnitPrice { get; set; } // Price per slot for the tour
    public decimal SubTotal => Quantity * UnitPrice; // Computed subtotal for the tour

    // Related Payments
    public ICollection<Payment> Payments { get; set; } // Payments associated with the booking

}