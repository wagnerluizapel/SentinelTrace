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
    return <h2>Carregando detalhes...</h2>;
  }

  return (
    <div className="error-details-container">
      <h1 className="error-title">Detalhes do Erro</h1>

      <div className="error-section">
        <h2>ID</h2>
        <p>{error.id}</p>
      </div>

      <div className="error-section">
        <h2>Timestamp</h2>
        <p>{error.timestampUtc ?? "Sem timestamp disponível"}</p>
      </div>

      <div className="error-section">
        <h2>Serviço</h2>
        <p>{error.service}</p>
      </div>

      <div className="error-section">
        <h2>Mensagem</h2>
        <p>{error.message}</p>
      </div>

      <div className="error-section">
        <h2>Nível</h2>
        <p>{error.level}</p>
      </div>

      <div className="error-section">
        <h2>StackTrace</h2>
        <pre className="stacktrace-box">{error.stackTrace}</pre>
      </div>
    </div>
  );
}
