namespace SentinelTrace.Application.Logs.DTOs;
public class LogIngestDto
{
    public string? ServiceName { get; set; }
    public string? Endpoint { get; set; }
    public string? Method { get; set; }
    public int StatusCode { get; set; }
    public int DurationMs { get; set; }
    public string? CorrelationId { get; set; }
    public string? ClientIp { get; set; }
    public DateTime TimestampUtc { get; set; } = DateTime.UtcNow;
}

