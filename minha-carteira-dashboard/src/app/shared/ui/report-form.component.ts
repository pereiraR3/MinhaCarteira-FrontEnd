import { Component, EventEmitter, Output, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

export interface DateRange {
  dataInicio: string;
  dataFim: string;
}

@Component({
  selector: 'app-report-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <form [formGroup]="reportForm" (ngSubmit)="onSubmit()" class="space-y-4">
      <div>
        <label for="dataInicio" class="block text-sm font-medium text-gray-700">Data de Início</label>
        <input
          id="dataInicio"
          type="date"
          formControlName="dataInicio"
          class="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div>
        <label for="dataFim" class="block text-sm font-medium text-gray-700">Data de Fim</label>
        <input
          id="dataFim"
          type="date"
          formControlName="dataFim"
          class="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      @if(reportForm.invalid && reportForm.touched) {
        <p class="text-sm text-red-600">Ambas as datas são obrigatórias.</p>
      }

      <div class="flex justify-end space-x-4 pt-4">
        <button type="button" (click)="cancel.emit()" class="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-lg">
          Cancelar
        </button>
        <button type="submit" [disabled]="reportForm.invalid" class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg disabled:opacity-50">
          Gerar Relatório
        </button>
          <button  class="bg-red-500 hover:bg-green-500 text-white font-bold py-2 px-4 rounded-lg">
                Download
            </button>
      </div>
    </form>
  `,
})
export class ReportFormComponent {
  @Output() generate = new EventEmitter<DateRange>();
  @Output() cancel = new EventEmitter<void>();

  private fb = inject(FormBuilder);
  private hojeFormatado = new Date().toISOString().substring(0, 10);

  reportForm = this.fb.group({
    dataInicio: ['', Validators.required],
    dataFim: [this.hojeFormatado, Validators.required],
  });

  onSubmit(): void {
    if (this.reportForm.valid) {
      this.generate.emit(this.reportForm.getRawValue() as DateRange);
    }
  }

 
}