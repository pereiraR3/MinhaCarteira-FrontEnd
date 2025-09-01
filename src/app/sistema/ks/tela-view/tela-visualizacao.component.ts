import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { ActivatedRoute, Navigation, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ParceiroService } from '../../services/ParceiroService.service';
import { Parceiro } from '../../model/parceiro.model';
import { Unidade } from '../../model/unidade.model';
@Component({
  standalone: false,
  selector: 'app-tela-visualizacao',
  templateUrl: './tela-visualizacao.component.html',
  styleUrl: './tela-visualizacao.component.scss'
})
export class TelaVisualizacaoComponent implements OnInit {

  private formBuilder: UntypedFormBuilder;
  telaView!: UntypedFormGroup;
  state: any;
  private currentNavigation: Navigation | null = null;
  parceiro: Parceiro = {} as Parceiro;
  unidade: Unidade = {} as Unidade;
  usuarioParceiroform!: UntypedFormGroup;
  selectedParceiro: any;
  selectedUnidade: Unidade[] = [];
  private parceiro_id: number;
  constructor(formBuilder: UntypedFormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    public parceiroService: ParceiroService) {
    this.formBuilder = formBuilder;


    this.route.queryParams.subscribe(params => {


      this.currentNavigation = this.router.getCurrentNavigation();
      if (this.currentNavigation != null) {
        this.state = this.currentNavigation.extras.state;
        this.parceiro = this.state.parceiro;
      }
    });
  }

  public ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.parceiro_id = params['id'];

    });
    this.telaView = this.formBuilder.group({
      nome: [null],
      email: [null],
    });
    this.buscarParceiro();
  }

  buscarParceiro() {
    this.parceiroService.buscar(this.parceiro_id).subscribe(retorno => {
      this.parceiro = retorno
      this.carregarDadosFormulario()
    });
  }


  carregarDadosFormulario() {

    if (this.telaView != null) {
      this.telaView.controls.nome.setValue(this.parceiro.nome);
      this.telaView.controls.email.setValue(this.parceiro.email);
    }
  }

  onUnidadesChanges(unidades: Unidade[]) {
    this.selectedUnidade = unidades;
    this.usuarioParceiroform.controls.unidades.setValue(unidades);
  }
  get form() {
    return this.telaView.controls;
  }

  salvar() {
    const parceiro: Parceiro = new Parceiro();
    parceiro.parceiro_id = this.parceiro.parceiro_id;
    parceiro.nome = this.telaView.controls.nome.value;
    parceiro.email = this.telaView.controls.email.value;
    this.parceiroService.alterar(parceiro).subscribe(observer => {
      this.toastr.success('Atualizado com sucesso', 'Parceiro', {
        timeOut: 3000,
        positionClass: 'toast-top-right',
      });
      this.voltar()
    }, error => {
      console.log(error)
    });
  }


  voltar() {
    this.router.navigateByUrl('/ks/parceiro');
  }
  
 

}
