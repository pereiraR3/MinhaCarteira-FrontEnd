import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, tap } from 'rxjs/operators';
import { ContaFiltro } from '../../../model/filtro/conta-filtro.model';
import { ContaService } from '../../../services/ContaService.service';

@Component({
  selector: 'app-select-conta',
  standalone:false,
  templateUrl: './select-conta.component.html',
  styleUrl: './select-conta.component.scss'
})
export class SelectContaComponent implements OnInit {
  @Input() placeholder: string = 'Buscando Conta...';
  @Input() selectedConta: any;
  @Output() selectedContaChange = new EventEmitter<any>();

  contas: any[] = [];
  searchContas$ = new Subject<string>();
  private filtroConta = new ContaFiltro();

  constructor(private contaService: ContaService) {}
  ngOnInit() {
    this.searchContas$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap(term => this.filtroConta.nome = term),
      switchMap(() => this.contaService.filtrar(0, this.filtroConta))
    ).subscribe(data => {
      this.contas = data.registros;
    });
    this.searchContas$.next('');
  }

  onChange(value: any) {
    this.selectedConta = value;
    this.selectedContaChange.emit(value);
  }
}