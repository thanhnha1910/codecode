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
        public async Task<ActionResult> GetTours(int? page, string? q, string? city, int? minRating, int? minPrice, int? maxPrice, int? minDuration, int? maxDuration, string? sort)
        {
            var query = context.Tours.AsQueryable();
            if (!string.IsNullOrEmpty(q))
            {
                query = query.Where(t =>
                    (t.TourName.ToLower().Contains(q.ToLower()) ||
                     t.City.CityName.ToLower().Contains(q.ToLower()) ||
                     t.Description.ToLower().Contains(q.ToLower())));
            }
            else if (!string.IsNullOrEmpty(city))
            {
                query = query.Where(t => t.City.CityName.ToLower().Contains(city.ToLower()));
            }

            if (minPrice.HasValue && maxPrice.HasValue)
            {
                query = query.Where(t => t.Price >= minPrice.Value && t.Price <= maxPrice.Value);
            }

            if (minDuration.HasValue && maxDuration.HasValue)
            {
                query = query.Where(t => (t.EndDate.Day - t.StartDate.Day) >= minDuration.Value && (t.EndDate.Day - t.StartDate.Day) <= maxDuration.Value);
            }

            if (minRating.HasValue)
            {
                query = query.Where(t => Math.Round(context.Reviews.Where(r => r.TourID == t.TourID).Average(r => (double)r.Rating), 1) >= minRating.Value);
            }

            if (!string.IsNullOrEmpty(sort))
            {
                query = sort.ToLower() switch
                {
                    "rating-high-to-low" => query.OrderByDescending(t => Math.Round(context.Reviews.Where(r => r.TourID == t.TourID).Average(r => (double)r.Rating), 1)),
                    "rating-low-to-high" => query.OrderBy(t => Math.Round(context.Reviews.Where(r => r.TourID == t.TourID).Average(r => (double)r.Rating), 1)),
                    "price-high-to-low" => query.OrderByDescending(t => (double)t.Price),
                    "price-low-to-high" => query.OrderBy(t => (double)t.Price),
                    "duration-high-to-low" => query.OrderByDescending(t => t.EndDate.Day - t.StartDate.Day),
                    "duration-low-to-high" => query.OrderBy(t => t.EndDate.Day - t.StartDate.Day),
                    _ => query
                };
            }
            
            var pageNumber = page ?? 1;
            return Ok(new
            {
                Total = await query.CountAsync(),
                Tours = await query.Select(t => new TourOverviewDto
                {
                    TourId = t.TourID,
                    Name = t.TourName,
                    Description = t.Description,
                    Price = t.Price,
                    AvailableSlots = t.AvailableSlots,
                    Duration = (t.EndDate - t.StartDate).Days,
                    CityName = t.City.CityName,
                    Images = context.Images.Where(img =>
                        img.EntityType == "Tour" && img.EntityID == t.TourID).Select(
                        img =>
                            new ImageDto
                            {
                                Id = img.ImageID,
                                Url = img.ImageUrl,
                                AltText = img.AltText
                            }).ToList(),
                    Reviews = context.Reviews.Any(r => r.TourID == t.TourID)
                        ? new ReviewOverviewDto
                        {
                            AverageRating =
                                Math.Round(
                                    context.Reviews.Where(r => r.TourID == t.TourID).Average(r => (double)r.Rating), 1),
                            TotalReviews = context.Reviews.Count(r => r.TourID == t.TourID),
                        }
                        : null,
                    Total = query.Count(),
                }).Skip(_pageSize * (pageNumber - 1)).Take(_pageSize).ToListAsync(),
            });
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetTour(int id)
        {
            var tour = await context.Tours.Where(t => t.TourID == id)
                .Select(t => new TourDetailDto
            {
                TourId = t.TourID,
                Name = t.TourName,
                Description = t.Description,
                Detail = t.Detail,
                Price = t.Price,
                AvailableSlots = t.AvailableSlots,
                StartDate = t.StartDate,
                EndDate = t.EndDate,
                Duration = (t.EndDate - t.StartDate).Days,
                CityName = t.City.CityName,
                Images = context.Images.Where(img => img.EntityType == "Tour" && img.EntityID == t.TourID).Select(img =>
                    new ImageDto
                    {
                        Id = img.ImageID,
                        Url = img.ImageUrl,
                        AltText = img.AltText
                    }).ToList(),
                Hotel = new HotelOverviewDto
                {
                    HotelId = t.Hotel.HotelID,
                    Name = t.Hotel.HotelName,
                    Images = context.Images.Where(img => img.EntityType == "Hotel" && img.EntityID == t.Hotel.HotelID).Select(img => new ImageDto
                    {
                        Id = img.ImageID,
                        Url = img.ImageUrl,
                        AltText = img.AltText
                    }).ToList(),
                },
                Attractions = t.TourAttractions.Select(ta => new AttractionOverviewDto
                {
                    AttractionId = ta.Attraction.AttractionID,
                    Name = ta.Attraction.AttractionName,
                    Images = context.Images.Where(img => img.EntityType == "Attraction" && img.EntityID == ta.Attraction.AttractionID).Select(img => new ImageDto
                    {
                        Id = img.ImageID,
                        Url = img.ImageUrl,
                        AltText = img.AltText
                    }).ToList(),
                }).ToList(),
                Restaurants = t.TourRestaurants.Select(tr => new RestaurantOverviewDto
                {
                    RestaurantId = tr.Restaurant.RestaurantID,
                    Name = tr.Restaurant.RestaurantName,
                    Images = context.Images.Where(img => img.EntityType == "Restaurant" && img.EntityID == tr.Restaurant.RestaurantID).Select(img => new ImageDto
                    {
                        Id = img.ImageID,
                        Url = img.ImageUrl,
                        AltText = img.AltText
                    }).ToList(),
                }).ToList(),
                Reviews = context.Reviews.Any(r => r.TourID == t.TourID)
                    ? new ReviewOverviewDto
                    {
                        AverageRating =
                            Math.Round(
                                context.Reviews.Where(r => r.TourID == t.TourID).Average(r => (double)r.Rating), 1),
                        TotalReviews = context.Reviews.Count(r => r.TourID == t.TourID),
                    }
                    : null,
            }).FirstOrDefaultAsync();
            return tour == null ? NotFound() : Ok(tour);
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
                Duration = (t.EndDate - t.StartDate).Days,
                CityName = t.City.CityName,
            }).Take(topNumber).ToListAsync();
        }
    }
}