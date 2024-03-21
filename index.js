import express from 'express';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import readJSONL from './src/utils/read-jsonl.js';

// eslint-disable-next-line no-underscore-dangle
const __filename = fileURLToPath(import.meta.url);
// eslint-disable-next-line no-underscore-dangle
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 8000;
const DATASET = path.resolve(__dirname, 'src/datasets/quotes.jsonl');

console.log(`... Fetching dataset from: ${DATASET}`);
console.time('Dataset fetched');
const data = readJSONL(DATASET);
console.timeEnd('Dataset fetched');

const authors = new Set();
const tags = new Set();
data.forEach((item) => {
  authors.add(item.author);
  item.tags.forEach((tag) => tags.add(tag));
});

app.get('/', (req, res) => {
  res.redirect('/docs');
});

app.get('/authors', (req, res) => {
  res.json(Array.from(authors));
});

app.get('/tags', (req, res) => {
  res.json(Array.from(tags));
});

app.get('/tags/popularity', (req, res) => {
  const quotesCount = {};
  data.forEach((quote) => quote.tags.forEach((tag) => {
    quotesCount[tag] = quotesCount[tag] ? quotesCount[tag] + 1 : 1;
  }));
  res.json(Object.entries(quotesCount).sort((a, b) => b[1] - a[1]));
});

app.get('/quote(s?)/random', (req, res) => {
  const {
    minlength,
    maxlength,
    author,
    tag,
  } = req.query;

  const filtered = data.filter((item) => {
    if (
      (minlength || 0) < item.quote.length
      && item.quote.length < (maxlength || 1000)
      && (author ? item.author === author : true)
      && (tag ? item.tags.includes(tag) : true)
    ) return true;
    return false;
  });

  const randIdx = Math.floor(Math.random() * filtered.length);
  res.send(data[randIdx]);
});

app.use((req, res) => res.sendStatus(404));

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => res.sendStatus(500));

app.use(/^\/(help|docs|api)/, express.static('src/docs'));

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
