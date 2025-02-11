using Karnel_Api.Data;
using Karnel_Api.DTO.User;
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
        public async Task<IEnumerable<object>> GetCities()
        {
            return await _context.Cities.Select(c => new
            {
                c.CityName,
                AttractionsCount = _context.Attractions.Count(a => a.CityID == c.CityID),
                Image = _context.Images.Where(i => i.EntityID == c.CityID && i.EntityType == "City").Select(img => new ImageDto
                {
                    Id = img.ImageID,
                    Url = img.ImageUrl,
                    AltText = img.AltText
                }).FirstOrDefault(),
            }).ToListAsync();
        }
    }
}