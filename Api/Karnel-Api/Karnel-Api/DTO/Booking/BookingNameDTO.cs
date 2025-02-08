using Microsoft.Build.Framework;

namespace Karnel_Api.DTO.Booking;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
public class BookingNameDTO
{
  [Required]
    public string FullName {get;set;}
    [Required]
    [EmailAddress]
    public string Email {get;set;}
    [Required]
    public string Phone {get;set;}
    [Required]
    public string SpecialRequirements { get; set; }
    public int CardIdentification {get;set;}
}