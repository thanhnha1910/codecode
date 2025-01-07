namespace Karnel_Api.DTO
{
    public class TransportationDto
    {
        public int TransportID { get; set; }
        public string TransportType { get; set; }
        public int? CityID { get; set; }
        public decimal Price { get; set; }
    }
}
