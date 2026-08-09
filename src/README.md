📘 SentinelTrace — Observability & Monitoring Platform
A complete monitoring, metrics, logging, health check, and real‑time dashboard system inspired by enterprise‑grade tools such as Datadog, Grafana, New Relic, and Elastic APM.
Built with:
* ASP.NET Core 8 (Minimal APIs)
* Domain‑Driven Design (DDD)
* Clean Architecture
* React + Vite
* EF Core + SQLite
* Worker Service
* Real‑time dashboard

🎯 Project Purpose
SentinelTrace was built to demonstrate strong engineering capabilities in:
* Professional architecture (DDD + Clean Architecture)
* Observability and monitoring
* Structured logging
* Performance metrics
* Real health check (API + Database + Latency)
* Interactive dashboard consuming real backend data
* Frontend + backend integration
* Modern engineering best practices
This project was designed to stand out to recruiters on platforms like LinkedIn, Seek, and Indeed by showcasing the ability to build real systems, not just CRUD applications.

🏛️ Architecture (DDD + Clean Architecture) <br>
The solution follows Domain‑Driven Design principles, clearly separating: <br>
✔ Domain — entities and business rules <br>
✔ Application — use cases, DTOs, services <br>
✔ Infrastructure — database, repositories, EF Core <br>
✔ API — minimal endpoints <br>
✔ Worker — background processing <br>
✔ Dashboard — monitoring interface <br>
This structure ensures:
* scalability
* testability
* low coupling
* high cohesion
* maintainability

📊 Observability (Datadog‑Style) <br>
The dashboard provides: <br>
✔ Real‑time health check <br>
✔ Database connectivity status <br>
✔ API latency <br>
✔ Log filtering by level (Info, Warning, Error) <br>
✔ Request metrics <br>
✔ Structured events and errors <br>
All inspired by platforms like Datadog, Grafana, and Kibana.

❤️ Advanced Health Check
The /api/health endpoint returns:
json

{ <br>
  "status": "OK", <br>
  "database": "Connected", <br>
  "latencyMs": 6, <br>
  "timestamp": "2026-08-01T00:34:25Z" <br>
} <br>
It measures:
* API availability
* Database connectivity
* Real request latency
The dashboard displays: <br>
🟢 OK
🔴 Offline / Error

📝 Structured Logs
The Logs page displays:
* Service
* Endpoint
* StatusCode
* Level (Info, Warning, Error)
* Timestamp
* CorrelationId <br>

With filters:
* All
* Info
* Warning
* Error <br>
Log levels are automatically determined: <br>
✔ 200–299 → Info <br>
✔ 300–399 → Warning <br>
✔ 400+ or invalid → Error <br>

⚙️ Worker Service
The Worker handles asynchronous tasks such as:
* metrics ingestion
* event processing
* simulation of real pipelines

🖥️ Dashboard (React + Vite) <br>
The dashboard displays: <br>
✔ System status <br>
✔ Latency <br>
✔ Database status <br>
✔ Filtered logs <br>
✔ Metrics <br>
✔ Events <br>
With a modern, responsive UI and dynamic color feedback.

📡 Main Endpoints
Health  
GET /api/health
Logs  
GET /api/logs
Metrics  
GET /api/metrics
Events  
GET /api/events
Errors  
GET /api/errors

🧪 Technologies Used
* ASP.NET Core 8
* EF Core
* SQLite
* React + Vite
* TypeScript
* Worker Service
* Clean Architecture
* DDD
* Fetch API
* CORS
* Swagger

🚀 How to Run
Backend
bash

dotnet restore
dotnet build
dotnet run
Frontend
bash

npm install
npm run dev

📌 Current Status <br>
✔ Health check fully functional <br>
✔ Dynamic dashboard <br>
✔ Log filtering <br>
✔ Real latency measurement <br>
✔ Database status <br>
✔ Worker running <br>
✔ Clean architecture <br>
✔ Ready for LinkedIn / GitHub / Seek / Indeed <br>

🎉 Conclusion
SentinelTrace demonstrates:
* strong architectural skills
* solid observability knowledge
* backend expertise (.NET)
* frontend integration (React)
* ability to build real‑world systems
* above‑average engineering maturity

---
📸 Screenshots

### 🟢 Dashboard Overview
![Dashboard](./screenshots/dashboard-page.png)

### 📊 Logs Page
![Logs](./screenshots/logs-page.png)

### 🎯 Events Page
![Events](./screenshots/events-page.png)

### ❌ Errors Page
![Errors](./screenshots/errors-page.png)

### 📈 Metrics Page
![Metrics](./screenshots/metrics-page.png)