import { Router } from 'express';
import { fork } from 'child_process';

const random = new Router();

const forked = fork(process.cwd() + '/src/api/randomCalc.js')

const execChild = (cant) => {
  return new Promise((res, rej) => {
    forked.on('message', msg => {
      if (msg === 'done!') {
        forked.send(cant)
      } else {
        res(msg);
      }
    })
  })
}


random.get('/api/random', async (req, res) => {
  const result = await execChild(req.query.cant || 100000);
  res.json(result)
})

export default random;