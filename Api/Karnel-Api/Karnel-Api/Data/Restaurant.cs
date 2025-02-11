namespace Karnel_Api.Data;

public class Restaurant
{
    public int RestaurantID { get; set; }
    public string RestaurantName { get; set; }
    public int? CityID { get; set; }
    public City City { get; set; }
    public string Cuisine { get; set; }
    public string Description { get; set; }
    public ICollection<TourRestaurant> TourRestaurants { get; set; } = new List<TourRestaurant>();
}