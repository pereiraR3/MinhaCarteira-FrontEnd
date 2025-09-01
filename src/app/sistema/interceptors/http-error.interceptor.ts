import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(
       // private _snackBar: MatSnackBar
    ) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError((response: HttpErrorResponse): Observable<HttpEvent<any>> => {
            if (!request.url.endsWith('autorizacao/invalidar')){
                const mensagem = response.error.mensagem;
              //  this._snackBar.open(mensagem, 'Erro', SNACKBAR_CONF);
            }
            return throwError(response);
        }));
    }

}
