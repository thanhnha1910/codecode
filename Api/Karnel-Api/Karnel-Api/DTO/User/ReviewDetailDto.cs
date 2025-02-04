namespace Karnel_Api.DTO.User;

public record ReviewDetailDto
{
    public int ReviewId { get; init; }
    public required string Username { get; init; }
    public string? Avatar { get; init; }
    public decimal Rating { get; init; }
    public required string Feedback { get; init; }
    public DateTime ReviewDate { get; init; }
}
