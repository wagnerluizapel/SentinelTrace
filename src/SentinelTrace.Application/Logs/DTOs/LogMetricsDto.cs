namespace SentinelTrace.Application.Logs.DTOs;

public class LogMetricsDto
{
    public string Service { get; set; } = default!;
    public double CpuUsage { get; set; }
    public double MemoryUsageMb { get; set; }
    public double LatencyMs { get; set; }
    public double Throughput { get; set; }
    public DateTime Timestamp { get; set; }
}
