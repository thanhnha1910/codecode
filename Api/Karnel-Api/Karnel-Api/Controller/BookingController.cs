using Karnel_Api.Data;
using Karnel_Api.DTO.Booking;
using Karnel_Api.Service.PayPal;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

namespace Karnel_Api.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookingController : ControllerBase
    {
        private readonly DatabaseContext _context;
        private readonly PayPalService _service;

        public BookingController(DatabaseContext context,PayPalService service)
        {
            _context = context;
            _service = service;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<BookingDTO>>> GetBookings()
        {
            var getAll=await _context.Bookings
                .Include(b=>b.User)
                .Include(c=>c.Tour)
                .Include(d=>d.Payments)
                .ToListAsync();
            var bookingResponses = getAll.Select(b => new BookingResponse
            {
                BookingID = b.BookingID,
                UserID = b.UserID,
                TourID = b.TourID,
                AdultQuantity = b.AdultQuantity,
                ChildQuantity = b.ChildQuantity,
                InfantQuantity = b.InfantQuantity,
                TotalQuantity = b.TotalQuantity,
                AdultUnitPrice = b.AdultUnitPrice,
                ChildUnitPrice = b.ChildUnitPrice,
                InfantUnitPrice = b.InfantUnitPrice,
                TotalAmount = b.TotalAmount,
                BookingDate = b.BookingDate,
                PaymentStatus = b.PaymentStatus,
                TourName = b.Tour?.TourName, // Use null-conditional operator
                TourPrice = b.Tour?.Price ?? 0,
                StartDate = b.Tour?.StartDate ?? DateTime.MinValue,
                EndDate = b.Tour?.EndDate ?? DateTime.MinValue,
                AvailableSlots = b.Tour?.AvailableSlots ?? 0,
             
                
            }).ToList();

            return Ok(bookingResponses);

        }

        [HttpGet("{id}")]
        public async Task<ActionResult<BookingDTO>> GetBooking(int id)
        {
            var booking = await _context.Bookings
                .Include(b => b.User)
                .Include(b => b.Tour)
                .Include(b => b.Payments)
                .FirstOrDefaultAsync(b => b.BookingID == id);

            if (booking == null)
            {
                return NotFound();
            }

            // Manually map entity to DTO
            var bookingResponse = new BookingResponse
            {
                BookingID = booking.BookingID,
                UserID = booking.UserID,
                TourID = booking.TourID,
               AdultUnitPrice = booking.AdultUnitPrice,
               ChildQuantity = booking.ChildQuantity,
               InfantQuantity = booking.InfantQuantity,
               AdultQuantity = booking.AdultQuantity,
               TotalQuantity = booking.TotalQuantity,
               ChildUnitPrice = booking.ChildUnitPrice,
               InfantUnitPrice = booking.InfantUnitPrice,
                TotalAmount = booking.TotalAmount,
                BookingDate = booking.BookingDate,
                PaymentStatus = booking.PaymentStatus,
             
                TourName = booking.Tour?.TourName, // Use null-conditional operator
                TourPrice = booking.Tour?.Price ?? 0,
                StartDate = booking.Tour?.StartDate ?? DateTime.MinValue,
                EndDate = booking.Tour?.EndDate ?? DateTime.MinValue,
                AvailableSlots = booking.Tour?.AvailableSlots ?? 0
            };

            return Ok(bookingResponse);
        }

    
       [HttpPost("Book-Tour")]
public async Task<ActionResult<BookingResponse>> BookTour(BookingDTO booking)
{
    try
    {
        // 1. Log và validate input

        if (booking == null)
        {
            return BadRequest("Booking data is required");
        }

        // 2. Validate và lấy thông tin tour
        var tour = await _context.Tours
            .Include(t => t.City)
            .Include(t => t.Hotel)
            .FirstOrDefaultAsync(t => t.TourID == booking.TourID);

        if (tour == null)
        {
            return NotFound($"Tour with ID {booking.TourID} not found");
        }

        // 3. Tính toán số lượng và kiểm tra slots
        int totalQuantity = booking.AdultQuantity + booking.ChildQunatity + booking.InfantQunatity;
        
        if (totalQuantity <= 0)
        {
            return BadRequest("Total quantity must be greater than 0");
        }

        if (tour.AvailableSlots < totalQuantity)
        {
            return BadRequest($"Not enough slots available. Available: {tour.AvailableSlots}, Requested: {totalQuantity}");
        }

        // 4. Validate user
        var user = await _context.Users.FindAsync(booking.UserID);
        if (user == null)
        {
            return NotFound($"User with ID {booking.UserID} not found");
        }

      
        decimal adultPrice = tour.Price;
        decimal childPrice = tour.Price * 0.75m;
        decimal infantPrice = tour.Price * 0.1m;

        decimal adultTotal = booking.AdultQuantity * adultPrice;
        decimal childTotal = booking.ChildQunatity * childPrice;
        decimal infantTotal = booking.InfantQunatity * infantPrice;
        decimal totalAmount = adultTotal + childTotal + infantTotal;

     
        var newBooking = new Booking
        {
            // Thông tin cơ bản
            UserID = booking.UserID,
            TourID = booking.TourID,
            BookingDate = DateTime.Now,
            PaymentStatus = "Pending",
            PayPalOrderID = "PENDING",

            // Số lượng và giá
            AdultQuantity = booking.AdultQuantity,
            ChildQuantity = booking.ChildQunatity,
            InfantQuantity = booking.InfantQunatity,
            TotalQuantity = totalQuantity,

            // Đơn giá
            AdultUnitPrice = adultPrice,
            ChildUnitPrice = childPrice,
            InfantUnitPrice = infantPrice,
            TotalAmount = totalAmount,

            // Thông tin cá nhân
            FullName = booking.FullName,
            Email = booking.Email,
            Phone = booking.Phone,
            CardIdentification = booking.CardIdentification,
            SpecialRequirements = booking.SpecialRequirements
        };

        try
        {
            // 7. Lưu booking và cập nhật số lượng slots
            _context.Bookings.Add(newBooking);
            tour.AvailableSlots -= totalQuantity;
            
            Console.WriteLine("Saving changes to database...");
            await _context.SaveChangesAsync();
            Console.WriteLine($"Booking created successfully with ID: {newBooking.BookingID}");
        }
        catch (DbUpdateException dbEx)
        {
            Console.WriteLine($"Database Error: {dbEx.Message}");
            Console.WriteLine($"Inner Exception: {dbEx.InnerException?.Message}");
            return StatusCode(500, new { message = "Database error occurred", error = dbEx.Message });
        }

        // 8. Tạo response
        var response = new BookingResponse
        {
            // Booking info
            BookingID = newBooking.BookingID,
            UserID = newBooking.UserID,
            TourID = newBooking.TourID,
            BookingDate = newBooking.BookingDate,
            PaymentStatus = newBooking.PaymentStatus,

            // Quantities
            AdultQuantity = newBooking.AdultQuantity,
            ChildQuantity = newBooking.ChildQuantity,
            InfantQuantity = newBooking.InfantQuantity,
            TotalQuantity = newBooking.TotalQuantity,

            // Prices
            AdultUnitPrice = newBooking.AdultUnitPrice,
            ChildUnitPrice = newBooking.ChildUnitPrice,
            InfantUnitPrice = newBooking.InfantUnitPrice,
            TotalAmount = newBooking.TotalAmount,

            // Tour details
            TourName = tour.TourName,
            TourPrice = tour.Price,
            StartDate = tour.StartDate,
            EndDate = tour.EndDate,
            AvailableSlots = tour.AvailableSlots,

            // Personal info
            FullName = newBooking.FullName,
            Email = newBooking.Email,
            Phone = newBooking.Phone,
            SpecialRequirements = newBooking.SpecialRequirements,

        };

        return Ok(response);
    }
    catch (Exception e)
    {
        Console.WriteLine($"General Error: {e.Message}");
        Console.WriteLine($"Stack Trace: {e.StackTrace}");
        return StatusCode(500, new { message = "An unexpected error occurred", error = e.Message });
    }
}

        [HttpPut("Booking/{id}")]
        public async Task<ActionResult<Booking>> UpdateTour(int id, Booking booking)
        {
            if (id != booking.BookingID)
            {
                return BadRequest();
            }
            _context.Entry(booking).State = EntityState.Modified;
            try
            {
                await _context.SaveChangesAsync();
            }
            catch(DbUpdateConcurrencyException)
            {
                if (!_context.Bookings.Any(e => e.BookingID == id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
                
            }
            return booking;

        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Booking>> Delete(int id)
        {
            var booking = await _context.Bookings.FindAsync(id);
            _context.Bookings.Remove(booking);
            await _context.SaveChangesAsync();
            return booking;
        }

       
        [HttpPut("update-info/{bookingId}")]
        public async Task<ActionResult> UpdateBookingInfo(int bookingId, [FromBody] BookingNameDTO updateInfo)
        {
            try
            {
                var booking = await _context.Bookings.FindAsync(bookingId);
                if (booking == null)
                {
                    return NotFound();
                }
                if (!IsValidEmail(updateInfo.Email))
                {
                    return BadRequest("Invalid email format");
                }

                // Validate phone number (add your validation logic)
                if (!IsValidPhoneNumber(updateInfo.Phone))
                {
                    return BadRequest("Invalid phone number format");
                }
                booking.FullName = updateInfo.FullName;
                booking.Email = updateInfo.Email;
                booking.Phone = updateInfo.Phone;
                booking.SpecialRequirements = updateInfo.SpecialRequirements;
                await _context.SaveChangesAsync();
                return Ok(new { message = "Booking information updated successfully" });

            }
            catch (Exception e)
            {
                return BadRequest($"Error updating booking information: {e.Message}");
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
