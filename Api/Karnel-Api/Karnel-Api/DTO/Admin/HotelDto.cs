using Karnel_Api.Data;
using System.ComponentModel.DataAnnotations.Schema;

namespace Karnel_Api.DTO
{
    public class HotelDto
    {
        public int HotelID { get; set; }
        public string HotelName { get; set; }
        public string Address { get; set; }
        public int? CityID { get; set; }     
        public decimal? Rating { get; set; }
        public string Description { get; set; }
    }
}
