/**
 * Capturador por CDP: recorre una página y guarda tiras del viewport.
 * Uso: node scripts/shoot.mjs <url> <salida> <ancho> <alto> [etiqueta] [maxTiras]
 */
const [, , url, outDir, wArg, hArg, label = "shot", maxArg = "12"] = process.argv;
const W = +wArg, H = +hArg, MAX = +maxArg;
const fs = await import("node:fs/promises");

const res = await fetch("http://127.0.0.1:9222/json/new?" + encodeURIComponent("about:blank"), { method: "PUT" });
const target = await res.json();
const ws = new WebSocket(target.webSocketDebuggerUrl);
let id = 0;
const pending = new Map();
const send = (method, params = {}) =>
  new Promise((resolve, reject) => {
    const n = ++id;
    pending.set(n, { resolve, reject });
    ws.send(JSON.stringify({ id: n, method, params }));
  });

await new Promise((r) => (ws.onopen = r));
ws.onmessage = (e) => {
  const m = JSON.parse(e.data);
  if (m.id && pending.has(m.id)) {
    const { resolve, reject } = pending.get(m.id);
    pending.delete(m.id);
    m.error ? reject(new Error(m.error.message)) : resolve(m.result);
  }
};

await send("Page.enable");
await send("Emulation.setDeviceMetricsOverride", {
  width: W, height: H, deviceScaleFactor: 1, mobile: W < 768,
});
await send("Page.navigate", { url });
await new Promise((r) => setTimeout(r, 3500));

// Desactivar transiciones para que nada quede capturado a medias.
await send("Runtime.evaluate", {
  expression: `(()=>{const s=document.createElement('style');
    s.textContent='*,*::before,*::after{transition-duration:0s!important}';
    document.head.appendChild(s);})()`,
});

const { result: hRes } = await send("Runtime.evaluate", {
  expression: "document.documentElement.scrollHeight", returnByValue: true,
});
const total = hRes.value;
const steps = Math.min(MAX, Math.ceil(total / H));
await fs.mkdir(outDir, { recursive: true });

for (let i = 0; i < steps; i++) {
  const y = Math.round((i * (total - H)) / Math.max(1, steps - 1));
  await send("Runtime.evaluate", { expression: `window.scrollTo(0, ${y})` });
  await new Promise((r) => setTimeout(r, 1100)); // dejar entrar las animaciones
  const { data } = await send("Page.captureScreenshot", { format: "png" });
  await fs.writeFile(`${outDir}/${label}-${String(i).padStart(2, "0")}.png`, Buffer.from(data, "base64"));
}
console.log(`${label}: ${steps} tiras, página ${total}px @ ${W}x${H}`);
await fetch(`http://127.0.0.1:9222/json/close/${target.id}`);
ws.close();
process.exit(0);
