import { Hono } from "hono";
import { fromHono } from "chanfana";
import { Hello } from "./endpoints/hello";
import { Add } from "./endpoints/add";

const app = new Hono();

// Swagger UI at "/", OpenAPI JSON at "/openapi.json"
const openapi = fromHono(app, {
  docs_url: "/",
  openapi_url: "/openapi.json",
  schema: {
    info: { title: "Cloudflare OpenAPI Demo", version: "1.0.0" },
  },
});

openapi.get("/api/hello", Hello);
openapi.post("/api/add", Add);

export default app;
