import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GastoService } from '../../core/services/gasto.service';
import { ReportService } from '../../core/services/report.service';
import { CategoriaService } from '../../core/services/categoria.service';
import { Gasto } from '../../core/models';
import { GastoFormComponent, GastoPayload } from './gasto-form/gasto-form.component';
import { GastoListComponent } from './gasto-list/gasto-list.component';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, GastoListComponent, GastoFormComponent, GastoListComponent],
  template: `
    <main class="p-4 sm:p-6 lg:p-8 bg-gray-50 min-h-screen">
          <header class="flex justify-between items-center mb-8">
        <div>
          <h1 class="text-3xl font-bold text-gray-800">Seu Dashboard</h1>
          <p class="text-gray-600">Bem-vindo, {{ authService.currentUser()?.nome }}!</p>
        </div>
        <button (click)="authService.logout()" class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg">
          Sair
        </button>
      </header>
      <div class="max-w-7xl mx-auto">
        <!-- Notificações de Ações -->
        @if(reportService.isLoading() || gastoService.isLoading()){
          <div class="mb-4 p-4 bg-blue-100 text-blue-800 rounded-lg animate-pulse">Processando sua solicitação...</div>
        }
        @if(reportService.successMessage()){
          <div class="mb-4 p-4 bg-green-100 text-green-800 rounded-lg">{{ reportService.successMessage() }}</div>
        }
        @if(reportService.apiError() || gastoService.apiError()){
          <div class="mb-4 p-4 bg-red-100 text-red-800 rounded-lg">
            {{ reportService.apiError() || gastoService.apiError() }}
          </div>
        }

        <!-- Formulário de Gastos (Renderização Condicional) -->
        <app-gasto-form
          [categorias]="categoriaService.categorias()"
          [isLoadingCategorias]="categoriaService.isLoading()"
          (add)="onAddGasto($event)"
        ></app-gasto-form>

        <!-- Lista de Gastos -->
        <app-gasto-list
          [gastos]="gastoService.gastos()"
          [isLoading]="gastoService.isLoading()"
          [canLoadMore]="gastoService.currentPage() < gastoService.totalPages() - 1"
          (loadMore)="onLoadMore()"
          (delete)="onDeleteGasto($event)"
          (update)="onUpdateGasto($event)"
          (generateReport)="onGenerateReport()"
        ></app-gasto-list>
      </div>
    </main>
  `,
})
export class DashboardComponent {
    authService = inject(AuthService);
  gastoService = inject(GastoService);
  reportService = inject(ReportService);
  categoriaService = inject(CategoriaService);

  onLoadMore(): void {
    const nextPage = this.gastoService.currentPage() + 1;
    this.gastoService.fetchGastos(nextPage);
  }

  onDeleteGasto(id: number): void {
    // Idealmente, usar um modal de confirmação aqui
    if (confirm('Tem certeza que deseja deletar este gasto?')) {
      this.gastoService.deleteGasto(id);
    }
  }

  onAddGasto(gastoPayload: GastoPayload): void {
      this.gastoService.createGasto(gastoPayload).subscribe();
  }

  onUpdateGasto(gasto: Gasto): void {
   
    console.log('Evento de update recebido:', gasto);
    alert('A funcionalidade de editar um gasto precisa ser implementada com um formulário modal.');
  }

  /**
   * Pega a data atual e chama o serviço para ENVIAR o relatório por e-mail.
   */
  onGenerateReport(): void {
    const currentDate = new Date();
    const mes = currentDate.getMonth() + 1; // getMonth() é 0-indexed
    const ano = currentDate.getFullYear();
    const usuarioId = this.authService.currentUser()?.id;
    
    this.reportService.sendMonthlyReportByEmail({ mes, ano, usuarioId });
  }
}

