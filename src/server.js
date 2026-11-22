import http from "node:http";

const port = Number(process.env.PORT || 3000);
const host = "0.0.0.0";

const server = http.createServer((req, res) => {
  const url = new URL(req.url || "/", `http://${req.headers.host || "localhost"}`);
  res.setHeader("content-type", "application/json; charset=utf-8");
  res.setHeader("x-content-type-options", "nosniff");

  if (req.method === "GET" && url.pathname === "/") {
    res.writeHead(200);
    return res.end(JSON.stringify({
      name: "Railway Node.js API Starter",
      status: "running",
      docs: "See README.md for available endpoints and deployment steps."
    }));
  }
  if (req.method === "GET" && url.pathname === "/health") {
    res.writeHead(200);
    return res.end(JSON.stringify({ ok: true, timestamp: new Date().toISOString() }));
  }
  if (req.method === "GET" && url.pathname === "/api/example") {
    res.writeHead(200);
    return res.end(JSON.stringify({
      message: "Your Railway API is ready.",
      environment: process.env.NODE_ENV || "development"
    }));
  }
  res.writeHead(404);
  res.end(JSON.stringify({ error: "Not found" }));
});

server.listen(port, host, () => console.log(`API listening on ${host}:${port}`));
process.on("SIGTERM", () => server.close(() => process.exit(0)));
