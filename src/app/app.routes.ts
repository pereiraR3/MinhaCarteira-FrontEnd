import { Routes } from '@angular/router';
import { ContentLayoutComponent } from './shared/layouts/content-layout/content-layout.component';
import { content } from './shared/routes/content.routes';

import { LoginSistemaComponent } from './sistema/login/login-sistema/login-sistema.component';
import { AutenticacaoGuard } from './sistema/login/login-sistema/autenticacao-guard.service';

export const routes: Routes = [
    { path: 'login', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginSistemaComponent },
  
  
    { path: '', component: ContentLayoutComponent, children: content, canActivate: [AutenticacaoGuard] },

    { path: '**', redirectTo: '/error/error404', pathMatch: 'full' },
];
