using Microsoft.AspNetCore.Mvc;
using SentinelTrace.Api.Services;

namespace SentinelTrace.Api.Extensions;

public static class DashboardEndpoints
{
    public static void MapDashboardEndpoints(this IEndpointRouteBuilder routes)
    {
        routes.MapGet("/api/dashboard", ([FromServices] DashboardService service) =>
        {
            var data = service.GetDashboardData();
            return Results.Ok(data);
        })
        .WithTags("Dashboard")
        .WithSummary("Returns dashboard summary data");
    }
}
