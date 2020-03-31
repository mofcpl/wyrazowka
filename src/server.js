import "@babel/polyfill";

const http = require('http');
const fs = require('fs');
const path = require('path');


const server = http.createServer();

const port = process.env.PORT || 3000;

let mainPage = "";
let script = "";
let stylesheet = "";
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

const loadFile = (file) =>
{
    console.log(`Wczytywanie ${file}...`);
    let tempFile = '';
    try
    {
        tempFile = fs.readFileSync(path.join(__dirname, file));
    }
    catch(err)
    {
        console.log(`Nie udało się wczytac pliku ${file}. Błąd: ${err}`)
        process.exit();
    }
    console.log("Gotowe");
    return tempFile;
}

server.addListener('request',  (req, res) => 
{
    switch(req.url)
    {
        case '/':
        {
            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
            res.write(mainPage);
            res.end();
            break;
        }
        case '/index.js':
        {
            res.writeHead(200, {'Content-Type': 'application/javascript; charset=utf-8'});
            res.write(script);
            res.end();
            break;
        }
        case '/main.css':
        {
            res.writeHead(200, {'Content-Type': 'text/css; charset=utf-8'});
            res.write(stylesheet);
            res.end();
            break;
        }
        case '/dictionary':
        {
            let body = '';
            req.on('data', chunk => {
                body += chunk.toString(); // convert Buffer to string
            });
            
            req.on('end', async () => 
            {
                const wordJson = JSON.parse(body);

                let wordsFound = [];
                for await (const word of dictionary) 
                {
                    if(compareWords(wordJson,word)) wordsFound.push(word);
                }
                
                if(wordsFound.length === 0) wordsFound.push("Nie znaleziono żadnego pasującego słowa");
            
                res.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});
                res.write(JSON.stringify(wordsFound));
                res.end();

            });

            break;
        }

        default: break;
    }

})

server.listen(port, '127.0.0.1', async () => 
{
    console.log("Nasłuchiwanie na porcie: "+ port+"...")
    
    stylesheet = loadFile('main.css');
    script = loadFile('index.js');
    mainPage = loadFile('index.html');

    console.log('Wczytywanie słownika...');
    const readline = require('readline');
    const rl = readline.createInterface({
        input: fs.createReadStream('dict.txt'),
        crlfDelay: Infinity
    });

    for await (const line of rl) 
    {
        dictionary.push(line);
    }
    console.log("Gotowe")

});