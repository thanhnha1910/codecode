namespace Karnel_Api.DTO.User;

public record ReviewDto
{
    public int ReviewId { get; init; }
    public required string UserName { get; init; }
    public decimal Rating { get; init; }
    public required string Feedback { get; init; }
    public DateTime ReviewDate { get; init; }
}