import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { Validators } from 'ngx-editor';
import { Md5 } from 'ts-md5';
import { ActivatedRoute, Navigation, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ParceiroService } from '../../../services/ParceiroService.service';
import { ProdutoService } from '../../../services/produtoService.service';
import { UsuarioParceiro } from '../../../model/UsuarioParceiro.model';
import { UsuarioParceiroService } from '../../../services/UsuarioParceiroService.service';
import { UnidadeService } from '../../../services/unidadeService.service';
import { Parceiro } from '../../../model/parceiro.model';
import { Unidade } from '../../../model/unidade.model';
import { thumbnailsSettings } from 'lightgallery/plugins/thumbnail/lg-thumbnail-settings';
import { UsuarioParceiroFiltro } from '../../../model/filtro/Usuario-parceiro-filtro.model';
import { ValidadorDocumentoUtil } from '../../../util/validador-documento.util';
import { validColorValidator } from 'ngx-colors';

@Component({
  standalone: false,
  selector: 'app-incluir-usuario-parceiro',
  templateUrl: './incluir-usuario-parceiro.component.html',
  styleUrl: './incluir-usuario-parceiro.component.scss'
})
export class IncluirUsuarioParceiroComponent implements OnInit {

  private formBuilder: UntypedFormBuilder;
  usuarioParceiroform!: UntypedFormGroup;

  selectedUnidade: Unidade[] = [];
  @Input() parceiro: Parceiro = {} as Parceiro;
  filtro: UsuarioParceiroFiltro = new UsuarioParceiroFiltro();
  @Output() closeModal = new EventEmitter<boolean>();
  constructor(formBuilder: UntypedFormBuilder,
    private toastr: ToastrService,
    public parceiroService: ParceiroService,
    public unidadesService: UnidadeService,

    public usuarioParceiroService: UsuarioParceiroService) {
    this.formBuilder = formBuilder;

  }

  public ngOnInit(): void {
    this.filtro = new UsuarioParceiroFiltro();
    this.usuarioParceiroform = this.formBuilder.group({
      nome: [null, Validators.required, Validators.minLength(10)],
      email: [null, Validators.required, Validators.minLength(10)],
      cpfcnpj: [null, Validators.required, Validators.minLength(11)],
      //senha: [null, Validators.required, Validators.minLength(6)],
      unidades: [null],
      login: [null, Validators.required, Validators.minLength(3)],
      assinatura: [null],
      titulo: [null],
      funcao: [null],
    });

  }


  onUnidadesChanges(unidades: Unidade[]) {
    this.selectedUnidade = unidades;
    this.usuarioParceiroform.controls.unidades.setValue(unidades);
  }

  get form() {
    return this.usuarioParceiroform.controls;
  }

  salvar() {
    const usuarioParceiro: UsuarioParceiro = new UsuarioParceiro();

 if (this.usuarioParceiroform.invalid) {
      this.usuarioParceiroform.markAllAsTouched();
      this.toastr.error('Preencha todos os campos obrigatorios', 'Usuario Parceiro', {
        timeOut:4000,
        positionClass: 'toast-top-right',
      });
      return;
    }

    usuarioParceiro.nome = this.usuarioParceiroform.controls.nome.value;
    usuarioParceiro.email = this.usuarioParceiroform.controls.email.value;
    usuarioParceiro.senha = Md5.hashStr("123").toString();
    usuarioParceiro.login = this.usuarioParceiroform.controls.login.value;
    usuarioParceiro.funcao = this.usuarioParceiroform.controls.funcao.value;
    usuarioParceiro.assinatura = this.usuarioParceiroform.controls.assinatura.value;
    usuarioParceiro.titulo = this.usuarioParceiroform.controls.titulo.value;
    usuarioParceiro.parceiro = this.parceiro;
    usuarioParceiro.unidades = this.selectedUnidade;

    usuarioParceiro.cpf_cnpj = this.usuarioParceiroform.controls.cpfcnpj.value;
    this.usuarioParceiroService.incluir(usuarioParceiro).subscribe(observer => {
      this.toastr.success('Cadastrado com sucesso', 'Usuario Parceiro', {
        timeOut: 3000,
        positionClass: 'toast-top-right',
      });
       window.location.reload()
      this.closeModal.emit(true);
      
    }, error => {
      console.log(error)
    });
  }

  voltar() {
    this.closeModal.emit(false);
  }

}
