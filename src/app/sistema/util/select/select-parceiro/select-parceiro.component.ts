import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, tap } from 'rxjs/operators';
import { ParceiroService } from '../../../services/ParceiroService.service';
import { ParceiroFiltro } from '../../../model/filtro/parceiro-filtro.model';

@Component({
  selector: 'app-select-parceiro',
  standalone:false,
  templateUrl: './select-parceiro.component.html',
  styleUrl: './select-parceiro.component.scss'
})
export class SelectParceiroComponent implements OnInit {
  @Input() placeholder: string = 'Buscando parceiro...';
  @Input() selectedParceiro: any;
  @Output() selectedParceiroChange = new EventEmitter<any>();

  parceiros: any[] = [];
  searchParceiros$ = new Subject<string>();
  private filtroparceiro = new ParceiroFiltro();

  constructor(private parceiroService: ParceiroService) {}
  ngOnInit() {
    this.searchParceiros$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap(term => this.filtroparceiro.nome = term),
      switchMap(() => this.parceiroService.filtrar(0, this.filtroparceiro))
    ).subscribe(data => {
        
      this.parceiros = data.registros;
    });
    this.searchParceiros$.next('');
  }

  onChange(value: any) {
    this.selectedParceiro = value;
    this.selectedParceiroChange.emit(value);
  }
}