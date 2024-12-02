import { Hono } from "jsr:@hono/hono";
import data from "./data.json" with { type: "json" };

const app = new Hono();

app.get("/", (c) => c.text("Welcome to dinosaur API!"));

app.get("/api/", (c) => c.json(data));

app.get("/api/:dinosaur", (c) => {
  const dinosaur = c.req.param("dinosaur").toLowerCase();
  const found = data.find((item) => item.name.toLowerCase() === dinosaur);
  if (found) {
    return c.json(found);
  } else {
    return c.text("No dinosaur found. 🦕");
  }
});

Deno.serve(app.fetch);
