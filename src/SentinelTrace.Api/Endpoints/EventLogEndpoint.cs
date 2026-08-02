using MediatR;
using Microsoft.EntityFrameworkCore;
using SentinelTrace.Application.Common.Interfaces;
using SentinelTrace.Application.Logs.Commands;
using SentinelTrace.Application.Logs.DTOs;

namespace SentinelTrace.Endpoints;

public static class EventLogEndpoints
{
    public static void MapEventLogEndpoints(this IEndpointRouteBuilder app)
    {
        // POST: ingest event log
        app.MapPost("/ingest/event", async (LogEventDto dto, IMediator mediator) =>
        {
            var id = await mediator.Send(new IngestEventLogCommand(dto));
            return Results.Ok(new { id });
        });

        // GET: list event logs
        app.MapGet("/api/events", async (IApplicationDbContext db) =>
        {
            var events = await db.EventLogs
                .OrderByDescending(e => e.TimestampUtc)
                .ToListAsync();

            return Results.Ok(events);
        });
    }
}
