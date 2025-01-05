using Microsoft.EntityFrameworkCore;

namespace Karnel_Api.Data;

public class DatabaseContext:DbContext
{
    public DatabaseContext(DbContextOptions<DatabaseContext> options)
        : base(options)
    {
    }

    public DbSet<City> Cities { get; set; }
    public DbSet<Hotel> Hotels { get; set; }
    public DbSet<Restaurant> Restaurants { get; set; }
    public DbSet<Attraction> Attractions { get; set; }
    public DbSet<Transportation> Transportations { get; set; }
    public DbSet<User> Users { get; set; }
    public DbSet<Tour> Tours { get; set; }
    public DbSet<Booking> Bookings { get; set; }
    public DbSet<Review> Reviews { get; set; }
    public DbSet<Payment> Payments { get; set; }
    public DbSet<Image> Images { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        // Tour - City relationship
        modelBuilder.Entity<Tour>()
            .HasOne(t => t.City)
            .WithMany(c => c.Tours)
            .HasForeignKey(t => t.CityID)
            .OnDelete(DeleteBehavior.Restrict);

        // Hotel - City relationship
        modelBuilder.Entity<Hotel>()
            .HasOne(h => h.City)
            .WithMany(c => c.Hotels)
            .HasForeignKey(h => h.CityID)
            .OnDelete(DeleteBehavior.Restrict);

        // Restaurant - City relationship
        modelBuilder.Entity<Restaurant>()
            .HasOne(r => r.City)
            .WithMany(c => c.Restaurants)
            .HasForeignKey(r => r.CityID)
            .OnDelete(DeleteBehavior.Restrict);

        // Attraction - City relationship
        modelBuilder.Entity<Attraction>()
            .HasOne(a => a.City)
            .WithMany(c => c.Attractions)
            .HasForeignKey(a => a.CityID)
            .OnDelete(DeleteBehavior.Restrict);

        // TourAttraction (Many-to-Many relationship)
        modelBuilder.Entity<TourAttraction>()
            .HasKey(ta => new { ta.TourID, ta.AttractionID });

        modelBuilder.Entity<TourAttraction>()
            .HasOne(ta => ta.Tour)
            .WithMany(t => t.TourAttractions)
            .HasForeignKey(ta => ta.TourID);

        modelBuilder.Entity<TourAttraction>()
            .HasOne(ta => ta.Attraction)
            .WithMany(a => a.TourAttractions)
            .HasForeignKey(ta => ta.AttractionID);

        // TourRestaurant (Many-to-Many relationship)
        modelBuilder.Entity<TourRestaurant>()
            .HasKey(tr => new { tr.TourID, tr.RestaurantID });

        modelBuilder.Entity<TourRestaurant>()
            .HasOne(tr => tr.Tour)
            .WithMany(t => t.TourRestaurants)
            .HasForeignKey(tr => tr.TourID);

        modelBuilder.Entity<TourRestaurant>()
            .HasOne(tr => tr.Restaurant)
            .WithMany(r => r.TourRestaurants)
            .HasForeignKey(tr => tr.RestaurantID);

        // User - Booking relationship
        modelBuilder.Entity<Booking>()
            .HasOne(b => b.User)
            .WithMany(u => u.Bookings)
            .HasForeignKey(b => b.UserID)
            .OnDelete(DeleteBehavior.Restrict);

        // Tour - Booking relationship
        modelBuilder.Entity<Booking>()
            .HasOne(b => b.Tour)
            .WithMany(t => t.Bookings)
            .HasForeignKey(b => b.TourID)
            .OnDelete(DeleteBehavior.Restrict);

        // Review relationships
        modelBuilder.Entity<Review>()
            .HasOne(r => r.User)
            .WithMany(u => u.Reviews)
            .HasForeignKey(r => r.UserID)
            .OnDelete(DeleteBehavior.Restrict);

        modelBuilder.Entity<Review>()
            .HasOne(r => r.Tour)
            .WithMany(t => t.Reviews)
            .HasForeignKey(r => r.TourID)
            .OnDelete(DeleteBehavior.Restrict);

        // Payment relationships
        modelBuilder.Entity<Payment>()
            .HasOne(p => p.User)
            .WithMany(u => u.Payments)
            .HasForeignKey(p => p.UserId)
            .OnDelete(DeleteBehavior.Restrict);

        modelBuilder.Entity<Payment>()
            .HasOne(p => p.Booking)
            .WithMany(b => b.Payments)
            .HasForeignKey(p => p.BookingID)
            .OnDelete(DeleteBehavior.Restrict);

        // Image relationships (polymorphic entity)
        modelBuilder.Entity<Image>()
            .HasIndex(i => new { i.EntityID, i.EntityType });
    }
}