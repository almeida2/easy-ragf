import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
// O Heroku fornece a porta dinamicamente através da variável de ambiente PORT.
const port = process.env.PORT || 3000;

// O Heroku executa `npm run build` e cria a pasta `dist`.
// Aqui servimos os arquivos estáticos dessa pasta.
app.use(express.static(path.join(__dirname, 'dist')));

// Redireciona todas as outras requisições para o `index.html`
// (Muito importante para aplicações React tipo Single Page Application)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
