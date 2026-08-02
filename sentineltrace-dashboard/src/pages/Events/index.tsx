import { useEffect, useState } from "react";
import { fetchEvents } from "../../services/api";
import "./events.css";
import { Link } from "react-router-dom";

export default function EventsPage() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchEvents().then(setEvents).catch(console.error);
  }, []);

  return (
    <div className="events-container">
      <h1 className="events-title">Event Logs</h1>

      <table className="events-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Timestamp</th>
            <th>Service</th>
            <th>Level</th>
            <th>Message</th>
          </tr>
        </thead>

        <tbody>
          {events.map((e: any) => (
            <tr key={e.id}>
              <td>
                <Link to={`/events/${e.id}`}>{e.id}</Link>
              </td>
              <td>{e.timestampUtc}</td>
              <td>{e.service}</td>
              <td>{e.level}</td>
              <td>{e.message}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
