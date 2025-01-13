using Karnel_Api.Data;
using Karnel_Api.DTO.Favorite;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;

namespace Karnel_Api.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class FavoriteController : ControllerBase
    {
        private readonly DatabaseContext _context;

        public FavoriteController(DatabaseContext context)
        {
            _context = context;
        }

        //Kiem tra trang thai yeu thich
        [HttpGet("check/{userId}/{tourId}")]
        public async Task<ActionResult<bool>> CheckFavorite(int userId, int tourId)
        {
            var exist = await _context.Favorites.AnyAsync(c => c.UserID == userId && c.TourID == tourId);
            return Ok(exist);
        }

        [HttpPost("add")]
        public async Task<IActionResult> AddFavorite(AddFavorite favorite)
        {
            try
            {
                var existingFavorite = await _context.Favorites
                    .FirstOrDefaultAsync(f => f.UserID == favorite.UserID && f.TourID == favorite.TourID);
                if (existingFavorite != null)
                {
                    return BadRequest("Tour have been added to favorite list ");
                }

                var newfavorite = new Favorite
                {
                    UserID = favorite.UserID,
                    TourID = favorite.TourID,
                    LikeDate = DateTime.UtcNow
                };
                _context.Favorites.Add(newfavorite);
                await _context.SaveChangesAsync();
                return Ok("Added tour to favorites list ");
            }
            catch (Exception e)
            {
                return StatusCode(500, $"Internal server error: {e.Message}");
            }
        }

        [HttpDelete("userId/{tourId}")]
        public async Task<IActionResult> DeleteFavorite(int userId, int tourId)
        {
            try
            {
                var fov = await _context.Favorites.FirstOrDefaultAsync(f => f.TourID == tourId && f.UserID == userId);
                if (fov == null)
                {
                    return BadRequest("Favorite tour not found");
                }

                _context.Favorites.Remove(fov);
                await _context.SaveChangesAsync();
                return Ok("Favorite deleted");
            }
            catch (Exception e)
            {
                return StatusCode(500, $"Internal server error: {e.Message}");
            }
        }

        [HttpGet("user/{userId}")]
        public async Task<ActionResult<List<Favorite>>> GetFavorites(int userId)
        {
            try
            {
                var favorites = await _context.Favorites
                    .Where(f => f.UserID == userId)
                    .Include(f => f.Tour).ToListAsync();
                return Ok(favorites);
            }
            catch (Exception e)
            {
                return StatusCode(500, $"Internal server error: {e.Message}");
            }
        }
    }
}