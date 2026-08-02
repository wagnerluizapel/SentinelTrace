using MediatR;
using SentinelTrace.Application.Common.Interfaces;
using SentinelTrace.Domain.Entities;

namespace SentinelTrace.Application.Logs.Commands;

public class IngestMetricsLogHandler : IRequestHandler<IngestMetricsLogCommand, Guid>
{
    private readonly IApplicationDbContext _context;

    public IngestMetricsLogHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Guid> Handle(IngestMetricsLogCommand request, CancellationToken cancellationToken)
    {
        var dto = request.Dto;

        var log = new MetricsLog
        {
            TimestampUtc = dto.Timestamp.ToUniversalTime(),
            Service = dto.Service,
            CpuUsage = dto.CpuUsage,
            MemoryUsageMb = dto.MemoryUsageMb,
            LatencyMs = dto.LatencyMs,
            Throughput = dto.Throughput
        };

        _context.MetricsLogs.Add(log);
        await _context.SaveChangesAsync(cancellationToken);

        return log.Id;
    }
}
