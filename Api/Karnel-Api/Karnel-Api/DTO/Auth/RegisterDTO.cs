    using System.ComponentModel.DataAnnotations;

    namespace Karnel_Api.DTO;

    public class RegisterDTO
    {
        [Key]
        public string Name { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string ConfirmPassword {get; set; }

        public string Role { get; set; } // User/Employee/Admin
       
    }