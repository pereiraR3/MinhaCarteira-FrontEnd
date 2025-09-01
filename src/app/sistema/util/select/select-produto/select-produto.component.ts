import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, tap } from 'rxjs/operators';
import { ProdutoService } from '../../../services/produtoService.service';
import { ProdutoFiltro } from '../../../model/filtro/produto-filtro.model';


@Component({
  selector: 'app-select-produto',
  standalone:false,
  templateUrl: './select-produto.component.html',
  styleUrl: './select-produto.component.scss'
})
export class SelectProdutoComponent implements OnInit {
  @Input() placeholder: string = 'Buscando produto...';
  @Input() selectedProduto: any;
  @Output() selectedProdutoChange = new EventEmitter<any>();

  produtos: any[] = [];
  searchProdutos$ = new Subject<string>();
  private filtroProduto = new ProdutoFiltro();

  constructor(private produtoService: ProdutoService) {}
  ngOnInit() {
    this.searchProdutos$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap(term => this.filtroProduto.descricao = term),
      switchMap(() => this.produtoService.filtrar(0, this.filtroProduto))
    ).subscribe(data => {
        
      this.produtos = data.registros;
    });
    this.searchProdutos$.next('');
  }

  onChange(value: any) {
    this.selectedProduto = value;
    this.selectedProdutoChange.emit(value);
  }
}