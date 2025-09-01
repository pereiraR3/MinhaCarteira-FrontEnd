import {AbstractListarPageComponent} from "../../../page/abstract-listar-page.component";

import {AbstractEntityService} from '../../../services/abstract-entity.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Resultset } from '../../../model/resultset.model'; // Importe o Resultset
import { Produto } from "../../../model/produto.model";
import { ProdutoFiltro } from "../../../model/filtro/produto-filtro.model";
import { ProdutoService } from "../../../services/produtoService.service";

declare var $: any;
@Component({
  standalone: false,
  selector: 'app-listar-produto',
  templateUrl: './listar-produto.component.html',
  styleUrls: ['./listar-produto.component.scss']
})
export class ListarProdutoComponent extends AbstractListarPageComponent<Produto> implements  OnInit, OnDestroy{


  ordersColumn =[
    {header:"Sequencial",field:"Sequencial"},
    { header: "Nome", field: "nome" },
    { header: "Descrição", field: "descricao" },
    { header: "Ações", field: "acoes" },
  ]

  filtro: ProdutoFiltro = new ProdutoFiltro();
  override resultset: Resultset = new Resultset(); 
  page:any;

  constructor(public produtoService: ProdutoService,
              private router: Router,
    public fb: FormBuilder,
    ) {
        super();
        this.produtoService = produtoService;
      }

  filtroNomeproduto(nome:string){
    this.pagina = 0;
    this.filtro.descricao = nome;
    if( this.filtro.descricao.length > 2) {
      this.filtrar();
    } else if( this.filtro.descricao.length == 0) {
      this.filtrar();
    }
  }
  getFiltro(): ProdutoFiltro {
    return this.filtro;
  }
  getService(): AbstractEntityService<Produto> {
    return this.produtoService;
  }
  ngOnDestroy(): void {}
  filtrarPaginacao(event:any) {
    var pagina = event - 1;
    this.pagina = pagina;
    this.filtrar();
  }
ngOnInit(): void {
  this.filtro = new ProdutoFiltro();
  this.filtroNomeproduto("");
}
  editarproduto(produto: Produto) {
    
    this.router.navigateByUrl('/ks-portal/produto/editar', {
      state: { produto: produto }
    });
  }

  onPageChange(pageIndex: any) {
    this.pagina = pageIndex;
    this.filtrar();
  }

}
