using Microsoft.AspNetCore.Mvc;
using Karnel_Api.Data;
using Microsoft.EntityFrameworkCore;

[Route("api/[controller]")]
[ApiController]
public class ImagesController : ControllerBase
{
    private readonly DatabaseContext _context;

    public ImagesController(DatabaseContext context)
    {
        _context = context;
    }

    // Fetch images by EntityType and EntityID
    [HttpGet]
    public async Task<IActionResult> GetImages(string entityType, int entityID)
    {
        var images = await _context.Images
            .Where(img => img.EntityType == entityType && img.EntityID == entityID)
            .ToListAsync();
        return Ok(images);
    }

    [HttpPost("multiple")]
    public async Task<IActionResult> UploadMultipleImages([FromForm] List<IFormFile> files, [FromQuery] string entityType, [FromQuery] int entityID)
    {
        if (files == null || !files.Any())
        {
            Console.WriteLine("No files were provided.");
            return BadRequest("No files were provided.");
        }

        if (string.IsNullOrEmpty(entityType))
        {
            Console.WriteLine("Entity type is missing.");
            return BadRequest("Entity type is required.");
        }

        if (entityID <= 0)
        {
            Console.WriteLine("Invalid entity ID.");
            return BadRequest("Entity ID is invalid.");
        }

        Console.WriteLine($"EntityType: {entityType}, EntityID: {entityID}, Files Count: {files.Count}");

        if (files == null || !files.Any())
        {
            return BadRequest("No files were provided.");
        }

        var uploadedImages = new List<Image>();

        foreach (var file in files)
        {
            var fileName = $"{Guid.NewGuid()}{Path.GetExtension(file.FileName)}";
            var folderPath = Path.Combine("wwwroot", "images", entityType, $"{entityType}ID{entityID}");
            Directory.CreateDirectory(folderPath);
            var filePath = Path.Combine(folderPath, fileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            var image = new Image
            {
                EntityType = entityType,
                EntityID = entityID,
                ImageUrl = Path.Combine("images", entityType, $"{entityType}ID{entityID}", fileName).Replace("\\", "/"),
                AltText = "Uploaded image"
            };

            _context.Images.Add(image);
            uploadedImages.Add(image);
        }

        await _context.SaveChangesAsync();

        return Ok(uploadedImages);
    }


    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteImage(int id, [FromQuery] int entityID, [FromQuery] string entityType)
    {
        // Find the image by ID, entityID, and entityType
        var image = await _context.Images
            .FirstOrDefaultAsync(img => img.ImageID == id && img.EntityID == entityID && img.EntityType == entityType);

        if (image == null)
        {
            return NotFound("Image not found for the specified entity and type.");
        }

        // Delete the file from the server
        string filePath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", image.ImageUrl.Replace("/", "\\"));
        if (System.IO.File.Exists(filePath))
        {
            System.IO.File.Delete(filePath);
        }

        // Remove the database record
        _context.Images.Remove(image);
        await _context.SaveChangesAsync();

        return Ok("Image deleted successfully.");
    }
}
