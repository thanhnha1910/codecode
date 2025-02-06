using Microsoft.Build.Framework;

namespace Karnel_Api.DTO;

public class ChangePassWord
{
    [Required]
    public string CurrentPassWord { get; set; }
    [Required]
    public string NewPassWord { get; set; }
    [Required]
    public string ConfirmPassWord { get; set; }
}