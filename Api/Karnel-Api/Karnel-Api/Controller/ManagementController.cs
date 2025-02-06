using Karnel_Api.Data;
using Karnel_Api.DTO;
using Karnel_Api.DTO.Karnel_Api.DTO;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography.Xml;

namespace Karnel_Api.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class ManagementController : ControllerBase
    {
        private readonly DatabaseContext _context;

        public ManagementController(DatabaseContext context)
        {
            _context = context;
        }

        // Hotels Management
        // Hotels Management
        [HttpGet("hotels")]
        public async Task<ActionResult<IEnumerable<Hotel>>> GetHotels()
        {
            return await _context.Hotels.ToListAsync();
        }

        [HttpPost("hotels")]
        public async Task<ActionResult<Hotel>> CreateHotel(HotelDto hotelDto)
        {
            var hotel = new Hotel
            {
                HotelName = hotelDto.HotelName,
                Address = hotelDto.Address,
                CityID = hotelDto.CityID,
                Description = hotelDto.Description
            };

            _context.Hotels.Add(hotel);
            await _context.SaveChangesAsync();
            return CreatedAtAction("GetHotels", new { id = hotel.HotelID }, hotel);
        }

        [HttpPut("hotels/{id}")]
        public async Task<IActionResult> UpdateHotel(int id, HotelDto hotelDto)
        {
            var hotel = await _context.Hotels.FindAsync(id);
            if (hotel == null) return NotFound();

            hotel.HotelName = hotelDto.HotelName;
            hotel.Address = hotelDto.Address;
            hotel.CityID = hotelDto.CityID;

            _context.Entry(hotel).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.Hotels.Any(e => e.HotelID == id)) return NotFound();
                else throw;
            }

            return NoContent();
        }

        [HttpDelete("hotels/{id}")]
        public async Task<IActionResult> DeleteHotel(int id)
        {
            var hotel = await _context.Hotels.FindAsync(id);
            if (hotel == null) return NotFound();

            _context.Hotels.Remove(hotel);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // Restaurants Management
        [HttpGet("restaurants")]
        public async Task<ActionResult<IEnumerable<Restaurant>>> GetRestaurants()
        {
            return await _context.Restaurants.ToListAsync();
        }

        [HttpPost("restaurants")]
        public async Task<ActionResult<Restaurant>> CreateRestaurant(RestaurantDto restaurantDto)
        {
            var restaurant = new Restaurant
            {
                RestaurantName = restaurantDto.RestaurantName,
                Cuisine = restaurantDto.Cuisine,
                Description = restaurantDto.Description,
                CityID = restaurantDto.CityID
            };

            _context.Restaurants.Add(restaurant);
            await _context.SaveChangesAsync();
            return CreatedAtAction("GetRestaurants", new { id = restaurant.RestaurantID }, restaurant);
        }

        [HttpPut("restaurants/{id}")]
        public async Task<IActionResult> UpdateRestaurant(int id, RestaurantDto restaurantDto)
        {
            var restaurant = await _context.Restaurants.FindAsync(id);
            if (restaurant == null) return NotFound();

            restaurant.RestaurantName = restaurantDto.RestaurantName;
            restaurant.Cuisine = restaurantDto.Cuisine;
            restaurant.Description = restaurantDto.Description;
            restaurant.CityID = restaurantDto.CityID;

            _context.Entry(restaurant).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.Restaurants.Any(e => e.RestaurantID == id)) return NotFound();
                else throw;
            }

            return NoContent();
        }


        [HttpDelete("restaurants/{id}")]
        public async Task<IActionResult> DeleteRestaurant(int id)
        {
            var restaurant = await _context.Restaurants.FindAsync(id);
            if (restaurant == null) return NotFound();

            _context.Restaurants.Remove(restaurant);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // Attractions Management
        [HttpGet("attractions")]
        public async Task<ActionResult<IEnumerable<Attraction>>> GetAttractions()
        {
            return await _context.Attractions.ToListAsync();
        }

        [HttpPost("attractions")]
        public async Task<ActionResult<Attraction>> CreateAttraction(AttractionDto attractionDto)
        {
            var attraction = new Attraction
            {
                AttractionName = attractionDto.AttractionName,
                Description = attractionDto.Description,
                CityID = attractionDto.CityID
            };

            _context.Attractions.Add(attraction);
            await _context.SaveChangesAsync();
            return CreatedAtAction("GetAttractions", new { id = attraction.AttractionID }, attraction);
        }

        [HttpPut("attractions/{id}")]
        public async Task<IActionResult> UpdateAttraction(int id, AttractionDto attractionDto)
        {
            var attraction = await _context.Attractions.FindAsync(id);
            if (attraction == null) return NotFound();

            attraction.AttractionName = attractionDto.AttractionName;
            attraction.Description = attractionDto.Description;
            attraction.CityID = attractionDto.CityID;

            _context.Entry(attraction).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.Attractions.Any(e => e.AttractionID == id)) return NotFound();
                else throw;
            }

            return NoContent();
        }

        [HttpDelete("attractions/{id}")]
        public async Task<IActionResult> DeleteAttraction(int id)
        {
            var attraction = await _context.Attractions.FindAsync(id);
            if (attraction == null) return NotFound();

            _context.Attractions.Remove(attraction);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // Transportation Management
        [HttpGet("transportations")]
        public async Task<ActionResult<IEnumerable<Transportation>>> GetTransportations()
        {
            return await _context.Transportations.ToListAsync();
        }

        [HttpPost("transportations")]
        public async Task<ActionResult<Transportation>> CreateTransportation(TransportationDto transportationDto)
        {
            var transportation = new Transportation
            {
                TransportType = transportationDto.TransportType,
                Price = transportationDto.Price,
                CityID = transportationDto.CityID
            };

            _context.Transportations.Add(transportation);
            await _context.SaveChangesAsync();
            return CreatedAtAction("GetTransportations", new { id = transportation.TransportID }, transportation);
        }

        [HttpPut("transportations/{id}")]
        public async Task<IActionResult> UpdateTransportation(int id, TransportationDto transportationDto)
        {
            var transportation = await _context.Transportations.FindAsync(id);
            if (transportation == null) return NotFound();

            transportation.TransportType = transportationDto.TransportType;
            transportation.Price = transportationDto.Price;
            transportation.CityID = transportationDto.CityID;

            _context.Entry(transportation).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.Transportations.Any(e => e.TransportID == id)) return NotFound();
                else throw;
            }

            return NoContent();
        }

        [HttpDelete("transportations/{id}")]
        public async Task<IActionResult> DeleteTransportation(int id)
        {
            var transportation = await _context.Transportations.FindAsync(id);
            if (transportation == null) return NotFound();

            _context.Transportations.Remove(transportation);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpGet("cities")]
        public async Task<ActionResult<IEnumerable<object>>> GetCities()
        {
            var cities = await _context.Cities
               .Include(c => c.Tours)
                    .ThenInclude(t => t.Hotel)
                .Include(c => c.Tours)
                    .ThenInclude(t => t.Transportation)
                .Include(c => c.Hotels)
                .Include(c => c.Restaurants)
                .Include(c => c.Attractions)
                .Include(c => c.Transportations)
                .ToListAsync();

            var result = cities.Select(city => new
            {
                cityID = city.CityID,
                cityName = city.CityName,
                description = city.Description,
                tours = city.Tours.Select(tour => new
                {
                    tourID = tour.TourID,
                    tourName = tour.TourName,
                    description = tour.Description,
                    detail = tour.Detail,
                    price = tour.Price,
                    availableSlots = tour.AvailableSlots,
                    startDate = tour.StartDate,
                    endDate = tour.EndDate,
                    hotel = tour.Hotel == null ? null : new
                    {
                        hotelID = tour.Hotel.HotelID,
                        hotelName = tour.Hotel.HotelName,
                        address = tour.Hotel.Address,
                        description = tour.Hotel.Description
                    },
                    transportation = tour.Transportation == null ? null : new
                    {
                        transportID = tour.Transportation.TransportID,
                        transportType = tour.Transportation.TransportType,
                        price = tour.Transportation.Price
                    }
                }),
                hotels = city.Hotels
                    .Union(city.Tours
                        .Where(t => t.Hotel != null)
                        .Select(t => t.Hotel))
                    .Distinct()
                    .Select(hotel => new
                    {
                        hotelID = hotel.HotelID,
                        hotelName = hotel.HotelName,
                        address = hotel.Address,
                        description = hotel.Description
                    }).ToList(),
                transportations = city.Transportations
                    .Union(city.Tours
                        .Where(t => t.Transportation != null)
                        .Select(t => t.Transportation))
                    .Distinct()
                    .Select(transport => new
                    {
                        transportID = transport.TransportID,
                        transportType = transport.TransportType,
                        price = transport.Price
                    }).ToList(),
                restaurants = city.Restaurants                  
                    .Select(restaurant => new
                    {
                        restaurantID = restaurant.RestaurantID,
                        restaurantName = restaurant.RestaurantName,
                        cuisine = restaurant.Cuisine,
                        description = restaurant.Description,
                    }).ToList(),

                attractions = city.Attractions
                    .Select(attraction => new
                    {
                        attractionID = attraction.AttractionID,
                        attractionName = attraction.AttractionName,
                        description = attraction.Description                    
                    })
                    .ToList()
            });
            return Ok(result);
        }

        [HttpPost("cities")]
        public async Task<ActionResult<CityDto>> CreateCity(CityDto cityDto)
        {
            var city = new City
            {
                CityName = cityDto.CityName,
                Description = cityDto.Description
            };

            _context.Cities.Add(city);
            await _context.SaveChangesAsync();

            // Return DTO
            var result = new CityDto
            {
                CityName = city.CityName,
                Description = city.Description
            };

            return CreatedAtAction(nameof(GetCities), new { id = city.CityID }, result);
        }

        [HttpPut("cities/{id}")]
        public async Task<IActionResult> UpdateCity(int id, CityDto cityDto)
        {
            var city = await _context.Cities.FindAsync(id);
            if (city == null) return NotFound();

            // Update fields manually
            city.CityName = cityDto.CityName;
            city.Description = cityDto.Description;

            _context.Entry(city).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.Cities.Any(e => e.CityID == id)) return NotFound();
                else throw;
            }

            return NoContent();
        }


        [HttpDelete("cities/{id}")]
        public async Task<IActionResult> DeleteCity(int id)
        {
            var city = await _context.Cities.FindAsync(id);
            if (city == null) return NotFound();

            _context.Cities.Remove(city);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        //Tour management
        // Get all tours
        [HttpGet("tours")]
        public async Task<ActionResult<IEnumerable<TourDto>>> GetTours()
        {
            var tours = await _context.Tours
                .Select(t => new TourDto
                {
                    TourName = t.TourName,
                    Description = t.Description,
                    Detail = t.Detail,
                    Price = t.Price,
                    AvailableSlots = t.AvailableSlots,
                    StartDate = t.StartDate,
                    EndDate = t.EndDate,
                    CityID = t.CityID,
                    HotelID = t.HotelID,
                    TransportID = t.TransportID
                })
                .ToListAsync();

            return Ok(tours);
        }


        [HttpPost("tours")]
        public async Task<ActionResult<TourDto>> CreateTour(TourDto tourDto)
        {
            var tour = new Tour
            {
                TourName = tourDto.TourName,
                Description = tourDto.Description,
                Detail = tourDto.Detail,
                Price = tourDto.Price,
                AvailableSlots = tourDto.AvailableSlots,
                StartDate = tourDto.StartDate,
                EndDate = tourDto.EndDate,
                CityID = tourDto.CityID,
                HotelID = tourDto.HotelID,
                TransportID = tourDto.TransportID
            };

            _context.Tours.Add(tour);
            await _context.SaveChangesAsync();

            var result = new TourDto
            {
                TourName = tour.TourName,
                Description = tour.Description,
                Detail = tour.Detail,
                Price = tour.Price,
                AvailableSlots = tour.AvailableSlots,
                StartDate = tour.StartDate,
                EndDate = tour.EndDate,
                CityID = tour.CityID,
                HotelID = tour.HotelID,
                TransportID = tour.TransportID
            };

            return CreatedAtAction(nameof(GetTours), new { id = tour.TourID }, result);
        }

        [HttpPut("tours/{id}")]
        public async Task<IActionResult> UpdateTour(int id, TourDto tourDto)
        {
            var tour = await _context.Tours.FindAsync(id);
            if (tour == null)
                return NotFound();

            // Map changes from DTO
            tour.TourName = tourDto.TourName;
            tour.Description = tourDto.Description;
            tour.Detail = tourDto.Detail;
            tour.Price = tourDto.Price;
            tour.AvailableSlots = tourDto.AvailableSlots;
            tour.StartDate = tourDto.StartDate;
            tour.EndDate = tourDto.EndDate;
            tour.CityID = tourDto.CityID;
            tour.HotelID = tourDto.HotelID;

            _context.Entry(tour).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.Tours.Any(t => t.TourID == id))
                    return NotFound();
                else
                    throw;
            }

            return NoContent();
        }

        [HttpDelete("tours/{id}")]
        public async Task<IActionResult> DeleteTour(int id)
        {
            var tour = await _context.Tours.FindAsync(id);
            if (tour == null)
                return NotFound();

            _context.Tours.Remove(tour);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
