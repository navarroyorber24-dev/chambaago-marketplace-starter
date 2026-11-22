# Railway Node.js API Starter

A minimal, dependency-free Node.js HTTP API starter designed for quick deployment on Railway. It includes a health endpoint, a sample API route, graceful shutdown, a Dockerfile, and Railway deployment configuration.

## Features
- Node.js 20+ (Docker image uses Node 22)
- No runtime dependencies
- Railway-ready railway.json
- Health check at /health
- Example endpoint at /api/example
- Uses Railway's PORT environment variable
- Docker support
- MIT licensed

## Deploy on Railway
1. Create a public GitHub repository and upload this project.
2. In Railway, choose New Project → Deploy from GitHub Repo.
3. Select the repository and deploy.
4. Generate a public domain for the service in Railway's Networking settings.
5. Open /health on the generated domain.

## Endpoints
| Method | Path | Purpose |
|---|---|---|
| GET | / | Service information |
| GET | /health | Health check |
| GET | /api/example | Example JSON response |

## Local development
Requires Node.js 20 or newer. Run `npm start`, then visit http://localhost:3000/health. Use `npm run dev` for automatic restarts.

## Publishing as a Railway Template
Deploy this app to a separate Railway project, create a template draft from that project, review it, and publish it. Do not use or connect any CHAMBAAGO project.

## Security
No credentials, API keys, database passwords, or user data are included. Add secrets through Railway Variables; never commit .env files.

## License
MIT.
