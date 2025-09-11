// gasto-filter.component.ts

import { Component, EventEmitter, Output, OnInit, OnDestroy, inject } from '@angular/core';
// 1. Importe os módulos necessários para Reactive Forms e RxJS
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Observable, Subject } from 'rxjs';
import { debounceTime, takeUntil, distinctUntilChanged } from 'rxjs/operators';
import { FilterCriteria } from '../../core/services/gasto.service';
import { CategoriaService } from '../../core/services/categoria.service';
import { Categoria } from '../../core/models';

@Component({
  selector: 'app-gasto-filter',
  standalone: true,
  // 2. Troque FormsModule por ReactiveFormsModule
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './gasto-filter.component.html' // (Separamos o template para clareza)
})
export class GastoFilterComponent implements OnInit, OnDestroy {
  @Output() filterChange = new EventEmitter<FilterCriteria>();
  private categoriaService = inject(CategoriaService);
  
  categorias$: Observable<Categoria[]> = this.categoriaService.getCategorias();

  private fb = inject(FormBuilder);
  private destroy$ = new Subject<void>();

  // 3. Crie o formulário reativo
 filterForm = this.fb.group({
    nome: [''],
    dataInicio: [''],
    dataFim: [''],
    categoriaId: [null as number | null]
  });

  ngOnInit(): void {
    // 4. Escute as mudanças no formulário
    this.filterForm.valueChanges.pipe(
      // Espere 400ms após a última digitação
      debounceTime(400),
      // Não emita se o valor for o mesmo que o anterior
      distinctUntilChanged(),
      // Garanta que o unsubscribe seja feito ao destruir o componente
      takeUntil(this.destroy$)
    ).subscribe(values => {
      // Limpa os valores nulos ou vazios antes de emitir
      const cleanFilters: FilterCriteria = {};
      if (values.nome) cleanFilters.nome = values.nome;
      if (values.dataInicio) cleanFilters.dataInicio = values.dataInicio;
      if (values.dataFim) cleanFilters.dataFim = values.dataFim;
      
      this.filterChange.emit(cleanFilters);
    });
  }

  ngOnDestroy(): void {
    // 5. Encerra a subscrição para evitar vazamento de memória
    this.destroy$.next();
    this.destroy$.complete();
  }
  applyFilters(): void {
    const formValues = this.filterForm.getRawValue();

    const cleanFilters: FilterCriteria = {};
    if (formValues.nome) cleanFilters.nome = formValues.nome;
    if (formValues.dataInicio) cleanFilters.dataInicio = formValues.dataInicio;
    if (formValues.dataFim) cleanFilters.dataFim = formValues.dataFim;
    if (formValues.categoriaId) cleanFilters.categoriaId = Number(formValues.categoriaId);

    this.filterChange.emit(cleanFilters);
  }
  // Opcional: método para limpar o formulário
  resetFilters(): void {
    this.filterForm.reset({
      nome: '',
      dataInicio: '',
      dataFim: ''
    });
  }
}