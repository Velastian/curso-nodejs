import { createServer } from 'node:http'
import { sendJson } from './functions.js'
import { json } from 'node:stream/consumers'
import { randomUUID } from 'node:crypto'
import { users } from './users.js'

process.loadEnvFile()
const port = process.env.PORT ?? 3000

const server = createServer(async (req, res) => {
  const { method, url } = req
  const [pathname, queryString] = url.split('?')

  const searchParams = new URLSearchParams(queryString)

  if (method === 'GET') {
    if (pathname === '/') {
      res.setHeader('Content-Type', 'text/plain; charset=utf-8')
      return res.end('Hola desde el servidor nodejs 🙋‍♂️')
    }

    if (pathname === '/users') {
      const limit = Number(searchParams.get('limit')) || users.length
      const offset = Number(searchParams.get('offset')) || 0

      const paginatedUsers = users.slice(offset, offset + limit)

      return sendJson(res, 200, paginatedUsers)
    }

    if (pathname === '/health') {
      return sendJson(res, 200, { status: 'ok', uptime: process.uptime() })
    }
  }

  if (method === 'POST') {
    if (pathname === '/users') {
      const body = await json(req)

      if (!body || !body.name) {
        return sendJson(res, 400, { error: 'Name is required' })
      }

      const newUser = {
        id: randomUUID(),
        name: body.name
      }

      users.push(newUser)
      return sendJson(res, 201, { message: 'Se creó el usuario correctamente' })
    }

  }

  return sendJson(res, 404, { message: 'Not found' })
})

server.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`)
})
