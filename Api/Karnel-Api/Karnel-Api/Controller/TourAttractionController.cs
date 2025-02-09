using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Karnel_Api.Data;
using Karnel_Api.DTO;

namespace Karnel_Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TourAttractionController : ControllerBase
    {
        private readonly DatabaseContext _context;

        public TourAttractionController(DatabaseContext context)
        {
            _context = context;
        }

        // GET: api/TourAttraction
        [HttpGet]
        public async Task<IActionResult> GetTourAttractions()
        {
            var tourAttractions = await _context.TourAttractions
                .Include(ta => ta.Tour)
                .Include(ta => ta.Attraction)
                .Select(ta => new
                {
                    TourID = ta.TourID,
                    TourName = ta.Tour.TourName,
                    AttractionID = ta.AttractionID,
                    AttractionName = ta.Attraction.AttractionName
                })
                .ToListAsync();

            return Ok(tourAttractions);
        }

        // POST: api/TourAttraction
        [HttpPost]
        public async Task<IActionResult> CreateTourAttraction([FromBody] TourAttractionDto model)
        {
            if (model == null)
            {
                Console.WriteLine("Payload is null.");
                return BadRequest("Payload is null.");
            }

            if (model.TourID <= 0 || model.AttractionID <= 0)
            {
                Console.WriteLine($"Invalid data: TourID = {model.TourID}, AttractionID = {model.AttractionID}");
                return BadRequest("TourID and AttractionID must be valid positive integers.");
            }

            var existingRelation = await _context.TourAttractions
                .FirstOrDefaultAsync(ta => ta.TourID == model.TourID && ta.AttractionID == model.AttractionID);

            if (existingRelation != null)
            {
                return Conflict("This Tour and Attraction are already linked.");
            }

            var newRelation = new TourAttraction
            {
                TourID = model.TourID,
                AttractionID = model.AttractionID
            };

            _context.TourAttractions.Add(newRelation);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetTourAttractions), new { model.TourID, model.AttractionID }, model);
        }

        [HttpPut("{tourId}/{attractionId}")]
        public async Task<IActionResult> UpdateTourAttraction(int tourId, int attractionId, [FromBody] TourAttractionDto model)
        {
            if (tourId <= 0 || attractionId <= 0)
            {
                return BadRequest("TourID and AttractionID must be valid positive integers.");
            }

            // Retrieve the existing TourAttraction object from the database
            var tourAttraction = await _context.TourAttractions
                .FirstOrDefaultAsync(ta => ta.TourID == tourId && ta.AttractionID == attractionId);

            if (tourAttraction == null)
            {
                return NotFound("The specified Tour and Attraction relationship does not exist.");
            }

            // Step 1: Check if the new TourID and AttractionID already exist
            var existingLink = await _context.TourAttractions
                .FirstOrDefaultAsync(ta => ta.TourID == model.TourID && ta.AttractionID == model.AttractionID);

            if (existingLink != null)
            {
                // If the combination already exists, return a conflict error
                return Conflict("The specified Tour and Attraction combination already exists.");
            }

            // Step 2: Remove the existing TourAttraction entry
            _context.TourAttractions.Remove(tourAttraction);
            await _context.SaveChangesAsync(); // Commit the removal

            // Step 3: Add a new TourAttraction entry with the updated keys
            var newTourAttraction = new TourAttraction
            {
                TourID = model.TourID,           // New TourID
                AttractionID = model.AttractionID // New AttractionID
            };

            _context.TourAttractions.Add(newTourAttraction);
            await _context.SaveChangesAsync(); // Commit the new addition

            return NoContent(); // Successfully updated
        }


        // DELETE: api/TourAttraction
        [HttpDelete]
        public async Task<IActionResult> DeleteTourAttraction([FromQuery] int tourId)
        {
            var tourAttraction = await _context.TourAttractions
                .FirstOrDefaultAsync(ta => ta.TourID == tourId );

            if (tourAttraction == null)
            {
                return NotFound("The specified Tour and Attraction relationship does not exist.");
            }

            _context.TourAttractions.Remove(tourAttraction);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
