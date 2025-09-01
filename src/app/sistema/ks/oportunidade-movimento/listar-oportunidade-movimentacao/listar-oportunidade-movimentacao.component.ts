import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { Oportunidade } from "../../../model/oportunidade.model";
import { AbstractListarPageComponent } from "../../../page/abstract-listar-page.component";
import { Router } from "@angular/router";
import { FormBuilder, UntypedFormGroup } from "@angular/forms";
import { Resultset } from "../../../model/resultset.model";
import { AbstractEntityService } from "../../../services/abstract-entity.service";
import { OportunidadeMovimentacaoFiltro } from "../../../model/filtro/oportunidade-movimentacao-filtro.model";
import { OportunidadeMovimentacao } from "../../../model/oportunidadeMovimentacao.model";
import { OportunidadeMovimentacaoService } from "../../../services/oportunidade-movimentacaoService.service";


declare var $: any;
declare var HSOverlay: any
@Component({
  standalone: false,
  selector: 'app-listar-oportunidade-movimentacao',
  templateUrl: './listar-oportunidade-movimentacao.component.html',
  styleUrls: ['./listar-oportunidade-movimentacao.component.scss']
})
export class ListarOportunidadeMovimentacaoComponent extends AbstractListarPageComponent<OportunidadeMovimentacao> implements OnInit, OnDestroy {


  public oportunidadeMovimentacaoSelecionadaModal: OportunidadeMovimentacao | null = null;

  ordersColumn = [
    { header: "Sequencial", field: "Sequencial" },
    { header: "Tipo", field: "tipo" },
    { header: "Descrição", field: "descricao" },
    { header: "Data de Inicio", field: "dataInicio" },
    { header: "Data Atualização", field: "dataAtualizacao" },
    { header: "Identificador", field: "identificador" },
  ]
  page: any;
  private _oportunidade: Oportunidade;
  @Input() viewOportunidade:UntypedFormGroup;
  @Input() set oportunidade(value:Oportunidade){
    if (value && value.id){
      this._oportunidade = value;
      this.filtro =  new OportunidadeMovimentacaoFiltro();
      this.filtroNomeOportunidadeMovimentacao("");
    }
  }
  get oportunidade(): Oportunidade{
    return this._oportunidade;
  }

  filtro: OportunidadeMovimentacaoFiltro = new OportunidadeMovimentacaoFiltro();
  override resultset: Resultset = new Resultset();
  constructor(public oportunidadeMovimentacaoService: OportunidadeMovimentacaoService,
    private router: Router,
    public fb: FormBuilder,
  ) {
    super();
    this.oportunidadeMovimentacaoService = oportunidadeMovimentacaoService;
  }

  filtroNomeOportunidadeMovimentacao(nome: string) {
    this.pagina = 0;
    this.filtro = this.getFiltro()
    this.filtro.tipo = nome;
    if (this.filtro.tipo.length > 2) {
      this.filtrar();
    } else if (this.filtro.tipo.length == 0) {
      this.filtrar();
    }
  }
  getFiltro(): OportunidadeMovimentacaoFiltro {
    if(this.oportunidade && this.oportunidade.id){
      (this.filtro as any).oportunidadeId = this.oportunidade.id
    }
    return this.filtro;
  }
  getService(): AbstractEntityService<OportunidadeMovimentacao> {
    return this.oportunidadeMovimentacaoService;
  }
  ngOnDestroy(): void { }
  filtrarPaginacao(event: any) {
    var pagina = event - 1;
    this.pagina = pagina;
    this.filtrar();
  }
  ngOnInit(): void {
    //this.filtro = new OportunidadeMovimentacaoFiltro();
    //this.filtroNomeOportunidadeMovimentacao("");
  }


  onPageChange(pageIndex: any) {
    this.pagina = pageIndex;
    this.filtrar();
  }

  public abrirModalEdicao(oportunidadeMovimentacao: OportunidadeMovimentacao): void {
    this.oportunidadeMovimentacaoSelecionadaModal = oportunidadeMovimentacao;
    setTimeout(() => {
      try {
        const { element } = HSOverlay.getInstance(document.getElementById('ModalEditarOportunidadeMovimentacao'), true);
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

  public fecharModalEdicao(dadosAtualizados: boolean): void {
    this.oportunidadeMovimentacaoSelecionadaModal = null;
    setTimeout(() => {
      try {
        const { element } = HSOverlay.getInstance(document.getElementById('ModalEditarOportunidadeMovimentacao'), true);
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
