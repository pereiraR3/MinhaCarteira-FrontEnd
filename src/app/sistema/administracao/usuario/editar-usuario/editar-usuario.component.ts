import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { Validators } from 'ngx-editor';
import { ContaService } from '../../../services/ContaService.service';
import { Usuario } from '../../../model/usuario.model';
import { Md5 } from 'ts-md5';
import { UsuarioService } from '../../../services/UsuarioService.service';
import { ActivatedRoute, Navigation, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  standalone:false,
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrl: './editar-usuario.component.scss'
})
export class EditarUsuarioComponent implements OnInit {

  private formBuilder: UntypedFormBuilder;
  usuarioform!: UntypedFormGroup;
  selectedConta:any;
  state: any;


  private currentNavigation: Navigation|null = null;
  usuario: Usuario = {} as Usuario;
  constructor( formBuilder: UntypedFormBuilder, 
               private router: Router, 
               private route: ActivatedRoute,
               private toastr: ToastrService, 
               public contaService:ContaService, 
            
               public usuarioService:UsuarioService){
    this.formBuilder = formBuilder;

    
    this.route.queryParams.subscribe(params => {
      this.currentNavigation = this.router.getCurrentNavigation();
      if(this.currentNavigation  != null) {
        this.state = this.currentNavigation.extras.state;
        this.usuario = this.state.usuario;
      }
    });
  }
  
  public ngOnInit(): void{
    
    this.usuarioform = this.formBuilder.group({
      nome: [null],
      email: [null],
      login: [null],
      conta: [null],
      perfil: [null],
      //senha: [null,Validators.required, Validators.minLength(3)], 
 
      
    });

    this.carregarDadosFormulario()
  }




carregarDadosFormulario(){
  
  if(this.usuarioform != null) {
    this.usuarioform.controls.nome.setValue(this.usuario.nome);
    this.usuarioform.controls.email.setValue(this.usuario.email);
    this.usuarioform.controls.login.setValue(this.usuario.login);
    this.usuarioform.controls.conta.setValue(this.usuario.conta);

    if(this.usuario.conta != null) {
      this.selectedConta = this.usuario.conta.id;
    }
    this.usuarioform.controls.perfil.setValue(this.usuario.perfil);
   
    

  }
}



  get form() {
    
    return this.usuarioform.controls;
  }

    salvar() {
        const usuario: Usuario = new Usuario();
        usuario.id =  this.usuario.id;
        usuario.nome = this.usuarioform.controls.nome.value; 
        usuario.email  = this.usuarioform.controls.email.value; 
        usuario.login = this.usuarioform.controls.login.value; 
        usuario.conta =  this.selectedConta;
        usuario.perfil = this.usuarioform.controls.perfil.value;   
        this.usuarioService.alterar( usuario ).subscribe( observer => {
          this.toastr.success('Atualizado com sucesso','Usuário', {
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
