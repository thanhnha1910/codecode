namespace Karnel_Api.DTO.User;

public record HotelOverviewDto
{
    public int HotelId { get; init; }
    public required string Name { get; init; }
    public ImageDto? Image { get; init; }
}