using System.ComponentModel.DataAnnotations;

namespace Karnel_Api.Data;

public class Attraction
{
    [Key]
    public int AttractionID { get; set; }
    public string AttractionName { get; set; }
    public int? CityID { get; set; }
    public City City { get; set; }
    public string Description { get; set; }

    public ICollection<TourAttraction> TourAttractions { get; set; } = new List<TourAttraction>();
}