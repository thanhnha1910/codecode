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
            var tour = await context.Tours.Where(t => t.TourID == id).Select(
                t => new TourDetailDto
                {
                    TourId = t.TourID,
                    Name = t.TourName,
                    Description = t.Description,
                    Detail = t.Detail,
                    Price = t.Price,
                    AvailableSlots = t.AvailableSlots,
                    StartDate = t.StartDate,
                    EndDate = t.EndDate,
                    CityName = t.City.CityName,
                    HotelName = t.Hotel.HotelName
                }
            ).FirstOrDefaultAsync();
            if (tour == null) return NotFound();
            return tour;
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