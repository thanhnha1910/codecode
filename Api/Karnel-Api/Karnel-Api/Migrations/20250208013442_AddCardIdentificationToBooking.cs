using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Karnel_Api.Migrations
{
    /// <inheritdoc />
    public partial class AddCardIdentificationToBooking : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "CardIdentification",
                table: "Bookings",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CardIdentification",
                table: "Bookings");
        }
    }
}
