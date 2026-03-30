import express from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const server = createServer(app);

// A Vercel coloca os arquivos estáticos em locais específicos. 
// Vamos tentar encontrar a pasta public onde quer que ela esteja.
const staticPath = path.resolve(process.cwd(), "dist", "public");

app.use(express.static(staticPath));

app.get("*", (req, res) => {
  const indexPath = path.join(staticPath, "index.html");
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    // Para debug na Vercel se o caminho estiver errado
    res.status(404).send(`Frontend nao encontrado em: ${staticPath}`);
  }
});

// IMPORTANTE: Exportar o app para a Vercel
export default app;

// Só roda o listen se não estiver na Vercel (localmente)
if (process.env.NODE_ENV !== "production") {
  const port = process.env.PORT || 3000;
  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}
