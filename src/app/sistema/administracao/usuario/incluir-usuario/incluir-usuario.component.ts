import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { Validators } from 'ngx-editor';
import { ContaService } from '../../../services/ContaService.service';
import { Usuario } from '../../../model/usuario.model';
import { Md5 } from 'ts-md5';
import { UsuarioService } from '../../../services/UsuarioService.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ParceiroService } from '../../../services/ParceiroService.service';
import { UnidadeService } from '../../../services/unidadeService.service';

@Component({
  standalone:false,
  selector: 'app-incluir-usuario',
  templateUrl: './incluir-usuario.component.html',
  styleUrl: './incluir-usuario.component.scss'
})
export class IncluirUsuarioComponent implements OnInit {

  private formBuilder: UntypedFormBuilder;
  usuarioform!: UntypedFormGroup;
  selectedConta:any;

  constructor( formBuilder: UntypedFormBuilder, 
               private router: Router, 
               private toastr: ToastrService, 
               public contaService:ContaService,
               public usuarioService:UsuarioService){
    this.formBuilder = formBuilder;
  }

  public ngOnInit(): void{
    this.usuarioform = this.formBuilder.group({
      nome: [null,Validators.required, Validators.minLength(3)],
      email: [null,Validators.required, Validators.minLength(3)],
      login: [null,Validators.required, Validators.minLength(3)],
      senha: [null,Validators.required, Validators.minLength(3)],
      conta: [null],
     
      perfil: [null],
    });
  }

  get form() {
    return this.usuarioform.controls;
  }

    salvar() {
        const usuario: Usuario = new Usuario();
        usuario.nome = this.usuarioform.controls.nome.value; 
        usuario.email  = this.usuarioform.controls.email.value; 
        usuario.login = this.usuarioform.controls.login.value; 
        usuario.senha = Md5.hashStr(this.usuarioform.controls.senha.value).toString(); 
        usuario.conta =  this.selectedConta; 
    
        usuario.perfil = this.usuarioform.controls.perfil.value;   
        
        this.usuarioService.incluir( usuario ).subscribe( observer => {
          this.toastr.success('Cadastrado com sucesso','Usuário', {
            timeOut: 3000,
            positionClass: 'toast-top-right',
          });
          this.voltar()
        }, error => {
          console.log(error)
        }); 
    }

    voltar() {
      this.router.navigateByUrl('/administracao/usuario');
    }

}
