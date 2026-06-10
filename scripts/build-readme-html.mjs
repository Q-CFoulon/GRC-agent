import { marked } from 'marked';
import fs from 'fs';
import path from 'path';

const md = fs.readFileSync('README.md', 'utf8');
const body = marked(md);

const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>GRC Agent — Documentation</title>
  <style>
    :root {
      --bg: #ffffff;
      --text: #1a1a2e;
      --muted: #555;
      --border: #e0e0e0;
      --accent: #2563eb;
      --accent-light: #dbeafe;
      --code-bg: #f5f5f5;
      --table-stripe: #f9fafb;
      --radius: 6px;
    }
    @media (prefers-color-scheme: dark) {
      :root {
        --bg: #1a1a2e;
        --text: #e0e0e0;
        --muted: #a0a0a0;
        --border: #333;
        --accent: #60a5fa;
        --accent-light: #1e3a5f;
        --code-bg: #2a2a3e;
        --table-stripe: #222238;
      }
    }
    * { box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, sans-serif;
      line-height: 1.7;
      color: var(--text);
      background: var(--bg);
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 960px;
      margin: 0 auto;
      padding: 2rem 1.5rem;
    }
    h1 {
      font-size: 2.2rem;
      border-bottom: 3px solid var(--accent);
      padding-bottom: 0.5rem;
      margin-top: 0;
    }
    h2 {
      font-size: 1.6rem;
      margin-top: 2.5rem;
      border-bottom: 1px solid var(--border);
      padding-bottom: 0.3rem;
    }
    h3 {
      font-size: 1.25rem;
      margin-top: 2rem;
      color: var(--accent);
    }
    a {
      color: var(--accent);
      text-decoration: none;
    }
    a:hover { text-decoration: underline; }
    code {
      background: var(--code-bg);
      padding: 0.15em 0.4em;
      border-radius: 3px;
      font-size: 0.9em;
      font-family: 'Fira Code', 'Cascadia Code', Consolas, monospace;
    }
    pre {
      background: var(--code-bg);
      border: 1px solid var(--border);
      border-radius: var(--radius);
      padding: 1rem;
      overflow-x: auto;
      font-size: 0.85rem;
      line-height: 1.5;
    }
    pre code {
      background: none;
      padding: 0;
      font-size: inherit;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin: 1rem 0;
      font-size: 0.9rem;
    }
    th, td {
      text-align: left;
      padding: 0.6rem 0.8rem;
      border: 1px solid var(--border);
    }
    th {
      background: var(--accent-light);
      font-weight: 600;
    }
    tr:nth-child(even) { background: var(--table-stripe); }
    ul, ol { padding-left: 1.5rem; }
    li { margin-bottom: 0.3rem; }
    strong { font-weight: 600; }
    blockquote {
      border-left: 4px solid var(--accent);
      margin: 1rem 0;
      padding: 0.5rem 1rem;
      background: var(--accent-light);
      border-radius: 0 var(--radius) var(--radius) 0;
    }
    hr {
      border: none;
      border-top: 1px solid var(--border);
      margin: 2rem 0;
    }
    .back-to-top {
      position: fixed;
      bottom: 2rem;
      right: 2rem;
      background: var(--accent);
      color: white;
      border: none;
      border-radius: 50%;
      width: 40px;
      height: 40px;
      font-size: 1.2rem;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 2px 8px rgba(0,0,0,0.2);
    }
    .back-to-top:hover { opacity: 0.85; }
    @media (max-width: 768px) {
      .container { padding: 1rem; }
      h1 { font-size: 1.7rem; }
      table { font-size: 0.8rem; }
      th, td { padding: 0.4rem 0.5rem; }
    }
  </style>
</head>
<body>
  <div class="container">
    ${body}
  </div>
  <button class="back-to-top" onclick="window.scrollTo({top:0,behavior:'smooth'})" title="Back to top">&uarr;</button>
</body>
</html>`;

const outPath = path.join('docs', 'README.html');
fs.writeFileSync(outPath, html, 'utf8');
console.log(`Generated ${outPath} (${(html.length / 1024).toFixed(1)} KB)`);
