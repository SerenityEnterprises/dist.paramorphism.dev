import 'dotenv/config'
import express, { Express } from 'express'
import https from 'https'

const ALLOC_BASE_URL = "https://api.alloc.tech/v1"
const { ALLOC_API_KEY, ALLOC_OWNER, ALLOC_APPLICATION } = process.env

const app: Express = express()

app.get("/pub/:artifact/:file(*)", async (req, res) => {
  const { artifact, file } = req.params
  const ip = req.ip

  https.get(`${ALLOC_BASE_URL}/pub/@${ALLOC_OWNER}/${ALLOC_APPLICATION}/${artifact}/${file}`, {
    headers: {
      'X-Alloc-Forwarded-IP': ip,
      'X-Alloc-IP-Forwarding-Key': ALLOC_API_KEY
    }
  }, allocResponse => {
    res.statusCode = allocResponse.statusCode || 500
    res.set(allocResponse.headers)
    allocResponse.pipe(res)
  })
})

// TODO: Authorized downloads

app.use((req, res, next) => {
  res.redirect(301, "https://paramorphism.dev/")
})

const { HOST = "127.0.0.1" } = process.env
const PORT = (process.env.PORT && parseInt(process.env.PORT)) || 3001
app.listen(PORT, HOST, () => {
  console.log(`Listening on ${HOST}:${PORT}...`)
})
