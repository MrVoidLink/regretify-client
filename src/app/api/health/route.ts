export async function GET() {
  return Response.json({
    status: "ok",
    service: "regretify-client",
    environment: process.env.NODE_ENV ?? "development",
  });
}
