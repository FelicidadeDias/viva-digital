const ALLOWED_ACTIONS = new Set(["search", "scrape"]);
module.exports = async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Método não permitido. Usa POST." });
  }
  const apiKey = process.env.FIRECRAWL_API_KEY;
  if (!apiKey) return res.status(503).json({ error: "Firecrawl ainda não está configurado no servidor. Define FIRECRAWL_API_KEY nas variáveis de ambiente." });
  const body = req.body || {};
  const action = String(body.action || "");
  if (!ALLOWED_ACTIONS.has(action)) return res.status(400).json({ error: "Ação inválida." });
  let endpoint, payload;
  if (action === "search") {
    const query = String(body.query || "").trim().slice(0, 500);
    const limit = Math.max(1, Math.min(15, Number.parseInt(body.limit, 10) || 10));
    if (query.length < 2) return res.status(400).json({ error: "Escreve pelo menos dois caracteres para pesquisar." });
    endpoint = "https://api.firecrawl.dev/v2/search";
    payload = { query, limit, sources: [{ type: "web" }] };
  } else {
    let url;
    try { url = new URL(String(body.url || "")); } catch { return res.status(400).json({ error: "URL inválido." }); }
    if (!["http:", "https:"].includes(url.protocol)) return res.status(400).json({ error: "Só são permitidos endereços HTTP ou HTTPS." });
    endpoint = "https://api.firecrawl.dev/v2/scrape";
    payload = { url: url.href, formats: ["markdown", "links"], onlyMainContent: true };
    const prompt = String(body.prompt || "").trim().slice(0, 500);
    if (prompt) payload.formats.push({ type: "json", prompt, schema: { type: "object", additionalProperties: true } });
  }
  try {
    const upstream = await fetch(endpoint, {
      method: "POST",
      headers: { Authorization: "Bearer " + apiKey, "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(60000)
    });
    const raw = await upstream.text();
    let data;
    try { data = JSON.parse(raw); } catch { data = { error: "O serviço de pesquisa devolveu uma resposta inesperada." }; }
    if (!upstream.ok) {
      const message = data.error || data.message || "O serviço Firecrawl não conseguiu concluir o pedido.";
      return res.status(upstream.status >= 400 && upstream.status < 600 ? upstream.status : 502).json({ error: String(message).slice(0, 500) });
    }
    return res.status(200).json(data);
  } catch (error) {
    return res.status(502).json({ error: error.name === "TimeoutError" ? "A pesquisa demorou demasiado. Tenta novamente." : "Não foi possível ligar ao Firecrawl. Verifica a ligação e tenta novamente." });
  }
};