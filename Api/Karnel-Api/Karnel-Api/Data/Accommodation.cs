using System.ComponentModel.DataAnnotations;

namespace Karnel_Api.Data;

public class Accommodation
{
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Address { get; set; }
        public int Star { get; set; }
}