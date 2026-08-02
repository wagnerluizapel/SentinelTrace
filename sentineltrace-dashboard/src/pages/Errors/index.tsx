import { useEffect, useState } from "react";
import { fetchErrors } from "../../services/api";
import "./errors.css";
import { Link } from "react-router-dom";

export default function ErrorsPage() {
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    fetchErrors()
      .then(data => {
        console.log("ERRORS RECEIVED:", data);
        setErrors(data);
      })
      .catch(err => console.error("FETCH ERROR:", err));
  }, []);

  return (
    <div className="errors-container">
      <h1 className="errors-title">Error Logs</h1>

      <table className="errors-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Timestamp</th>
            <th>Service</th>
            <th>Message</th>
            <th>StackTrace</th>
            <th>Level</th>
          </tr>
        </thead>

        <tbody>
          {errors.map((e: any) => (
            <tr key={e.id}>
              <td>
                <Link to={`/errors/${e.id}`}>{e.id}</Link>
              </td>
              <td>{e.timestampUtc}</td>
              <td>{e.service}</td>
              <td>{e.message}</td>
              <td className="stack">{e.stackTrace}</td>
              <td>{e.level}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
