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
                Console.WriteLine($"Received favorite request - UserID: {favorite.UserID}, TourID: {favorite.TourID}");

                if (!ModelState.IsValid)
                {
                    return BadRequest(new
                        { success = false, message = "Invalid model state", errors = ModelState.Values });
                }

                var userExists = await _context.Users.AnyAsync(u => u.Id == favorite.UserID);
                var tourExists = await _context.Tours.AnyAsync(t => t.TourID == favorite.TourID);

                if (!userExists || !tourExists)
                {
                    return BadRequest(new { success = false, message = "Invalid user or tour ID" });
                }

                var existingFavorite = await _context.Favorites
                    .FirstOrDefaultAsync(f => f.UserID == favorite.UserID && f.TourID == favorite.TourID);

                if (existingFavorite != null)
                {
                    return Ok(new
                    {
                        success = true,
                        message = "Tour is already in favorites",
                        isExisting = true,
                        favorite = existingFavorite
                    });
                }

                var newfavorite = new Favorite
                {
                    UserID = favorite.UserID,
                    TourID = favorite.TourID,
                    LikeDate = DateTime.UtcNow
                };

                _context.Favorites.Add(newfavorite);
                await _context.SaveChangesAsync();

                return Ok(new
                {
                    success = true,
                    message = "Added tour to favorites list",
                    isExisting = false,
                    favorite = newfavorite
                });
            }
            catch (Exception e)
            {
                return StatusCode(500, new
                {
                    success = false,
                    message = "An error occurred while processing your request",
                    error = e.Message
                });
            }
        }

        [HttpDelete("{userId}/{tourId}")]
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
                    .Include(f => f.Tour)
                    .ThenInclude(t => t.City) // Include City information
                    .Select(f => new
                    {
                        LikeID = f.LikeID,
                        UserID = f.UserID,
                        TourID = f.TourID,
                        LikeDate = f.LikeDate,
                        Tour = new
                        {
                            TourName = f.Tour.TourName,
                            Description = f.Tour.Description,
                            Price = f.Tour.Price,
                            AvailableSlots = f.Tour.AvailableSlots,
                            StartDate = f.Tour.StartDate,
                            EndDate = f.Tour.EndDate,
                            CityName = f.Tour.City.CityName,
                            Duration = (f.Tour.EndDate - f.Tour.StartDate).Days
                        }
                    })
                    .ToListAsync();

                return Ok(favorites);
            }
            catch (Exception e)
            {
                return StatusCode(500, new
                {
                    success = false,
                    message = "An error occurred while fetching favorites",
                    error = e.Message
                });
            }
        }
    }
}