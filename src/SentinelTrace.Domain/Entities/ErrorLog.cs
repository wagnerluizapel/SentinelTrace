namespace SentinelTrace.Domain.Entities;

public class ErrorLog
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public DateTime TimestampUtc { get; set; }

    public string Service { get; set; } = default!;
    public string Message { get; set; } = default!;
    public string StackTrace { get; set; } = default!;
    public string Level { get; set; } = "Error";
}
