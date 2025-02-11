using System.Collections;
using Karnel_Api.Data;
using Karnel_Api.DTO.User;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json.Linq;
using SerpApi;

namespace Karnel_Api.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class HotelController : ControllerBase
    {
        private readonly DatabaseContext _context;
        private string _apiKey = "277ae32107e1d7909222930488af1f370773ed917111d673c5b5b82cfdf5436a";
        public HotelController(DatabaseContext context) => _context = context;

        // [HttpGet]
        // public string? GetHotels(string cityName, string checkIn, string checkOut, int? page)
        // {
        //     int pageSize = 20;
        //     var searchQuery = new Hashtable
        //     {
        //         { "engine", "google_hotels" },
        //         { "q", $"{cityName} Hotels" },
        //         { "check_in_date", checkIn },
        //         { "check_out_date", checkOut }
        //     };
        //     if (page.HasValue)
        //     {
        //         searchQuery.Add("start", ((page.Value - 1) * pageSize).ToString());
        //         searchQuery.Add("num", pageSize.ToString());
        //     }
        //     try
        //     {
        //         GoogleSearch search = new GoogleSearch(searchQuery, _apiKey);
        //         JObject data = search.GetJson();
        //         JArray results = (JArray)data["properties"]!;
        //         return results.ToString();
        //     }
        //     catch (SerpApiSearchException ex)
        //     {
        //         Console.WriteLine("Exception:");
        //         Console.WriteLine(ex.ToString());
        //     }
        //
        //     return null;
        // }
        
        [HttpGet]
        public async Task<IEnumerable<HotelOverviewDto>> GetHotels(string cityName, string checkIn, string checkOut, int? page)
        {
            return await _context.Hotels.Where(h => h.City.CityName == cityName).Select(h => new HotelOverviewDto
            {
                HotelId = h.HotelID,
                Name = h.HotelName,
                Address = h.Address,
                Rating = h.Rating,
                Description = h.Description,
                Images = _context.Images.Where(i => i.EntityID == h.HotelID && i.EntityType == "Hotel").Select(img =>
                    new ImageDto
                    {
                        Id = img.ImageID,
                        Url = img.ImageUrl,
                        AltText = img.AltText
                    }).ToList(),
            }).ToListAsync();
        }
        
        [HttpGet("detail/{hotelName}")]
        public string? GetHotelDetail(string hotelName, string checkIn, string checkOut)
        {
            var searchQuery = new Hashtable
            {
                {"engine", "google_hotels"},
                {"q", hotelName},
                {"check_in_date", checkIn},
                {"check_out_date", checkOut}
            };
            try
            {
                GoogleSearch search = new GoogleSearch(searchQuery, _apiKey);
                JObject data = search.GetJson();
                JArray? results = (JArray?)data["properties"];
                return results != null ? null : data.ToString();
            }
            catch (SerpApiSearchException ex)
            {
                Console.WriteLine("Exception:");
                Console.WriteLine(ex.ToString());
            }
            return null;
        }
    }
}