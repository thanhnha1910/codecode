namespace Karnel_Api.DTO.User;

public record ImageDto
{
    public int Id { get; init; }
    public required string Url { get; init; }
    public string? AltText { get; init; }
}