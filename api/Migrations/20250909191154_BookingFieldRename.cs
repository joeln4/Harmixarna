using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class BookingFieldRename : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "StartUtc",
                table: "Bookings",
                newName: "StartTime");

            migrationBuilder.RenameColumn(
                name: "EndUtc",
                table: "Bookings",
                newName: "EndTime");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "StartTime",
                table: "Bookings",
                newName: "StartUtc");

            migrationBuilder.RenameColumn(
                name: "EndTime",
                table: "Bookings",
                newName: "EndUtc");
        }
    }
}
