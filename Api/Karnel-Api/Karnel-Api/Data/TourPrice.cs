using System.ComponentModel.DataAnnotations.Schema;

namespace Karnel_Api.Data;

public class TourPrice
{
    public int Id { get; set; }
    [Column(TypeName = "decimal(18, 2)")]
    public decimal ChildPrice { get; set; }
    [Column(TypeName = "decimal(18, 2)")]
    public decimal AdultPrice { get; set; }
}