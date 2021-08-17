const express = require('express');
const http = require('http');
const app = express();
const scraper = require('./scraper')
const { clone } = require('./cloner')
const { clean } = require('./cleaner')
const { asses } = require('./riskAsseser')

const asyncRedis = require("async-redis");
const client = asyncRedis.createClient();

client.on("error", function (err) {
    console.log("Error " + err);
});

app.get('/top/:n', async (req, res) => {

    const returnResults = []
    if (req.params.n < 1) {
        res.status(400).send('request must have n > 1')
    }
    
    var remaining = req.params.n
    var trendingResults = await scraper.scrape() //could not find api to get a as a parameters requested ammount of results.
    var links = trendingResults.map(x => x.href)

    for (const result of trendingResults) {

        if (remaining > 0) {
            var risk = await client.get(`${result.name}`)

            if (!risk) {
                await clone(result.href, result.name)
                const assesment = (await asses(result.name))
                risk = assesment.dependencies.length
                await client.set(result.name, risk, 'EX', 60);
            }

            result.risk = Number.parseInt(risk)
            returnResults.push(result)
            remaining--
        }
    }

    res.json(returnResults)
    await clean()
})

const server = http.createServer(app);
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`scraper listening at:${PORT}`);
});
