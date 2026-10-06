/** Captura tras ejecutar JS. Uso: node shoot-js.mjs <url> <out> <w> <h> <js> [reducedMotion] */
const [, , url, out, wArg, hArg, js, reduced] = process.argv;
const fs = await import("node:fs/promises");
const t = await (await fetch("http://127.0.0.1:9222/json/new?about:blank", { method: "PUT" })).json();
const ws = new WebSocket(t.webSocketDebuggerUrl);
let id = 0; const pending = new Map();
const send = (m, p = {}) => new Promise((res, rej) => { const n = ++id; pending.set(n, { res, rej }); ws.send(JSON.stringify({ id: n, method: m, params: p })); });
await new Promise(r => ws.onopen = r);
ws.onmessage = e => { const m = JSON.parse(e.data); if (m.id && pending.has(m.id)) { const { res, rej } = pending.get(m.id); pending.delete(m.id); m.error ? rej(new Error(m.error.message)) : res(m.result); } };
await send("Page.enable");
await send("Emulation.setDeviceMetricsOverride", { width: +wArg, height: +hArg, deviceScaleFactor: 1, mobile: +wArg < 768 });
if (reduced === "reduced") {
  await send("Emulation.setEmulatedMedia", { features: [{ name: "prefers-reduced-motion", value: "reduce" }] });
}
await send("Page.navigate", { url });
await new Promise(r => setTimeout(r, 3200));
if (js && js !== "-") { await send("Runtime.evaluate", { expression: js, awaitPromise: true }); await new Promise(r => setTimeout(r, 1400)); }
const { data } = await send("Page.captureScreenshot", { format: "png" });
await fs.writeFile(out, Buffer.from(data, "base64"));
console.log("ok", out.split("/").pop());
await fetch(`http://127.0.0.1:9222/json/close/${t.id}`); ws.close(); process.exit(0);
