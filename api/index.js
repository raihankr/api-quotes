import express from 'express';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import readJSONL from './src/utils/read-jsonl.js';

// eslint-disable-next-line no-underscore-dangle
const __filename = fileURLToPath(import.meta.url);
// eslint-disable-next-line no-underscore-dangle
const __dirname = dirname(__filename);
const app = express();
const PORT = process.env.PORT || 3000;
const DATASET = path.resolve(__dirname, 'src/datasets/quotes.jsonl');
const quotes = readJSONL(DATASET);

function filter(data, opt) {
  const {
    minlength,
    maxlength,
    author,
    tag,
  } = opt;

  const filtered = data.filter((item) => {
    if (
      (minlength || 0) < item.quote.length
      && item.quote.length < (maxlength || 1000)
      && (author ? item.author === author : true)
      && (tag ? item.tags.includes(tag) : true)
    ) return true;
    return false;
  });

  return filtered;
}

function pickRandomFrom(data) {
  const randIdx = Math.floor(Math.random() * data.length);
  return data[randIdx];
}

const qod = {
  love: '',
  inspirational: '',
  life: '',
  humor: '',
  books: '',
  all: '',
  date: new Date(),
};

function updateQOD() {
  'all,love,inspirational,life,humor,books'.split(',').forEach((tag) => {
    let filtered = quotes;
    if (tag !== 'all') filtered = filter(quotes, { tag });
    qod[tag] = pickRandomFrom(filtered);
  });
  qod.date = new Date();
}
updateQOD();

function sendResponse(res, code, data) {
  const status = {
    200: 'OK',
    404: 'Not Found',
    500: 'Internal Server Error',
  }[code] || code;

  res.json({
    code,
    status,
    data: code > 300 ? {} : data,
  });
}

const authors = new Set();
const tags = new Set();

quotes.forEach((item) => {
  authors.add(item.author);
  item.tags.forEach((tag) => tags.add(tag));
});

app.get('/', (req, res) => {
  res.redirect(303, '/docs');
});

app.get('/authors', (req, res) => {
  sendResponse(res, 200, Array.from(authors));
});

app.get('/tags', (req, res) => {
  sendResponse(res, 200, Array.from(tags));
});

app.get('/tags/popularity', (req, res) => {
  const quotesCount = {};
  quotes.forEach((quote) => quote.tags.forEach((tag) => {
    quotesCount[tag] = quotesCount[tag] ? quotesCount[tag] + 1 : 1;
  }));
  sendResponse(
    res,
    200,
    Object.entries(quotesCount).sort((a, b) => b[1] - a[1]),
  );
});

app.get('/quotes?/random', (req, res) => {
  const filtered = filter(quotes, req.query);
  sendResponse(res, 200, pickRandomFrom(filtered) || {});
});

app.get('/qod/:tag?', (req, res) => {
  // Update quotes of the day when day changes
  if (
    qod.date.getFullYear() !== new Date().getFullYear()
    || qod.date.getMonth() !== new Date().getMonth()
    || qod.date.getDate() !== new Date().getDate()
  ) updateQOD();

  // eslint-disable-next-line no-shadow
  const { quote, author, tags } = qod[req.params.tag || 'all'] || {};
  if (!quote) return sendResponse(res, 404);

  const data = {
    title: {
      all: 'Quotes of the day',
      love: 'Quotes of the day about love',
      inspirational: 'Inspirational quotes of the day',
      life: 'Quotes of the day about life',
      humor: 'Humor quotes of the day',
      books: 'Quotes of the day about books',
    }[req.params.tag || 'all'] || '',
    quote,
    author,
    tags,
  };

  return sendResponse(res, 200, data);
});

function searchQuotesBy(category, queries) {
  const queriesArray = queries.split(/\s+/);
  const result = [];

  queriesArray.forEach((query) => result.push(...quotes
    .filter((item) => (item[category] instanceof Array
      ? item[category].includes(query)
      : item[category].match(new RegExp(query, 'i'))
    ))));

  return result;
}

app.get('/search(/quotes?)?', (req, res) => {
  const result = searchQuotesBy('quote', req.query.q);

  sendResponse(res, 200, result);
});

// eslint-disable-next-line no-unused-vars
app.use((req, res, next) => sendResponse(res, 404));

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  sendResponse(res, 500);
  console.log(err);
});

app.use(/^\/(help|docs|api)/, express.static('src/docs'));

app.listen(PORT, () => {
  console.log('\x1b[33m%s\x1b[0m', `Server running on port: ${PORT}`);
});

export default app;
