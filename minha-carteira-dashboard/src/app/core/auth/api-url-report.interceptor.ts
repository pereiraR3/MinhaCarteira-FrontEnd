import { HttpInterceptorFn } from '@angular/common/http';

/**
 * Intercepta requisições destinadas à API de relatórios e as redireciona
 * para a porta correta (8083).
 */
export const reportUrlInterceptor: HttpInterceptorFn = (req, next) => {
  // URL base da API de relatórios
  const reportApiUrl = 'http://localhost:8083';

  // Verifica se a URL da requisição começa com o path dos relatórios
  if (req.url.startsWith('/api/reports')) {
    // Clona a requisição original e substitui a URL
    const apiReq = req.clone({
      url: `${reportApiUrl}${req.url}`
    });
    // Envia a requisição modificada
    return next(apiReq);
  }

  // Para qualquer outra requisição, continua sem modificação
  return next(req);
};
