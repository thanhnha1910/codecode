using Karnel_Api.Data;

namespace Karnel_Api.DTO.User
{
    public record TourDetailDto
    {
        public int TourId { get; init; }
        public required string Name { get; init; }
        public string? Description { get; init; }
        public required string Detail { get; init; }
        public decimal Price { get; init; }
        public int AvailableSlots { get; init; }
        public DateTime StartDate { get; init; }
        public DateTime EndDate { get; init; }
        public string? ImageUrl { get; init; }
        public string? AltText { get; init; }
        public required string CityName { get; init; }
        public required HotelOverviewDto Hotel { get; init; }
        public required IEnumerable<AttractionOverviewDto> Attractions { get; init; }
        public required IEnumerable<RestaurantOverviewDto> Restaurants { get; init; }
        public IEnumerable<ReviewDto>? Reviews { get; init; }
    }
}