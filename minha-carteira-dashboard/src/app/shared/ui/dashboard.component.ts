import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterCriteria, GastoService } from '../../core/services/gasto.service';
import { ReportService } from '../../core/services/report.service';
import { CategoriaService } from '../../core/services/categoria.service';
import { Gasto } from '../../core/models';
import { GastoFormComponent, GastoPayload } from './gasto-form/gasto-form.component';
import { GastoListComponent } from './gasto-list/gasto-list.component';
import { AuthService } from '../../core/services/auth.service';
import { ModalComponent } from '../modal/modal.component';
import { GastoFilterComponent } from "../../features/gasto/gasto-filter.component";
import { Router, RouterModule } from '@angular/router';
import { ChartsComponent } from "./charts/charts.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule], // Apenas o necessário para a moldura
  template: `
    <main class="p-4 sm:p-6 lg:p-8 bg-gray-50 min-h-screen">
      <header class="flex justify-between items-center mb-8">
        <div>
          <h1 class="text-3xl font-bold text-gray-800">Controle de gasto</h1>
          <p class="text-gray-600">Bem-vindo, {{ authService.currentUser()?.nome }}!</p>
        </div>
        <div class="flex items-center space-x-4">
          <button routerLink="charts" class="bg-blue-500 hover:bg-blue-600 ...">
            Ver Gráficos
          </button>
          <button (click)="authService.logout()" class="bg-red-500 hover:bg-red-600 ...">
            Sair
          </button>
        </div>
      </header>
      
      <router-outlet></router-outlet>

    </main>
  `,
})
export class DashboardComponent {
  authService = inject(AuthService);
  gastoService = inject(GastoService);
  reportService = inject(ReportService);
  categoriaService = inject(CategoriaService);
  router = inject(Router); 
  activeFilter = signal<'este_mes' | 'mes_passado'>('este_mes');
  currentPage = signal(0);
  // Signals para controlar o estado dos modais
  gastoToEdit = signal<Gasto | null>(null);
  gastoToDelete = signal<Gasto | null>(null);


  verGraficos(){
    console.log("Navegando para gráficos");
    this.router.navigate(['/charts']);
  }
  openEditModal(gasto: Gasto): void {
    this.gastoToEdit.set(gasto);
  }

  onApplyFilters(filters: FilterCriteria): void {
    this.gastoService.applyFilters(filters);
  }

  openDeleteModal(gasto: Gasto): void {
    this.gastoToDelete.set(gasto);
  }

  onPageChange(newPage: number): void {
    this.gastoService.changePage(newPage);
  }

  closeModals(): void {
    this.gastoToEdit.set(null);
    this.gastoToDelete.set(null);
  }

  // --- Métodos de CRUD ---
  onLoadMore(): void {
    const nextPage = this.gastoService.currentPage() + 1;
    this.gastoService.fetchGastos(nextPage);
  }
  onFilter(filters: { mes?: number, ano?: number }): void {
    const userId = this.authService.userId();
    if (userId) {
      // Determina qual filtro foi clicado para atualizar a UI
      const today = new Date();
      if (filters.mes === today.getMonth() + 1) {
        this.activeFilter.set('este_mes');
      } else {
        this.activeFilter.set('mes_passado');
      }

      // Chama o serviço com os filtros, reiniciando a paginação (página 0)
      this.gastoService.loadMoreGastos();
    }
  }
  onDeleteGasto(id: number): void {
    this.gastoService.deleteGasto(id);
    this.closeModals(); // Fecha o modal após a ação
  }

  onAddGasto(gastoPayload: GastoPayload): void {
    this.gastoService.createGasto(gastoPayload).subscribe();
  }

  onUpdateGasto(gastoPayload: GastoPayload): void {
    this.gastoService.updateGasto(gastoPayload)
    this.closeModals()
  }

  onGenerateReport(): void {
    const currentDate = new Date();
    const mes = currentDate.getMonth() + 1;
    const ano = currentDate.getFullYear();
    const usuarioId = this.authService.currentUser()?.id;

    if (usuarioId) {
      this.reportService.sendMonthlyReportByEmail({ mes, ano, usuarioId });
    } else {
      // Tratar caso em que o ID do usuário não está disponível
      console.error("ID do usuário não encontrado para gerar relatório.");
    }
  }


}
