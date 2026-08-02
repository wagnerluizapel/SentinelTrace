import { useEffect, useState } from "react";
import { fetchMetrics } from "../../services/api";
import "./metrics.css";
import { Link } from "react-router-dom";

export default function MetricsPage() {
  const [metrics, setMetrics] = useState([]);

  useEffect(() => {
    fetchMetrics().then(setMetrics).catch(console.error);
  }, []);

  return (
    <div className="metrics-container">
      <h1 className="metrics-title">Metrics Logs</h1>

      <table className="metrics-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Timestamp</th>
            <th>Service</th>
            <th>CPU (%)</th>
            <th>Memory (MB)</th>
            <th>Latency (ms)</th>
            <th>Throughput</th>
          </tr>
        </thead>

        <tbody>
          {metrics.map((m: any) => (
            <tr key={m.id}>
              <td>
                <Link to={`/metrics/${m.id}`}>{m.id}</Link>
              </td>
              <td>{m.timestampUtc}</td>
              <td>{m.service}</td>
              <td>{m.cpuUsage}</td>
              <td>{m.memoryUsageMb}</td>
              <td>{m.latencyMs}</td>
              <td>{m.throughput}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
