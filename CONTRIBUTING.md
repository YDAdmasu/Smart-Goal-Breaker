# Contributing to Smart Goal Breaker

Thank you for your interest in contributing to Smart Goal Breaker! 🎉

## Code of Conduct

Please be respectful and constructive in all interactions. We're here to build something great together.

## How to Contribute

### Reporting Bugs 🐛

If you find a bug, please create an issue using the bug report template. Include:
- A clear description of the issue
- Steps to reproduce
- Expected vs actual behavior
- Screenshots if applicable
- Your environment (OS, browser, versions)

### Suggesting Features 💡

We love new ideas! Create an issue using the feature request template and describe:
- The problem you're trying to solve
- Your proposed solution
- Any alternatives you've considered

### Pull Requests 🚀

1. **Fork the repository** and create a new branch from `main`
2. **Make your changes** following our code style
3. **Test your changes** thoroughly
4. **Update documentation** if needed
5. **Submit a pull request** using our PR template

## Development Setup

### Prerequisites
- Docker & Docker Compose
- Node.js 18+ and npm
- Python 3.11+

### Local Setup

1. Clone your fork:
   ```bash
   git clone https://github.com/YOUR_USERNAME/smart-goal-breaker.git
   cd smart-goal-breaker
   ```

2. Set up environment:
   ```bash
   cp .env.example .env
   # Edit .env with your API keys
   ```

3. Start backend with Docker:
   ```bash
   docker-compose up --build
   ```

4. Start frontend:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

## Code Style

### Backend (Python)
- Follow PEP 8 guidelines
- Use type hints where possible
- Write docstrings for functions and classes
- Keep functions focused and small

### Frontend (TypeScript/React)
- Use TypeScript for type safety
- Follow React best practices
- Use functional components with hooks
- Keep components small and reusable
- Use meaningful variable names

## Commit Messages

Write clear, descriptive commit messages:
- Use present tense ("Add feature" not "Added feature")
- Keep first line under 50 characters
- Add detailed description if needed

Examples:
```
Add dark mode toggle to settings
Fix API error handling in goal creation
Update README with deployment instructions
```

## Questions?

Feel free to open an issue for any questions or reach out to the maintainers.

Thank you for contributing! 🙌
