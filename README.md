# 🔥 FireLog – Intelligent Logging & Alert System

FireLog is a full-stack logging and alerting system built for developers and organizations to track, visualize, and get notified about important events occurring across their applications.

---

## 🚀 Features

- ✅ Client-based secure logging API
- 📊 Beautiful Admin Dashboard (Charts + KPIs)
- 📅 Log Analytics (Logs per Day, Severity Distribution)
- ⚠️ Alert Generation on suspicious activity
- 📩 Email + Slack alert integration
- 🔐 JWT Auth for Admin and Clients
- 🌐 Unique IP detection
- 🧠 Extendable to support more alert conditions

---

## 🛠️ Tech Stack

**Backend:** Node.js, Express, MongoDB, Mongoose  
**Frontend:** React, TailwindCSS, Recharts  
**Auth:** JWT  
**Alerts:** Nodemailer (Email), Slack Webhook  
**Deployment:** Railway / Render / Vercel

---

## 🔐 Authentication Flow

- Clients are registered and receive a unique `API token`
- Logs are sent with this token
- Admins log in via a protected panel
- All routes secured via middleware

---

## 📈 Dashboard Highlights

- **KPIs:** Total Logs, Logs Today, Unique IPs, Most Active Client
- **Charts:**
  - Line chart: Logs per day (7 days)
  - Pie chart: Log severity distribution
  - Bar chart: Volume trends
- **Responsive UI:** Optimized for desktop and mobile

---

## 🔔 Alert System

Alerts are automatically triggered based on defined rules:

- 🔁 Repeated failed attempts from same IP
- 📩 Alerts sent via Email and Slack (configurable)
- 🧠 Extensible logic for future alert types

---

## 📦 Setup Instructions

### 1. Clone the Repo

```bash
git clone https://github.com/yourusername/firelog.git
cd firelog
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/firelog
JWT_SECRET=your_secret
ALERTS=Enable
EMAIL_USER=admin@example.com
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/...
EMAIL_USER=youremail@example.com
EMAIL_PASS=your_email_password
```

Start backend:

```bash
npm run dev
```

### 3. Frontend Setup

```bash
cd ../frontend
npm install
```

Create a `.env` file:

```env
VITE_BACKEND_URL=http://localhost:5000
```

Start frontend:

```bash
npm run dev
```

---

## 📡 Sample Log API (Client Side)

```bash
POST /api/logs
Authorization: Bearer <clientToken>

{
  "ip": "192.168.1.100",
  "type": "login_attempt",
  "message": "Failed login",
  "severity": "error"
}
```

---

## 📬 Email & Slack Alerts

- Alerts sent if repeated log pattern is detected
- Alert message includes IP, type, severity, time
- Email is sent to client-registered address (or fallback)
- Slack message is pushed to configured webhook

---

## 📚 Folder Structure

```
backend/
├── controllers/
├── middleware/
├── models/
├── routes/
├── utils/
frontend/
├── components/
├── pages/
├── Dashboard.jsx
```

---

## 👥 Admin Credentials

Seed an admin via MongoDB or use the `/register` route if allowed during development.

---

## 📦 Deployment Ready

- Works on Railway, Render, Vercel, etc.
- Separate frontend/backend deployable
- HTTPS-ready (CORS configured)

---

## 🙌 Contributing

PRs are welcome. Make sure to lint and follow project style.  
Ideas for alert templates and integrations (e.g. Discord, Telegram) are appreciated.

---


## 🔗 Project Status

✅ MVP Complete  
🚧 Webhook logs + UI filter pending  
🧠 AI-assisted Alert suggestions (coming soon)

