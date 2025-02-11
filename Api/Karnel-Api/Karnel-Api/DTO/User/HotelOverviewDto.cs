namespace Karnel_Api.DTO.User;

public record HotelOverviewDto
{
    public int HotelId { get; init; }
    public required string Name { get; init; }
    public string? Address { get; init; }
    public decimal Rating { get; init; }
    public string? Description { get; init; }
    public IEnumerable<ImageDto>? Images { get; init; }
}