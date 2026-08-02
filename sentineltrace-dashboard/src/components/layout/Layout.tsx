import { Link, Outlet } from "react-router-dom";
import "./Layout.css";

export function Layout() {
  return (
    <div className="layout-container">
      <aside className="sidebar">
        <h2 className="logo">SentinelTrace</h2>

        <nav>
          <ul>
            <li><Link to="/">Dashboard</Link></li>
            <li><Link to="/logs">Logs</Link></li>
            <li><Link to="/events">Events</Link></li>
            <li><Link to="/errors">Errors</Link></li>
            <li><Link to="/metrics">Metrics</Link></li>
          </ul>
        </nav>
      </aside>

      <main className="content">
        <Outlet />
      </main>
    </div>
  );
}
