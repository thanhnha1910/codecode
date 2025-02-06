using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Newtonsoft.Json;

namespace Karnel_Api.DTO.Booking;

public class BookingResponse
{
    [Key]
    public int BookingID { get; set; }
    public int UserID { get; set; }
    public int TourID { get; set; }
    public int AdultQuantity { get; set; }
    public int ChildQuantity { get; set; }
    public int InfantQuantity { get; set; }
    public decimal AdultUnitPrice { get; set; }
    public decimal ChildUnitPrice { get; set; }
    public decimal InfantUnitPrice { get; set; }
    public decimal TotalAmount { get; set; }
    public DateTime BookingDate { get; set; }
    public string PaymentStatus { get; set; }
    public string TourName { get; set; }
    public decimal TourPrice { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
    public int AvailableSlots { get; set; }
    public string FullName {get; set;}
    public string Email { get; set; }
    public string Phone { get; set; }
    public string SpecialRequirements { get; set; }
    public int TotalQuantity { get; set; }
}