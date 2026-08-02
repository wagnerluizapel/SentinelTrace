namespace SentinelTrace.Application.Logs.Commands;

public record LogEventDto(
    string Service,
    string Level,
    string Message,
    DateTime Timestamp
);
