namespace Karnel_Api.DTO.User;

public record RestaurantOverviewDto
{
    public int RestaurantId { get; init; }
    public required string Name { get; init; }
    public string? Description { get; init; }
    public string? ImageUrl { get; init; }
    public string? AltText { get; init; }
}