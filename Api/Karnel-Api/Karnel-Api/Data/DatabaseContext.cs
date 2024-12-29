using Microsoft.EntityFrameworkCore;

namespace Karnel_Api.Data;

// Data/ApplicationDbContext.cs
public class DatabaseContext : DbContext
{
    public DatabaseContext(DbContextOptions<DatabaseContext> options)
        : base(options)
    {
    }

    public DbSet<Location> Locations { get; set; }
    public DbSet<Accommodation> Accommodations { get; set; }
    public DbSet<User> Users { get; set; }
    public DbSet<Tour> Tours { get; set; }
    public DbSet<Booking> Bookings { get; set; }
    public DbSet<TourPrice> TourPrices { get; set; }
    public DbSet<Review> Reviews { get; set; }
    public DbSet<TourLocation> TourLocations { get; set; }
    public DbSet<Payments> Payments { get; set; }
    public DbSet<Favorite> Favorites { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
       
        ///

        // TourLocation (Many-to-Many relationship)
        modelBuilder.Entity<TourLocation>()
            .HasKey(tl => new { tl.TourId, tl.LocationId });

        modelBuilder.Entity<TourLocation>()
            .HasOne(tl => tl.Tour)
            .WithMany(t => t.TourLocations)
            .HasForeignKey(tl => tl.TourId);

        modelBuilder.Entity<TourLocation>()
            .HasOne(tl => tl.Location)
            .WithMany(l => l.TourLocations)
            .HasForeignKey(tl => tl.LocationId);

        // User - Booking relationship
        modelBuilder.Entity<Booking>()
            .HasOne(b => b.User)
            .WithMany(u => u.Bookings)
            .HasForeignKey(b => b.UserId)
            .OnDelete(DeleteBehavior.Restrict);

        // Tour - Booking relationship
        modelBuilder.Entity<Booking>()
            .HasOne(b => b.Tour)
            .WithMany(t => t.Bookings)
            .HasForeignKey(b => b.TourId)
            .OnDelete(DeleteBehavior.Restrict);

        // Review relationships
        modelBuilder.Entity<Review>()
            .HasOne(r => r.User)
            .WithMany(u => u.Reviews)
            .HasForeignKey(r => r.UserId)
            .OnDelete(DeleteBehavior.Restrict);

        modelBuilder.Entity<Review>()
            .HasOne(r => r.Tour)
            .WithMany(t => t.Reviews)
            .HasForeignKey(r => r.TourId)
            .OnDelete(DeleteBehavior.Restrict);

        // Payment relationships
        modelBuilder.Entity<Payments>()
            .HasOne(p => p.User)
            .WithMany(u => u.Payments)
            .HasForeignKey(p => p.UserId)
            .OnDelete(DeleteBehavior.Restrict);

        modelBuilder.Entity<Payments>()
            .HasOne(p => p.Booking)
            .WithMany(b => b.Payments)
            .HasForeignKey(p => p.BookingId)
            .OnDelete(DeleteBehavior.Restrict);
            

        // Favorite relationships
        modelBuilder.Entity<Favorite>()
            .HasOne(f => f.User)
            .WithMany(u => u.Favorites)
            .HasForeignKey(f => f.UserId);

        modelBuilder.Entity<Favorite>()
            .HasOne(f => f.Tour)
            .WithMany(t => t.Favorites)
            .HasForeignKey(f => f.TourId);

    
     
    }
}