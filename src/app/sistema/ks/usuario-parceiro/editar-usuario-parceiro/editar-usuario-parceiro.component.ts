import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { ContaService } from '../../../services/ContaService.service';
import { ToastrService } from 'ngx-toastr';
import { UsuarioParceiro } from '../../../model/UsuarioParceiro.model';
import { UsuarioParceiroService } from '../../../services/UsuarioParceiroService.service';
import { Unidade } from '../../../model/unidade.model';
import { Md5 } from 'ts-md5';
import { Parceiro } from '../../../model/parceiro.model';
@Component({
  standalone:false,
  selector: 'app-editar-usuario-parceiro',
  templateUrl: './editar-usuario-parceiro.component.html',
  styleUrl: './editar-usuario-parceiro.component.scss'
})
export class EditarUsuarioParceiroComponent implements OnInit {

  @Input() usuarioParceiro: UsuarioParceiro= {} as UsuarioParceiro;
  @Input() parceiro: Parceiro = {} as Parceiro;
  @Output() closeModal =  new EventEmitter<boolean>();
  state: any;
  selectedConta:any;
 
  selectedUnidade:Unidade[] = [];
  usuarioParceiroform!: UntypedFormGroup;
  private formBuilder: UntypedFormBuilder;
  
  constructor( formBuilder: UntypedFormBuilder, 
               private toastr: ToastrService, 
               public contaService:ContaService, 
               public usuarioParceiroService:UsuarioParceiroService){
    this.formBuilder = formBuilder;
  }
  
  public ngOnInit(): void{
    this.usuarioParceiroform = this.formBuilder.group({
      nome: [null],
      email: [null],
      cpfcnpj: [null],
      login: [null],
      titulo: [null],
      funcao: [null],
      assinatura: [null],
      celular:[null],
      unidades: [null]
    });
    
    this.carregarDadosFormulario()
  }




carregarDadosFormulario(){
   if (this.usuarioParceiroform.invalid) {
      this.usuarioParceiroform.markAllAsTouched();
      this.toastr.error('Preencha todos os campos obrigatorios', 'Usuario Parceiro', {
        timeOut:4000,
        positionClass: 'toast-top-right',
      });
      return;
    }
  if(this.usuarioParceiroform != null) {
    this.usuarioParceiroform.controls.nome.setValue(this.usuarioParceiro.nome);
    this.usuarioParceiroform.controls.email.setValue(this.usuarioParceiro.email);
    this.usuarioParceiroform.controls.cpfcnpj.setValue(this.usuarioParceiro.cpf_cnpj);
    this.usuarioParceiroform.controls.login.setValue(this.usuarioParceiro.login);
    this.usuarioParceiroform.controls.titulo.setValue(this.usuarioParceiro.titulo);
    this.usuarioParceiroform.controls.funcao.setValue(this.usuarioParceiro.funcao);
    this.usuarioParceiroform.controls.assinatura.setValue(this.usuarioParceiro.assinatura);
    //this.usuarioParceiroform.controls.senha.setValue(this.usuarioParceiro.senha);
    this.usuarioParceiroform.controls.celular.setValue(this.usuarioParceiro.celular);
    this.usuarioParceiroform.controls.unidades.setValue(this.usuarioParceiro.unidades);
  } 
}



  get form() {
    return this.usuarioParceiroform.controls;
  }

    salvar() {
      const usuarioParceiro: UsuarioParceiro = new UsuarioParceiro();
      usuarioParceiro.id =  this.usuarioParceiro.id;
      usuarioParceiro.nome = this.usuarioParceiroform.controls.nome.value; 
      usuarioParceiro.email  = this.usuarioParceiroform.controls.email.value;
      usuarioParceiro.cpf_cnpj  = this.usuarioParceiroform.controls.cpfcnpj.value;
      usuarioParceiro.login  = this.usuarioParceiroform.controls.login.value;
      if (usuarioParceiro.senha){
        usuarioParceiro.senha = Md5.hashStr(this.usuarioParceiroform.controls.senha.value).toString();
      }
      usuarioParceiro.funcao = this.usuarioParceiroform.controls.funcao.value;
      usuarioParceiro.assinatura = this.usuarioParceiroform.controls.assinatura.value;
      usuarioParceiro.titulo = this.usuarioParceiroform.controls.titulo.value;
      usuarioParceiro.unidades = this.selectedUnidade;
        this.usuarioParceiroService.alterar( usuarioParceiro ).subscribe( observer => {
          this.toastr.success('Atualizado com sucesso','Parceiro', {
            timeOut: 3000,
            positionClass: 'toast-top-right',
          });
         this.closeModal.emit(true)
        }, error => {
          console.log(error)
        }); 
    }


   

    voltar() {
     this.closeModal.emit(false)
    }
    
  onUnidadesChanges(unidades: Unidade[]){
    if(this.usuarioParceiroform){
      this.selectedUnidade = unidades;
      if (this.selectedUnidade){
        this.usuarioParceiroform.controls.unidades.setValue(unidades);
      }
    }
  }
}
