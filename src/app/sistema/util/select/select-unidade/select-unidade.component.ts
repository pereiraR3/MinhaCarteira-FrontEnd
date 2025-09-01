import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, tap } from 'rxjs/operators';
import { UnidadeFiltro } from '../../../model/filtro/unidade-filtro.model';
import { UnidadeService } from '../../../services/unidadeService.service';
import { CommonModule } from '@angular/common';
import { Unidade } from '../../../model/unidade.model';
import { Parceiro } from '../../../model/parceiro.model';

@Component({
  selector: 'app-select-unidade',
  standalone:false,
  templateUrl: './select-unidade.component.html',
  styleUrl: './select-unidade.component.scss'
})
export class SelectUnidadeComponent implements OnInit {
  @Input() placeholder: string = 'Buscando unidade...';
  @Input() selectedUnidade: Unidade[];
  @Output() selectedUnidadeChange  = new EventEmitter<Unidade[]>()
  @Input() multiple: boolean = false;
  @Input() parceiro: Parceiro;
  
  unidades: Unidade[] = [];
  searchUnidades$ = new Subject<string>();
  private filtroUnidade = new UnidadeFiltro();
  
  constructor(private unidadeService: UnidadeService) {}
 
  ngOnInit() {
  
    this.searchUnidades$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap(term => (this.filtroUnidade.nome) = term),
      switchMap(() => {
        if(this.parceiro && this.parceiro.parceiro_id){
          this.filtroUnidade.parceiroId = this.parceiro.parceiro_id;
        }
        return this.unidadeService.filtrar(0, this.filtroUnidade);
      })
    ).subscribe(data => {
      this.unidades = data.registros;
      if(this.parceiro){

      }

    });
    this.searchUnidades$.next('');
  }

  onChange(value: Unidade[]) {
    this.selectedUnidade = value;
    this.selectedUnidadeChange.emit(value);
  }

}