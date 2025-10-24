export function healthCheck(req, res) {
  res.json({
    status: "ok",
    service: "em-pulse-backend",
    timestamp: new Date().toISOString(),
  });
}
