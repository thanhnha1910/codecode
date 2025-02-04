using Karnel_Api.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Karnel_Api.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class FeedbackController : ControllerBase
    {
        private readonly DatabaseContext _dbContext;

        public FeedbackController(DatabaseContext dbContext)
        {
            _dbContext = dbContext;
        }
        // GET: api/Feedbacks
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Review>>> GetFeedbacks()
        {
            return await _dbContext.Reviews.ToListAsync();
        }

        // POST: api/Feedbacks
        [HttpPost]
        public async Task<ActionResult<Review>> PostFeedback(Review feedback)
        {
            _dbContext.Reviews.Add(feedback);
            await _dbContext.SaveChangesAsync();
            return CreatedAtAction("GetFeedbacks", new { id = feedback.ReviewID }, feedback);
        }

        // DELETE: api/Feedbacks/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteFeedback(int id)
        {
            var feedback = await _dbContext.Reviews.FindAsync(id);
            if (feedback == null)
            {
                return NotFound();
            }

            _dbContext.Reviews.Remove(feedback);
            await _dbContext.SaveChangesAsync();

            return NoContent();
        }
    }
}
