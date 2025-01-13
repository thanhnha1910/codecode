using Karnel_Api.Data;

namespace Karnel_Api.DTO.User;

public record TourDetailDto(
    int TourId,
    string Name,
    string? Description,
    string Detail,
    decimal Price,
    int AvailableSlots,
    DateTime StartDate,
    DateTime EndDate,
    string CityName,
    string HotelName);