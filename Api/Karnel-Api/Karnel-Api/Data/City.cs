using System.ComponentModel.DataAnnotations;

namespace Karnel_Api.Data;

public class City
{
    [Key]
    public int CityID { get; set; }
    public string CityName { get; set; }
    public string Description { get; set; }

    // Navigation properties
    public ICollection<Tour> Tours { get; set; }
    public ICollection<Hotel> Hotels { get; set; }
    public ICollection<Restaurant> Restaurants { get; set; }
    public ICollection<Attraction> Attractions { get; set; }
}