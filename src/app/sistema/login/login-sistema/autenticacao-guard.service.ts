import { Injectable, inject } from '@angular/core'
import { CanActivate } from '@angular/router'

import { Router } from "@angular/router"
import { UsuarioService } from '../../services/UsuarioService.service';
import { UsuarioParceiroService } from '../../services/UsuarioParceiroService.service';
import { AutorizacaoService } from './autorizacao.service';



@Injectable({ providedIn: 'root' })
export class AutenticacaoGuard implements CanActivate {

    constructor(
      private usuarioParceiroService: UsuarioParceiroService,
      private autorizacaoService: AutorizacaoService,
      private router: Router
      ) {}

    canActivate(): boolean {
      
         this.usuarioParceiroService.buscarUsuarioAutenticadoGuard().subscribe( 
           data => {
             return true;
           },
           err => {
             this.router.navigate(['/login']);
             return false;
           });
       

        return true;
        
    }
}
