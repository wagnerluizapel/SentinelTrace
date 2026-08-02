using SentinelTrace.Api.DTOs;

namespace SentinelTrace.Api.Services;

public class DashboardService
{
    public DashboardDto GetDashboardData()
    {
        // Aqui futuramente você vai integrar com o banco
        return new DashboardDto
        {
            TotalLogs = 1280,
            TotalErrors = 32,
            Metrics = 15,
            SystemStatus = "OK"
        };
    }
}
