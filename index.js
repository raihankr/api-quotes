import express from 'express';
import { readJSONL } from 'jsonl-to-json.js;'

const app = express();
const PORT = process.env.PORT;
const DATASET = 'src/datasets/quotes.jsonl';

console.log('... Fetching the dataset from: ' + DATASET);
console.time('Dataset fetched');
const data = readJSONL(DATASET);
console.timeEnd('Dataset fetched');

app.get('/random', (req, res) => {
  let filtered = data.filter(item => {
    let {
      maxlength,
      tag,
    } = req.query;
  })
  let randIdx = Math.floor(Math.random() * data.length)
  
});

app.listen(PORT, () => {
  console.log('Server running on port: ' + PORT);
});