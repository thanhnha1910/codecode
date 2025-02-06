using Karnel_Api.Data;
using Karnel_Api.DTO.Payment;
using Karnel_Api.Service.PayPal;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Karnel_Api.Controller
{
    [Route("api/[controller]")]
    [ApiController]
  public class PaymentController : ControllerBase
{
    private readonly PayPalService _paypalService;
    private readonly DatabaseContext _context;
    private readonly ILogger<PaymentController> _logger;

    public PaymentController(
        PayPalService paypalService,
        DatabaseContext context,
        ILogger<PaymentController> logger)
    {
        _paypalService = paypalService;
        _context = context;
        _logger = logger;
    }

    [HttpPost("initiate/{bookingId}")]
    public async Task<ActionResult> InitiatePayment(int bookingId)
    {
        try
        {
            var booking = await _context.Bookings.FindAsync(bookingId);
            if (booking == null)
                return NotFound("Booking not found");

            var order = await _paypalService.CreatePayment(booking.TotalAmount);
            booking.PayPalOrderID = order.Id;
            await _context.SaveChangesAsync();

            var approvalUrl = order.Links.FirstOrDefault(l => l.Rel == "approve")?.Href;
            return Ok(new { paymentUrl = approvalUrl });
        }
        catch (Exception ex)
        {
            _logger.LogError($"Payment initiation failed: {ex.Message}");
            return BadRequest(new { message = "Failed to initiate payment", error = ex.Message });
        }
    }

    [HttpPost("capture")]
    public async Task<ActionResult> CapturePayment([FromBody] PaymentCaptureRequest request)
    {
        if (string.IsNullOrEmpty(request.PaymentToken))
            return BadRequest("Payment token is required");

        using var transaction = await _context.Database.BeginTransactionAsync();
        try
        {
            _logger.LogInformation($"Capturing payment with token: {request.PaymentToken}");

            var order = await _paypalService.CapturePayment(request.PaymentToken);
            
            var booking = await _context.Bookings
                .FirstOrDefaultAsync(b => b.PayPalOrderID == request.PaymentToken);

            if (booking == null)
                return NotFound("Booking not found");

            if (order.Status == "COMPLETED")
            {
                booking.PaymentStatus = "Completed";
                
                var payment = new Payment
                {
                    BookingID = booking.BookingID,
                    PaymentDate = DateTime.UtcNow,
                    Amount = booking.TotalAmount,
                    PaymentMethod = "PayPal",
                    PaymentStatus = true,
                    PayPalOrderID = request.PaymentToken,
                    UserId = booking.UserID
                };

                await _context.Payments.AddAsync(payment);
                await _context.SaveChangesAsync();
                await transaction.CommitAsync();

                return Ok(new
                {
                    success = true,
                    message = "Payment successful",
                    bookingId = booking.BookingID,
                    paymentStatus = "Completed",
                    amount = booking.TotalAmount
                });
            }

            return BadRequest(new { message = "Payment failed", status = order.Status });
        }
        catch (Exception ex)
        {
            await transaction.RollbackAsync();
            _logger.LogError($"Payment capture failed: {ex.Message}");
            return BadRequest(new { message = "Payment failed", error = ex.Message });
        }
    }

    [HttpGet("status/{bookingId}")]
    public async Task<ActionResult> GetPaymentStatus(int bookingId)
    {
        try
        {
            var booking = await _context.Bookings
                .Include(b => b.Payments)
                .FirstOrDefaultAsync(b => b.BookingID == bookingId);

            if (booking == null)
                return NotFound("Booking not found");

            return Ok(new
            {
                bookingId = booking.BookingID,
                status = booking.PaymentStatus,
                amount = booking.TotalAmount,
                lastPayment = booking.Payments.OrderByDescending(p => p.PaymentDate).FirstOrDefault()
            });
        }
        catch (Exception ex)
        {
            return BadRequest(new { message = "Failed to get payment status", error = ex.Message });
        }
    }
}

}
     

