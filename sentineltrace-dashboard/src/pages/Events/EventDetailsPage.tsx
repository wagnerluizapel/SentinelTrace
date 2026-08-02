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
    return <h2>Carregando detalhes...</h2>;
  }

  return (
    <div className="event-details-container">
      <h1 className="event-title">Detalhes do Evento</h1>

      <div className="event-section">
        <h2>ID</h2>
        <p>{event.id}</p>
      </div>

      <div className="event-section">
        <h2>Timestamp</h2>
        <p>{event.timestampUtc}</p>
      </div>

      <div className="event-section">
        <h2>Serviço</h2>
        <p>{event.service}</p>
      </div>

      <div className="event-section">
        <h2>Nível</h2>
        <p>{event.level}</p>
      </div>

      <div className="event-section">
        <h2>Mensagem</h2>
        <p>{event.message}</p>
      </div>
    </div>
  );
}
