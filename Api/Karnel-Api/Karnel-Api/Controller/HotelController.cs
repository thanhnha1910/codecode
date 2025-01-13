using Karnel_Api.Data;
using Karnel_Api.DTO.User;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Karnel_Api.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class HotelController : ControllerBase
    {
        private readonly DatabaseContext _context;
        public HotelController(DatabaseContext context) => _context = context;
        
        [HttpGet]
        public async Task<ActionResult<IEnumerable<HotelDetailDto>>> GetHotels([FromQuery] string? city, [FromQuery] string? sort, [FromQuery] decimal? from, [FromQuery] decimal? to)
        {
            var query = _context.Hotels.AsQueryable();
            if (!string.IsNullOrEmpty(city))
            {
                query = query.Where(h => h.City.CityName.ToLower() == city.ToLower());
            }

            if (from.HasValue)
            {
                query = query.Where(h => h.Rating >= from.Value);
            }
            
            if (to.HasValue)
            {
                query = query.Where(h => h.Rating <= to.Value);
            }

            if (!string.IsNullOrEmpty(sort))
            {
                query = sort.ToLower() switch
                {
                    "rating-high-to-low" => query.OrderByDescending(h => (double)h.Rating),
                    "rating-low-to-high" => query.OrderBy(h => (double)h.Rating),
                    _ => query
                };
            }
            
            return await query.Select(h => new HotelDetailDto
            {
                Id = h.HotelID,
                Name = h.HotelName,
                Address = h.Address,
                Description = h.Description,
                Rating = h.Rating,
                CityName = h.City.CityName
            }).ToListAsync();
        }
        
        [HttpGet("{id:int}")]
        public async Task<ActionResult<HotelDetailDto>> GetHotel(int id)
        {
            var hotel = await _context.Hotels.Include(h => h.City).FirstOrDefaultAsync(h => h.HotelID == id);
            if (hotel == null) return NotFound();
            return new HotelDetailDto
            {
                Id = hotel.HotelID,
                Name = hotel.HotelName,
                Address = hotel.Address,
                Description = hotel.Description,
                Rating = hotel.Rating,
                CityName = hotel.City.CityName
            };
        }
    }
}