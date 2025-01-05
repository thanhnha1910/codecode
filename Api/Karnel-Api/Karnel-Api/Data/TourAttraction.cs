namespace Karnel_Api.Data;

public class TourAttraction
{
    public int TourID { get; set; }
    public Tour Tour { get; set; }
    public int AttractionID { get; set; }
    public Attraction Attraction { get; set; }
}
