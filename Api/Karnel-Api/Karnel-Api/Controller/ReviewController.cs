using Karnel_Api.Data;
using Karnel_Api.DTO.User;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Karnel_Api.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReviewController : ControllerBase
    {
        private readonly DatabaseContext _context;
        public ReviewController(DatabaseContext context) => _context = context;

        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetReviewsForTour(int id)
        {
            int[] stars = [5, 4, 3, 2, 1];
            var count = new List<object>();
            var query = _context.Reviews.AsQueryable();
            foreach (int star in stars)
            {
                object rating = new
                {
                    Rating = star,
                    Count = await query.Where(r => r.TourID == id && r.Rating >= star && r.Rating < star + 1).CountAsync(),
                };
                count.Add(rating);
            }
            
            return Ok(new
            {
                Reviews = await query.Where(r => r.TourID == id).Select(r => new ReviewDetailDto
                {
                    
                    ReviewId = r.ReviewID,
                    Username = r.User.Name,
                    Avatar = r.User.Avatar,
                    Rating = r.Rating,
                    Feedback = r.Feedback,
                    ReviewDate = r.ReviewDate,
                }).ToListAsync(),
                Ratings = count,
            });
        }
    }
    
}
