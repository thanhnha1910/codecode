using Karnel_Api.Data;
using Karnel_Api.DTO.Favorite;
using Karnel_Api.DTO.UserDTO;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Karnel_Api.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class PersonalPageController : ControllerBase
    {
        private readonly DatabaseContext _context;
        public IWebHostEnvironment Environment;

        public PersonalPageController(DatabaseContext context, IWebHostEnvironment environment)
        {
            _context = context;
            Environment = environment;
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetProfile(int id)
        {
            var user = await _context.Users.Include(u => u.Favorites).FirstOrDefaultAsync(x => x.Id == id);
            if (user == null)
            {
                return NotFound();
            }

            var userdto = new UserDTO()
            {
                Id = user.Id,
                Name = user.Name,
                Email = user.Email,
                Avatar = user.Avatar,
                Gender = user.Gender,
                DateOfBirth = user.DateOfBirth,
            };
            return Ok(userdto);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateProfile(int id, [FromForm] UserDTO userDto)
        {
            try
            {
                var user = await _context.Users.FindAsync(id);
                if (user == null)
                    return NotFound("User not found");

                // Validation
                if (string.IsNullOrEmpty(userDto.Name))
                    return BadRequest(new { error = "Name is required" });

                // Update basic info
                user.Name = userDto.Name;
                user.Gender = userDto.Gender;
                user.DateOfBirth = userDto.DateOfBirth;

                // Handle avatar upload
                var avatarFile = Request.Form.Files.GetFile("avatar");
                if (avatarFile != null && avatarFile.Length > 0)
                {
                    // Validate file type
                    var allowedExtensions = new[] { ".jpg", ".jpeg", ".png", ".gif" };
                    var extension = Path.GetExtension(avatarFile.FileName).ToLowerInvariant();
                    if (!allowedExtensions.Contains(extension))
                        return BadRequest(new { error = "Invalid file type" });

                    var uploadPath = Path.Combine(Environment.WebRootPath, "uploads", "avatars");
                    Directory.CreateDirectory(uploadPath);

                    var fileName = Guid.NewGuid().ToString() + extension;
                    var filePath = Path.Combine(uploadPath, fileName);

                    using (var stream = new FileStream(filePath, FileMode.Create))
                    {
                        await avatarFile.CopyToAsync(stream);
                    }

                    // Delete old avatar
                    if (!string.IsNullOrEmpty(user.Avatar))
                    {
                        var oldPath = Path.Combine(Environment.WebRootPath, user.Avatar.TrimStart('/'));
                        if (System.IO.File.Exists(oldPath))
                            System.IO.File.Delete(oldPath);
                    }

                    user.Avatar = $"/uploads/avatars/{fileName}";
                }

                await _context.SaveChangesAsync();

                return Ok(new
                {
                    message = "Profile updated successfully",
                    user = new UserDTO
                    {
                        Id = user.Id,
                        Name = user.Name,
                        Email = user.Email,
                        Avatar = user.Avatar,
                        Gender = user.Gender,
                        DateOfBirth = user.DateOfBirth
                    }
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = "Internal server error", details = ex.Message });
            }
        }
    }
}