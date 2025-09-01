import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from '../../model/usuario.model';
import { UsuarioService } from '../../services/UsuarioService.service';
import { AutenticacaoService } from '../../login/login-sistema/autenticacaoService.service';
import { ToastrService } from 'ngx-toastr';
import { UsuarioParceiroService } from '../../services/UsuarioParceiroService.service';
import { UsuarioParceiro } from '../../model/UsuarioParceiro.model';


declare var $: any;
@Component({
  standalone: false,
  selector: 'app-usuario-autenticacao-drop-down',
  templateUrl: './usuario-autenticacao-drop-down.component.html',
  styleUrls: ['./usuario-autenticacao-drop-down.component.css']
})
export class UsuarioAutenticacaoDropDownComponent implements OnInit {

  constructor(
    
    private usuarioService: UsuarioParceiroService, 
     private router: Router,
     public autenticacaoService:AutenticacaoService,
     private toastr: ToastrService) { }
  @Output() clicaracao  = new EventEmitter();
  public usuario:UsuarioParceiro  = {} as UsuarioParceiro;
  ngOnInit(): void {
    this.buscarUsuarioAutenticado();
  }


  buscarUsuarioAutenticado() {
    this.usuarioService.buscarUsuarioAutenticado()
                          .then( (usuario: any) => {
                            this.usuario = usuario;
                          }).catch((param: any) =>{
                             console.log(param);
                          });
  }


  alterarSenha() {
    this.clicaracao.emit({nome:'alterar-senha-usuario', usuario: this.usuario});
  }


  sairSistema() {
    this.router.navigate(['/login']);
    this.autenticacaoService.desconectarSessao().subscribe( 
      data => {
        this.router.navigate(['/login']);

      },
      err => {
        this.toastr.info('Nao foi possivel encerrar sua sessão','Aviso', {
          timeOut: 3000,
          positionClass: 'toast-top-right',
        });
      
      });   
  }

}
