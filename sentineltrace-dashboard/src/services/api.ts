export async function fetchDashboardData() {
  const response = await fetch("http://localhost:5206/api/dashboard");
  if (!response.ok) {
    throw new Error("Failed to fetch dashboard data");
  }
  return response.json();
}

export async function fetchLogs() {
  const response = await fetch("http://localhost:5206/api/logs");
  if (!response.ok) {
    throw new Error("Failed to fetch logs");
  }
  return response.json();
}

export async function fetchEvents() {
  const response = await fetch("http://localhost:5206/api/events");
  if (!response.ok) {
    throw new Error("Failed to fetch events");
  }
  return response.json();
}

export async function fetchMetrics() {
  const response = await fetch("http://localhost:5206/api/metrics");
  if (!response.ok) {
    throw new Error("Failed to fetch metrics");
  }
  return response.json();
}

export async function fetchErrors() {
  const response = await fetch("http://localhost:5206/api/errors");
  if (!response.ok) {
    throw new Error("Failed to fetch errors");
  }
  return response.json();
}

export async function fetchDashboardTotals() {
  const [requests, events, metrics, errors] = await Promise.all([
    fetch("http://localhost:5206/api/logs").then(r => r.json()),
    fetch("http://localhost:5206/api/events").then(r => r.json()),
    fetch("http://localhost:5206/api/metrics").then(r => r.json()),
    fetch("http://localhost:5206/api/errors").then(r => r.json())
  ]);

  return {
    requests: requests.length,
    events: events.length,
    metrics: metrics.length,
    errors: errors.length,
    latest: [...requests, ...events, ...metrics, ...errors]
      .sort((a, b) => new Date(b.timestampUtc).getTime() - new Date(a.timestampUtc).getTime())
      .slice(0, 10)
  };
}

