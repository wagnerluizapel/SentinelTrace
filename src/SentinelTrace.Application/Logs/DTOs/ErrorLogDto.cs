namespace SentinelTrace.Application.Logs.DTOs;

public class ErrorLogDto
{
    public string Service { get; set; } = default!;
    public DateTime TimestampUtc { get; set; }
    public string Message { get; set; } = default!;
    public string StackTrace { get; set; } = default!;
}
