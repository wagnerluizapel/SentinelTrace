import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchErrors } from "../../services/api";
import "./error-details.css";

export default function ErrorDetailsPage() {
  const { id } = useParams();
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    fetchErrors().then((errors) => {
      const found = errors.find((e: any) => e.id === id);
      setError(found);
    });
  }, [id]);

  if (!error) {
    return <h2>Loading error details...</h2>;
  }

  return (
    <div className="error-details-container">
      <h1 className="error-title">Error Details</h1>

      <div className="error-section">
        <h2>ID</h2>
        <p>{error.id}</p>
      </div>

      <div className="error-section">
        <h2>Timestamp</h2>
        <p>{error.timestampUtc ?? "No timestamp available"}</p>
      </div>

      <div className="error-section">
        <h2>Service</h2>
        <p>{error.service}</p>
      </div>

      <div className="error-section">
        <h2>Message</h2>
        <p>{error.message}</p>
      </div>

      <div className="error-section">
        <h2>Level</h2>
        <p>{error.level}</p>
      </div>

      <div className="error-section">
        <h2>Stack Trace</h2>
        <pre className="stacktrace-box">{error.stackTrace}</pre>
      </div>
    </div>
  );
}
