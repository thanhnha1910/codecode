using System.ComponentModel.DataAnnotations;

namespace Karnel_Api.Data;

public class Favorite
{
    [Key]
    public int LikeID { get; set; }
    public int UserID { get; set; }
    public User User { get; set; }
    public int TourID { get; set; }
    public Tour Tour { get; set; }
    public DateTime LikeDate { get; set; }
}