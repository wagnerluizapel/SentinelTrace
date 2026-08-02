import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

export default function MetricsChart({ metrics }: { metrics: any[] }) {
  const data = metrics.map((m) => ({
    time: new Date(m.timestampUtc).toLocaleTimeString(),
    cpu: m.cpuUsage,
    mem: m.memoryUsageMb,
    lat: m.latencyMs,
  }));

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip />
          <Legend />

          <Line type="monotone" dataKey="cpu" stroke="#ef4444" strokeWidth={3} />
          <Line type="monotone" dataKey="mem" stroke="#3b82f6" strokeWidth={3} />
          <Line type="monotone" dataKey="lat" stroke="#10b981" strokeWidth={3} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
