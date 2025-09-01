import { AbstractListarPageComponent } from "../../../page/abstract-listar-page.component";

import { AbstractEntityService } from '../../../services/abstract-entity.service';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, AfterViewInit } from '@angular/core';
import { FormBuilder, UntypedFormGroup } from '@angular/forms';
import { Resultset } from '../../../model/resultset.model'; // Importe o Resultset
import { UnidadeService } from "../../../services/unidadeService.service";
import { UnidadeFiltro } from "../../../model/filtro/unidade-filtro.model";
import { Unidade } from "../../../model/unidade.model";
import { Parceiro } from "../../../model/parceiro.model";


declare var $: any;
declare var HSOverlay: any
@Component({
  standalone: false,
  selector: 'app-listar-unidade',
  templateUrl: './listar-unidade.component.html',
  styleUrls: ['./listar-unidade.component.scss']
})
export class ListarUnidadeComponent extends AbstractListarPageComponent<Unidade> implements OnInit, OnDestroy, AfterViewInit {
  private _parceiro: Parceiro;
  @Input() telaView: UntypedFormGroup;
  public unidadeSelecionadaModal: Unidade | null = null;

  @Input()
  set parceiro(value: Parceiro) {
    if (value && value.parceiro_id) {
      this._parceiro = value;
      this.filtro = new UnidadeFiltro();
      this.filtroNomeUnidade("");
    }
  }
  get parceiro(): Parceiro {
    return this._parceiro;
  }
  ordersColumn = [
    { header: "Sequencial", field: "Sequencial" },
    { header: "Nome", field: "nome" },
    { header: "Descrição", field: "descricao" },
    { header: "Ações", field: "acoes" },
  ]

  filtro: UnidadeFiltro = new UnidadeFiltro();
  override resultset: Resultset = new Resultset();
  page: any;
  constructor(public unidadeService: UnidadeService,
    public fb: FormBuilder,
  ) {
    super();
    this.unidadeService = unidadeService;
  }

  ngAfterViewInit(): void {
    if (typeof HSOverlay !== 'undefined') {
      HSOverlay.autoInit();
    }
  }


  filtroNomeUnidade(nome: string) {
    this.pagina = 0;
    this.filtro = this.getFiltro();
    this.filtro.nome = nome;
    if (this.filtro.nome.length > 2) {
      this.filtrar();
    } else if (this.filtro.nome.length == 0) {
      this.filtrar();
    }
  }

  getFiltro(): UnidadeFiltro {

    if (this.parceiro && this.parceiro.parceiro_id) {
      (this.filtro as any).parceiroId = this.parceiro.parceiro_id;
    }
    return this.filtro;
  }

  getService(): AbstractEntityService<Unidade> {
    return this.unidadeService;
  }

  ngOnDestroy(): void { }
  filtrarPaginacao(event: any) {
    var pagina = event - 1;
    this.pagina = pagina;
    this.filtrar();
  }

  ngOnInit(): void {}

  onPageChange(pageIndex: any) {
    this.pagina = pageIndex;
    this.filtrar();
  }

  public abrirModalEdicao(unidade: Unidade): void {
    this.unidadeSelecionadaModal = unidade;
    setTimeout(() => {
        try {
            const { element } = HSOverlay.getInstance(document.getElementById('ModalEditarUnidade'), true);
            if (element && typeof element.open === 'function') {
                element.open();
            } else {
                console.error("Modal não encontrado");
            }
        } catch (e) {
            console.error('Erro ao tentar abrir modal', e);
        }
    }, 0);
  }

  public editarUnidade(unidade:Unidade){
    this.unidadeSelecionadaModal = unidade;
    setTimeout(()=>{
      (window  as any).HSOverlay?.open?.('#ModalEditarUnidade');
    })
  }
  

  public fecharModalEdicao(dadosAtualizados: boolean): void {
    this.unidadeSelecionadaModal = null;
    setTimeout(() => {
        try {
            const { element } = HSOverlay.getInstance(document.getElementById('ModalEditarUnidade'), true);
            if (element && typeof element.open === 'function') {
                element.close();
            } else {
                console.error("Modal não encontrado");
            }
        } catch (e) {
            console.error('Erro ao tentar abrir modal', e);
        }
    }, 0);
    if (dadosAtualizados) {
      this.filtrar();
    }
  }
  
}
