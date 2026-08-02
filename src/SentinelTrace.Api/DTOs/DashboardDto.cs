namespace SentinelTrace.Api.DTOs;

public class DashboardDto
{
    public int TotalLogs { get; set; }
    public int TotalErrors { get; set; }
    public int Metrics { get; set; }
    public string SystemStatus { get; set; } = "OK";
}
