using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Karnel_Api.Migrations
{
    /// <inheritdoc />
    public partial class _2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Tours_Transportations_TransportationTransportID",
                table: "Tours");

            migrationBuilder.DropIndex(
                name: "IX_Tours_TransportationTransportID",
                table: "Tours");

            migrationBuilder.DropColumn(
                name: "TransportationTransportID",
                table: "Tours");

            migrationBuilder.CreateIndex(
                name: "IX_Tours_TransportID",
                table: "Tours",
                column: "TransportID");

            migrationBuilder.AddForeignKey(
                name: "FK_Tours_Transportations_TransportID",
                table: "Tours",
                column: "TransportID",
                principalTable: "Transportations",
                principalColumn: "TransportID",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Tours_Transportations_TransportID",
                table: "Tours");

            migrationBuilder.DropIndex(
                name: "IX_Tours_TransportID",
                table: "Tours");

            migrationBuilder.AddColumn<int>(
                name: "TransportationTransportID",
                table: "Tours",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Tours_TransportationTransportID",
                table: "Tours",
                column: "TransportationTransportID");

            migrationBuilder.AddForeignKey(
                name: "FK_Tours_Transportations_TransportationTransportID",
                table: "Tours",
                column: "TransportationTransportID",
                principalTable: "Transportations",
                principalColumn: "TransportID",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
