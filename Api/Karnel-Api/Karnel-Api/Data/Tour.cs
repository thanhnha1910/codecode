using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Karnel_Api.Data;

public class Tour
{
    [Key]
    public int Id { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
    public string Detail { get; set; }
    public int Duration { get; set; }
    [Column(TypeName = "decimal(18,2)")]
    public decimal Price { get; set; }
    public int Seat { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
    
    public ICollection<Booking> Bookings { get; set; }
    public ICollection<TourLocation> TourLocations { get; set; }
    public ICollection<Favorite> Favorites { get; set; }
    public ICollection<Review> Reviews { get; set; }

}