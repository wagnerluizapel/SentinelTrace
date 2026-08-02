using MediatR;
using Microsoft.Extensions.Logging;
using SentinelTrace.Domain.Entities;
using SentinelTrace.Application.Common.Interfaces;
using SentinelTrace.Application.Logs.DTOs;

namespace SentinelTrace.Application.Logs.Commands;

public class IngestLogHandler : IRequestHandler<IngestLogCommand, Guid>
{
    private readonly IApplicationDbContext _db;
    private readonly ILogger<IngestLogHandler> _logger;

    public IngestLogHandler(IApplicationDbContext db, ILogger<IngestLogHandler> logger)
    {
        _db = db;
        _logger = logger;
    }

    public async Task<Guid> Handle(IngestLogCommand request, CancellationToken cancellationToken)
    {
        var dto = request.Dto;

        var entity = new RequestLog
        {
            ServiceName = dto.ServiceName ?? "unknown",
            Endpoint = dto.Endpoint ?? "unknown",
            Method = dto.Method ?? "unknown",
            StatusCode = dto.StatusCode,
            DurationMs = dto.DurationMs,
            CorrelationId = dto.CorrelationId ?? Guid.NewGuid().ToString(),
            ClientIp = dto.ClientIp ?? "0.0.0.0",
            TimestampUtc = dto.TimestampUtc
        };


        _db.RequestLogs.Add(entity);
        await _db.SaveChangesAsync(cancellationToken);

        _logger.LogInformation(
            "Log ingested: {Service} {Method} {Endpoint} {Status} in {Duration}ms",
            entity.ServiceName, entity.Method, entity.Endpoint, entity.StatusCode, entity.DurationMs
        );

        return entity.Id;
    }
}
