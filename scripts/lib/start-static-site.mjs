import fs from 'node:fs'
import http from 'node:http'
import path from 'node:path'

const contentTypes = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.jpg': 'image/jpeg',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
}

export async function startStaticSite(root, fallbackPath) {
  const dist = path.join(root, 'dist')
  const fallback = path.join(dist, fallbackPath)

  function send(response, file) {
    fs.readFile(file, (error, data) => {
      if (error) {
        response.writeHead(404)
        response.end('Not found')
        return
      }
      response.writeHead(200, { 'Content-Type': contentTypes[path.extname(file).toLowerCase()] || 'application/octet-stream' })
      response.end(data)
    })
  }

  const server = http.createServer((request, response) => {
    const url = new URL(request.url, 'http://127.0.0.1')
    const pathname = decodeURIComponent(url.pathname)
    const file = path.resolve(dist, `.${pathname}`)
    if (!file.startsWith(dist)) {
      response.writeHead(403)
      response.end('Forbidden')
      return
    }
    fs.stat(file, (error, stat) => {
      if (!error && stat.isFile()) return send(response, file)
      if (!error && stat.isDirectory()) return send(response, path.join(file, 'index.html'))
      return send(response, fallback)
    })
  })

  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve))
  const address = server.address()
  if (!address || typeof address === 'string') throw new Error('Could not start static validation server')
  return {
    origin: `http://127.0.0.1:${address.port}`,
    close: () => new Promise(resolve => server.close(resolve)),
  }
}
