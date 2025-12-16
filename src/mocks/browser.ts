import { server } from './handlers';

server.start().then(() => {
  console.log('Servidor mock GraphQL rodando.');
});