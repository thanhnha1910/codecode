using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Karnel_Api.Data;

public class Tour
{
    [Key]
    public int TourID { get; set; }
    public string TourName { get; set; }
    public string Description { get; set; }
    public string Detail { get; set; }
    
    [Column(TypeName = "decimal(18,2)")]
    public decimal Price { get; set; }
    public int AvailableSlots { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
    
    public int? CityID { get; set; }
    public City City { get; set; }
    public int? HotelID { get; set; }
    public Hotel Hotel { get; set; }
    public int? TransportID { get; set; }
    public Transportation Transportation{ get; set; }

    // Navigation properties
    public ICollection<TourAttraction> TourAttractions { get; set; }
    public ICollection<TourRestaurants> TourRestaurants { get; set; }
    public ICollection<Booking> Bookings { get; set; }
    public ICollection<Review> Reviews { get; set; }
}