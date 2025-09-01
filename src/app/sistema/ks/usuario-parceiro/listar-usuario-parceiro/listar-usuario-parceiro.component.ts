import { AbstractListarPageComponent } from "../../../page/abstract-listar-page.component";

import { AbstractEntityService } from '../../../services/abstract-entity.service';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, UntypedFormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Resultset } from '../../../model/resultset.model'; // Importe o Resultset
import { UsuarioParceiroFiltro } from "../../../model/filtro/Usuario-parceiro-filtro.model";
import { UsuarioParceiro } from "../../../model/UsuarioParceiro.model";
import { UsuarioParceiroService } from "../../../services/UsuarioParceiroService.service";
import { Parceiro } from "../../../model/parceiro.model";
import { AlertModalService } from "../../../componentesistema/modal-alert/alert-modal.service";
import { AlertTypes } from "../../../componentesistema/modal-alert/alert-types.enum";


declare var HSOverlay: any
declare var $: any;
@Component({
  standalone: false,
  selector: 'app-listar-usuario-parceiro',
  templateUrl: './listar-usuario-parceiro.component.html',
  styleUrls: ['./listar-usuario-parceiro.component.scss']
})
export class ListarUsuarioParceiroComponent extends AbstractListarPageComponent<UsuarioParceiro> implements OnInit, OnDestroy {

  alertMessage = '';
  alertType: AlertTypes = AlertTypes.SUCCESS;
  showAlertModal = false;


  private _parceiro: Parceiro
  @Input() telaView: UntypedFormGroup;
  @Output() usuarioSelecionado = new EventEmitter<any>();
  filtro: UsuarioParceiroFiltro = new UsuarioParceiroFiltro();
  override resultset: Resultset = new Resultset();
  page: any;
  public usuarioParceiroSelecionadoModal: UsuarioParceiro | null = null;

  @Input()
  set parceiro(value: Parceiro) {
    if (value && value.parceiro_id) {
      this._parceiro = value
      this.filtro = new UsuarioParceiroFiltro();
      this.filtroNomeUsuarioParceiro("");
    }
  }
  get parceiro(): Parceiro {
    return this._parceiro
  }

  ordersColumn = [
    { header: "Sequencial", field: "Sequencial" },
    { header: "Nome", field: "Nome" },
    { header: "Email", field: "Email" },
    { header: "CPF-CNPJ", field: "cpf_cnpj" },
    { header: "Telefone", field: "celular" },
    { header: "Função", field: "funcao" },
    { header: "Ações", field: "Acoes" },
  ]



  constructor(public usuarioParceiroService: UsuarioParceiroService,
    private router: Router,
    private alertService: AlertModalService,
    public fb: FormBuilder,
  ) {
    super();
    this.usuarioParceiroService = usuarioParceiroService;
  }

  filtroNomeUsuarioParceiro(nome: string) {
    this.pagina = 0;
    this.filtro = this.getFiltro();
    this.filtro.nome = nome;
    if (this.filtro.nome.length > 2) {
      this.filtrar();
    } else if (this.filtro.nome.length == 0) {
      this.filtrar();
    }
  }

  getFiltro(): UsuarioParceiroFiltro {
    if (this.parceiro && this.parceiro.parceiro_id) {
      (this.filtro as any).parceiroId = this.parceiro.parceiro_id;
    }
    return this.filtro;
  }

  getService(): AbstractEntityService<UsuarioParceiro> {
    return this.usuarioParceiroService;
  }


  ngOnDestroy(): void { }


  filtrarPaginacao(event: any) {
    var pagina = event - 1;
    this.pagina = pagina;
    this.filtrar();
  }
  ngOnInit(): void {
    this.filtro = new UsuarioParceiroFiltro();
    this.filtroNomeUsuarioParceiro("");
  }

  editarUsuarioParceiro(UsuarioParceiro: UsuarioParceiro) {
    this.router.navigateByUrl('/ks-portal/usuario_parceiro/editar', {
      state: { usuarioParceiro: UsuarioParceiro }
    });
  }

  onPageChange(pageIndex: any) {
    this.pagina = pageIndex;
    this.filtrar();
  }

  selecionarUsuarioParceiro(usuarioParceiro: UsuarioParceiro) {
    this.usuarioSelecionado.emit(usuarioParceiro);
  }

  abrirModalEdicaoUsuarioParceiro(usuarioParceiro: UsuarioParceiro) {
    this.usuarioParceiroSelecionadoModal = usuarioParceiro;
    setTimeout(() => {
      try {
        const { element } = HSOverlay.getInstance(document.getElementById('ModalEditarUsuarioParceiro'), true);
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
    this.usuarioParceiroSelecionadoModal = null;
    setTimeout(() => {
      try {
        const { element } = HSOverlay.getInstance(document.getElementById('ModalEditarUsuarioParceiro'), true);
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



  async excluirUsuarioParceiro(usuarioParceiro: UsuarioParceiro) {
    const confirmado = await this.alertService.showConfirm(
      'Confirmação',
      'Você tem certeza de que deseja excluir esse Usuario? Esta ação é irreversível.'
    );

    if (confirmado) {
      this.usuarioParceiroService.excluir(usuarioParceiro).subscribe({
        next: () => {
          this.alertService.showAlertSuccess('Usuario excluído com sucesso.');
          this.filtroNomeUsuarioParceiro(''); // Atualiza lista
        },
        error: (err) => {
          this.alertService.showAlertDanger('Erro ao excluir: ' + (err.message || err));
        }
      });
    }
  }

  onConfirm() {
    this.alertService.confirm();
    (window as any).HSOverlay.close('#confirm-modal');
  }

  onCancel() {
    this.alertService.cancel();
    (window as any).HSOverlay.close('#confirm-modal');
  }
}
