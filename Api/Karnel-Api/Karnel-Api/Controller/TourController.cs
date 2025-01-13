using System.Collections;
using Karnel_Api.Data;
using Karnel_Api.DTO.User;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Karnel_Api.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class TourController : ControllerBase
    {
        private readonly DatabaseContext _context;
        public TourController(DatabaseContext context) => _context = context;

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Tour>>> GetTours()
        {
            return await _context.Tours.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<TourDetailDto>> GetTour(int id)
        {
            var tour = await _context.Tours.Where(t => t.TourID == id).Select(
                t => new TourDetailDto(t.TourID, t.TourName, t.Description, t.Detail, t.Price, t.AvailableSlots, t.StartDate,
                    t.EndDate, t.City.CityName, t.Hotel.HotelName)
            ).FirstOrDefaultAsync();
            if (tour == null) return NotFound();
            return tour;
        }

        [HttpGet("search")]
        public async Task<ActionResult<IEnumerable<Tour>>> SearchTour(string query)
        {
            return await _context.Tours.Where(t => t.TourName.ToLower().Contains(query.ToLower())).ToListAsync();
        }
    }
}