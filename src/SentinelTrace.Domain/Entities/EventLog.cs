namespace SentinelTrace.Domain.Entities;

public class EventLog
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public DateTime TimestampUtc { get; set; }

    public string Service { get; set; } = default!;
    public string Level { get; set; } = default!;
    public string Message { get; set; } = default!;
}
