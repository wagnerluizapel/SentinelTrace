using Microsoft.EntityFrameworkCore;
using SentinelTrace.Application.Common.Interfaces;
using SentinelTrace.Domain.Entities;

namespace SentinelTrace.Infrastructure.Persistence;

public class ApplicationDbContext : DbContext, IApplicationDbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }

    public DbSet<RequestLog> RequestLogs => Set<RequestLog>();
    public DbSet<EventLog> EventLogs => Set<EventLog>();

    public DbSet<ErrorLog> ErrorLogs => Set<ErrorLog>();

    public DbSet<MetricsLog> MetricsLogs => Set<MetricsLog>();



}
