using System.ComponentModel.DataAnnotations.Schema;

namespace Karnel_Api.Data;

public class Hotel
{
    public int HotelID { get; set; }
    public string HotelName { get; set; }
    public int? CityID { get; set; }
    public City City { get; set; }
    [Column(TypeName = "decimal(3, 2)")]
    public decimal Rating { get; set; }
    public string Description { get; set; }
}