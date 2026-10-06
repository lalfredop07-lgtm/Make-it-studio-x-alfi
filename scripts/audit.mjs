/** Auditoría de producción por CDP: errores de consola, recursos 404 y peso. */
const [, , url, wArg = "1440", hArg = "900"] = process.argv;
const t = await (await fetch("http://127.0.0.1:9222/json/new?about:blank", { method: "PUT" })).json();
const ws = new WebSocket(t.webSocketDebuggerUrl);
let id = 0; const pending = new Map();
const errors = [], failed = [], reqs = new Map();
const send = (m, p = {}) => new Promise((res, rej) => { const n = ++id; pending.set(n, { res, rej }); ws.send(JSON.stringify({ id: n, method: m, params: p })); });
await new Promise(r => ws.onopen = r);
ws.onmessage = e => {
  const m = JSON.parse(e.data);
  if (m.id && pending.has(m.id)) { const { res, rej } = pending.get(m.id); pending.delete(m.id); return m.error ? rej(new Error(m.error.message)) : res(m.result); }
  if (m.method === "Runtime.exceptionThrown") errors.push(m.params.exceptionDetails.exception?.description?.slice(0, 160) ?? "?");
  if (m.method === "Console.messageAdded" && m.params.message.level === "error") errors.push(m.params.message.text.slice(0, 160));
  if (m.method === "Network.responseReceived") reqs.set(m.params.requestId, { url: m.params.response.url, status: m.params.response.status, type: m.params.type });
  if (m.method === "Network.loadingFinished") { const r = reqs.get(m.params.requestId); if (r) r.size = m.params.encodedDataLength; }
  if (m.method === "Network.loadingFailed") failed.push(m.params.errorText);
};
await send("Page.enable"); await send("Runtime.enable"); await send("Console.enable"); await send("Network.enable");
await send("Network.setCacheDisabled", { cacheDisabled: true });   // medida en frío
await send("Emulation.setDeviceMetricsOverride", { width: +wArg, height: +hArg, deviceScaleFactor: 1, mobile: +wArg < 768 });
await send("Page.navigate", { url });
await new Promise(r => setTimeout(r, 6000));

const all = [...reqs.values()];
const byType = {};
for (const r of all) { const k = r.type || "other"; byType[k] = byType[k] || { n: 0, kb: 0 }; byType[k].n++; byType[k].kb += (r.size || 0) / 1024; }
const bad = all.filter(r => r.status >= 400).map(r => `${r.status} ${r.url.split("/").pop()}`);
console.log(JSON.stringify({
  errores: [...new Set(errors)],
  fallidos: failed,
  http4xx5xx: bad,
  pesoInicialKB: Math.round(all.reduce((s, r) => s + (r.size || 0), 0) / 1024),
  porTipo: Object.fromEntries(Object.entries(byType).map(([k, v]) => [k, `${v.n} · ${Math.round(v.kb)}KB`])),
  mayores: all.sort((a, b) => (b.size || 0) - (a.size || 0)).slice(0, 8).map(r => `${Math.round((r.size || 0) / 1024)}KB ${r.url.split("/").pop().slice(0, 44)}`),
}, null, 1));
await fetch(`http://127.0.0.1:9222/json/close/${t.id}`); ws.close(); process.exit(0);
