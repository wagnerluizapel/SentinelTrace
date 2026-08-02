using Microsoft.AspNetCore.Routing;
using Microsoft.EntityFrameworkCore;
using SentinelTrace.Infrastructure.Persistence;
using System.Diagnostics;

namespace SentinelTrace.Endpoints
{
    public static class HealthEndpoints
    {
        public static void MapHealthEndpoints(this IEndpointRouteBuilder app)
        {
            app.MapGet("/api/health", async (ApplicationDbContext db) =>
            {
                var stopwatch = Stopwatch.StartNew();

                // Check database connection
                string databaseStatus;
                try
                {
                    await db.Database.ExecuteSqlRawAsync("SELECT 1");
                    databaseStatus = "Connected";
                }
                catch
                {
                    databaseStatus = "Disconnected";
                }

                stopwatch.Stop();

                return Results.Ok(new
                {
                    status = databaseStatus == "Connected" ? "OK" : "ERROR",
                    database = databaseStatus,
                    latencyMs = stopwatch.ElapsedMilliseconds,
                    timestamp = DateTime.UtcNow
                });
            })
            .WithName("HealthCheck")
            .WithTags("Health");
        }
    }
}
