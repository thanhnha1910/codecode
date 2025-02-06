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
    public int ChildQunatity {get; set;}
    public int InfantQunatity {get; set;}
    public decimal AdultUnitPrice { get; set; }
    public decimal ChildUnitPrice { get; set; }
    public decimal InfantUnitPrice { get; set; }
 

   
}