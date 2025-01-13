namespace Karnel_Api.DTO.User
{
    public record HotelDetailDto
    {
        public int Id { get; init; }
        public string Name { get; init; } = string.Empty;
        public string Address { get; init; } = string.Empty;
        public string? Description { get; init; }
        public decimal? Rating { get; init; }
        public string CityName { get; init; } = string.Empty;
    }
}

