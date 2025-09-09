import { Injectable, signal, computed, inject, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { User } from '../models';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private platformId = inject(PLATFORM_ID);

  authToken = signal<string | null>(null);
  currentUser = signal<User | null>(null);
  apiError = signal<string | null>(null);

  isAuthenticated = computed(() => !!this.authToken());
  userId = computed(() => this.currentUser()?.id);

  constructor() {
    this.restoreSession();
  }

  login(email: string, password: string | undefined) {
    if (!email || !password) {
      this.apiError.set('Por favor, preencha o email e a senha.');
      return;
    }
    this.apiError.set(null);
    const body = { email, senha: password };

    this.http.post<any>(`api/auth/authenticate`, body).subscribe({
      next: (response) => {
        const token = response.accessToken;
        if (!token) {
          this.apiError.set('Token não recebido da API.');
          return;
        }
        this.authToken.set(token);
        const decoded = this.jwtDecode(token);
        if (decoded?.sub) {
          this.fetchUserDetails(decoded.sub);
        } else {
          this.apiError.set('Token JWT inválido.');
        }
      },
      error: () => this.apiError.set('Falha na autenticação. Verifique suas credenciais.')
    });
  }

  logout() {
    this.authToken.set(null);
    this.currentUser.set(null);
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('authToken');
      localStorage.removeItem('currentUser');
    }
  }

  private fetchUserDetails(email: string) {
    this.http.get<User>(`api/usuario/search-by-email/${email}`)
      .subscribe({
        next: (response) => {
          const user = response;
          if (user) {
            this.currentUser.set(user);
            this.saveSession(this.authToken()!, user);
          } else {
            this.apiError.set('Não foi possível encontrar os detalhes do usuário.');
            this.logout();
          }
        },
        error: () => {
          this.apiError.set('Erro ao buscar detalhes do usuário.');
          this.logout();
        }
      });
  }

  private restoreSession() {
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('authToken');
      const userJson = localStorage.getItem('currentUser');
      if (token && userJson) {
        this.authToken.set(token);
        this.currentUser.set(JSON.parse(userJson));
      }
    }
  }

  private saveSession(token: string, user: User) {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('authToken', token);
      localStorage.setItem('currentUser', JSON.stringify(user));
    }
  }

  private jwtDecode(token: string): { sub?: string } | null {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch {
      return null;
    }
  }
}
