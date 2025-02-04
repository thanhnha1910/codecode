namespace Karnel_Api.DTO.User;

public record ReviewOverviewDto
{
    public double AverageRating { get; init; }
    public int TotalReviews { get; init; }
}