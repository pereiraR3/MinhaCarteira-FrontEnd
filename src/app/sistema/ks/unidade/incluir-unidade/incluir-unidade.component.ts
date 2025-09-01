import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { Validators } from 'ngx-editor';
import { ActivatedRoute, Navigation, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ParceiroService } from '../../../services/ParceiroService.service';
import { UnidadeService } from '../../../services/unidadeService.service';
import { Unidade } from '../../../model/unidade.model';
import { ProdutoService } from '../../../services/produtoService.service';
import { Parceiro } from '../../../model/parceiro.model';

@Component({
  standalone: false,
  selector: 'app-incluir-unidade',
  templateUrl: './incluir-unidade.component.html',
  styleUrl: './incluir-unidade.component.scss'
})
export class IncluirUnidadeComponent implements OnInit {

  private formBuilder: UntypedFormBuilder;
  unidadeform!: UntypedFormGroup;
  @Input() parceiro: Parceiro = {} as Parceiro;
  @Output() closeModal = new EventEmitter<boolean>();

  selectedParceiro: any;
  //selectedProduto:any;
  state: any;
  private currentNavigation: Navigation | null = null;
  constructor(formBuilder: UntypedFormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    public produtoService: ProdutoService,
    public parceiroService: ParceiroService,
    public unidadeService: UnidadeService) {
    this.formBuilder = formBuilder;

    //metodo para ouvir rota
    this.route.queryParams.subscribe(params => {
      this.currentNavigation = this.router.getCurrentNavigation();
      if (this.currentNavigation != null) {
        this.state = this.currentNavigation.extras.state;
        this.parceiro = this.state.parceiro;
      }
    });
  }

  public ngOnInit(): void {

    this.unidadeform = this.formBuilder.group({
      nome: [null, Validators.required, Validators.minLength(3)],
      descricao: [null, Validators.required, Validators.minLength(3)],
    });
  }

  get form() {
    return this.unidadeform.controls;
  }

  salvar() {

    const unidade: Unidade = new Unidade();
    unidade.nome = this.unidadeform.controls.nome.value;

    if (this.unidadeform.controls.nome.value == null) {
      this.toastr.error('Preencha o nome da unidade', 'Unidade', {
        timeOut: 3000,
        positionClass: 'toast-top-right',
      });
    }
    if (this.unidadeform.controls.descricao.value == null) {
      this.toastr.error('Preencha a descrição da unidade', 'Unidade', {
        timeOut: 3000,
        positionClass: 'toast-top-right',
      });
    }

    unidade.status = "ATIVO";
    unidade.descricao = this.unidadeform.controls.descricao.value;
    unidade.parceiro = this.parceiro.getId();

    this.unidadeService.incluir(unidade).subscribe(observer => {
      this.toastr.success('Cadastrado com sucesso', 'Unidade', {
        timeOut: 3000,
        positionClass: 'toast-top-right',
      });
      this.voltar()
      this.closeModal.emit(true);
      //window.location.reload()

    }, error => {
      console.log(error)
    });
  }

  voltar() {
    this.closeModal.emit(false);
  }

}
