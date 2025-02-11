using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Karnel_Api.DTO.Booking;

public class BookingDTO
{
    [Required]
    public int UserID { get; set; }

    [Required]
    public int TourID { get; set; }
    public int AdultQuantity {get; set;}
    public int ChildQuantity {get; set;}
    public int InfantQuantity {get; set;}
    public decimal AdultUnitPrice { get; set; }
    public decimal ChildUnitPrice { get; set; }
    public decimal InfantUnitPrice { get; set; }
    [Required]
    public string FullName { get; set; }
    [Required]
    [EmailAddress]
    public string Email { get; set; }
    [Required]
    public string Phone { get; set; }
    public string CardIdentification { get; set; }
    public string SpecialRequirements { get; set; }

   
}