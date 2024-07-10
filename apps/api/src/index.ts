import http from 'node:http'

const hostname = '0.0.0.0'
const port = 8888

const server = http.createServer((req, res) => {
  if (req.method === 'POST' && req.headers['content-type'] === 'application/json') {
    let body = ''

    req.on('data', (chunk) => {
      body += chunk.toString()
    })

    req.on('end', async () => {
      console.log('Received HTML data:', body)
      res.statusCode = 200
      res.setHeader('Content-Type', 'application/json')
      res.end(JSON.stringify({ success: true, message: 'HTML data received' }))
      await createPodcast(body)
    })
  } else {
    res.statusCode = 400
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify({ success: false, error: 'Only POST requests with Content-Type application/json are accepted' }))
  }
})

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`)
})

const createPodcast = async (html: string) => {
  console.log('Creating podcast from HTML:', html)
}
