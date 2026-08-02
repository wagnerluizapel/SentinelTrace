namespace SentinelTrace.Domain.Entities;

public class MetricsLog
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public DateTime TimestampUtc { get; set; }

    public string Service { get; set; } = default!;

    public double CpuUsage { get; set; }          // em %
    public double MemoryUsageMb { get; set; }     // em MB
    public double LatencyMs { get; set; }         // em ms
    public double Throughput { get; set; }        // req/s
}
