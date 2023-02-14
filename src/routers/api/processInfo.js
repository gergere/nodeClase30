import { Router } from "express";

const info = new Router();


const processData = {
  argumentos: process.argv.slice(2),
  plataforma: process.platform,
  nodeVersion: process.version,
  rss: process.memoryUsage().rss,
  path: process.execPath,
  IDProcess: process.pid,
  folder: process.cwd(),
}

info.get('/info', (req, res) => {
  res.json(processData)
})

export default info;