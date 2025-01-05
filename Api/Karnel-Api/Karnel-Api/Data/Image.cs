namespace Karnel_Api.Data;

public class Image
{
    public int ImageID { get; set; }
    public string EntityType { get; set; } // e.g., 'City', 'Hotel', 'Attraction', etc.
    public int EntityID { get; set; } // References the primary key of the specific entity
    public string ImageUrl { get; set; } // URL or path to the image
    public string AltText { get; set; } // Optional descriptive text
    public DateTime UploadDate { get; set; }
}