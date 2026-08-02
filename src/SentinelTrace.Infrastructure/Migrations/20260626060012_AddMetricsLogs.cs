using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SentinelTrace.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddMetricsLogs : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "MetricsLogs",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    TimestampUtc = table.Column<DateTime>(type: "TEXT", nullable: false),
                    Service = table.Column<string>(type: "TEXT", nullable: false),
                    CpuUsage = table.Column<double>(type: "REAL", nullable: false),
                    MemoryUsageMb = table.Column<double>(type: "REAL", nullable: false),
                    LatencyMs = table.Column<double>(type: "REAL", nullable: false),
                    Throughput = table.Column<double>(type: "REAL", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MetricsLogs", x => x.Id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "MetricsLogs");
        }
    }
}
