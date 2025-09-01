import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import { finalize } from "rxjs/operators";
import { AutorizacaoService } from '../login/login-sistema/autorizacao.service';
import { LoaderService } from './loader.service';

@Injectable()
export class HttpHeadersInterceptor implements HttpInterceptor {

    constructor(private autorizacaoService: AutorizacaoService, private loader: LoaderService) { }



    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      var precisaAutorizacao = true;

      var autenticando = request.url.includes("autenticacao/autenticar");
       if(precisaAutorizacao && autenticando) {
        precisaAutorizacao = false
       }


     if (precisaAutorizacao && this.autorizacaoService.isSessaoValida() ) {
            request = request.clone({
                setHeaders: {
                    Authorization: 'Bearer ' + this.autorizacaoService.getAccessToken()
                }
            });
        }
        this.loader.show()
        return next.handle(request).pipe(
          finalize(() => this.loader.hide())
        );
        //return next.handle(request);
    }
}
