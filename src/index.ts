import { Hono } from "hono";
import { fromHono } from "chanfana";
import { Hello } from "./endpoints/hello";
import { Add } from "./endpoints/add";
import { PersonCreate } from "./endpoints/personCreate";
import { PersonList } from "./endpoints/personList";

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
openapi.post("/api/people", PersonCreate);
openapi.get("/api/people", PersonList);

export default app;
