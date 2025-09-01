import { Component, OnDestroy, OnInit } from "@angular/core";
import { Oportunidade } from "../../../model/oportunidade.model";
import { AbstractListarPageComponent } from "../../../page/abstract-listar-page.component";
import { AbstractFiltro } from "../../../model/filtro/abstract-filtro.model";
import { AbstractEntityService } from "../../../services/abstract-entity.service";
import { FormBuilder, UntypedFormBuilder, UntypedFormGroup, Validators } from "@angular/forms";
import { OportunidadeFiltro } from "../../../model/filtro/oportunidade-filtro.model";
import { Router } from "@angular/router";
import { OportunidadeService } from "../../../services/oportunidadeService.service";
import { ToastrService } from "ngx-toastr";
import { AlertModalService } from "../../../componentesistema/modal-alert/alert-modal.service";

declare var $: any;
declare var HSOverlay: any
@Component({
  standalone: false,
  selector: 'app-listar-oportunidade-assumidas',
  templateUrl: './listar-oportunidade-assumidas.component.html',
})
export class ListarOportunidadesAssumidasComponent extends AbstractListarPageComponent<Oportunidade> implements OnInit, OnDestroy {


  alignmentClass: string | string[] | Set<string> | { [klass: string]: any; } | null | undefined;
  public oportunidadeSelecionadaModal: Oportunidade | null = null;
  public oportunidadeSelecionadaView: Oportunidade;
  emailForm!: UntypedFormGroup;
  private formBuilder: UntypedFormBuilder;
  formData = new FormData();
  filtro: OportunidadeFiltro = new OportunidadeFiltro();
  page: any;
  url: String;
  urlCompleta: String;
  public oportunidadeEditarModal: Oportunidade;


  constructor(public oportunidadeService: OportunidadeService,
    formBuilder: UntypedFormBuilder,
    private router: Router,
    private toastr: ToastrService,
            private alertService: AlertModalService,
    
    public fb: FormBuilder,
  ) {
    super();
    this.oportunidadeService = oportunidadeService;
    this.formBuilder = formBuilder;
  }


  ordersColumn = [
    { header: "ID", field: "Sequencial" },
    { header: "Nome", field: "nome" },
    { header: "Email", field: "email" },
    { header: "Status", field: "status" },
    { header: "Ações", field: "acoes" },
  ]
allTasksChecked: boolean = false;


  ngOnInit(): void {
    this.filtro = new OportunidadeFiltro();
    this.filtroNomeOportunidade("");
    this.emailForm = this.formBuilder.group({ email: [null, Validators.required], url: [null], token: [null] })
  }

  onPageChange(pageIndex: any) {
    this.pagina = pageIndex;
    this.filtrar();
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
  
    ngAfterViewInit(): void {
    if (typeof HSOverlay !== 'undefined') {
      HSOverlay.autoInit();
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



  visualizarOportunidade(oportunidade: Oportunidade) {
    this.router.navigateByUrl('/ks/visualizar-oportunidade/' + oportunidade.getId(), {
      state: { oportunidade: oportunidade }
    });
    this.oportunidadeSelecionadaView = oportunidade;
  }

  


 AdicionarModalOportunidade() {
    setTimeout(() => {
      (window as any).HSOverlay?.open?.('#modal-add-oportunidade');
    });
    console.log("abrir modal")
  }





  public criarUrl() {
    this.oportunidadeService.geratoken().subscribe((token: String) => {
      const urlbase = this.oportunidadeService.getUrlAtualEmail() + "/form-indicacao-publico/"
      this.urlCompleta = urlbase + token;
    }, error => {
      console.log(error)
    });
  }



  public abrirModalEdicao(oportunidade: Oportunidade): void {
    this.oportunidadeEditarModal = oportunidade;
    setTimeout(() => {
      (window as any).HSOverlay?.open?.('#modal-edit-oportunidade');
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

  carregarDadosFecharModal() {
    this.filtroNomeOportunidade('');
    (window as any).HSOverlay.close('#modal-edit-oportunidade');
    (window as any).HSOverlay.close('#modal-add-oportunidade');
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
