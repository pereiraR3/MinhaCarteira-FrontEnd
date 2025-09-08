import { CommonModule, DOCUMENT, isPlatformBrowser } from '@angular/common';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, computed, inject, PLATFORM_ID, Renderer2, signal } from '@angular/core';

// Interfaces based on API DTOs
interface Gasto {
  id: number;
  nome: string;
  valor: number;
  data: string; // API returns date as string
  descricao: string;
  dataCriacao: string;
  categoriaId: number;
  usuarioId: number;
}

interface User {
  id: number;
  nome: string;
  email: string;
}

interface Page<T> {
  content: T[];
  totalPages: number;
  number: number; // Current page number
}


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, HttpClientModule], // Import HttpClientModule
  template: `
    <div class="bg-gray-100 min-h-screen flex items-center justify-center font-sans">
      <!-- Main Container -->
      <div class="w-full max-w-4xl min-h-[500px] bg-white rounded-2xl shadow-2xl flex flex-col md:flex-row overflow-hidden">
        
        <!-- Conditional rendering: Login or Dashboard -->
        @if (!isAuthenticated()) {
          <!-- Login Section -->
          <div class="w-full p-8 flex flex-col items-center justify-center">
            <div class="w-full max-w-sm text-center">
              <h1 class="text-3xl font-bold text-gray-800 mb-2">Bem-vindo de volta!</h1>
              <p class="text-gray-600 mb-8">Faça login para gerenciar suas finanças.</p>
              
              <form (submit)="login($event)">
                <div class="mb-4 text-left">
                  <label for="email" class="block text-gray-700 text-sm font-bold mb-2">Email</label>
                  <input #emailInput id="email" type="email" placeholder="seuemail@exemplo.com" class="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200" required>
                </div>
                <div class="mb-6 text-left">
                  <label for="password" class="block text-gray-700 text-sm font-bold mb-2">Senha</label>
                  <input #passwordInput id="password" type="password" placeholder="********" class="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200" required>
                </div>

                @if(apiError()){
                  <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative mb-4" role="alert">
                    <span class="block sm:inline">{{ apiError() }}</span>
                  </div>
                }

                <button type="submit" class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline transition duration-300 transform hover:scale-105">
                  Entrar
                </button>
              </form>
            </div>
          </div>
        } @else {
          <!-- Dashboard Section -->
          <div class="w-full p-8 flex flex-col">
            <header class="flex justify-between items-center mb-8">
              <div>
                <h1 class="text-3xl font-bold text-gray-800">Seu Dashboard</h1>
                <p class="text-gray-600">Visão geral das suas despesas.</p>
              </div>
              <button (click)="logout()" class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline transition duration-300 transform hover:scale-105">
                Sair
              </button>
            </header>
            
            <!-- Add Expense Form -->
            <div class="bg-gray-50 p-6 rounded-xl shadow-md mb-8">
              <h2 class="text-xl font-bold text-gray-800 mb-4">Adicionar Novo Gasto</h2>
              <form (submit)="addGasto($event)" class="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <input #nomeGasto placeholder="Nome do gasto" class="md:col-span-2 px-4 py-3 rounded-lg bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500" required>
                  <input #valorGasto type="number" step="0.01" placeholder="Valor (R$)" class="px-4 py-3 rounded-lg bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500" required>
                  <button type="submit" class="md:col-span-1 w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline transition duration-300">
                    Adicionar
                  </button>
              </form>
               @if(apiError()){
                  <p class="text-red-500 mt-2">{{ apiError() }}</p>
               }
            </div>

            <!-- Expenses List -->
            <div class="flex-1 overflow-y-auto">
              <h2 class="text-xl font-bold text-gray-800 mb-4">Histórico de Gastos</h2>
               @if(gastos().length > 0){
                <ul class="space-y-3">
                  @for(gasto of gastos(); track gasto.id) {
                    <li class="flex justify-between items-center bg-white p-4 rounded-lg shadow">
                      <div class="flex items-center">
                        <div class="p-3 rounded-full bg-blue-100 mr-4">
                          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-500" fill="none" viewBox="0 '0' 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 10v-1m0 0c-1.657 0-3-.895-3-2s1.343-2 3-2 3-.895 3-2c0-1.105-1.343-2-3-2m0 0c-1.11 0-2.08-.402-2.599-1M12 4V3" /></svg>
                        </div>
                        <div>
                          <p class="font-semibold text-gray-800">{{gasto.nome}}</p>
                          <p class="text-sm text-gray-500">{{gasto.data | date: 'dd/MM/yyyy HH:mm'}}</p>
                        </div>
                      </div>
                      <p class="font-bold text-lg text-red-500">- R$ {{gasto.valor.toFixed(2)}}</p>
                    </li>
                  }
                </ul>
               } @else {
                  <div class="text-center py-12">
                     <p class="text-gray-500">Nenhum gasto registrado ainda.</p>
                  </div>
               }
            </div>

            <!-- Pagination Controls -->
            <div class="mt-4 text-center">
                @if(isLoading()) {
                    <p class="text-gray-500 animate-pulse">Carregando...</p>
                }
                @if(!isLoading() && currentPage() < totalPages() - 1) {
                    <button (click)="loadMoreGastos()" class="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-6 rounded-lg focus:outline-none focus:shadow-outline transition duration-300">
                        Carregar Mais
                    </button>
                }
            </div>
            
            <!-- Footer with total expenses -->
            <footer class="mt-8 pt-4 border-t-2 border-gray-200 flex justify-end">
                <div class="text-right">
                    <p class="text-gray-600 text-md">Total Gasto:</p>
                    <p class="font-bold text-2xl text-gray-800">R$ {{ totalGastos().toFixed(2) }}</p>
                </div>
            </footer>
          </div>
        }
      </div>
    </div>
  `,
  styles: [`
    :host {
      --primary-color: #4F46E5;
      --secondary-color: #10B981;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  private http = inject(HttpClient);
  private renderer = inject(Renderer2);
  private document = inject(DOCUMENT);
  private platformId = inject(PLATFORM_ID);
  private readonly API_URL = 'http://localhost:8040/api';

  // State Signals
  authToken = signal<string | null>(null);
  currentUser = signal<User | null>(null);
  isAuthenticated = computed(() => !!this.authToken());
  apiError = signal<string | null>(null);
  gastos = signal<Gasto[]>([]);
  
  // Pagination Signals
  currentPage = signal(0);
  totalPages = signal(0);
  isLoading = signal(false);

  // Computed Signal for total expenses
  totalGastos = computed(() => this.gastos().reduce((total, gasto) => total + gasto.valor, 0));

  constructor() {
    const script = this.renderer.createElement('script');
    script.src = 'https://cdn.tailwindcss.com';
    this.renderer.appendChild(this.document.head, script);
    this.restoreSession();
  }

  private jwtDecode(token: string): any {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
      return null;
    }
  }

  login(event: Event) {
    event.preventDefault();
    this.apiError.set(null);
    const email = (event.target as HTMLFormElement).querySelector<HTMLInputElement>('#email')?.value;
    const password = (event.target as HTMLFormElement).querySelector<HTMLInputElement>('#password')?.value;

    if (!email || !password) {
      this.apiError.set('Por favor, preencha o email e a senha.');
      return;
    }
    
    const body = { email, senha: password };
    this.http.post<any>(`${this.API_URL}/auth/authenticate`, body).subscribe({
      next: (response) => {
        const token = response.accessToken;
        if (token) {
          this.authToken.set(token);
          const decodedToken = this.jwtDecode(token);
           if (decodedToken && decodedToken.sub) {
            this.fetchUserDetails(decodedToken.sub);
          } else {
            this.apiError.set('Token JWT inválido.');
          }
        } else {
           this.apiError.set('Token não recebido da API.');
        }
      },
      error: (err) => {
        this.apiError.set('Falha na autenticação. Verifique suas credenciais.');
        console.error('Login error:', err);
      }
    });
  }

  fetchUserDetails(email: string) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.authToken()}`);
    this.http.get<{ content: User[] }>(`${this.API_URL}/usuario/find-by-filter?email=${email}`, { headers })
    .subscribe({
        next: (response) => {
            if (response.content && response.content.length > 0) {
                const user = response.content[0];
                this.currentUser.set(user);
                this.saveSession(this.authToken()!, user);
                this.resetAndFetchGastos(); // Fetch initial data after login
            } else {
                this.apiError.set('Não foi possível encontrar os detalhes do usuário.');
                this.logout();
            }
        },
        error: (err) => {
            this.apiError.set('Erro ao buscar detalhes do usuário.');
            console.error('Fetch user details error:', err);
            this.logout();
        }
    });
  }

  logout() {
    this.authToken.set(null);
    this.currentUser.set(null);
    this.gastos.set([]);
    this.currentPage.set(0);
    this.totalPages.set(0);
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('authToken');
      localStorage.removeItem('currentUser');
    }
  }

  private saveSession(token: string, user: User) {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('authToken', token);
      localStorage.setItem('currentUser', JSON.stringify(user));
    }
  }

  private restoreSession() {
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('authToken');
      const userJson = localStorage.getItem('currentUser');
      if (token && userJson) {
        this.authToken.set(token);
        this.currentUser.set(JSON.parse(userJson));
        this.resetAndFetchGastos(); // Fetch initial data from session
      }
    }
  }

  private resetAndFetchGastos() {
    const user = this.currentUser();
    if (!user) return;
    
    this.gastos.set([]);
    this.currentPage.set(0);
    this.totalPages.set(0);
    this.getGastos(user.id, 0);
  }

  getGastos(usuarioId: number, page: number = 0) {
    if (this.isLoading()) return;
    this.isLoading.set(true);
    this.apiError.set(null);

    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.authToken()}`);
    this.http.get<Page<Gasto>>(`${this.API_URL}/gasto/find-by-filter?usuarioId=${usuarioId}&page=${page}&size=10`, { headers }).subscribe({
        next: (response) => {
            if (page === 0) {
                this.gastos.set(response.content || []);
            } else {
                this.gastos.update(currentGastos => [...currentGastos, ...(response.content || [])]);
            }
            this.totalPages.set(response.totalPages);
            this.currentPage.set(response.number);
            this.isLoading.set(false);
        },
        error: (err) => {
            this.apiError.set('Não foi possível carregar os gastos.');
            console.error('Get Gastos error:', err);
            this.isLoading.set(false);
        }
    });
  }

  loadMoreGastos() {
    const user = this.currentUser();
    if (user && user.id) {
        const nextPage = this.currentPage() + 1;
        if (nextPage < this.totalPages()) {
            this.getGastos(user.id, nextPage);
        }
    }
  }

  addGasto(event: Event) {
    event.preventDefault();
    this.apiError.set(null);
    const form = event.target as HTMLFormElement;
    const nomeInput = form.querySelector<HTMLInputElement>('input[placeholder="Nome do gasto"]');
    const valorInput = form.querySelector<HTMLInputElement>('input[type="number"]');

    if (nomeInput && valorInput && nomeInput.value && valorInput.value && this.currentUser()) {
      const body = {
        nome: nomeInput.value,
        valor: parseFloat(valorInput.value),
        descricao: nomeInput.value,
        data: new Date().toISOString(),
        categoriaId: 1, // Hardcoded
        usuarioId: this.currentUser()!.id
      };

      const headers = new HttpHeaders().set('Authorization', `Bearer ${this.authToken()}`);
      
      this.http.post<Gasto>(`${this.API_URL}/gasto/create`, body, { headers }).subscribe({
        next: (newGasto) => {
          this.gastos.update(currentGastos => [newGasto, ...currentGastos]);
          form.reset();
        },
        error: (err) => {
          this.apiError.set('Erro ao adicionar o gasto.');
          console.error('Add Gasto error:', err);
        }
      });
    }
  }
}

