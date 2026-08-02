using Microsoft.EntityFrameworkCore;
using SentinelTrace.Domain.Entities;

namespace SentinelTrace.Application.Common.Interfaces;

public interface IApplicationDbContext
{
    DbSet<RequestLog> RequestLogs { get; }
    DbSet<EventLog> EventLogs { get; }

    DbSet<ErrorLog> ErrorLogs { get; }

    DbSet<MetricsLog> MetricsLogs { get; }


    Task<int> SaveChangesAsync(CancellationToken cancellationToken);
}
