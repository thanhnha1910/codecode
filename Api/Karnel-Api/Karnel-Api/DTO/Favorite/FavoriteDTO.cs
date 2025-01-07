namespace Karnel_Api.DTO.Favorite;

public class FavoriteDTO
{
    public int LikeID { get; set; }
    public int UserID { get; set; }
    public int TourID { get; set; }
    public DateTime LikeDate { get; set; }
    public string TourName { get; set; }    // Thông tin bổ sung về tour
    public string TourImage { get; set; }
    public decimal Price { get; set; }
}