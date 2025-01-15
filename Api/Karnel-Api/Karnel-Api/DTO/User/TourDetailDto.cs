using Karnel_Api.Data;

namespace Karnel_Api.DTO.User
{
    public record TourDetailDto
    {
        public int TourId { get; init; }
        public string Name { get; init; } = string.Empty;
        public string? Description { get; init; }
        public string Detail { get; init; } = string.Empty;
        public decimal Price { get; init; }
        public int AvailableSlots { get; init; }
        public DateTime StartDate { get; init; }
        public DateTime EndDate { get; init; }
        public string CityName { get; init; } = string.Empty;
        public string HotelName { get; init; } = string.Empty;
        public IEnumerable<int> Restaurants { get; init; } = new List<int>();
    }
}