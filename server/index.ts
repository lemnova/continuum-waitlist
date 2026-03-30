import express, { type RequestHandler } from "express";
import fs from "node:fs";
import path from "node:path";

const app = express();
const staticPath = path.resolve(process.cwd(), "dist/public");

app.use(express.static(staticPath));

const renderApp: RequestHandler = (_req, res) => {
  const indexPath = path.resolve(staticPath, "index.html");

  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
    return;
  }

  res.status(404).send(`Frontend nao encontrado em: ${indexPath}`);
};

app.get("*", renderApp);

export default app;

if (process.env.NODE_ENV !== "production") {
  const port = Number(process.env.PORT) || 3000;
  app.listen(port, () => console.log(`Rodando em http://localhost:${port}`));
}