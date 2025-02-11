namespace Karnel_Api.Data;

public class TourRestaurant
{
    public int TourID { get; set; }
    public Tour Tour { get; set; }
    public int RestaurantID { get; set; }
    public Restaurant Restaurant { get; set; }
}