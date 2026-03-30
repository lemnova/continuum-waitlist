import express from "express";
import fs from "node:fs";
import path from "node:path";

const app = express();
const staticPath = path.resolve(process.cwd(), "dist/public");

app.use(express.static(staticPath));

const renderApp = (_req: express.Request, res: express.Response): void => {
  const indexPath = path.resolve(staticPath, "index.html");

  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
    return;
  }

  console.error(`Caminho não encontrado: ${indexPath}`);
  res.status(404).send("Frontend não encontrado. Verifique se o build do Vite foi executado.");
};

// Rota "catch-all" para o SPA (Single Page Application)
app.get("*", renderApp);

// Exportar o app é OBRIGATÓRIO para a Vercel Functions funcionar
export default app;

// Inicia o servidor apenas em desenvolvimento local
if (process.env.NODE_ENV !== "production") {
  const port = Number(process.env.PORT) || 3000;
  app.listen(port, () => {
    console.log(`🚀 Servidor local: http://localhost:${port}`);
    console.log(`📂 Servindo arquivos de: ${staticPath}`);
  });
}