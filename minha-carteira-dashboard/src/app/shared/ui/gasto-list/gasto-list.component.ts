import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Gasto } from '../../../core/models';

@Component({
  selector: 'app-gasto-list',
  standalone: true,
  imports: [CommonModule],
  template: `
  <div class="flex-1 overflow-y-auto">
    <h2 class="text-xl font-bold text-gray-800 mb-4">Histórico de Gastos</h2>
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

              <button (click)="onDelete(gasto.id)" class="p-2 text-gray-500 hover:text-red-600 hover:bg-red-100 rounded-full transition-colors duration-200">
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

  @Output() loadMore = new EventEmitter<void>();
  @Output() delete = new EventEmitter<number>();
  @Output() update = new EventEmitter<Gasto>();

  onDelete(id: number): void {
    this.delete.emit(id);
  }

  onUpdate(gasto: Gasto): void {
    this.update.emit(gasto);
  }
}