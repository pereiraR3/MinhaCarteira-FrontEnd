import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';
import { GastoService } from '../../core/services/gasto.service';
import { Router } from '@angular/router'; // 1. Importe o Router

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="w-full p-8 flex flex-col items-center justify-center">
      <div class="w-full max-w-sm text-center">
        <h1 class="text-3xl font-bold text-gray-800 mb-2">Bem-vindo!</h1>
        <p class="text-gray-600 mb-8">Faça login para gerenciar suas finanças.</p>
        <form (submit)="onLogin($event)">
          <input name="email" type="email" placeholder="Email" class="w-full mb-4 px-4 py-3 rounded-lg bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500" required>
          <input name="password" type="password" placeholder="Senha" class="w-full mb-6 px-4 py-3 rounded-lg bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500" required>
          @if(authService.apiError()){
            <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative mb-4" role="alert">
              <span>{{ authService.apiError() }}</span>
            </div>
          }
          <button type="submit" class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg">Entrar</button>
        </form>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  authService = inject(AuthService);
  gastoService = inject(GastoService);
  router = inject(Router); // 2. Injete o Router

  onLogin(event: Event) {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const email = (form.elements.namedItem('email') as HTMLInputElement).value;
    const password = (form.elements.namedItem('password') as HTMLInputElement).value;
    this.authService.login(email, password);

    const userId = this.authService.userId();

    if (userId) {
      this.gastoService.loadMoreGastos();
     
    }
  }
}