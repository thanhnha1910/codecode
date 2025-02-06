using Karnel_Api.Data;
using Karnel_Api.DTO.Booking;
using Karnel_Api.Service.PayPal;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

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
        // Log incoming data

        var tour = await _context.Tours
            .Include(t => t.City)
            .Include(t => t.Hotel)
            .FirstOrDefaultAsync(t => t.TourID == booking.TourID);

        if (tour == null)
        {
            return NotFound($"Tour with ID {booking.TourID} not found");
        }
        int totalQuantity = booking.AdultQuantity + booking.ChildQunatity + booking.InfantQunatity;
        if (tour.AvailableSlots < totalQuantity)
        {
            return BadRequest($"Not enough slots. Available: {tour.AvailableSlots}, Requested: {totalQuantity}");
        }

        var user = await _context.Users.FindAsync(booking.UserID);
        if (user == null)
        {
            return NotFound($"User with ID {booking.UserID} not found");
        }
        decimal adultPrice = tour.Price; 
        decimal childPrice = tour.Price * 0.75m; 
        decimal infantPrice = tour.Price * 0.1m; 
        decimal totalAmount = (booking.AdultQuantity * adultPrice) +
                              (booking.ChildQunatity * childPrice) +
                              (booking.InfantQunatity * infantPrice);


        var newBooking = new Booking
        {
            UserID = booking.UserID,
            TourID = booking.TourID,
            AdultQuantity = booking.AdultQuantity,
            ChildQuantity = booking.ChildQunatity,
            InfantQuantity = booking.InfantQunatity,
            AdultUnitPrice = booking.AdultUnitPrice,
            ChildUnitPrice = booking.ChildUnitPrice,
            InfantUnitPrice = booking.InfantUnitPrice,
            TotalAmount = totalAmount,
            BookingDate = DateTime.Now,
            PaymentStatus = "Pending",
            TotalQuantity = totalQuantity,
            PayPalOrderID = "PENDING",
          
        };

        try
        {
            _context.Bookings.Add(newBooking);
            tour.AvailableSlots -= totalQuantity;
            
            Console.WriteLine("Attempting to save changes to database...");
            await _context.SaveChangesAsync();
            Console.WriteLine("Changes saved successfully");
        }
        catch (DbUpdateException dbEx)
        {
            Console.WriteLine($"Database Error: {dbEx.Message}");
            Console.WriteLine($"Inner Exception: {dbEx.InnerException?.Message}");
            return BadRequest($"Database Error: {dbEx.InnerException?.Message}");
        }

        var response = new BookingResponse
        {
            BookingID = newBooking.BookingID,
            UserID = newBooking.UserID,
            TourID = newBooking.TourID,
            AdultQuantity = newBooking.AdultQuantity,
            ChildQuantity = newBooking.ChildQuantity,
            InfantQuantity = newBooking.InfantQuantity,
            AdultUnitPrice = newBooking.AdultUnitPrice,
            ChildUnitPrice = newBooking.ChildUnitPrice,
            InfantUnitPrice = newBooking.InfantUnitPrice,
            TotalAmount = newBooking.TotalAmount,
            BookingDate = newBooking.BookingDate,
            PaymentStatus = newBooking.PaymentStatus,
            TourName = tour.TourName,
            TourPrice = tour.Price,
            StartDate = tour.StartDate,
            EndDate = tour.EndDate,
            AvailableSlots = tour.AvailableSlots,
            FullName = newBooking.FullName,
            Email = newBooking.Email,
            Phone = newBooking.Phone,
            SpecialRequirements = newBooking.SpecialRequirements,
            TotalQuantity = totalQuantity,
        };

        return Ok(response);
    }
    catch (Exception e)
    {
        Console.WriteLine($"General Error: {e.Message}");
        Console.WriteLine($"Stack Trace: {e.StackTrace}");
        return BadRequest($"Error creatinking: {e.Message}");
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

        [HttpPost("Initial-Payment/{bookingId}")]
        public async Task<ActionResult<BookingResponse>> InitialPayment(int bookingId)
        {
            var booking = await _context.Bookings.FindAsync(bookingId);
            if (booking == null)
            {
                return NotFound();
            }
            decimal totalAmount = booking.TotalAmount;
            try
            {
                //create the payment using Paypal service
                var order=await _service.CreatePayment(totalAmount);
                //save the paypal order id to the booking for later reference
                booking.PayPalOrderID=order.Id;
                await _context.SaveChangesAsync();
                // Redirect the user to the approval URL
                var approvalUrl = order.Links.FirstOrDefault(l => l.Rel == "approve")?.Href;
                return Ok(approvalUrl);

            }
            catch (Exception e)
            {
                return BadRequest($"Error initializing payment: {e.Message}");
            }   
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
