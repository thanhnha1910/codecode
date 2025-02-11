using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Karnel_Api.Data;
using Karnel_Api.DTO;

namespace Karnel_Api.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class TourRestaurantController : ControllerBase
    {
        private readonly DatabaseContext _context;

        public TourRestaurantController(DatabaseContext context)
        {
            _context = context;
        }

        // GET: api/TourRestaurant
        [HttpGet]
        public async Task<IActionResult> GetTourRestaurants()
        {
            var tourRestaurants = await _context.TourRestaurants
                .Include(tr => tr.Tour)
                .Include(tr => tr.Restaurant)
                .Select(tr => new
                {
                    TourID = tr.TourID,
                    TourName = tr.Tour.TourName,
                    RestaurantID = tr.RestaurantID,
                    RestaurantName = tr.Restaurant.RestaurantName
                })
                .ToListAsync();

            return Ok(tourRestaurants);
        }

        // POST: api/TourRestaurant
        [HttpPost]
        public async Task<IActionResult> CreateTourRestaurant([FromBody] TourRestaurantDto model)
        {
            if (model == null)
            {
                Console.WriteLine("Payload is null.");
                return BadRequest("Payload is null.");
            }

            if (model.TourID <= 0 || model.RestaurantID <= 0)
            {
                Console.WriteLine($"Invalid data: TourID = {model.TourID}, RestaurantID = {model.RestaurantID}");
                return BadRequest("TourID and RestaurantID must be valid positive integers.");
            }

            var existingRelation = await _context.TourRestaurants
                .FirstOrDefaultAsync(tr => tr.TourID == model.TourID && tr.RestaurantID == model.RestaurantID);

            if (existingRelation != null)
            {
                return Conflict("This Tour and Restaurant are already linked.");
            }

            var newRelation = new TourRestaurant
            {
                TourID = model.TourID,
                RestaurantID = model.RestaurantID
            };

            _context.TourRestaurants.Add(newRelation);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetTourRestaurants), new { model.TourID, model.RestaurantID }, model);
        }
        [HttpPut("{tourId}/{restaurantId}")]
        public async Task<IActionResult> UpdateTourRestaurant(int tourId, int restaurantId, [FromBody] TourRestaurantDto model)
        {
            if (tourId <= 0 || restaurantId <= 0)
            {
                return BadRequest("TourID and RestaurantID must be valid positive integers.");
            }

            // Retrieve the existing TourRestaurant object from the database
            var tourRestaurant = await _context.TourRestaurants
                .FirstOrDefaultAsync(tr => tr.TourID == tourId && tr.RestaurantID == restaurantId);

            if (tourRestaurant == null)
            {
                return NotFound("The specified Tour and Restaurant relationship does not exist.");
            }

            // Step 1: Check if the new TourID and RestaurantID already exist
            var existingLink = await _context.TourRestaurants
                .FirstOrDefaultAsync(tr => tr.TourID == model.TourID && tr.RestaurantID == model.RestaurantID);

            if (existingLink != null)
            {
                // If the combination already exists, return a conflict error
                return Conflict("The specified Tour and Restaurant combination already exists.");
            }

            // Step 2: Remove the existing TourRestaurant entry
            _context.TourRestaurants.Remove(tourRestaurant);
            await _context.SaveChangesAsync(); // Commit the removal

            // Step 3: Add a new TourRestaurant entry with the updated keys
            var newTourRestaurant = new TourRestaurant
            {
                TourID = model.TourID,            // New TourID
                RestaurantID = model.RestaurantID  // New RestaurantID
            };

            _context.TourRestaurants.Add(newTourRestaurant);
            await _context.SaveChangesAsync(); // Commit the new addition

            return NoContent(); // Successfully updated
        }


        // DELETE: api/TourRestaurant
        [HttpDelete]
        public async Task<IActionResult> DeleteTourRestaurant([FromQuery] int tourId)
        {
            var tourRestaurant = await _context.TourRestaurants
                .FirstOrDefaultAsync(tr => tr.TourID == tourId );

            if (tourRestaurant == null)
            {
                return NotFound("The specified Tour and Restaurant relationship does not exist.");
            }

            _context.TourRestaurants.Remove(tourRestaurant);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
