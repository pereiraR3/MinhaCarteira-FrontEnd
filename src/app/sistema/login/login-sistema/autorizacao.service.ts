import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Observable, of} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {Router} from '@angular/router';
import { AccessToken } from './access-token.model';
import { Usuario } from '../../model/usuario.model';
import { UrlApiDinamicoService } from '../../services/UrlApiDinamicoService.service';
import { UsuarioParceiro } from '../../model/UsuarioParceiro.model';


export type TipoUsuario = 'ks' | 'portal';
@Injectable({
  providedIn: 'root'
})
export class AutorizacaoService {
    
    private ACCESS_TOKEN_KEY = 'aluno-presente-token';
    private TYPE_USER = 'TYPE_USER';
    constructor(
        private http: HttpClient,
        private router: Router,
        private urlApiDinamicoService:UrlApiDinamicoService
    ) {
    }

    public iniciarSessao( accessToken: AccessToken): void {
        localStorage.setItem( this.ACCESS_TOKEN_KEY, accessToken.access_token );
       
    }

    public isSessaoValida(): boolean{
        return ( this.getAccessToken() != null );
    }

    public getAccessToken(): String{
        var retorno = "";
        if(localStorage.getItem( this.ACCESS_TOKEN_KEY ) != null) {
            retorno = localStorage.getItem( this.ACCESS_TOKEN_KEY )  || "";
        }
        return retorno;
    } 
   


  
    public buscarUsuarioAutenticado(): Observable<Usuario>{
        return this.http.get<Usuario>( this.urlApiDinamicoService.apiBaseUrl + 'autorizacao/usuario-autenticado' ).pipe(map( resultado => {
            return new Usuario().deserialize(resultado);
        }));
    }

    public buscarUsuarioParceiroAutenticado(): Observable<UsuarioParceiro>{
        return this.http.get<UsuarioParceiro>( this.urlApiDinamicoService.apiBaseUrl + 'autorizacao/usuario-autenticado' ).pipe(map( resultado => {
            return new UsuarioParceiro().deserialize(resultado);
        }));
    }

    private redirecionarFormularioAutenticacao(): void{
        localStorage.removeItem(this.ACCESS_TOKEN_KEY);
        location.reload();
    }

    public invalidarSessao(): void{
        if (localStorage.getItem(this.ACCESS_TOKEN_KEY) != null) {
            const observable: Observable<any> = this.http.post<any>(this.urlApiDinamicoService.apiBaseUrl + 'autorizacao/invalidar', null).pipe(catchError(err => of([])));
            observable.subscribe(
                value => {},
                error => {},
                () => this.redirecionarFormularioAutenticacao()
            );
        }
    }

}
