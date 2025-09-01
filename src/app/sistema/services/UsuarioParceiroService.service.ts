import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import { AbstractEntityService } from './abstract-entity.service';
import { UrlApiDinamicoService } from './UrlApiDinamicoService.service';
import { UsuarioParceiro } from '../model/UsuarioParceiro.model';
import {map, Observable} from 'rxjs';
import { Usuario } from '../model/usuario.model';

@Injectable({
    providedIn: 'root' // 🔥 solução recomendada
  })
export class UsuarioParceiroService extends AbstractEntityService<UsuarioParceiro>{


    constructor(
        http: HttpClient,
        private urlApiDinamicoService:UrlApiDinamicoService
    ) {
        super(http);
    }

    getUrlBase(): string {
        return this.urlApiDinamicoService.apiBaseUrl  + '/api/usuariosparceiros';
    }

    newEntityInstance(): UsuarioParceiro {
        return new UsuarioParceiro();
    }

  buscarUsuarioAutenticado():Promise<UsuarioParceiro> {
          return this.http.get(this.getUrlBase() + '/autenticado' ).toPromise().then((resposta: any) => resposta)
    }

   buscarUsuarioAutenticadoGuard():Observable<UsuarioParceiro> {
         return this.http.get<UsuarioParceiro>( this.getUrlBase() + '/autenticado' ).pipe(map( resultado => {
             return this.newEntityInstance().deserialize(resultado);
         }));
     }   
     public desbloquearUsuario( usuario: UsuarioParceiro ): Observable<void> {
        return this.http.post<void>( this.getUrlBase() + '/desbloquear?email=' + usuario.email, null );
    }

    public bloquearUsuario( usuario: UsuarioParceiro ): Observable<void> {
        return this.http.post<void>( this.getUrlBase() + '/bloquear?email=' + usuario.email, null );
    }

    public buscarUsuario( email: string ): Observable<UsuarioParceiro> {
        return this.http.get<UsuarioParceiro>( this.getUrlBase() + '?email=' + email).pipe(map( resultado => {
            return this.newEntityInstance().deserialize(resultado);
        }));
    }

    public alterarSenhaUsuario( usuario: UsuarioParceiro ): Observable<void> {
      return this.http.post<void>( this.getUrlBase() + '/alterarSenha', usuario );
    }


   
}


