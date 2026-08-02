using MediatR;
using Microsoft.EntityFrameworkCore; // <-- IMPORTANTE
using SentinelTrace.Application.Logs.DTOs;
using SentinelTrace.Application.Logs.Commands;
using SentinelTrace.Application.Common.Interfaces;

namespace SentinelTrace.Endpoints;

public static class LogEndpoints
{
    public static void MapLogEndpoints(this IEndpointRouteBuilder app)
    {
        app.MapPost("/ingest/log", async (LogIngestDto dto, ISender sender) =>
        {
            var id = await sender.Send(new IngestLogCommand(dto));
            return Results.Ok(new { Id = id });
        });

        app.MapGet("/api/logs", async (IApplicationDbContext db) =>
        {
            var logs = await db.RequestLogs
                .OrderByDescending(l => l.TimestampUtc)
                .ToListAsync(); // <-- agora funciona

            return Results.Ok(logs);
        });
    }
}
