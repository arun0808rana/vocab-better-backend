// var cheerio = require("cheerio");
// var axios = require("axios");

// const url = "https://www.google.co.in/search?q=define+love";

// const options = {
//   method: "GET",
//   headers: {
//     "User-Agent":
//       "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Safari/537.36",
//   },
//   url,
// };
// axios(options).then((res) => {
//   var $ = cheerio.load(res.data);

//   var a = $(".mw").text();
//   console.log(a,'---');
// });

// ---------------------------------------------
// const express = require('express')
// const app = express()
// const port = 3000

// const fs = require('fs');
// const readline = require('readline');

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`)
// })

// async function processLineByLine() {
//   const fileStream = fs.createReadStream('test.txt');

//   const rl = readline.createInterface({
//     input: fileStream,
//     crlfDelay: Infinity
//   });
//   // Note: we use the crlfDelay option to recognize all instances of CR LF
//   // ('\r\n') in input.txt as a single line break.

//   for await (const line of rl) {
//     // Each line in input.txt will be successively available here as `line`.
//     console.log(`Line from file: ${line}`);
//   }
// }

// processLineByLine();

// ----------------------------------------------------
// const events = require('events');
// const fs = require('fs');
// const readline = require('readline');

// (async function processLineByLine() {
//   try {
//     const rl = readline.createInterface({
//       input: fs.createReadStream('input.txt'),
//       crlfDelay: Infinity
//     });

//     rl.on('line', (line) => {
//       console.log(`Line from file: ${line}`);
//     });

//     await events.once(rl, 'close');

//     console.log('Reading file line by line with readline done.');
//     const used = process.memoryUsage().heapUsed / 1024 / 1024;
//     console.log(`The script uses approximately ${Math.round(used * 100) / 100} MB`);
//   } catch (err) {
//     console.error(err);
//   }
// })();

// -----------------------------------------------------------

const rl = require("readline");
const express = require("express");
const app = express();
const port = 8080;
var cors = require("cors");

app.use(cors());

app.get("/", (req, res) => {
  const lineReader = rl.createInterface({
    input: require("fs").createReadStream(__dirname + "/input.txt"),
  });
  let lineCounter = 0;
  const wantedLines = [];

  lineReader.on("line", function (line) {
    const upperLimit = req.query.page * 5;
    const lowerLimit = upperLimit - 5;

    lineCounter++;

    if (lineCounter > lowerLimit && lineCounter <= upperLimit) {
      wantedLines.push(line);
    }

    if (lineCounter === upperLimit) {
      lineReader.close();
    }
  });

  lineReader.on("close", function () {
    console.log(wantedLines);
    res.send(wantedLines);
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
