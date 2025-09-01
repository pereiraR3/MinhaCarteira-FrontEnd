import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Usuario} from '../model/usuario.model';
import {map} from 'rxjs/operators';
import { AbstractEntityService } from './abstract-entity.service';
import { UrlApiDinamicoService } from './UrlApiDinamicoService.service';
import { Parceiro } from '../model/parceiro.model';
import { AbstractFiltro } from '../model/filtro/abstract-filtro.model';
import { Resultset } from '../model/resultset.model';
@Injectable({
    providedIn: 'root' // 🔥 solução recomendada
  })
export class UsuarioService extends AbstractEntityService<Usuario>{


    constructor(
        http: HttpClient,
        private urlApiDinamicoService:UrlApiDinamicoService
    ) {
        super(http);
    }

    getUrlBase(): string {
        return this.urlApiDinamicoService.apiBaseUrl  + '/api/usuarios';
    }

    newEntityInstance(): Usuario {
        return new Usuario();
    }


    buscarUsuarioAutenticadoGuard():Observable<Usuario> {
        return this.http.get<Usuario>( this.getUrlBase() + '/autenticado' ).pipe(map( resultado => {
            return this.newEntityInstance().deserialize(resultado);
        }));
    }   



    buscarUsuarioAutenticado():Promise<Usuario> {
          return this.http.get(this.getUrlBase() + '/autenticado' ).toPromise().then((resposta: any) => resposta)
    }


    public desbloquearUsuario( usuario: Usuario ): Observable<void> {
        return this.http.post<void>( this.getUrlBase() + '/desbloquear?email=' + usuario.email, null );
    }

    public bloquearUsuario( usuario: Usuario ): Observable<void> {
        return this.http.post<void>( this.getUrlBase() + '/bloquear?email=' + usuario.email, null );
    }

    public buscarUsuario( email: string ): Observable<Usuario> {
        return this.http.get<Usuario>( this.getUrlBase() + '?email=' + email).pipe(map( resultado => {
            return this.newEntityInstance().deserialize(resultado);
        }));
    }


    public alterarSenhaUsuario( usuario: Usuario ): Observable<void> {
      return this.http.post<void>( this.getUrlBase() + '/alterarSenha', usuario );
    }

   
}


