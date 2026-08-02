using MediatR;
using Microsoft.EntityFrameworkCore;
using SentinelTrace.Application.Common.Interfaces;
using SentinelTrace.Application.Logs.Commands;
using SentinelTrace.Application.Logs.DTOs;

namespace SentinelTrace.Endpoints;

public static class ErrorLogEndpoints
{
    public static void MapErrorLogEndpoints(this IEndpointRouteBuilder app)
    {
        app.MapPost("/ingest/errors", async (ErrorLogDto dto, IMediator mediator) =>
        {
            var id = await mediator.Send(new IngestErrorLogCommand(dto));
            return Results.Ok(new { id });
        });

        app.MapGet("/api/errors", async (IApplicationDbContext db) =>
        {
            var errors = await db.ErrorLogs
                .OrderByDescending(e => e.TimestampUtc)
                .ToListAsync();

            return Results.Ok(errors);
        });
    }
}
