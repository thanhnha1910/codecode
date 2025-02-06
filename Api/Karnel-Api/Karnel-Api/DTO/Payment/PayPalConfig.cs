using System.ComponentModel.DataAnnotations;

namespace Karnel_Api.DTO.Payment;

public class PayPalConfig
{
    [Key]
    public string ClientId { get; set; }
    public string ClientSecret { get; set; }
    public string Mode {get; set; }
}