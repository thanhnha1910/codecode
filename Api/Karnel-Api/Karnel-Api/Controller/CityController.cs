using Karnel_Api.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Karnel_Api.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class CityController : ControllerBase
    {
        private readonly DatabaseContext _context;
        public CityController(DatabaseContext context)
        {
            _context = context;
        }
        
        [HttpGet]
        public async Task<List<string>> GetCities()
        {
            return await _context.Cities.Select(c => c.CityName).ToListAsync();
        }
    }
}