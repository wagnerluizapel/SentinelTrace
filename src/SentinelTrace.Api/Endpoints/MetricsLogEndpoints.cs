using MediatR;
using SentinelTrace.Application.Logs.Commands;
using Microsoft.EntityFrameworkCore;
using SentinelTrace.Application.Logs.DTOs;
using SentinelTrace.Application.Common.Interfaces;

namespace SentinelTrace.Endpoints;

public static class MetricsLogEndpoints
{
    public static void MapMetricsLogEndpoints(this IEndpointRouteBuilder app)
    {
        app.MapPost("/ingest/metrics", async (LogMetricsDto dto, IMediator mediator) =>
        {
            var id = await mediator.Send(new IngestMetricsLogCommand(dto));
            return Results.Ok(new { id });
        });

        // GET: list metrics
        app.MapGet("/api/metrics", async (IApplicationDbContext db) =>
        {
            var metrics = await db.MetricsLogs
                .OrderByDescending(m => m.TimestampUtc)
                .ToListAsync();

            return Results.Ok(metrics);
        });
    }
}
