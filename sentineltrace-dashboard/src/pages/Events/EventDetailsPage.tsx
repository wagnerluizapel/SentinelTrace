import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchEvents } from "../../services/api";
import "./event-details.css";

export default function EventDetailsPage() {
  const { id } = useParams();
  const [event, setEvent] = useState<any>(null);

  useEffect(() => {
    fetchEvents().then((events) => {
      const found = events.find((e: any) => e.id === id);
      setEvent(found);
    });
  }, [id]);

  if (!event) {
    return <h2>Loading event details...</h2>;
  }

  return (
    <div className="event-details-container">
      <h1 className="event-title">Event Details</h1>

      <div className="event-section">
        <h2>ID</h2>
        <p>{event.id}</p>
      </div>

      <div className="event-section">
        <h2>Timestamp</h2>
        <p>{event.timestampUtc ?? "No timestamp available"}</p>
      </div>

      <div className="event-section">
        <h2>Service</h2>
        <p>{event.service}</p>
      </div>

      <div className="event-section">
        <h2>Level</h2>
        <p>{event.level}</p>
      </div>

      <div className="event-section">
        <h2>Message</h2>
        <p>{event.message}</p>
      </div>
    </div>
  );
}
