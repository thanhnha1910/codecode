namespace Karnel_Api.DTO
{
    public class RestaurantDto
    {
        public int RestaurantID { get; set; }
        public string RestaurantName { get; set; }
        public int? CityID { get; set; }
        public string Cuisine { get; set; }
        public string Description { get; set; }
    }
}
