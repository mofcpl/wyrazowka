const path = require('path')
const express = require('express')
let bodyParser = require('body-parser');
import "@babel/polyfill";

const app = express();

const bodyParserHandler = bodyParser.urlencoded({extended: false});
app.use(bodyParserHandler);
app.use(bodyParser.json());


const DIST_DIR = __dirname;
const HTML_FILE = path.join(DIST_DIR, 'index.html');

const compareWords = (original, tested) =>
{
    if(original.length !== tested.length) return false;

    for(let i = 0; i < original.length; i++)
    {
        if(original[i] !== tested[i] && original[i] != "") return false;
    }

    return true;
}

app.use(express.static(DIST_DIR));

app.get('/', (req, res) => 
{
    res.sendFile(HTML_FILE);
})

const postHandler = async (req, res, next) =>
{
    const fs = require('fs');
    const readline = require('readline');
    const rl = readline.createInterface({
        input: fs.createReadStream('dict.txt'),
        crlfDelay: Infinity
    });

    let wordsFound = new Array();

    for await (const line of rl) 
    {
        if(compareWords(req.body,line)) wordsFound.push(line.replace(/[^a-zA-Z ]/g, ""));
    }

    res.json(wordsFound);
}

app.post('/dictionary', postHandler);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => 
{
    console.log(`App listening to ${PORT}....`);
    console.log('Press Ctrl+C to quit.');
})