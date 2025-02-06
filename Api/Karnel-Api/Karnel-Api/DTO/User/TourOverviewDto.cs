namespace Karnel_Api.DTO.User;

public record TourOverviewDto
{
    public int TourId { get; init; }
    public string Name { get; init; } = string.Empty;
    public string? Description { get; init; }
    public decimal Price { get; init; }
    public int AvailableSlots { get; init; }
    public int Duration { get; init; }
    public string CityName { get; init; } = string.Empty;
    public IEnumerable<ImageDto>? Images { get; init; }
    public ReviewOverviewDto? Reviews { get; init; }
    public int Total { get; init; }
}