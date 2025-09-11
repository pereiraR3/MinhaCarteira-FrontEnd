import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GastoFormComponent, GastoPayload } from '../../shared/ui/gasto-form/gasto-form.component';
import { GastoListComponent } from '../../shared/ui/gasto-list/gasto-list.component';
import { AuthService } from '../../core/services/auth.service';
import { GastoService } from '../../core/services/gasto.service';
import { CategoriaService } from '../../core/services/categoria.service';
import { Gasto } from '../../core/models';

@Component({
  selector: 'app-gasto',
  standalone: true,
  imports: [CommonModule, GastoFormComponent, GastoListComponent],
  template: `
    <div class="w-full p-8 flex flex-col">
      <header class="flex justify-between items-center mb-8">
        <div>
          <h1 class="text-3xl font-bold text-gray-800">Seu Dashboard</h1>
          <p class="text-gray-600">Bem-vindo, {{ authService.currentUser()?.nome }}!</p>
        </div>
        <button (click)="authService.logout()" class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg">
          Sair
        </button>
      </header>

      <app-gasto-form
        [categorias]="categoriaService.categorias()"
        (save)="onAddGasto($event)">
      </app-gasto-form>

      @if(gastoService.apiError()){
        <p class="text-red-500 my-2 text-center">{{ gastoService.apiError() }}</p>
      }

      <app-gasto-list
        [gastos]="gastoService.gastos()"
        [isLoading]="gastoService.isLoading()"
        [currentPage]="gastoService.currentPage()"
        [totalPages]="gastoService.totalPages()"
       
        (loadMore)="gastoService.loadMoreGastos()"
        (delete)="onDeleteGasto($event)"
        (update)="onUpdateGasto($event)">
      </app-gasto-list>

      <footer class="mt-8 pt-4 border-t-2 border-gray-200 flex justify-end">
        <div class="text-right">
          <p class="text-gray-600 text-md">Total Gasto:</p>
          <p class="font-bold text-2xl text-gray-800">R$ {{ gastoService.totalGastos().toFixed(2) }}</p>
        </div>
      </footer>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GastoComponent {
  authService = inject(AuthService);
  gastoService = inject(GastoService);
  categoriaService = inject(CategoriaService);

  canLoadMore = computed(() =>
    this.gastoService.currentPage() < this.gastoService.totalPages() - 1
  );

  onAddGasto(formPayload: GastoPayload): void {
    this.gastoService.addGasto(formPayload);
  }

onDeleteGasto(gasto: Gasto): void {
  // Agora você recebe o objeto completo e usa o id dele
  // Pode adicionar uma confirmação aqui se desejar
  if (confirm(`Tem certeza que deseja deletar o gasto "${gasto }"?`)) {
    this.gastoService.deleteGasto(gasto.id);
  }
}

  onUpdateGasto(gasto: GastoPayload): void {
    console.log('Atualizar o gasto:', gasto);
  }
}