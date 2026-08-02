import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMetrics } from "../../services/api";
import "./metrics-details.css";

export default function MetricsDetailsPage() {
  const { id } = useParams();
  const [metric, setMetric] = useState<any>(null);

  useEffect(() => {
    fetchMetrics().then((metrics) => {
      const found = metrics.find((m: any) => m.id === id);
      setMetric(found);
    });
  }, [id]);

  if (!metric) {
    return <h2>Carregando detalhes...</h2>;
  }

  return (
    <div className="metrics-details-container">
      <h1 className="metrics-title">Detalhes da Métrica</h1>

      <div className="metrics-section">
        <h2>ID</h2>
        <p>{metric.id}</p>
      </div>

      <div className="metrics-section">
        <h2>Timestamp</h2>
        <p>{metric.timestampUtc}</p>
      </div>

      <div className="metrics-section">
        <h2>Serviço</h2>
        <p>{metric.service}</p>
      </div>

      <div className="metrics-section">
        <h2>CPU Usage (%)</h2>
        <p>{metric.cpuUsage}</p>
      </div>

      <div className="metrics-section">
        <h2>Memory Usage (MB)</h2>
        <p>{metric.memoryUsageMb}</p>
      </div>

      <div className="metrics-section">
        <h2>Latency (ms)</h2>
        <p>{metric.latencyMs}</p>
      </div>

      <div className="metrics-section">
        <h2>Throughput</h2>
        <p>{metric.throughput}</p>
      </div>
    </div>
  );
}
