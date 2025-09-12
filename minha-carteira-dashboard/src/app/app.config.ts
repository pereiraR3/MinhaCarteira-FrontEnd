import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { authInterceptor } from './core/auth/auth.interceptor';
import { apiUrlInterceptor } from './core/auth/api-url.interceptor';
import { reportUrlInterceptor } from './core/auth/api-url-report.interceptor';
import { provideAnimations } from '@angular/platform-browser/animations'; // 1. IMPORTE AQUI
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideAnimationsAsync(),
    provideRouter(routes), provideClientHydration(withEventReplay()),
    provideHttpClient(),
     provideHttpClient(
      withInterceptors([
        // 1. O mais específico: redireciona /api/reports para a porta 8083
        reportUrlInterceptor,
        // 2. O geral: redireciona o restante de /api para a porta 8040
        apiUrlInterceptor,
        // 3. O de autenticação: adiciona o token de autenticação a todas as requisições de API já modificadas
        authInterceptor
      ]))
  ]
};