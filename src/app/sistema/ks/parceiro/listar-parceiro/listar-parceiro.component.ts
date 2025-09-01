import { AbstractListarPageComponent } from "../../../page/abstract-listar-page.component";

import { ParceiroService } from '../../../services/ParceiroService.service';
import { AbstractEntityService } from '../../../services/abstract-entity.service';
import { ParceiroFiltro } from '../../../model/filtro/parceiro-filtro.model';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Resultset } from '../../../model/resultset.model'; // Importe o Resultset
import { Parceiro } from "../../../model/parceiro.model";

declare var $: any;
@Component({
  standalone: false,
  selector: 'app-listar-parceiro',
  templateUrl: './listar-parceiro.component.html',
  styleUrls: ['./listar-parceiro.component.scss']
})
export class ListarParceiroComponent extends AbstractListarPageComponent<Parceiro> implements OnInit, OnDestroy {


  ordersColumn = [
    { header: "Sequencial", field: "Sequencial" },
    { header: "Nome", field: "nome" },
    { header: "Endereço", field: "endereco" },
    { header: "CNPJ", field: "cnpj" },
    { header: "Tipo", field: "tipo" },
    { header: "Ações", field: "acoes" },
  ]

  filtro: ParceiroFiltro = new ParceiroFiltro();
  override resultset: Resultset = new Resultset();
  page: any;

  constructor(public parceiroService: ParceiroService,
    private router: Router,
    public fb: FormBuilder,
  ) {
    super();
    this.parceiroService = parceiroService;
  }

  filtroNomeParceiro(nome: string) {
    this.pagina = 0;
    this.filtro.nome = nome;
    if (this.filtro.nome.length > 2) {
      this.filtrar();
    } else if (this.filtro.nome.length == 0) {
      this.filtrar();
    }
  }
  
  getFiltro(): ParceiroFiltro {
    return this.filtro;
  }

  getService(): AbstractEntityService<Parceiro> {
    return this.parceiroService;
  }

  ngOnDestroy(): void { }

  filtrarPaginacao(event: any) {
    var pagina = event - 1;
    this.pagina = pagina;
    this.filtrar();
  }

  ngOnInit(): void {
    this.filtro = new ParceiroFiltro();
    this.filtroNomeParceiro("");
  }

  editarParceiro(parceiro: Parceiro) {

    this.router.navigateByUrl('/ks-portal/parceiro/editar', {
      state: { parceiro: parceiro }
    });
  }

  visualizarParceiro(parceiro: Parceiro) {
    this.router.navigateByUrl('/ks-portal/tela_visualizacao/' + parceiro.getId(), {
      state: { parceiro: parceiro }
    });
  }

  onPageChange(pageIndex: any) {
    this.pagina = pageIndex;
    this.filtrar();
  }

}
