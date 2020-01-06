const path = require('path')
const express = require('express')

const app = express();
const DIST_DIR = __dirname;
const HTML_FILE = path.join(DIST_DIR, 'index.html');

app.use(express.static(DIST_DIR));

app.get('/', (req, res) => 
{
    res.sendFile(HTML_FILE);
})

app.get('/dictionary', (req, res) =>
{

    const word = req.query.word;
    res.json({word1: word+"1", word2: word+"2"});

});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => 
{
    console.log(`App listening to ${PORT}....`);
    console.log('Press Ctrl+C to quit.');
})