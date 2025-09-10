import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, inject, OnChanges, SimpleChanges, computed } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Categoria, Gasto } from '../../../core/models';
import { CategoriaService } from '../../../core/services/categoria.service';
import { NumericInputDirective } from '../../../shared/directives/numeric-input';
import { ReportService } from '../../../core/services/report.service';
import { AuthService } from '../../../core/services/auth.service';

// O GastoPayload agora pode ter um id opcional para o caso de edição
export type GastoPayload = Omit<Gasto, 'usuario'>;

@Component({
    selector: 'app-gasto-form',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, NumericInputDirective],
    template: `
  <div class="bg-gray-50 p-6 rounded-xl shadow-md mb-8 max-w-md mx-auto">
      <h2 class="text-xl font-bold text-gray-800 mb-4">{{ formTitle() }}</h2>
      <form [formGroup]="gastoForm" (ngSubmit)="onSubmit()" class="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">

        <!-- Linha 1 -->
        <input
          formControlName="nome"
          placeholder="Nome do gasto"
          class="w-full px-4 py-3 rounded-lg bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >

        <input
          formControlName="valor"
          type="number"
          inputmode="decimal"
          appNumericInput
          placeholder="Valor (R$)"
          class="w-full px-4 py-3 rounded-lg bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >

        <input
            formControlName="data"
            type="date"
            class="w-full px-4 py-3 rounded-lg bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >

        <!-- Linha 2 -->
        <select
          formControlName="categoriaId"
          (click)="onOpenSelect()"
          class="w-full px-4 py-3 rounded-lg bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
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


          <div class="w-full flex space-x-2">
          @if(gastoToEdit) {
            <button type="button" (click)="cancel.emit()" class="w-full bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-3 px-4 rounded-lg transition">
            Cancelar
            </button>
            }
            </div>
            <button type="submit" [disabled]="gastoForm.invalid" class="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition">
                {{ submitButtonText() }}
            </button>
            </form>
            </div>
  `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GastoFormComponent implements OnChanges {
    @Input() categorias: Categoria[] = [];
    @Input() isLoadingCategorias = false;
    @Input() gastoToEdit: Gasto | null = null; // Recebe o gasto para editar
    authService = inject(AuthService);
    reportService = inject(ReportService);

    @Output() save = new EventEmitter<GastoPayload>(); // Evento unificado para salvar (criar ou editar)
    @Output() cancel = new EventEmitter<void>(); // Evento para cancelar a edição

    private fb = inject(FormBuilder);
    private categoriaService = inject(CategoriaService);

    // Títulos e textos de botão dinâmicos
    formTitle = computed(() => this.gastoToEdit ? 'Editar Gasto' : 'Adicionar Novo Gasto');
    submitButtonText = computed(() => this.gastoToEdit ? 'Salvar' : 'Adicionar');

    gastoForm = this.fb.group({
        id: [null as number | null], // Adicionado para manter o ID na edição
        nome: ['', Validators.required],
        valor: [null as number | null, [Validators.required, Validators.min(0.01)]],
        categoriaId: [null as number | null, Validators.required],
        data: ['', Validators.required],
    });

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['gastoToEdit'] && this.gastoToEdit) {
            // Preenche o formulário com os dados do gasto a ser editado
            this.gastoForm.patchValue({
                id: this.gastoToEdit.id,
                nome: this.gastoToEdit.nome,
                valor: this.gastoToEdit.valor,
                categoriaId: this.gastoToEdit.categoriaId,
                data: this.gastoToEdit.data.substring(0, 10) // Formata a data para YYYY-MM-DD
            });
        } else if (!this.gastoToEdit) {
            this.gastoForm.reset({ data: new Date().toISOString().substring(0, 10) });
        }
    }

    onOpenSelect(): void {
        this.categoriaService.openSelect.set(true);
    }

    onSubmit() {
        if (this.gastoForm.invalid) return;

        const formValue = this.gastoForm.getRawValue();
        const valorString = String(formValue.valor).replace(',', '.');
        const valorNumerico = parseFloat(valorString);
        const dataFormatada = `${formValue.data!}T00:00:00`;

        const payload: GastoPayload = {
            id: this.gastoToEdit?.id ?? 0, // Envia o ID se estiver editando
            nome: formValue.nome!,
            descricao: formValue.nome!,
            valor: valorNumerico,
            categoriaId: Number(formValue.categoriaId),
            data: dataFormatada,
            dataCriacao: this.gastoToEdit?.dataCriacao ?? new Date().toISOString(),
            usuarioId: 0,
        };

        this.save.emit(payload);
        this.gastoForm.reset({ data: new Date().toISOString().substring(0, 10) });
    }

        Down(){
         const currentDate = new Date();
        const mes = currentDate.getMonth() + 1;
        const ano = currentDate.getFullYear();
        const usuarioId = this.authService.currentUser()?.id;

      this.reportService.downloadMonthlyReport({ mes, ano, usuarioId })
    }
}

