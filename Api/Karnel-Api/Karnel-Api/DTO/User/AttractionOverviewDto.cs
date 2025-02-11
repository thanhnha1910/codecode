namespace Karnel_Api.DTO.User;

public record AttractionOverviewDto
{
    public int AttractionId { get; init; }
    public required string Name { get; init; }
    public string? Description { get; init; }
    public IEnumerable<ImageDto>? Images { get; init; }
}