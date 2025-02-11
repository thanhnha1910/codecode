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
    public class AttractionController : ControllerBase
    {
        private readonly DatabaseContext _context;
        private string _apiKey = "277ae32107e1d7909222930488af1f370773ed917111d673c5b5b82cfdf5436a";
        

        public AttractionController(DatabaseContext context)
        {
            _context = context;
        }

        // [HttpGet("{cityName}")]
        // public string? GetAttractionsByCity(string cityName, int? page)
        // {
        //     int pageSize = 20;
        //     var searchQuery = new Hashtable
        //     {
        //         { "engine", "google" },
        //         { "q", $"Top sights in {cityName}" }
        //     };
        //     if (page.HasValue)
        //     {
        //         searchQuery.Add("start", ((page.Value - 1) * pageSize).ToString());
        //         searchQuery.Add("num", pageSize.ToString());
        //     }
        //     
        //     try
        //     {
        //         GoogleSearch search = new GoogleSearch(searchQuery, _apiKey);
        //         JObject data = search.GetJson();
        //         var topAttractions = data["top_sights"]?["sights"];
        //         return topAttractions?.ToString();
        //     }
        //     catch (SerpApiSearchException ex)
        //     {
        //         Console.WriteLine("Exception:");
        //         Console.WriteLine(ex.ToString());
        //     }
        //     return null;
        // }
        
        [HttpGet("{cityName}")]
        public async Task<IEnumerable<AttractionOverviewDto>> GetAttractionsByCity(string cityName)
        {
            return await _context.Attractions.Where(a => a.City.CityName == cityName).Select(a => new AttractionOverviewDto
            {
                AttractionId = a.AttractionID,
                Name = a.AttractionName,
                Description = a.Description,
                Images = _context.Images.Where(i => i.EntityID == a.AttractionID && i.EntityType == "Attraction").Select(img => new ImageDto
                {
                    Id = img.ImageID,
                    Url = img.ImageUrl,
                    AltText = img.AltText
                }).ToList(),
            }).ToListAsync();
        }

        [HttpGet("detail/{cityName}/{attractionName}")]
        public string? GetAttractionDetails(string cityName, string attractionName)
        {
            var searchQuery = new Hashtable
            {
                { "engine", "google_maps" },
                { "q", attractionName + " " + cityName }
            };
            try
            {
                GoogleSearch search = new GoogleSearch(searchQuery, _apiKey);
                JObject data = search.GetJson();
                var results = data["place_results"] ?? data["local_results"]?[0];
                return results?.ToString();
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
