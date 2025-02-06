using System.Globalization;
using Karnel_Api.Data;
using Karnel_Api.DTO.Payment;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using PayPalCheckoutSdk.Core;
using PayPalCheckoutSdk.Orders;

namespace Karnel_Api.Service.PayPal;

public class PayPalService
{
    private readonly PayPalConfig _config;
    private readonly PayPalHttpClient _payPalHttpClient;
    private readonly DatabaseContext _databaseContext;
    // private readonly DatabaseContext _databaseContext;

    public PayPalService(IOptions<PayPalConfig> config,DatabaseContext databaseContext)
    {
        _config = config.Value;
        _databaseContext = databaseContext;
        //cau hinh moi truong
        PayPalEnvironment environment;
        if (_config.Mode == "sandbox")
        {
            environment = new SandboxEnvironment(_config.ClientId, _config.ClientSecret);
        }
        else
        {
            environment = new LiveEnvironment(_config.ClientId, _config.ClientSecret);

        }

        _payPalHttpClient = new PayPalHttpClient(environment);
    }

   public async Task<Order> CreatePayment(decimal totalAmount)
    {
        try 
        {
            var request = new OrdersCreateRequest();
            request.Prefer("return=representation");
            request.RequestBody(new OrderRequest
            {
                CheckoutPaymentIntent = "CAPTURE",
                PurchaseUnits = new List<PurchaseUnitRequest>
                {
                    new PurchaseUnitRequest
                    {
                        AmountWithBreakdown = new AmountWithBreakdown
                        {
                            CurrencyCode = "USD",
                            Value = totalAmount.ToString("0.00", CultureInfo.InvariantCulture)
                        }
                    }
                },
                ApplicationContext = new ApplicationContext
                {
                    ReturnUrl = "http://localhost:5173/success",
                    CancelUrl = "http://localhost:5173/cancel",
                    UserAction = "PAY_NOW"
                }
            });

            var response = await _payPalHttpClient.Execute(request);
            return response.Result<Order>();
        }
        catch (Exception ex)
        {
            throw new Exception($"Failed to create PayPal payment: {ex.Message}");
        }
    }

    public async Task<Order> CapturePayment(string orderId)
    {
        try
        {
            // Validate orderId
            if (string.IsNullOrEmpty(orderId))
            {
                throw new ArgumentException("Order ID cannot be empty");
            }

            var request = new OrdersCaptureRequest(orderId);
            request.RequestBody(new OrderActionRequest());

            var response = await _payPalHttpClient.Execute(request);
            var order = response.Result<Order>();

            if (order == null)
            {
                throw new Exception("Failed to capture payment - null response");
            }

            return order;
        }
        catch (Exception ex)
        {
            throw new Exception($"Failed to capture PayPal payment: {ex.Message}");
        }
    }

}