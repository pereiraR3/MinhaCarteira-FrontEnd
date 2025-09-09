import { HttpInterceptorFn } from '@angular/common/http';

export const apiUrlInterceptor: HttpInterceptorFn = (req, next) => {
  const baseUrl = 'http://localhost:8040';

  if (req.url.startsWith('/api')&& !req.url.startsWith('/api/reports')) {
    const apiReq = req.clone({
      url: `${baseUrl}${req.url}`
    });
    return next(apiReq);
  }

  return next(req);
};
