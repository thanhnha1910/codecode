namespace Karnel_Api.DTO.Payment;

public class PaymentDTO
{
    public int BookingId { get; set; }
    public decimal Amount { get; set; }
    public string PaymentMethod { get; set; }
}