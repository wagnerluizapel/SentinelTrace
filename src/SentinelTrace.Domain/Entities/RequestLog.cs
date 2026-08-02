namespace SentinelTrace.Domain.Entities;

public class RequestLog
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public DateTime TimestampUtc { get; set; } = DateTime.UtcNow;

    public string ServiceName { get; set; } = default!;
    public string Endpoint { get; set; } = default!;
    public string Method { get; set; } = default!;
    public int StatusCode { get; set; }
    public long DurationMs { get; set; }

    public string? CorrelationId { get; set; }
    public string? ClientIp { get; set; }
}
