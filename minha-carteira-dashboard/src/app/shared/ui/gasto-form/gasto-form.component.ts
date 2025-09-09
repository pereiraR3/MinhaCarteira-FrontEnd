import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Categoria, Gasto } from '../../../core/models';
import { CategoriaService } from '../../../core/services/categoria.service';
import { NumericInputDirective } from '../../../shared/directives/numeric-input';

export type GastoPayload = Omit<Gasto, 'id' | 'usuario'>;

@Component({
    selector: 'app-gasto-form',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, NumericInputDirective],
    template: `
    <div class="bg-gray-50 p-6 rounded-xl shadow-md mb-8">
      <h2 class="text-xl font-bold text-gray-800 mb-4">Adicionar Novo Gasto</h2>
      <form [formGroup]="gastoForm" (ngSubmit)="onSubmit()" class="grid grid-cols-1 md:grid-cols-6 gap-4 items-end">

        <input
          formControlName="nome"
          placeholder="Nome do gasto"
          class="md:col-span-2 px-4 py-3 rounded-lg bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >

        <input
          formControlName="valor"
          type="text"
          inputmode="decimal"
          appNumericInput
          placeholder="Valor (R$)"
          class="px-4 py-3 rounded-lg bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >

        <input
            formControlName="data"
            type="date"
            class="md:col-span-2 px-4 py-3 rounded-lg bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >

        <select
          formControlName="categoriaId"
          (click)="onOpenSelect()"
          class="md:col-span-2 w-full px-3 py-3 rounded-lg bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-2 focus:ring-blue-500"
        >
          @if (isLoadingCategorias) {
            <option disabled>Carregando categorias...</option>
          } @else {
            <option [ngValue]="null" disabled [hidden]="gastoForm.get('categoriaId')?.value !== null">
              Selecione a Categoria
            </option>

            @for (cat of categorias; track cat.id) {
              <option [ngValue]="cat.id">{{ cat.nome }}</option>
            }

            @if (!isLoadingCategorias && categorias.length === 0) {
              <option disabled>Nenhuma categoria encontrada</option>
            }
          }
        </select>

        <button type="submit" [disabled]="gastoForm.invalid" class="md:col-span-1 w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition">
          Adicionar
        </button>
      </form>
    </div>
  `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GastoFormComponent {
    @Input() categorias: Categoria[] = [];
    @Input() isLoadingCategorias = false;
    @Output() add = new EventEmitter<GastoPayload>();

    private fb = inject(FormBuilder);
    private categoriaService = inject(CategoriaService);
    private hojeFormatado = new Date().toISOString().substring(0, 10);

    gastoForm = this.fb.group({
        nome: ['', Validators.required],
        valor: [null as number | null, [Validators.required, Validators.min(0.01)]],
        categoriaId: [null as number | null, Validators.required],
        data: [this.hojeFormatado, Validators.required],
    });

    onOpenSelect(): void {
        this.categoriaService.openSelect.set(true);
    }

    onClosedSelect(): void {
        this.categoriaService.openSelect.set(false);
    }

    onSubmit() {
        if (this.gastoForm.invalid) {
            return;
        }

        const formValue = this.gastoForm.getRawValue();
        const valorString = String(formValue.valor).replace(',', '.');
        const valorNumerico = parseFloat(valorString);
        const dataFormatada = `${formValue.data!}T00:00:00`;

        const payload: GastoPayload = {
            nome: formValue.nome!,
            descricao: formValue.nome!,
            valor: valorNumerico,
            categoriaId: Number(formValue.categoriaId),
            data: dataFormatada,
            dataCriacao: new Date().toISOString(),
            usuarioId: 0,
        };

        this.add.emit(payload);
        this.gastoForm.reset();
    }
}