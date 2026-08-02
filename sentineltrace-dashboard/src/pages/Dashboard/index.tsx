import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
} from "recharts";

import LogsByServiceChart from "../../components/charts/LogsByServiceChart";
import MetricsChart from "../../components/charts/MetricsChart";

import { fetchLogs, fetchErrors, fetchMetrics } from "../../services/api";
import "./dashboard.css";

export default function DashboardPage() {
  // --- STATES ---
  const [logs, setLogs] = useState<any[]>([]);
  const [logsPerDay, setLogsPerDay] = useState<any[]>([]);
  const [errorsByService, setErrorsByService] = useState<any[]>([]);
  const [metrics, setMetrics] = useState<any[]>([]);
  const [systemStatus, setSystemStatus] = useState("Loading...");
  const [latency, setLatency] = useState<number | null>(null);
  const [dbStatus, setDbStatus] = useState("Unknown");

  // --- LOGS ---
  useEffect(() => {
    fetchLogs().then((data) => {
      console.log("LOGS RECEIVED:", data);
      setLogs(data);
    });
  }, []);

  // --- METRICS ---
  useEffect(() => {
    fetchMetrics().then((data) => {
      console.log("METRICS RECEIVED:", data);
      setMetrics(data);
    });
  }, []);

  // --- LOGS PER DAY (real data) ---
  useEffect(() => {
    if (logs.length === 0) return;

    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const grouped: Record<string, number> = {
      Sun: 0,
      Mon: 0,
      Tue: 0,
      Wed: 0,
      Thu: 0,
      Fri: 0,
      Sat: 0,
    };

    logs.forEach((log) => {
      const date = new Date(log.timestampUtc);
      const dayName = days[date.getDay()];
      grouped[dayName] += 1;
    });

    const formatted = days.map((day) => ({
      day,
      logs: grouped[day],
    }));

    setLogsPerDay(formatted);
  }, [logs]);

  // --- ERRORS BY SERVICE ---
  useEffect(() => {
    fetchErrors().then((errors) => {
      const grouped: Record<string, number> = {};

      errors.forEach((err: any) => {
        const service = err.service || "Unknown";
        grouped[service] = (grouped[service] || 0) + 1;
      });

      const formatted = Object.entries(grouped).map(([service, count]) => ({
        service,
        count,
      }));

      setErrorsByService(formatted);
    });
  }, []);

  // --- SYSTEM STATUS (health check) ---
  useEffect(() => {
    fetch("http://localhost:5206/api/health")
      .then((res) => res.json())
      .then((data) => {
        setSystemStatus(data.status);
        setLatency(data.latencyMs);
        setDbStatus(data.database);
      })
      .catch(() => {
        setSystemStatus("Offline");
        setLatency(null);
        setDbStatus("Disconnected");
      });
  }, []);

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Dashboard</h1>

      {/* --- CARDS --- */}
      <div className="cards-grid">
        <div className="card">
          <h2>Total Logs</h2>
          <p>{logs.length}</p>
        </div>

        <div className="card">
          <h2>Total Errors</h2>
          <p>{errorsByService.reduce((acc, s) => acc + s.count, 0)}</p>
        </div>

        <div className="card">
          <h2>Metrics</h2>
          <p>{metrics.length}</p>
        </div>

        <div
          className="card"
          style={{
            backgroundColor:
              systemStatus === "OK" ? "#d4f7d4" : "#f7d4d4", // light green / light red
          }}
        >
          <h2>System Status</h2>
          <p>Status: {systemStatus}</p>
          <p>Database: {dbStatus}</p>
          <p>Latency: {latency !== null ? `${latency} ms` : "N/A"}</p>
        </div>
      </div>

      {/* --- LOGS PER DAY --- */}
      <h2 className="chart-title">Logs Per Day</h2>
      <div className="chart-box">
        <LineChart width={600} height={300} data={logsPerDay}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="logs" stroke="#007bff" strokeWidth={3} />
        </LineChart>
      </div>

      {/* --- ERRORS BY SERVICE --- */}
      <h2 className="chart-title">Errors by Service</h2>
      <div className="chart-box">
        <BarChart width={600} height={300} data={errorsByService}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="service" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" fill="#ff4444" />
        </BarChart>
      </div>

      {/* --- LOGS BY SERVICE --- */}
      <h2 className="chart-title">Logs by Service</h2>
      <div className="chart-box">
        <LogsByServiceChart logs={logs} />
      </div>

      {/* --- SYSTEM METRICS --- */}
      <h2 className="chart-title">System Metrics</h2>
      <div className="chart-box">
        <MetricsChart metrics={metrics} />
      </div>
    </div>
  );
}
