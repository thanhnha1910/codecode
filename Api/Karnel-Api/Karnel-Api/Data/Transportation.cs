using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Karnel_Api.Data;

public class Transportation
{
    [Key]
    public int TransportID { get; set; }
    public string TransportType { get; set; }
    public int? CityID { get; set; }
    public City City { get; set; }
    [Column(TypeName = "decimal(18, 2)")]
    public decimal Price { get; set; }
    public TimeSpan Duration { get; set; }
}