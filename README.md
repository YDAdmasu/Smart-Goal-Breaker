<div align="center">

# 🎯 Smart Goal Breaker

**Transform vague goals into actionable steps with AI**

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Backend CI](https://github.com/YDAdmasu/The-Smart-Goal-Breaker/workflows/Backend%20CI/badge.svg)](https://github.com/YDAdmasu/The-Smart-Goal-Breaker/actions)
[![Frontend CI](https://github.com/YDAdmasu/The-Smart-Goal-Breaker/workflows/Frontend%20CI/badge.svg)](https://github.com/YDAdmasu/The-Smart-Goal-Breaker/actions)

[Features](#-features) • [Demo](#-demo) • [Quick Start](#-quick-start) • [Deployment](#-deployment) • [Contributing](#-contributing)

</div>

---

## ✨ Features

- 🤖 **AI-Powered Goal Breaking** - Uses Groq's Llama model to intelligently break down goals
- 📊 **Complexity Rating** - Automatically rates goal difficulty from 1-10
- 💾 **Persistent Storage** - PostgreSQL database stores all your goals
- 🎨 **Modern UI** - Beautiful, responsive interface with dark mode
- 🐳 **Docker Ready** - One-command deployment with Docker Compose
- ⚡ **Fast API** - High-performance FastAPI backend
- 🔄 **Real-time Updates** - Instant feedback as you create goals

## 🎬 Demo

<!-- Add screenshot here once UI is updated -->
*Screenshot coming soon after UI redesign*

## 🛠️ Tech Stack

### Backend
- **FastAPI** - Modern Python web framework
- **SQLAlchemy** - SQL toolkit and ORM
- **PostgreSQL** - Robust relational database
- **Groq API** - Fast LLM inference with Llama

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **shadcn/ui** - Beautiful component library

### Infrastructure
- **Docker & Docker Compose** - Containerization
- **GitHub Actions** - CI/CD automation

## 🚀 Quick Start

### Prerequisites
- Docker & Docker Compose
- Node.js 18+ and npm
- Groq API key (free at [groq.com](https://groq.com))

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/YDAdmasu/The-Smart-Goal-Breaker.git
   cd smart-goal-breaker
   ```

2. **Configure environment**
   ```bash
   cp .env.example .env
   ```
   Edit `.env` and add your Groq API key:
   ```env
   GROQ_API_KEY=your_actual_groq_api_key_here
   ```

3. **Start the backend with Docker**
   ```bash
   docker-compose up --build
   ```
   This starts:
   - 🗄️ PostgreSQL database on port 5432
   - 🚀 FastAPI backend on port 8000

4. **Start the frontend** (in a new terminal)
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000) 🎉

## 📚 API Documentation

Once running, visit [http://localhost:8000/docs](http://localhost:8000/docs) for interactive Swagger UI documentation.

### Key Endpoints

- `POST /api/goals` - Create a new goal and get AI-generated steps
- `GET /api/goals` - List all goals (latest 50)
- `GET /api/goals/{id}` - Get a specific goal by ID

## 🌐 Deployment

### Backend Deployment

#### Option 1: Render
1. Create a new Web Service on [Render](https://render.com)
2. Connect your GitHub repository
3. Set root directory to `backend`
4. Add environment variables:
   - `DATABASE_URL` - Your Postgres connection string
   - `GROQ_API_KEY` - Your Groq API key
   - `GROQ_MODEL` - `llama3-8b-8192`

#### Option 2: Railway
1. Create a new project on [Railway](https://railway.app)
2. Add PostgreSQL database
3. Deploy from GitHub (backend directory)
4. Configure environment variables

### Frontend Deployment

#### Vercel (Recommended)
1. Import project on [Vercel](https://vercel.com)
2. Set root directory to `frontend`
3. Add environment variable:
   - `NEXT_PUBLIC_API_URL` - Your backend URL (e.g., `https://api.example.com`)
4. Deploy! 🚀

## 🔧 Troubleshooting

### Backend won't start
- Ensure Docker is running
- Check if port 8000 or 5432 is already in use
- Verify `.env` file exists and is properly formatted

### Frontend build fails
- Delete `node_modules` and `package-lock.json`, then run `npm install` again
- Ensure Node.js version is 18 or higher: `node --version`

### API calls fail
- Check that `NEXT_PUBLIC_API_URL` is set correctly
- Verify backend is running on the expected port
- Check browser console for CORS errors

### Database connection issues
- Ensure PostgreSQL container is running: `docker ps`
- Check `DATABASE_URL` format in `.env`
- Try restarting containers: `docker-compose restart`

## 🤝 Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Groq](https://groq.com) for blazing-fast LLM inference
- [shadcn/ui](https://ui.shadcn.com) for beautiful components
- [FastAPI](https://fastapi.tiangolo.com) for the amazing framework

---

<div align="center">

**[⬆ back to top](#-smart-goal-breaker)**

Made with ❤️ by YIDIDIYA ADMASU

</div>
