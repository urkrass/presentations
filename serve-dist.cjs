const http = require('node:http')
const fs = require('node:fs')
const path = require('node:path')

const root = path.resolve(__dirname, 'dist')
const port = Number(process.env.PRESENTATIONS_PORT || 3030)
const startRoute = process.env.PRESENTATIONS_START_ROUTE || '/'

const types = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.json': 'application/json',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
}

function sendFile(response, file) {
  fs.readFile(file, (error, data) => {
    if (error) {
      response.writeHead(404)
      response.end('Not found')
      return
    }
    response.writeHead(200, {
      'Content-Type': types[path.extname(file).toLowerCase()] || 'application/octet-stream',
    })
    response.end(data)
  })
}

function fallbackFile(pathname) {
  if (pathname.startsWith('/grade-7/lab-measurement/')) {
    return path.join(root, 'grade-7', 'lab-measurement', 'index.html')
  }
  if (pathname.startsWith('/grade-8/stoichiometry/')) {
    return path.join(root, 'grade-8', 'stoichiometry', 'index.html')
  }
  if (pathname.startsWith('/grade-11/integration-control/')) {
    return path.join(root, 'grade-11', 'integration-control', 'index.html')
  }
  if (pathname.startsWith('/ib-dp/a2-cells-viruses/')) {
    return path.join(root, 'ib-dp', 'a2-cells-viruses', 'index.html')
  }
  if (pathname.startsWith('/experiments/visual-lab/')) {
    return path.join(root, 'experiments', 'visual-lab', 'index.html')
  }
  return path.join(root, 'index.html')
}

http.createServer((request, response) => {
  const url = new URL(request.url, `http://localhost:${port}`)
  let pathname = decodeURIComponent(url.pathname)
  if (pathname === '/') pathname = '/index.html'

  const file = path.resolve(root, `.${pathname}`)
  if (!file.startsWith(root)) {
    response.writeHead(403)
    response.end('Forbidden')
    return
  }

  fs.stat(file, (error, stat) => {
    if (!error && stat.isFile()) {
      sendFile(response, file)
      return
    }
    if (!error && stat.isDirectory()) {
      sendFile(response, path.join(file, 'index.html'))
      return
    }
    sendFile(response, fallbackFile(pathname))
  })
}).listen(port, '127.0.0.1', () => {
  console.log(`Static Slidev deck on http://localhost:${port}${startRoute}`)
})
