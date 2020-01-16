const path = require('path')
const express = require('express')
const cors = require('cors')
let bodyParser = require('body-parser');
import "@babel/polyfill";

const app = express();

const bodyParserHandler = bodyParser.urlencoded({extended: false});
app.use(bodyParserHandler);
app.use(bodyParser.json());
app.use(cors());

const DIST_DIR = __dirname;
const HTML_FILE = path.join(DIST_DIR, 'index.html');

let dictionary = [];

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
    let wordsFound = [];

    for await (const word of dictionary) 
    {
        if(compareWords(req.body,word)) wordsFound.push(word);
    }

    if(wordsFound.length === 0) wordsFound.push("Nie znaleziono żadnego pasującego słowa");

    res.json(wordsFound);
}

app.post('/dictionary', postHandler);

const PORT = process.env.PORT || 8080;

app.listen(PORT, async () => 
{
    console.log(`App listening to ${PORT}....`);

    console.log('Loading...');

    const fs = require('fs');
    const readline = require('readline');
    const rl = readline.createInterface({
        input: fs.createReadStream('dict.txt'),
        crlfDelay: Infinity
    });

    for await (const line of rl) 
    {
        dictionary.push(line);
    }

    console.log('Done');
    
})