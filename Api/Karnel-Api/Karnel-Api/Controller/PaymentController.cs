using Karnel_Api.Data;
using Karnel_Api.DTO.Payment;
using Karnel_Api.Service.Auth;
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
    private readonly AuthService _authService;

    public PaymentController(
        PayPalService paypalService,
        DatabaseContext context,
        ILogger<PaymentController> logger, AuthService authService)
    {
        _paypalService = paypalService;
        _context = context;
        _logger = logger;
        _authService = authService;
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
                .Include(b=>b.Tour)
                .Include(b=>b.User)
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
                _logger.LogInformation($"Sending confirmation email to: {booking.Email}");
               
                var emailBody = GeneratePaymentConfirmationEmail(booking);
                await _authService.SendEmailAsync(
                    booking.Email,
                    "Payment Confirmation - Tour Booking",
                    emailBody
                );

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
    private string GeneratePaymentConfirmationEmail(Booking booking)
    {
        // Format tiền tệ
        string FormatCurrency(decimal amount) => $"${amount:N2}";
        
        return $@"
            <html>
            <body style='font-family: Arial, sans-serif; line-height: 1.6; color: #333;'>
                <div style='max-width: 600px; margin: 0 auto; padding: 20px;'>
                    <h1 style='color: #2c3e50; text-align: center;'>Payment Confirmation</h1>
                    <div style='background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin-top: 20px;'>
                        <h2 style='color: #27ae60;'>Thank you for your payment!</h2>
                        <p>Dear {booking.FullName},</p>
                        <p>Your payment has been successfully processed. Here are your booking details:</p>
                        
                        <div style='background-color: white; padding: 15px; border-radius: 5px; margin: 15px 0;'>
                            <h3 style='color: #2c3e50; margin-bottom: 15px;'>Booking Information</h3>
                            <p><strong>Booking ID:</strong> {booking.BookingID}</p>
                            <p><strong>Tour Name:</strong> {booking.Tour.TourName}</p>
                            <p><strong>Tour Date:</strong> {booking.Tour.StartDate:MMM dd, yyyy} - {booking.Tour.EndDate:MMM dd, yyyy}</p>
                            
                            <h4 style='color: #2c3e50; margin-top: 15px;'>Booking Details:</h4>
                            <ul style='list-style: none; padding-left: 0;'>
                                <li>Adults: {booking.AdultQuantity} x {FormatCurrency(booking.AdultUnitPrice)}</li>
                                <li>Children: {booking.ChildQuantity} x {FormatCurrency(booking.ChildUnitPrice)}</li>
                                <li>Infants: {booking.InfantQuantity} x {FormatCurrency(booking.InfantUnitPrice)}</li>
                            </ul>
                            
                            <p style='font-size: 18px; font-weight: bold; color: #27ae60; margin-top: 15px;'>
                                Total Amount Paid: {FormatCurrency(booking.TotalAmount)}
                            </p>
                        </div>

                        <div style='margin-top: 20px;'>
                            <p>If you have any questions about your booking, please don't hesitate to contact us.</p>
                            <p>We look forward to seeing you on the tour!</p>
                        </div>

                        <div style='margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; text-align: center; font-size: 12px; color: #666;'>
                            <p>This is an automated email, please do not reply.</p>
                        </div>
                    </div>
                </div>
            </body>
            </html>";
    }
}
  

}
     

