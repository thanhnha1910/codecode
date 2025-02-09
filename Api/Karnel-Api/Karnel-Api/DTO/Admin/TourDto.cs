namespace Karnel_Api.DTO
{
    namespace Karnel_Api.DTO
    {
        public class TourDto
        {
            public int TourID { get; set; }
            public string TourName { get; set; }

            public string Description { get; set; }

            public string Detail { get; set; }

            public decimal Price { get; set; }

            public int AvailableSlots { get; set; }

            public DateTime StartDate { get; set; }

            public DateTime EndDate { get; set; }

            public int? CityID { get; set; }

            public int? HotelID { get; set; }

            public int? TransportID { get; set; }

            // List of Attraction IDs for linking multiple attractions
            public List<int> AttractionIDs { get; set; } = new List<int>();
            public List<int> RestaurantIDs { get; set; } = new List<int>();
        }
    }

}
