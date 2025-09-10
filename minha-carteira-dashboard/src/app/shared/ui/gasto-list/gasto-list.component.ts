import { ChangeDetectionStrategy, Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Gasto } from '../../../core/models';
import { AuthService } from '../../../core/services/auth.service';
import { ReportService } from '../../../core/services/report.service';

@Component({
  selector: 'app-gasto-list',
  standalone: true,
  imports: [CommonModule],
  template: `
  <div class="flex-1 overflow-y-auto">
    <!-- INÍCIO DA ALTERAÇÃO: Header com Título e Botão de Relatório -->
  <div class="flex justify-between items-center mb-4">
  <h2 class="text-xl font-bold text-gray-800">Histórico de Gastos</h2>

  <div class="flex flex-col md:flex-row md:justify-end items-center mb-4 space-y-4 md:space-y-0 md:space-x-4">
  <button (click)="onGenerateReport()" class="flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200 shadow-md w-full md:w-auto">
    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="#ffffffff">
      <path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm-1 9V6.5L16.5 10H14v6h-4V4h4c.55 0 1 .45 1 1v6zm-2 2v-3.5L7.5 7H10v6z"/>
      <path d="M12 18l-4-4h3V9h2v5h3l-4 4z"/>
    </svg>
    Enviar relatório
  </button>
  <button (click)="Down()" class="flex items-center justify-center bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200 shadow-md w-full md:w-auto">
    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4c-3.72 0-6.75 2.76-7.25 6.32C2.59 10.71 1 12.31 1 14.25c0 2.14 1.83 3.91 3.97 3.91H18c2.21 0 4-1.79 4-4 0-2.06-1.53-3.79-3.65-3.96zM17 13l-5 5-5-5h3V9h4v4h3z"/>
    </svg>
    Download
  </button>
</div>
</div>
    <!-- FIM DA ALTERAÇÃO -->

    @if(gastos.length > 0){
      <ul class="space-y-3">
        @for(gasto of gastos; track gasto.id) {
          <li class="flex justify-between items-center bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">

            <div class="flex items-center">
              <div class="p-3 rounded-full bg-blue-100 mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 10v-1m0 0c-1.657 0-3-.895-3-2s1.343-2 3-2 3-.895 3-2c0-1.105-1.343-2-3-2m0 0c-1.11 0-2.08-.402-2.599-1M12 4V3" />
                </svg>
              </div>
              <div>
                <p class="font-semibold text-gray-800">{{ gasto.nome }}</p>
                <p class="text-sm text-gray-500">
                  {{ gasto.categoriaNome || 'Sem Categoria' }} &middot; {{ gasto.data | date: 'dd/MM/yyyy' }}
                </p>
              </div>
            </div>

            <div class="flex items-center space-x-4">
              <p class="font-bold text-lg text-red-600">- R$ {{ gasto.valor.toFixed(2).replace('.', ',') }}</p>

              <button (click)="onUpdate(gasto)" class="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-100 rounded-full transition-colors duration-200">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
              </button>

              <button (click)="onDelete(gasto)" class="p-2 text-gray-500 hover:text-red-600 hover:bg-red-100 rounded-full transition-colors duration-200">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>

          </li>
        }
      </ul>
    } @else {
      <div class="text-center py-12"><p class="text-gray-500">Nenhum gasto registrado.</p></div>
    }
  </div>

  <div class="mt-4 text-center">
    @if(isLoading) {
      <p class="text-gray-500 animate-pulse">Carregando...</p>
    }
    @if(!isLoading && canLoadMore) {
      <button (click)="loadMore.emit()" class="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-6 rounded-lg">
        Carregar Mais
      </button>
    }
  </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GastoListComponent {
  @Input({ required: true }) gastos: Gasto[] = [];
  @Input({ required: true }) isLoading = false;
  @Input({ required: true }) canLoadMore = false;

  @Input() activeFilter: string = 'este_mes'; // 2. Input para saber qual filtro está ativo
  @Output() filterChange = new EventEmitter<{ mes?: number, ano?: number }>();

 authService = inject(AuthService);
    reportService = inject(ReportService);
  @Output() loadMore = new EventEmitter<void>();
  @Output() delete = new EventEmitter<Gasto>(); // Alterado para emitir o objeto Gasto  @Output() update = new EventEmitter<Gasto>();
  @Output() generateReport = new EventEmitter<void>(); // Novo Output para o relatório
  @Output() update = new EventEmitter<Gasto>();
   onDelete(gasto: Gasto): void { // Recebe o objeto Gasto
    this.delete.emit(gasto);
  }
  onFilterChange(type: 'este_mes' | 'mes_passado'): void {
    const today = new Date();
    let mes, ano;

    if (type === 'este_mes') {
      mes = today.getMonth() + 1; // getMonth() é 0-11
      ano = today.getFullYear();
    } else if (type === 'mes_passado') {
      const oneMonthAgo = new Date(today.getFullYear(), today.getMonth() - 1, 1);
      mes = oneMonthAgo.getMonth() + 1;
      ano = oneMonthAgo.getFullYear();
    }
    
    // Emite o objeto com os filtros
    this.filterChange.emit({ mes, ano });
  }
  onUpdate(gasto: Gasto): void {
    this.update.emit(gasto);
  }

  // Novo método para emitir o evento
  onGenerateReport(): void {
    console.log(`Solicitando envio de relatório para `);
    this.generateReport.emit();
  }

   Down(){
         const currentDate = new Date();
        const mes = currentDate.getMonth() + 1;
        const ano = currentDate.getFullYear();
        const usuarioId = this.authService.currentUser()?.id;

      this.reportService.downloadMonthlyReport({ mes, ano, usuarioId })
    }
}
