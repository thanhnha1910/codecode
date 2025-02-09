using System.Collections;
using Karnel_Api.Data;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using SerpApi;

namespace Karnel_Api.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class RestaurantController : ControllerBase
    {
        private readonly DatabaseContext _context;
        private string _apiKey = "277ae32107e1d7909222930488af1f370773ed917111d673c5b5b82cfdf5436a";
        public RestaurantController(DatabaseContext context)
        {
            _context = context;
        }

        [HttpGet("{cityName}")]
        public string? GetRestaurantsByCity(string cityName, int? page)
        {
            int pageSize = 20;
            var searchQuery = new Hashtable
            {
                { "engine", "google" },
                { "q", $"{cityName} Restaurants" }
            };
            if (page.HasValue)
            {
                searchQuery.Add("start", ((page.Value - 1) * pageSize).ToString());
                searchQuery.Add("num", pageSize.ToString());
            }
            try
            {
                GoogleSearch search = new GoogleSearch(searchQuery, _apiKey);
                JObject data = search.GetJson();
                var topRestaurants = data["local_results"]!["places"];
                return topRestaurants?.ToString();
            }
            catch (SerpApiSearchException ex)
            {
                Console.WriteLine("Exception:");
                Console.WriteLine(ex.ToString());
            }
            return null;
        }
        
        [HttpGet("detail/{restaurantName}")]
        public string? GetRestaurantDetail(string restaurantName)
        {
            var searchQuery = new Hashtable
            {
                { "engine", "google_maps" },
                { "q", restaurantName }
            };
            try
            {
                GoogleSearch search = new GoogleSearch(searchQuery, _apiKey);
                JObject data = search.GetJson();
                var placeResults = data["place_results"];
                return placeResults?.ToString();
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
