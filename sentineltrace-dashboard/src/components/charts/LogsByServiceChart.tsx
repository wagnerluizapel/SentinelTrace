import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
export default function LogsByServiceChart({ logs }: { logs: any[] }) {
  console.log("LOGS NO GRAFICO:", logs);

  const data = Object.values(
    logs.reduce((acc: any, log: any) => {
      const service = log.serviceName || log.service || "Unknown";

      acc[service] = acc[service] || { service, count: 0 };
      acc[service].count++;

      return acc;
    }, {})
  );

  console.log("DATA AGRUPADA:", data);

  return (
    <div style={{ width: "100%", height: 300 }}>
      <ResponsiveContainer>
        <BarChart data={data}>
          <XAxis dataKey="service" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" fill="#4f46e5" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

