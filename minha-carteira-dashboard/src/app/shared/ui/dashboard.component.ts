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
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, GastoListComponent, GastoFormComponent, ModalComponent, GastoFilterComponent], // Adicione ModalComponent
  template: `
    <main class="p-4 sm:p-6 lg:p-8 bg-gray-50 min-h-screen">
        <header class="flex justify-between items-center mb-8">
            <div>
                <h1 class="text-3xl font-bold text-gray-800">Controle de gasto</h1>
                <p class="text-gray-600">Bem-vindo, {{ authService.currentUser()?.nome }}!</p>
            </div>
             <button routerLink="/charts" class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg">
            Ver Gráficos
          </button>
            <button (click)="authService.logout()" class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg">
                Sair
            </button>


        </header>
        <div class="max-w-7xl mx-auto">
            @if(reportService.isLoading() || gastoService.isLoading()){
              <div class="mb-4 p-4 bg-blue-100 text-blue-800 rounded-lg animate-pulse">Processando...</div>
            }

            @if(reportService.apiError() || gastoService.apiError()){
              <div class="mb-4 p-4 bg-red-100 text-red-800 rounded-lg">
                {{ reportService.apiError() || gastoService.apiError() }}
              </div>
            }

            <app-gasto-form
              [categorias]="categoriaService.categorias()"
              [isLoadingCategorias]="categoriaService.isLoading()"
              (save)="onAddGasto($event)"
            ></app-gasto-form>

      <app-gasto-filter (filterChange)="onApplyFilters($event)"></app-gasto-filter>

        <app-gasto-list
        [gastos]="gastoService.gastos()"
        [isLoading]="gastoService.isLoading()"
        
        [currentPage]="gastoService.currentPage()"
        [totalPages]="gastoService.totalPages()"

        (pageChange)="onPageChange($event)"

        (delete)="openDeleteModal($event)"
        (update)="openEditModal($event)"
        (generateReport)="onGenerateReport()"
      ></app-gasto-list>

        </div>
    </main>

    <app-modal [isOpen]="!!gastoToEdit()" title="Editar Gasto" (closeModal)="closeModals()">
      <app-gasto-form
        [categorias]="categoriaService.categorias()"
        [isLoadingCategorias]="categoriaService.isLoading()"
        [gastoToEdit]="gastoToEdit()"

        (save)="onUpdateGasto($event)"
        (cancel)="closeModals()"
      ></app-gasto-form>
    </app-modal>

    <app-modal [isOpen]="!!gastoToDelete()" title="Confirmar Exclusão" (closeModal)="closeModals()">
      @if(gastoToDelete(); as gasto) {
        <p class="mb-6">Você tem certeza que deseja excluir o gasto "{{ gasto.nome }}"?</p>
        <div class="flex justify-end space-x-4">
          <button (click)="closeModals()" class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-lg">
            Cancelar
          </button>
          <button (click)="onDeleteGasto(gasto.id)" class="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg">
            Sim, Excluir
          </button>
        </div>
      }
    </app-modal>

    `,
})
export class DashboardComponent {
  authService = inject(AuthService);
  gastoService = inject(GastoService);
  reportService = inject(ReportService);
  categoriaService = inject(CategoriaService);
  activeFilter = signal<'este_mes' | 'mes_passado'>('este_mes');
  currentPage = signal(0);
  // Signals para controlar o estado dos modais
  gastoToEdit = signal<Gasto | null>(null);
  gastoToDelete = signal<Gasto | null>(null);

  // --- Métodos para controlar os Modais ---
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
