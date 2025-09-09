import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './core/services/auth.service';
import { LoginComponent } from './features/login/login.component';
import { GastoComponent } from './features/gasto/gasto.component';
import { DashboardComponent } from "./shared/ui/dashboard.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, LoginComponent, DashboardComponent],
  template: `
    <div class="bg-gray-100 min-h-screen flex items-center justify-center font-sans">
      <main
        class="w-full min-h-[360px] bg-white rounded-2xl shadow-2xl flex transition-all duration-500 ease-in-out"
        [ngClass]="{
          'max-w-4xl': authService.isAuthenticated(),
          'max-w-lg': !authService.isAuthenticated()
        }">
        @if (authService.isAuthenticated()) {
          <app-dashboard class="w-full" />
        } @else {
          <app-login class="w-full" />
        }
      </main>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  authService = inject(AuthService);

  constructor() {}
}

