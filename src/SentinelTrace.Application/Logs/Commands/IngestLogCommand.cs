using MediatR;
using SentinelTrace.Application.Logs.DTOs;

namespace SentinelTrace.Application.Logs.Commands;

public record IngestLogCommand(LogIngestDto Dto) : IRequest<Guid>;
public record IngestEventLogCommand(LogEventDto Dto) : IRequest<Guid>;

