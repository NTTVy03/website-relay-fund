import fs from 'node:fs'
import path from 'node:path'

const input = './original/website-relay-fund.html'
const outDir = 'extracted-site'
const assetsDir = path.join(outDir, 'assets')

fs.mkdirSync(outDir, { recursive: true })
fs.mkdirSync(assetsDir, { recursive: true })

const html = fs.readFileSync(input, 'utf8')

function getScriptContent(type) {
  const re = new RegExp(
    `<script type="${type.replace('/', '\\/')}">\\s*([\\s\\S]*?)\\s*<\\/script>`
  )
  const match = html.match(re)

  if (!match) throw new Error(`Cannot find ${type}`)

  return match[1]
}

const manifest = JSON.parse(getScriptContent('__bundler/manifest'))
let template = JSON.parse(getScriptContent('__bundler/template'))

function extFromMime(mime) {
  if (mime === 'image/jpeg') return '.jpg'
  if (mime === 'image/png') return '.png'
  if (mime === 'image/svg+xml') return '.svg'
  if (mime === 'font/woff2') return '.woff2'
  if (mime === 'text/css') return '.css'
  if (mime === 'text/javascript') return '.js'
  return '.bin'
}

for (const [uuid, entry] of Object.entries(manifest)) {
  const ext = extFromMime(entry.mime)
  const filename = `${uuid}${ext}`
  const filePath = path.join(assetsDir, filename)

  const buffer = Buffer.from(entry.data, 'base64')
  fs.writeFileSync(filePath, buffer)

  template = template.split(uuid).join(`assets/${filename}`)
}

fs.writeFileSync(path.join(outDir, 'index.html'), template)

console.log('Extracted site to', outDir)
