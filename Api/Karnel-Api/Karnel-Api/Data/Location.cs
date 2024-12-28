using System.ComponentModel.DataAnnotations;

namespace Karnel_Api.Data;

public class Location
{
    [Key]
    public int Id { get; set; }
    public string Name { get; set; }
    public string Address { get; set; }
    public string Type { get; set; } // 
    public ICollection<TourLocation> TourLocations { get; set; }
    
}