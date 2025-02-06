﻿// <auto-generated />
using System;
using Karnel_Api.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace Karnel_Api.Migrations
{
    [DbContext(typeof(DatabaseContext))]
    [Migration("20250204150823_InitialCreate")]
    partial class InitialCreate
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.8")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("Karnel_Api.Data.Attraction", b =>
                {
                    b.Property<int>("AttractionID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("AttractionID"));

                    b.Property<string>("AttractionName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("CityID")
                        .HasColumnType("int");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("AttractionID");

                    b.HasIndex("CityID");

                    b.ToTable("Attractions");
                });

            modelBuilder.Entity("Karnel_Api.Data.Booking", b =>
                {
                    b.Property<int>("BookingID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("BookingID"));

                    b.Property<int>("AdultQuantity")
                        .HasColumnType("int");

                    b.Property<decimal>("AdultUnitPrice")
                        .HasColumnType("decimal(18,2)");

                    b.Property<DateTime>("BookingDate")
                        .HasColumnType("datetime2");

                    b.Property<int>("ChildQuantity")
                        .HasColumnType("int");

                    b.Property<decimal>("ChildUnitPrice")
                        .HasColumnType("decimal(18,2)");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("FullName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("InfantQuantity")
                        .HasColumnType("int");

                    b.Property<decimal>("InfantUnitPrice")
                        .HasColumnType("decimal(18,2)");

                    b.Property<string>("PayPalOrderID")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PaymentStatus")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Phone")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("Quantity")
                        .HasColumnType("int");

                    b.Property<string>("SpecialRequirements")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<decimal>("TotalAmount")
                        .HasColumnType("decimal(18, 4)");

                    b.Property<int>("TotalQuantity")
                        .HasColumnType("int");

                    b.Property<int>("TourID")
                        .HasColumnType("int");

                    b.Property<decimal>("UnitPrice")
                        .HasColumnType("decimal(18, 4)");

                    b.Property<int>("UserID")
                        .HasColumnType("int");

                    b.HasKey("BookingID");

                    b.HasIndex("TourID");

                    b.HasIndex("UserID");

                    b.ToTable("Bookings");
                });

            modelBuilder.Entity("Karnel_Api.Data.City", b =>
                {
                    b.Property<int>("CityID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("CityID"));

                    b.Property<string>("CityName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("CityID");

                    b.ToTable("Cities");
                });

            modelBuilder.Entity("Karnel_Api.Data.Favorite", b =>
                {
                    b.Property<int>("LikeID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("LikeID"));

                    b.Property<DateTime>("LikeDate")
                        .HasColumnType("datetime2");

                    b.Property<int>("TourID")
                        .HasColumnType("int");

                    b.Property<int>("UserID")
                        .HasColumnType("int");

                    b.HasKey("LikeID");

                    b.HasIndex("TourID");

                    b.HasIndex("UserID");

                    b.ToTable("Favorites");
                });

            modelBuilder.Entity("Karnel_Api.Data.Hotel", b =>
                {
                    b.Property<int>("HotelID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("HotelID"));

                    b.Property<string>("Address")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("CityID")
                        .HasColumnType("int");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("HotelName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<decimal>("Rating")
                        .HasColumnType("decimal(3, 2)");

                    b.HasKey("HotelID");

                    b.HasIndex("CityID");

                    b.ToTable("Hotels");
                });

            modelBuilder.Entity("Karnel_Api.Data.Image", b =>
                {
                    b.Property<int>("ImageID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("ImageID"));

                    b.Property<string>("AltText")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("EntityID")
                        .HasColumnType("int");

                    b.Property<string>("EntityType")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("ImageUrl")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("UploadDate")
                        .HasColumnType("datetime2");

                    b.HasKey("ImageID");

                    b.HasIndex("EntityID", "EntityType");

                    b.ToTable("Images");
                });

            modelBuilder.Entity("Karnel_Api.Data.Payment", b =>
                {
                    b.Property<int>("PaymentID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("PaymentID"));

                    b.Property<decimal>("Amount")
                        .HasColumnType("decimal(18,2)");

                    b.Property<int>("BookingID")
                        .HasColumnType("int");

                    b.Property<string>("PayPalOrderID")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("PaymentDate")
                        .HasColumnType("datetime2");

                    b.Property<string>("PaymentMethod")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.Property<bool>("PaymentStatus")
                        .HasColumnType("bit");

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.HasKey("PaymentID");

                    b.HasIndex("BookingID");

                    b.HasIndex("UserId");

                    b.ToTable("Payments");
                });

            modelBuilder.Entity("Karnel_Api.Data.Restaurant", b =>
                {
                    b.Property<int>("RestaurantID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("RestaurantID"));

                    b.Property<int?>("CityID")
                        .HasColumnType("int");

                    b.Property<string>("Cuisine")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("RestaurantName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("RestaurantID");

                    b.HasIndex("CityID");

                    b.ToTable("Restaurants");
                });

            modelBuilder.Entity("Karnel_Api.Data.Review", b =>
                {
                    b.Property<int>("ReviewID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("ReviewID"));

                    b.Property<string>("Feedback")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<decimal>("Rating")
                        .HasColumnType("decimal(18, 2)");

                    b.Property<DateTime>("ReviewDate")
                        .HasColumnType("datetime2");

                    b.Property<int>("TourID")
                        .HasColumnType("int");

                    b.Property<int>("UserID")
                        .HasColumnType("int");

                    b.HasKey("ReviewID");

                    b.HasIndex("TourID");

                    b.HasIndex("UserID");

                    b.ToTable("Reviews");
                });

            modelBuilder.Entity("Karnel_Api.Data.Tour", b =>
                {
                    b.Property<int>("TourID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("TourID"));

                    b.Property<int>("AvailableSlots")
                        .HasColumnType("int");

                    b.Property<int?>("CityID")
                        .HasColumnType("int");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Detail")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("EndDate")
                        .HasColumnType("datetime2");

                    b.Property<int?>("HotelID")
                        .HasColumnType("int");

                    b.Property<decimal>("Price")
                        .HasColumnType("decimal(18,2)");

                    b.Property<DateTime>("StartDate")
                        .HasColumnType("datetime2");

                    b.Property<string>("TourName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("TransportID")
                        .HasColumnType("int");

                    b.Property<int>("TransportationTransportID")
                        .HasColumnType("int");

                    b.HasKey("TourID");

                    b.HasIndex("CityID");

                    b.HasIndex("HotelID");

                    b.HasIndex("TransportationTransportID");

                    b.ToTable("Tours");
                });

            modelBuilder.Entity("Karnel_Api.Data.TourAttraction", b =>
                {
                    b.Property<int>("TourID")
                        .HasColumnType("int");

                    b.Property<int>("AttractionID")
                        .HasColumnType("int");

                    b.HasKey("TourID", "AttractionID");

                    b.HasIndex("AttractionID");

                    b.ToTable("TourAttraction");
                });

            modelBuilder.Entity("Karnel_Api.Data.TourRestaurant", b =>
                {
                    b.Property<int>("TourID")
                        .HasColumnType("int");

                    b.Property<int>("RestaurantID")
                        .HasColumnType("int");

                    b.HasKey("TourID", "RestaurantID");

                    b.HasIndex("RestaurantID");

                    b.ToTable("TourRestaurant");
                });

            modelBuilder.Entity("Karnel_Api.Data.Transportation", b =>
                {
                    b.Property<int>("TransportID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("TransportID"));

                    b.Property<int?>("CityID")
                        .HasColumnType("int");

                    b.Property<TimeSpan>("Duration")
                        .HasColumnType("time");

                    b.Property<decimal>("Price")
                        .HasColumnType("decimal(18, 2)");

                    b.Property<string>("TransportType")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("TransportID");

                    b.HasIndex("CityID");

                    b.ToTable("Transportations");
                });

            modelBuilder.Entity("Karnel_Api.Data.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Avatar")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("datetime2");

                    b.Property<DateTime>("DateOfBirth")
                        .HasColumnType("datetime2");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("EmailVerificationToken")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime?>("EmailVerificationTokenExpires")
                        .HasColumnType("datetime2");

                    b.Property<bool>("Gender")
                        .HasColumnType("bit");

                    b.Property<bool>("IsEmailConfirmed")
                        .HasColumnType("bit");

                    b.Property<DateTime?>("LockoutEnd")
                        .HasColumnType("datetime2");

                    b.Property<int>("LoginAttempts")
                        .HasColumnType("int");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ResetPasswordToken")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime?>("ResetPasswordTokenExpires")
                        .HasColumnType("datetime2");

                    b.Property<string>("Role")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("Status")
                        .HasColumnType("bit");

                    b.HasKey("Id");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("Karnel_Api.Data.Attraction", b =>
                {
                    b.HasOne("Karnel_Api.Data.City", "City")
                        .WithMany("Attractions")
                        .HasForeignKey("CityID")
                        .OnDelete(DeleteBehavior.Restrict);

                    b.Navigation("City");
                });

            modelBuilder.Entity("Karnel_Api.Data.Booking", b =>
                {
                    b.HasOne("Karnel_Api.Data.Tour", "Tour")
                        .WithMany("Bookings")
                        .HasForeignKey("TourID")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.HasOne("Karnel_Api.Data.User", "User")
                        .WithMany("Bookings")
                        .HasForeignKey("UserID")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.Navigation("Tour");

                    b.Navigation("User");
                });

            modelBuilder.Entity("Karnel_Api.Data.Favorite", b =>
                {
                    b.HasOne("Karnel_Api.Data.Tour", "Tour")
                        .WithMany()
                        .HasForeignKey("TourID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Karnel_Api.Data.User", "User")
                        .WithMany("Favorites")
                        .HasForeignKey("UserID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Tour");

                    b.Navigation("User");
                });

            modelBuilder.Entity("Karnel_Api.Data.Hotel", b =>
                {
                    b.HasOne("Karnel_Api.Data.City", "City")
                        .WithMany("Hotels")
                        .HasForeignKey("CityID")
                        .OnDelete(DeleteBehavior.Restrict);

                    b.Navigation("City");
                });

            modelBuilder.Entity("Karnel_Api.Data.Payment", b =>
                {
                    b.HasOne("Karnel_Api.Data.Booking", "Booking")
                        .WithMany("Payments")
                        .HasForeignKey("BookingID")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.HasOne("Karnel_Api.Data.User", "User")
                        .WithMany("Payments")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.Navigation("Booking");

                    b.Navigation("User");
                });

            modelBuilder.Entity("Karnel_Api.Data.Restaurant", b =>
                {
                    b.HasOne("Karnel_Api.Data.City", "City")
                        .WithMany("Restaurants")
                        .HasForeignKey("CityID")
                        .OnDelete(DeleteBehavior.Restrict);

                    b.Navigation("City");
                });

            modelBuilder.Entity("Karnel_Api.Data.Review", b =>
                {
                    b.HasOne("Karnel_Api.Data.Tour", "Tour")
                        .WithMany("Reviews")
                        .HasForeignKey("TourID")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.HasOne("Karnel_Api.Data.User", "User")
                        .WithMany("Reviews")
                        .HasForeignKey("UserID")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.Navigation("Tour");

                    b.Navigation("User");
                });

            modelBuilder.Entity("Karnel_Api.Data.Tour", b =>
                {
                    b.HasOne("Karnel_Api.Data.City", "City")
                        .WithMany("Tours")
                        .HasForeignKey("CityID")
                        .OnDelete(DeleteBehavior.Restrict);

                    b.HasOne("Karnel_Api.Data.Hotel", "Hotel")
                        .WithMany()
                        .HasForeignKey("HotelID");

                    b.HasOne("Karnel_Api.Data.Transportation", "Transportation")
                        .WithMany()
                        .HasForeignKey("TransportationTransportID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("City");

                    b.Navigation("Hotel");

                    b.Navigation("Transportation");
                });

            modelBuilder.Entity("Karnel_Api.Data.TourAttraction", b =>
                {
                    b.HasOne("Karnel_Api.Data.Attraction", "Attraction")
                        .WithMany("TourAttractions")
                        .HasForeignKey("AttractionID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Karnel_Api.Data.Tour", "Tour")
                        .WithMany("TourAttractions")
                        .HasForeignKey("TourID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Attraction");

                    b.Navigation("Tour");
                });

            modelBuilder.Entity("Karnel_Api.Data.TourRestaurant", b =>
                {
                    b.HasOne("Karnel_Api.Data.Restaurant", "Restaurant")
                        .WithMany("TourRestaurants")
                        .HasForeignKey("RestaurantID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Karnel_Api.Data.Tour", "Tour")
                        .WithMany("TourRestaurants")
                        .HasForeignKey("TourID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Restaurant");

                    b.Navigation("Tour");
                });

            modelBuilder.Entity("Karnel_Api.Data.Transportation", b =>
                {
                    b.HasOne("Karnel_Api.Data.City", "City")
                        .WithMany("Transportations")
                        .HasForeignKey("CityID");

                    b.Navigation("City");
                });

            modelBuilder.Entity("Karnel_Api.Data.Attraction", b =>
                {
                    b.Navigation("TourAttractions");
                });

            modelBuilder.Entity("Karnel_Api.Data.Booking", b =>
                {
                    b.Navigation("Payments");
                });

            modelBuilder.Entity("Karnel_Api.Data.City", b =>
                {
                    b.Navigation("Attractions");

                    b.Navigation("Hotels");

                    b.Navigation("Restaurants");

                    b.Navigation("Tours");

                    b.Navigation("Transportations");
                });

            modelBuilder.Entity("Karnel_Api.Data.Restaurant", b =>
                {
                    b.Navigation("TourRestaurants");
                });

            modelBuilder.Entity("Karnel_Api.Data.Tour", b =>
                {
                    b.Navigation("Bookings");

                    b.Navigation("Reviews");

                    b.Navigation("TourAttractions");

                    b.Navigation("TourRestaurants");
                });

            modelBuilder.Entity("Karnel_Api.Data.User", b =>
                {
                    b.Navigation("Bookings");

                    b.Navigation("Favorites");

                    b.Navigation("Payments");

                    b.Navigation("Reviews");
                });
#pragma warning restore 612, 618
        }
    }
}
