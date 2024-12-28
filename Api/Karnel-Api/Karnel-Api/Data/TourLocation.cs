namespace Karnel_Api.Data;

public class TourLocation
{
    public int TourId { get; set; }
    public int LocationId { get; set; }
    public Tour Tour { get; set; }
    public Location Location { get; set; }
}