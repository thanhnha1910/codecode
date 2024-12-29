using Karnel_Api.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Karnel_Api.Service;

public class LoginService:Controller
{
    private readonly DatabaseContext _context;

    public LoginService(DatabaseContext context)
    {
        _context = context;
    }

  
}