using System.Collections;
using Karnel_Api.Data;
using Karnel_Api.DTO.User;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Karnel_Api.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class TourController(DatabaseContext context) : ControllerBase
    {
        private readonly int _pageSize = 10;
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TourOverviewDto>>> GetTours(int? page, string? search, string? hotel)
        {
            var query = context.Tours.AsQueryable();
            if (!string.IsNullOrEmpty(search))
            {
                query = query.Where(t => t.TourName.ToLower().Contains(search.ToLower()) || t.City.CityName.ToLower().Contains(search.ToLower()) || t.Description.ToLower().Contains(search.ToLower()) );
            }

            if (!string.IsNullOrEmpty(hotel))
            {
                query = query.Where(t => t.Hotel.HotelName.ToLower().Contains(hotel.ToLower()));
            }
            if (page.HasValue)
            {
                return await query.Select(t => new TourOverviewDto
                {
                    TourId = t.TourID,
                    Name = t.TourName,
                    Description = t.Description,
                    Price = t.Price,
                    AvailableSlots = t.AvailableSlots,
                    StartDate = t.StartDate,
                    EndDate = t.EndDate,
                    CityName = t.City.CityName,
                }).Skip(_pageSize * (page.Value - 1)).Take(_pageSize).ToListAsync();
            }

            return await query.Select(t => new TourOverviewDto
            {
                TourId = t.TourID,
                Name = t.TourName,
                Description = t.Description,
                Price = t.Price,
                AvailableSlots = t.AvailableSlots,
                StartDate = t.StartDate,
                EndDate = t.EndDate,
                CityName = t.City.CityName,
            }).Take(_pageSize).ToListAsync();
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult<TourDetailDto>> GetTour(int id)
        {
            var tour = context.Tours.Include(t => t.City).Include(t => t.Hotel).Include(t => t.TourAttractions)
                .ThenInclude(tourAttraction => tourAttraction.Attraction).Include(t => t.TourRestaurants)
                .ThenInclude(tourRestaurant => tourRestaurant.Restaurant).Include(tour => tour.Reviews).ThenInclude(r => r.User).FirstOrDefault(t => t.TourID == id);
            if (tour == null) return NotFound();
            var tourImage = await context.Images.Where(i => i.EntityType == "Tour" && i.EntityID == tour.TourID).FirstOrDefaultAsync();
            var hotelImage = await context.Images.Where(i => i.EntityType == "Hotel" && i.EntityID == tour.HotelID).FirstOrDefaultAsync();
            return new TourDetailDto
            {
                TourId = tour.TourID,
                Name = tour.TourName,
                Description = tour.Description,
                Detail = tour.Detail,
                Price = tour.Price,
                AvailableSlots = tour.AvailableSlots,
                StartDate = tour.StartDate,
                EndDate = tour.EndDate,
                ImageUrl = tourImage?.ImageUrl,
                AltText = tourImage?.AltText,
                CityName = tour.City.CityName,
                Hotel = new HotelOverviewDto {
                    HotelId = tour.Hotel.HotelID,
                    Name = tour.Hotel.HotelName,
                    ImageUrl = hotelImage?.ImageUrl,
                    AltText = hotelImage?.AltText
                },
                Attractions = tour.TourAttractions.Select(a => new AttractionOverviewDto
                {
                    AttractionId = a.AttractionID,
                    Name = a.Attraction.AttractionName,
                }).ToList(),
                Restaurants = tour.TourRestaurants.Select(r => new RestaurantOverviewDto
                {
                    RestaurantId = r.RestaurantID,
                    Name = r.Restaurant.RestaurantName,
                }).ToList(),
                Reviews = tour.Reviews.Select(r => new ReviewDto
                {
                    ReviewId = r.ReviewID,
                    Feedback = r.Feedback,
                    Rating = r.Rating,
                    ReviewDate = r.ReviewDate,
                    UserName = r.User.Name
                }).ToList()
            };
        }

        [HttpGet("count")]
        public async Task<ActionResult<int>> CountTours()
        {
            return await context.Tours.Select(t => t.TourID).CountAsync();
        }

        [HttpGet("top")]
        public async Task<ActionResult<IEnumerable<TourOverviewDto>>> GetTopTours(int? top)
        {
            var topNumber = top ?? 4;
            return await context.Tours.Select(t => new TourOverviewDto
            {
                TourId = t.TourID,
                Name = t.TourName,
                Description = t.Description,
                Price = t.Price,
                AvailableSlots = t.AvailableSlots,
                StartDate = t.StartDate,
                EndDate = t.EndDate,
                CityName = t.City.CityName,
            }).Take(topNumber).ToListAsync();
        }
    }
}