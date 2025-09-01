import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Autenticacao } from './autenticacao.model';
import { AccessToken } from './access-token.model';
import { UrlApiDinamicoService } from '../../services/UrlApiDinamicoService.service';
import { AutorizacaoService } from './autorizacao.service';
import { Observable } from 'rxjs';




@Injectable({
  providedIn: 'root'
})
export class AutenticacaoService {

  constructor(
    private http: HttpClient,
    private urlApiDinamicoService: UrlApiDinamicoService,
    private autorizacaoService: AutorizacaoService,
    private router: Router) { }


  getUrlBase(): string {
    return this.urlApiDinamicoService.apiBaseUrl + '/autenticacao';
  }


  autenticarPortal(autenticacao: Autenticacao): Promise<AccessToken> {


    let grant_type = 'password';
    let body = `grant_type=${grant_type}&username=${autenticacao.username}&password=${autenticacao.password}&tipo=${autenticacao.tipo}`;
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8' })

    };

    return this.http.post<AccessToken>(this.getUrlBase() + '/autenticar', body, httpOptions)
      .toPromise().then((resposta: any) => resposta)

  }

  autenticar(autenticacao: Autenticacao): Promise<AccessToken> {
    let grant_type = 'password';
    let body = `grant_type=${grant_type}&username=${autenticacao.username}&password=${autenticacao.password}&tipo=${autenticacao.tipo}`;
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8' })

    };

    return this.http.post<AccessToken>(this.getUrlBase() + '/autenticar', body, httpOptions)
      .toPromise().then((resposta: any) => resposta)

  }

  desconectarSessao(): Observable<void> {
    return this.http.get<void>(this.getUrlBase() + '/desconectar?token=Bearer' + this.autorizacaoService.getAccessToken()).pipe(map(resultado => {

    }));

  }
  
}
