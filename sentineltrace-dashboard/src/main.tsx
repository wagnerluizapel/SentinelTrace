import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/layout/Layout";

import LogsPage from "./pages/Logs/index";
import MetricsPage from "./pages/Metrics/index";
import ErrorsPage from "./pages/Errors/index";
import EventsPage from "./pages/Events/index";
import LogDetailsPage from "./pages/Logs/LogDetailsPage";
import EventDetailsPage from "./pages/Events/EventDetailsPage";
import ErrorDetailsPage from "./pages/Errors/ErrorDetailsPage";
import MetricsDetailsPage from "./pages/Metrics/MetricsDetailsPage";

import "./index.css";
import DashboardPage from "./pages/Dashboard";


ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<DashboardPage />} />
        <Route path="logs" element={<LogsPage />} />
        <Route path="metrics" element={<MetricsPage />} />
        <Route path="events" element={<EventsPage />} />
        <Route path="errors" element={<ErrorsPage />} />
        <Route path="logs/:id" element={<LogDetailsPage />} />
        <Route path="events/:id" element={<EventDetailsPage />} />
        <Route path="errors/:id" element={<ErrorDetailsPage />} />
        <Route path="metrics/:id" element={<MetricsDetailsPage />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
