//    yarn dev:run // comando para rodar no terminal
import Express, {Request, Response, json} from "express"

const http = require('http');
const debug = require('debug')('PROJETO-LVL1:serverjs');
const express = require('express')
const app = require('../src/app')


//================================================
function normalizePort(val:any){
    const port = parseInt(val,10);
    if (isNaN(port)){
        return val
    }
    if (port>=0){
        return port
    }
    return false;
};
//================================================

const port = normalizePort(process.env.PORT||'3000');
app.set('port', port);
const server = http.createServer(app);
const router = express.Router();
server.on('error', onError);
server.on('listening', onListening);
//================================================ ROTAS//================================================
const route = router.get('/',(request: Request, response:Response)=>{
  response.status(200).send({
      teste:"123",
      nome:"toninho do diabo"
  })
})
app.use('/', route);
//================================================//================================================

server.listen(port);
console.log('Servidor rodando em: http://localhost:'+port);


//================================================//================================================

function onError(error: any) {
    if (error.syscall !== 'listen') {
      throw error;
    }
  
    const bind = typeof port === 'string'
      ? 'Pipe ' + port
      : 'Port ' + port;
  
    switch (error.code) {
      case 'EACCES':
        console.error(bind + ' requires elevated privileges');
        process.exit(1);
        break;
      case 'EADDRINUSE':
        console.error(bind + ' is already in use');
        process.exit(1);
        break;
      default:
        throw error;
    }
  }
  
  function onListening() {
    const addr = server.address();
    const bind = typeof addr === 'string'
      ? 'pipe ' + addr
      : 'port ' + addr.port;
    debug('Listening on ' + bind);
  }