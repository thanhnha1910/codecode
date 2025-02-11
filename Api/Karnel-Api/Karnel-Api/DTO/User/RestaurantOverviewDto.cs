namespace Karnel_Api.DTO.User;

public record RestaurantOverviewDto
{
    public int RestaurantId { get; init; }
    public required string Name { get; init; }
    public string? Description { get; init; }
    public string? Cuisine { get; init; }
    public IEnumerable<ImageDto>? Images { get; init; }
}