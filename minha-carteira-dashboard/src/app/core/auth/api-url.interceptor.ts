import { HttpInterceptorFn } from '@angular/common/http';

export const apiUrlInterceptor: HttpInterceptorFn = (req, next) => {
  const write = 'http://localhost:8089';
  const read = 'http://localhost:8040';

  // Verifica se a requisição começa com '/api'
  if (req.url.startsWith('/api')) {
    let apiReq;

    // Se for uma requisição de autenticação ou de escrita
    if (req.url.startsWith('/api/auth/authenticate') && req.method !== 'GET') {
      apiReq = req.clone({
        url: `${write}${req.url}`
      });
    }
    if(req.method !== 'GET'){
      apiReq = req.clone({
        url: `${read}${req.url}`
      });
    }
    if(req.method == 'GET'){
       apiReq = req.clone({
        url: `${read}${req.url}`
      });
    }
   
    else {
      // Se for uma requisição de leitura (GET)
      apiReq = req.clone({
        url: `${write}${req.url}`
      });
    }
    return next(apiReq);
  }
  console.log(req)
  // Para qualquer outra requisição, continua sem modificação
  return next(req);
};