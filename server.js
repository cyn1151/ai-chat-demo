const express = require('express')
const app = express()

app.get('/stream', (req, res) => {
    res.setHeader('Content-Type', 'text/event-stream')
    res.setHeader('Cache-Control', 'no-cache')
    res.setHeader('Connection', 'keep-alive')
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    const messages = ['Hello', ' ', 'from', ' ', 'SSE', '!']

    let i = 0;
    const interval = setInterval(() => {
        if (i >= messages.length) {
            clearInterval(interval)
            res.write('data:[DONE]\n\n')
            res.end()
            return;
        }
        res.write(`data:${messages[i]}\n\n`)
        i++
    }, 300)

})

app.listen(3000, () => console.log('Server on http://localhost:3000'))