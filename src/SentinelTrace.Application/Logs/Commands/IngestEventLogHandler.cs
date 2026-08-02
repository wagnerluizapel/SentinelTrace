using MediatR;
using SentinelTrace.Application.Common.Interfaces;
using SentinelTrace.Domain.Entities;

namespace SentinelTrace.Application.Logs.Commands;

public class IngestEventLogHandler : IRequestHandler<IngestEventLogCommand, Guid>
{
    private readonly IApplicationDbContext _db;

    public IngestEventLogHandler(IApplicationDbContext db)
    {
        _db = db;
    }

    public async Task<Guid> Handle(IngestEventLogCommand request, CancellationToken cancellationToken)
    {
        var dto = request.Dto;

        var entity = new EventLog
        {
            Service = dto.Service,
            Level = dto.Level,
            Message = dto.Message,
            TimestampUtc = dto.Timestamp.ToUniversalTime()
        };

        _db.EventLogs.Add(entity);
        await _db.SaveChangesAsync(cancellationToken);

        return entity.Id;
    }
}
