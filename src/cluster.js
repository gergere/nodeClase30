import { server } from './main.js';
import os from 'os';
import cluster from 'cluster';

const cpus = os.cpus().length;

if (cluster.isPrimary) {
  for (let i = 0; i < cpus; i++) {
    cluster.fork();
  }
  cluster.on('exit', worker => {
    console.log(`Worker ${worker.id} con el pid ${worker.process.pid} finalizó. ${new Date().toLocaleString()}`);
    cluster.fork();
  })
} else {
  const app = server();
  try {
    const connectedServer = await app.listen;
    console.log(`Proceso ${process.pid} escuchando en el puerto ${connectedServer.address().port}`);
  } catch (error) {
    console.log(`Error en servidor ${error}`);
  }
}