// Tiny static server for local preview: `bun serve.js` → http://localhost:5179
import { file } from "bun";
const ROOT = import.meta.dir;
const TYPES = { html: "text/html", css: "text/css", js: "text/javascript", svg: "image/svg+xml" };
Bun.serve({
  port: 5179,
  async fetch(req) {
    let path = new URL(req.url).pathname;
    if (path === "/") path = "/index.html";
    const f = file(ROOT + path);
    if (!(await f.exists())) return new Response("Not found", { status: 404 });
    const ext = path.split(".").pop();
    const buf = await f.arrayBuffer(); // fully buffer so content-length is set and the connection closes
    return new Response(buf, {
      headers: {
        "content-type": TYPES[ext] || "application/octet-stream",
        "cache-control": "no-store",
        "connection": "close",
      },
    });
  },
});
console.log("serving on http://localhost:5179");
