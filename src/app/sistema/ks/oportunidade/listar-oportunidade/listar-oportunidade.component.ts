import { Component, EventEmitter, OnDestroy, OnInit, Output } from "@angular/core";
import { Oportunidade } from "../../../model/oportunidade.model";
import { AbstractListarPageComponent } from "../../../page/abstract-listar-page.component";
import { OportunidadeService } from "../../../services/oportunidadeService.service";
import { Router } from "@angular/router";
import { FormBuilder, UntypedFormBuilder, UntypedFormGroup } from "@angular/forms";
import { OportunidadeFiltro } from "../../../model/filtro/oportunidade-filtro.model";
import { Resultset } from "../../../model/resultset.model";
import { AbstractEntityService } from "../../../services/abstract-entity.service";
import { ToastrService } from "ngx-toastr";
import { Validators } from 'ngx-editor';
import { AlertModalService } from "../../../componentesistema/modal-alert/alert-modal.service";

declare var $: any;
declare var HSOverlay: any
@Component({
  standalone: false,
  selector: 'app-listar-oportunidade',
  templateUrl: './listar-oportunidade.component.html',
  styleUrls: ['./listar-oportunidade.component.scss']
})
export class ListarOportunidadeComponent extends AbstractListarPageComponent<Oportunidade> implements OnInit, OnDestroy {


  public oportunidadeSelecionadaModal: Oportunidade | null = null;
  public oportunidadeSelecionadaView: Oportunidade;
  public oportunidadeEditarModal: Oportunidade;
  emailForm!: UntypedFormGroup;
  private formBuilder: UntypedFormBuilder;
  formData = new FormData();
  ordersColumn = [
    { header: "ID", field: "Sequencial" },
    { header: "Nome", field: "nome" },
    { header: "Email", field: "email" },
    { header: "Situação", field: "status" },
    { header: "Ações", field: "acoes" },
  ]

  filtro: OportunidadeFiltro = new OportunidadeFiltro();
  page: any;
  override resultset: Resultset = new Resultset();
  alignmentClass: string | string[] | Set<string> | { [klass: string]: any; } | null | undefined;
  url: String;
  urlCompleta: String;
  @Output() closeModal = new EventEmitter<boolean>();




  constructor(public oportunidadeService: OportunidadeService,
    formBuilder: UntypedFormBuilder,
    private router: Router,
    private toastr: ToastrService,
    public fb: FormBuilder,
        private alertService: AlertModalService,
    
  ) {
    super();
    this.oportunidadeService = oportunidadeService;
    this.formBuilder = formBuilder;
  }



  carregarDadosFecharModal() {
    this.filtroNomeOportunidade('');
    (window as any).HSOverlay.close('#modal-edit-oportunidade');
    (window as any).HSOverlay.close('#modal-add-oportunidade');
  }

  filtroNomeOportunidade(nome: string) {
    this.pagina = 0;
    this.filtro.nome = nome;
    if (this.filtro.nome.length > 2) {
      this.filtrar();
    } else if (this.filtro.nome.length == 0) {
      this.filtrar();
    }
  }

  filtroStatusOportunidade(status: string) {
    this.pagina = 0
    this.filtro.status = status;
    if (this.filtro.status.length > 2) {
      this.filtrar();
    } else if (this.filtro.status.length == 0) {
      this.filtrar();
    }
  }

  getFiltro(): OportunidadeFiltro {
    return this.filtro;
  }

  getService(): AbstractEntityService<Oportunidade> {
    return this.oportunidadeService;
  }

  ngOnDestroy(): void { }

  filtrarPaginacao(event: any) {
    var pagina = event - 1;
    this.pagina = pagina;
    this.filtrar();
  }

  ngOnInit(): void {
    this.filtro = new OportunidadeFiltro();


    this.filtroStatusOportunidade("EM ANALISE")

    this.emailForm = this.formBuilder.group({ email: [null, Validators.required], url: [null], token: [null] })
  }

  editarOportunidade(oportunidade: Oportunidade) {
    this.router.navigateByUrl('ks/oportunidades/editar', {
      state: { oportunidade: oportunidade }
    })
  }

  onPageChange(pageIndex: any) {
    this.pagina = pageIndex;
    this.filtrar();
  }

  ngAfterViewInit(): void {
    if (typeof HSOverlay !== 'undefined') {
      HSOverlay.autoInit();
    }
  }

  public abrirModalEdicao(oportunidade: Oportunidade): void {
    this.oportunidadeEditarModal = oportunidade;
    setTimeout(() => {
      (window as any).HSOverlay?.open?.('#modal-edit-oportunidade');
    });
  }


  visualizarOportunidade(oportunidade: Oportunidade) {
    this.router.navigateByUrl('/ks-portal/visualizar-oportunidade/' + oportunidade.getId(), {
      state: { oportunidade: oportunidade }
    });
    this.oportunidadeSelecionadaView = oportunidade;
  }









  public criarUrl() {
    this.oportunidadeService.geratoken().subscribe((token: String) => {
      const urlbase = this.oportunidadeService.getUrlAtualEmail() + "/form-indicacao-publico/"
      this.urlCompleta = urlbase + token;
    }, error => {
      console.log(error)
    });
  }



  public enviarLinkEmail() {
    this.formData = new FormData();

    this.formData.append('email', this.emailForm.controls.email.value)
    const corpoEmail = this.urlCompleta.toString()
    this.formData.append('url', corpoEmail);

    this.oportunidadeService.enviarEmail(this.formData).subscribe(observer => {
      this.toastr.success('Email enviado com sucesso', 'Email', {
        timeOut: 3000,
        positionClass: 'toast-top-right',
      });
      (window as any).HSOverlay.close('#gera-link');
    }, error => {
      this.toastr.error('Erro ao enviar email, erro: '+error.message, 'Email', {
        timeOut: 3000,
        positionClass: 'toast-top-right',
      });
    });
  }

  AdicionarModalOportunidade() {
    setTimeout(() => {
      (window as any).HSOverlay?.open?.('#modal-add-oportunidade');
    });
    console.log("abrir modal")
  }

  async deletar(oportunidade: Oportunidade) {
    const confirmado = await this.alertService.showConfirm(
      'Confirmação',
      'Você tem certeza de que deseja excluir essa Indicação? Esta ação é irreversível.\n'
    );

    if (confirmado) {
      this.oportunidadeService.excluir(oportunidade).subscribe({
        next: () => {

          this.alertService.showAlertSuccess('Indicação excluída com sucesso.');
          this.filtroNomeOportunidade(''); // Atualiza lista
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
