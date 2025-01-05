using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Karnel_Api.Data;

public class Review
{
    [Key]
    public int ReviewID { get; set; }
    public int UserID { get; set; }
    public User User { get; set; }
    public int TourID { get; set; }
    public Tour Tour { get; set; }
    [Column(TypeName = "decimal(18, 2)")]
    public decimal Rating { get; set; }
    public string Feedback { get; set; }
    public DateTime ReviewDate { get; set; }

}