using Karnel_Api.Data;
using Karnel_Api.DTO.Booking;
using Karnel_Api.Service.PayPal;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Transactions;

namespace Karnel_Api.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookingController : ControllerBase
    {
        private readonly DatabaseContext _context;
        private readonly ILogger<BookingController> _logger;
        private readonly PayPalService _paypalService;

        public BookingController(
            DatabaseContext context,
            ILogger<BookingController> logger,
            PayPalService paypalService)
        {
            _context = context;
            _logger = logger;
            _paypalService = paypalService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<BookingResponse>>> GetBookings()
        {
            try
            {
                var bookings = await _context.Bookings
                    .Include(b => b.User)
                    .Include(b => b.Tour)
                    .Include(b => b.Payments)
                    .ToListAsync();

                var bookingResponses = bookings.Select(b => new BookingResponse
                {
                    BookingID = b.BookingID,
                    UserID = b.UserID,
                    TourID = b.TourID,
                    AdultQuantity = b.AdultQuantity,
                    ChildQuantity = b.ChildQuantity,
                    InfantQuantity = b.InfantQuantity,
                    AdultUnitPrice = b.AdultUnitPrice,
                    ChildUnitPrice = b.ChildUnitPrice,
                    InfantUnitPrice = b.InfantUnitPrice,
                    TotalAmount = b.TotalAmount,
                    BookingDate = b.BookingDate,
                    PaymentStatus = b.PaymentStatus,
                    TourName = b.Tour?.TourName,
                    TourPrice = b.Tour?.Price ?? 0,
                    StartDate = b.Tour?.StartDate ?? DateTime.MinValue,
                    EndDate = b.Tour?.EndDate ?? DateTime.MinValue,
                    AvailableSlots = b.Tour?.AvailableSlots ?? 0,
                    FullName = b.FullName,
                    Email = b.Email,
                    Phone = b.Phone,
                    SpecialRequirements = b.SpecialRequirements,
                    TotalQuantity = b.TotalQuantity
                }).ToList();

                return Ok(bookingResponses);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error getting bookings: {ex.Message}");
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<BookingResponse>> GetBooking(int id)
        {
            try
            {
                var booking = await _context.Bookings
                    .Include(b => b.User)
                    .Include(b => b.Tour)
                    .Include(b => b.Payments)
                    .FirstOrDefaultAsync(b => b.BookingID == id);

                if (booking == null)
                {
                    return NotFound($"Booking with ID {id} not found");
                }

                var response = new BookingResponse
                {
                    BookingID = booking.BookingID,
                    UserID = booking.UserID,
                    TourID = booking.TourID,
                    AdultQuantity = booking.AdultQuantity,
                    ChildQuantity = booking.ChildQuantity,
                    InfantQuantity = booking.InfantQuantity,
                    AdultUnitPrice = booking.AdultUnitPrice,
                    ChildUnitPrice = booking.ChildUnitPrice,
                    InfantUnitPrice = booking.InfantUnitPrice,
                    TotalAmount = booking.TotalAmount,
                    BookingDate = booking.BookingDate,
                    PaymentStatus = booking.PaymentStatus,
                    TourName = booking.Tour?.TourName,
                    TourPrice = booking.Tour?.Price ?? 0,
                    StartDate = booking.Tour?.StartDate ?? DateTime.MinValue,
                    EndDate = booking.Tour?.EndDate ?? DateTime.MinValue,
                    AvailableSlots = booking.Tour?.AvailableSlots ?? 0,
                    FullName = booking.FullName,
                    Email = booking.Email,
                    Phone = booking.Phone,
                    SpecialRequirements = booking.SpecialRequirements,
                    TotalQuantity = booking.TotalQuantity
                };

                return Ok(response);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error getting booking {id}: {ex.Message}");
                return StatusCode(500, "Internal server error");
            }
        }
        [HttpGet("user/{userId}")]
        public async Task<ActionResult<IEnumerable<BookingResponse>>> GetUserBookings(int userId)
        {
            try
            {
                var bookings = await _context.Bookings
                    .Include(b => b.Tour)
                    .Include(b => b.User)
                    .Where(b => b.UserID == userId)
                    .Select(b => new BookingResponse
                    {
                        BookingID = b.BookingID,
                        UserID = b.UserID,
                        TourID = b.TourID,
                        BookingDate = b.BookingDate,
                        PaymentStatus = b.PaymentStatus,
                        TotalAmount = b.TotalAmount,
                        TourName = b.Tour.TourName,
                        StartDate = b.Tour.StartDate,
                        EndDate = b.Tour.EndDate,
                        AdultQuantity = b.AdultQuantity,
                        ChildQuantity = b.ChildQuantity,
                        InfantQuantity = b.InfantQuantity,
                        TotalQuantity = b.TotalQuantity,
                        FullName = b.FullName,
                        Email = b.Email,
                        Phone = b.Phone
                    })
                    .ToListAsync();

                if (!bookings.Any())
                {
                    return NotFound($"No bookings found for user {userId}");
                }

                return Ok(bookings);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error getting bookings for user {userId}: {ex.Message}");
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpPost("Book-Tour")]
        public async Task<ActionResult<BookingResponse>> BookTour(BookingDTO booking)
        {
            using var transaction = await _context.Database.BeginTransactionAsync();
            try
            {
                // Validate input
                if (booking == null)
                {
                    return BadRequest("Booking data is required");
                }

                // Get and validate tour
                var tour = await _context.Tours
                    .Include(t => t.City)
                    .Include(t => t.Hotel)
                    .FirstOrDefaultAsync(t => t.TourID == booking.TourID);

                if (tour == null)
                {
                    return NotFound($"Tour with ID {booking.TourID} not found");
                }

                // Calculate total quantity and validate slots
                int totalQuantity = booking.AdultQuantity + booking.ChildQuantity + booking.InfantQuantity;

                if (totalQuantity <= 0)
                {
                    return BadRequest("Total quantity must be greater than 0");
                }

                if (tour.AvailableSlots < totalQuantity)
                {
                    return BadRequest($"Not enough slots available. Available: {tour.AvailableSlots}, Requested: {totalQuantity}");
                }

                // Validate user
                var user = await _context.Users.FindAsync(booking.UserID);
                if (user == null)
                {
                    return NotFound($"User with ID {booking.UserID} not found");
                }

                // Calculate prices
                decimal adultTotal = booking.AdultQuantity * booking.AdultUnitPrice;
                decimal childTotal = booking.ChildQuantity * booking.ChildUnitPrice;
                decimal infantTotal = booking.InfantQuantity * booking.InfantUnitPrice;
                decimal totalAmount = adultTotal + childTotal + infantTotal;

                _logger.LogInformation($"""
                    Booking Calculation:
                    Adult: {booking.AdultQuantity} x ${booking.AdultUnitPrice} = ${adultTotal}
                    Child: {booking.ChildQuantity} x ${booking.ChildUnitPrice} = ${childTotal}
                    Infant: {booking.InfantQuantity} x ${booking.InfantUnitPrice} = ${infantTotal}
                    Total Amount: ${totalAmount}
                    """);

                // Create new booking
                var newBooking = new Booking
                {
                    UserID = booking.UserID,
                    TourID = booking.TourID,
                    BookingDate = DateTime.Now,
                    PaymentStatus = "Pending",
                    PayPalOrderID = "PENDING",

                    AdultQuantity = booking.AdultQuantity,
                    ChildQuantity = booking.ChildQuantity,
                    InfantQuantity = booking.InfantQuantity,
                    TotalQuantity = totalQuantity,

                    AdultUnitPrice = booking.AdultUnitPrice,
                    ChildUnitPrice = booking.ChildUnitPrice,
                    InfantUnitPrice = booking.InfantUnitPrice,
                    TotalAmount = totalAmount,

                    FullName = booking.FullName,
                    Email = booking.Email,
                    Phone = booking.Phone,
                    CardIdentification = booking.CardIdentification,
                    SpecialRequirements = booking.SpecialRequirements
                };

                // Save booking and update tour slots
                _context.Bookings.Add(newBooking);
                tour.AvailableSlots -= totalQuantity;
                
                await _context.SaveChangesAsync();
                await transaction.CommitAsync();

                // Prepare response
                var response = new BookingResponse
                {
                    BookingID = newBooking.BookingID,
                    UserID = newBooking.UserID,
                    TourID = newBooking.TourID,
                    BookingDate = newBooking.BookingDate,
                    PaymentStatus = newBooking.PaymentStatus,

                    AdultQuantity = newBooking.AdultQuantity,
                    ChildQuantity = newBooking.ChildQuantity,
                    InfantQuantity = newBooking.InfantQuantity,
                    TotalQuantity = newBooking.TotalQuantity,

                    AdultUnitPrice = newBooking.AdultUnitPrice,
                    ChildUnitPrice = newBooking.ChildUnitPrice,
                    InfantUnitPrice = newBooking.InfantUnitPrice,
                    TotalAmount = newBooking.TotalAmount,

                    TourName = tour.TourName,
                    TourPrice = tour.Price,
                    StartDate = tour.StartDate,
                    EndDate = tour.EndDate,
                    AvailableSlots = tour.AvailableSlots,

                    FullName = newBooking.FullName,
                    Email = newBooking.Email,
                    Phone = newBooking.Phone,
                    SpecialRequirements = newBooking.SpecialRequirements
                };

                return Ok(response);
            }
            catch (Exception ex)
            {
                await transaction.RollbackAsync();
                _logger.LogError($"Error creating booking: {ex.Message}");
                return StatusCode(500, new { message = "Failed to create booking", error = ex.Message });
            }
        }

        [HttpPut("update-info/{bookingId}")]
        public async Task<ActionResult> UpdateBookingInfo(int bookingId, [FromBody] BookingNameDTO updateInfo)
        {
            using var transaction = await _context.Database.BeginTransactionAsync();
            try
            {
                var booking = await _context.Bookings.FindAsync(bookingId);
                if (booking == null)
                {
                    return NotFound($"Booking with ID {bookingId} not found");
                }

                // Validate email
                if (!IsValidEmail(updateInfo.Email))
                {
                    return BadRequest("Invalid email format");
                }

                // Validate phone
                if (!IsValidPhoneNumber(updateInfo.Phone))
                {
                    return BadRequest("Invalid phone number format");
                }

                // Update booking information
                booking.FullName = updateInfo.FullName;
                booking.Email = updateInfo.Email;
                booking.Phone = updateInfo.Phone;
                booking.SpecialRequirements = updateInfo.SpecialRequirements;

                await _context.SaveChangesAsync();
                await transaction.CommitAsync();

                return Ok(new { message = "Booking information updated successfully" });
            }
            catch (Exception ex)
            {
                await transaction.RollbackAsync();
                _logger.LogError($"Error updating booking {bookingId}: {ex.Message}");
                return StatusCode(500, new { message = "Failed to update booking", error = ex.Message });
            }
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteBooking(int id)
        {
            using var transaction = await _context.Database.BeginTransactionAsync();
            try
            {
                var booking = await _context.Bookings
                    .Include(b => b.Tour)
                    .FirstOrDefaultAsync(b => b.BookingID == id);

                if (booking == null)
                {
                    return NotFound($"Booking with ID {id} not found");
                }

                // Return slots to tour
                if (booking.Tour != null)
                {
                    booking.Tour.AvailableSlots += booking.TotalQuantity;
                }

                _context.Bookings.Remove(booking);
                await _context.SaveChangesAsync();
                await transaction.CommitAsync();

                return Ok(new { message = "Booking deleted successfully" });
            }
            catch (Exception ex)
            {
                await transaction.RollbackAsync();
                _logger.LogError($"Error deleting booking {id}: {ex.Message}");
                return StatusCode(500, new { message = "Failed to delete booking", error = ex.Message });
            }
        }

        private bool IsValidEmail(string email)
        {
            try
            {
                var addr = new System.Net.Mail.MailAddress(email);
                return addr.Address == email;
            }
            catch
            {
                return false;
            }
        }

        private bool IsValidPhoneNumber(string phone)
        {
            return !string.IsNullOrEmpty(phone) && phone.Length >= 10 && phone.All(char.IsDigit);
        }
    }
}