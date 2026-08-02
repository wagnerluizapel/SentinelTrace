using MediatR;
using SentinelTrace.Application.Logs.DTOs;

namespace SentinelTrace.Application.Logs.Commands;

public record IngestMetricsLogCommand(LogMetricsDto Dto) : IRequest<Guid>;
