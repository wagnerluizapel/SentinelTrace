using MediatR;
using SentinelTrace.Application.Common.Interfaces;
using SentinelTrace.Application.Logs.DTOs;
using SentinelTrace.Domain.Entities;

namespace SentinelTrace.Application.Logs.Commands;

public class IngestErrorLogHandler : IRequestHandler<IngestErrorLogCommand, Guid>
{
    private readonly IApplicationDbContext _db;

    public IngestErrorLogHandler(IApplicationDbContext db)
    {
        _db = db;
    }

    public async Task<Guid> Handle(IngestErrorLogCommand request, CancellationToken cancellationToken)
    {
        var entity = new ErrorLog
        {
            Id = Guid.NewGuid(),
            Service = request.Dto.Service,
            TimestampUtc = request.Dto.TimestampUtc,
            Message = request.Dto.Message,
            StackTrace = request.Dto.StackTrace,
            Level = "Error"
        };

        _db.ErrorLogs.Add(entity);
        await _db.SaveChangesAsync(cancellationToken);

        return entity.Id;
    }
}
