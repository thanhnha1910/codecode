using Karnel_Api.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Karnel_Api.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class PaymentStatisticsController : ControllerBase
    {
        private readonly DatabaseContext _dbContext;

        public PaymentStatisticsController(DatabaseContext dbContext)
        {
            _dbContext = dbContext;
        }
        [HttpPost]
        public async Task<Payment> AddPayment(Payment payment)
        {
            await _dbContext.Payments.AddAsync(payment);
            await _dbContext.SaveChangesAsync();
            return payment;
        }
        // GET: api/PaymentStatistics/GetAllPayments
        [HttpGet("GetAllPayments")]
        public async Task<IActionResult> GetAllPayments()
        {
            var payments = await _dbContext.Payments
                .Select(p => new
                {
                    p.PaymentID,
                    p.Amount,
                    p.PaymentDate,
                    p.Booking.TourID,
                    p.Booking.BookingID
                })
                .ToListAsync();

            return Ok(payments);
        }


        // GET: api/PaymentStatistics/RevenueByTourMonthly
        [HttpGet("RevenueByTourMonthly")]
        public async Task<IActionResult> GetRevenueByTourMonthly(int year, int month)
        {
            var revenueByTour = await _dbContext.Payments
                .Where(p => p.PaymentDate.Year == year && p.PaymentDate.Month == month)
                .GroupBy(p => p.Booking.TourID)
                .Select(g => new
                {
                    TourID = g.Key,
                    TotalRevenue = g.Sum(p => p.Amount),
                    TotalPayments = g.Count()
                })
                .ToListAsync();

            return Ok(revenueByTour);
        }

        // GET: api/PaymentStatistics/RevenueByTourYearly
        [HttpGet("RevenueByTourYearly")]
        public async Task<IActionResult> GetRevenueByTourYearly(int year)
        {
            var revenueByTour = await _dbContext.Payments
                .Where(p => p.PaymentDate.Year == year)
                .GroupBy(p => p.Booking.TourID)
                .Select(g => new
                {
                    TourID = g.Key,
                    TotalRevenue = g.Sum(p => p.Amount),
                    TotalPayments = g.Count()
                })
                .ToListAsync();

            return Ok(revenueByTour);
        }

        // GET: api/PaymentStatistics/RevenueByTourQuarterly
        [HttpGet("RevenueByTourQuarterly")]
        public async Task<IActionResult> GetRevenueByTourQuarterly(int year, int quarter)
        {
            var revenueByTour = await _dbContext.Payments
                .Where(p => p.PaymentDate.Year == year && (p.PaymentDate.Month - 1) / 3 + 1 == quarter)
                .GroupBy(p => p.Booking.TourID)
                .Select(g => new
                {
                    TourID = g.Key,
                    TotalRevenue = g.Sum(p => p.Amount),
                    TotalPayments = g.Count()
                })
                .ToListAsync();

            return Ok(revenueByTour);
        }

        // GET: api/PaymentStatistics/MostBookedTourMonthly
        [HttpGet("MostBookedTourMonthly")]
        public async Task<IActionResult> GetMostBookedTourMonthly(int year, int month)
        {
            var mostBookedTour = await _dbContext.Payments
                .Where(p => p.PaymentDate.Year == year && p.PaymentDate.Month == month)
                .GroupBy(p => p.Booking.TourID)
                .Select(g => new
                {
                    TourID = g.Key,
                    TotalBookings = g.Count()
                })
                .OrderByDescending(g => g.TotalBookings)
                .FirstOrDefaultAsync();

            return Ok(mostBookedTour);
        }

        // GET: api/PaymentStatistics/MostBookedTourYearly
        [HttpGet("MostBookedTourYearly")]
        public async Task<IActionResult> GetMostBookedTourYearly(int year)
        {
            var mostBookedTour = await _dbContext.Payments
                .Where(p => p.PaymentDate.Year == year)
                .GroupBy(p => p.Booking.TourID)
                .Select(g => new
                {
                    TourID = g.Key,
                    TotalBookings = g.Count()
                })
                .OrderByDescending(g => g.TotalBookings)
                .FirstOrDefaultAsync();

            return Ok(mostBookedTour);
        }

        // GET: api/PaymentStatistics/Top5PopularTours
        [HttpGet("Top5PopularTours")]
        public async Task<IActionResult> GetTop5PopularTours(int year, int? month = null, int? quarter = null)
        {
            var query = _dbContext.Payments.AsQueryable();

            if (month.HasValue)
                query = query.Where(p => p.PaymentDate.Year == year && p.PaymentDate.Month == month);
            else if (quarter.HasValue)
                query = query.Where(p => p.PaymentDate.Year == year && (p.PaymentDate.Month - 1) / 3 + 1 == quarter);
            else
                query = query.Where(p => p.PaymentDate.Year == year);

            var top5PopularTours = await query
                .GroupBy(p => p.Booking.TourID)
                .Select(g => new
                {
                    TourID = g.Key,
                    TotalBookings = g.Count()
                })
                .OrderByDescending(g => g.TotalBookings)
                .Take(5)
                .ToListAsync();

            return Ok(top5PopularTours);
        }

        // GET: api/PaymentStatistics/Top3LowestRevenueTours
        [HttpGet("Top3LowestRevenueTours")]
        public async Task<IActionResult> GetTop3LowestRevenueTours(int year, int? month = null, int? quarter = null)
        {
            var query = _dbContext.Payments.AsQueryable();

            if (month.HasValue)
                query = query.Where(p => p.PaymentDate.Year == year && p.PaymentDate.Month == month);
            else if (quarter.HasValue)
                query = query.Where(p => p.PaymentDate.Year == year && (p.PaymentDate.Month - 1) / 3 + 1 == quarter);
            else
                query = query.Where(p => p.PaymentDate.Year == year);

            var top3LowestRevenueTours = await query
                .GroupBy(p => p.Booking.TourID)
                .Select(g => new
                {
                    TourID = g.Key,
                    TotalRevenue = g.Sum(p => p.Amount)
                })
                .OrderBy(g => g.TotalRevenue)
                .Take(3)
                .ToListAsync();

            return Ok(top3LowestRevenueTours);
        }
    }
}
