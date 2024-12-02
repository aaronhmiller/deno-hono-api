import { Hono } from "jsr:@hono/hono";
import data from "./data.json" with { type: "json" };

const app = new Hono();

app.get("/", ctx => ctx.text("Welcome to dinosaur API!"));

app.get("/api", ctx => ctx.json(data));

app.get("/api/:dinosaur", ctx => {
  const dinosaur = ctx.req.param("dinosaur").toLowerCase();
  const found = data.find((item) => item.name.toLowerCase() === dinosaur);
  if (found) {
    return ctx.json(found);
  } else {
    return ctx.text("No dinosaur found. 🦕");
  }
});

Deno.serve(app.fetch);
