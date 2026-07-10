function safeScriptJson(value) {
  return JSON.stringify(value)
    .replace(/</g, '\\u003C')
    .replace(/>/g, '\\u003E')
    .replace(/&/g, '\\u0026')
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029')
}

import fs from 'node:fs'
import path from 'node:path'
import crypto from 'node:crypto'

const rootDir = process.cwd()

const srcDir = path.join(rootDir, 'src')
const inputHtml = path.join(srcDir, 'index.html')

const distDir = path.join(rootDir, 'dist')
const outputHtml = path.join(distDir, 'index.html')

fs.mkdirSync(distDir, { recursive: true })

if (!fs.existsSync(inputHtml)) {
  throw new Error(`Cannot find input HTML: ${inputHtml}`)
}

let template = fs.readFileSync(inputHtml, 'utf8')
const manifest = {}

function uuid() {
  return crypto.randomUUID()
}

function mimeOf(file) {
  const ext = path.extname(file).toLowerCase()

  switch (ext) {
    case '.html':
      return 'text/html'
    case '.js':
      return 'text/javascript'
    case '.css':
      return 'text/css'
    case '.png':
      return 'image/png'
    case '.jpg':
    case '.jpeg':
      return 'image/jpeg'
    case '.svg':
      return 'image/svg+xml'
    case '.webp':
      return 'image/webp'
    case '.gif':
      return 'image/gif'
    case '.ico':
      return 'image/x-icon'
    case '.woff2':
      return 'font/woff2'
    case '.woff':
      return 'font/woff'
    case '.ttf':
      return 'font/ttf'
    case '.otf':
      return 'font/otf'
    case '.json':
      return 'application/json'
    case '.pdf':
      return 'application/pdf'
    default:
      return 'application/octet-stream'
  }
}

function collectFiles(dir) {
  if (!fs.existsSync(dir)) return []

  const result = []

  for (const item of fs.readdirSync(dir)) {
    const fullPath = path.join(dir, item)
    const stat = fs.statSync(fullPath)

    if (stat.isDirectory()) {
      result.push(...collectFiles(fullPath))
    } else {
      result.push(fullPath)
    }
  }

  return result
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function replaceAllAssetRefs(html, assetPath, replacement) {
  const normalized = assetPath.replaceAll(path.sep, '/')

  const variants = [
    normalized,
    `/${normalized}`,
    `./${normalized}`,
  ]

  let result = html

  for (const variant of variants) {
    result = result.replace(
      new RegExp(escapeRegExp(variant), 'g'),
      replacement
    )
  }

  return result
}

const assetFiles = collectFiles(srcDir)
  .filter(file => file !== inputHtml)
  .filter(file => {
    const rel = path.relative(srcDir, file).replaceAll(path.sep, '/')

    // Ignore hidden/system files
    if (rel.startsWith('.')) return false
    if (rel.includes('/.')) return false

    return /\.(js|css|png|jpg|jpeg|svg|webp|gif|ico|woff2|woff|ttf|otf|json|pdf)$/i.test(file)
  })

for (const file of assetFiles) {
  const rel = path.relative(srcDir, file).replaceAll(path.sep, '/')
  const id = uuid()
  const buffer = fs.readFileSync(file)

  manifest[id] = {
    mime: mimeOf(file),
    compressed: false,
    data: buffer.toString('base64'),
  }

  template = replaceAllAssetRefs(template, rel, id)
}

const manifestJson = safeScriptJson(manifest)
const templateJson = safeScriptJson(template)

const wrapper = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Relay Fund</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style>
    body {
      margin: 0;
      font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      background: #ffffff;
      color: #0f172a;
      min-height: 100vh;
    }

    #__bundler_loading {
      position: fixed;
      right: 20px;
      bottom: 20px;
      z-index: 10000;
      padding: 8px 14px;
      border-radius: 999px;
      background: #ffffff;
      color: #475569;
      font-size: 14px;
      box-shadow: 0 8px 24px rgba(15, 23, 42, 0.16);
      border: 1px solid rgba(148, 163, 184, 0.3);
    }
  </style>
</head>
<body>
  <div id="__bundler_loading">Unpacking...</div>

  <script>
    document.addEventListener('DOMContentLoaded', async function () {
      const loading = document.getElementById('__bundler_loading')

      function setStatus(message) {
        if (loading) loading.textContent = message
      }

      try {
        const manifestEl = document.querySelector('script[type="__bundler/manifest"]')
        const templateEl = document.querySelector('script[type="__bundler/template"]')

        if (!manifestEl || !templateEl) {
          setStatus('Missing bundle data')
          return
        }

        const manifest = JSON.parse(manifestEl.textContent)
        let template = JSON.parse(templateEl.textContent)

        const blobUrls = {}

        for (const [id, entry] of Object.entries(manifest)) {
          const binary = atob(entry.data)
          const bytes = new Uint8Array(binary.length)

          for (let i = 0; i < binary.length; i++) {
            bytes[i] = binary.charCodeAt(i)
          }

          blobUrls[id] = URL.createObjectURL(
            new Blob([bytes], { type: entry.mime })
          )
        }

        setStatus('Rendering...')

        for (const [id, url] of Object.entries(blobUrls)) {
          template = template.split(id).join(url)
        }

        const parsedDoc = new DOMParser().parseFromString(template, 'text/html')
        document.documentElement.replaceWith(parsedDoc.documentElement)

        // Re-execute scripts because scripts parsed via DOMParser are inert.
        const scripts = Array.from(document.scripts)

        for (const oldScript of scripts) {
          const script = document.createElement('script')

          for (const attr of oldScript.attributes) {
            script.setAttribute(attr.name, attr.value)
          }

          script.textContent = oldScript.textContent

          const waitForScript = script.src
            ? new Promise(resolve => {
                script.onload = resolve
                script.onerror = resolve
              })
            : null

          oldScript.replaceWith(script)

          if (waitForScript) {
            await waitForScript
          }
        }
      } catch (error) {
        setStatus('Error unpacking bundle')
        console.error(error)
      }
    })
  </script>

  <script type="__bundler/manifest">
${manifestJson}
  </script>
  
  <script type="__bundler/template">
${templateJson}
  </script>
</body>
</html>`

fs.writeFileSync(outputHtml, wrapper)

console.log('Packed successfully!')
console.log(`Input:  ${path.relative(rootDir, inputHtml)}`)
console.log(`Assets: ${assetFiles.length}`)
console.log(`Output: ${path.relative(rootDir, outputHtml)}`)
