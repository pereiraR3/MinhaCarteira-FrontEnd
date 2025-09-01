import {AbstractEntity} from '../model/abstract-entity.model';
import {Observable} from 'rxjs';
import {Resultset} from '../model/resultset.model';
import {map} from 'rxjs/operators';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { AbstractFiltro } from '../model/filtro/abstract-filtro.model';

export abstract class AbstractEntityService<T extends AbstractEntity>{

    private _http: HttpClient;

    constructor(
        http: HttpClient
    ) {
        this._http = http;
    }

    get http(): HttpClient {
        return this._http;
    }



    abstract getUrlBase(): string;

    abstract newEntityInstance(): T;

    public buscar( id: any ): Observable<any> {
        return this.http.get<T>( this.getUrlBase() + '/' + id).pipe(map( resultado => {
            return this.newEntityInstance().deserialize(resultado);
        }));
    }





    public incluir( entity: T ): Observable<any> {



        return this.http.post<void>( this.getUrlBase(), entity.serialize());
    }

    public alterar( entity: T ): Observable<any> {
        return this.http.put<void>( this.getUrlBase() + '/' + entity.getId(), entity.serialize() );
    }

    public excluir( entity: T ): Observable<any> {
        return this.http.delete<void>( this.getUrlBase() + '/' + entity.getId() );
    }

    public filtrar(pagina: number, filtro: AbstractFiltro ): Observable<Resultset> {
        
        return this.http.post<Resultset>( this.getUrlBase() + '/filtrar?pagina=' + pagina, filtro.serialize() ).pipe(map( resultado => {
            var resultset: Resultset = new Resultset();
            resultset.registros = [];
            resultset.totalPaginas = resultado.totalPaginas;
            resultset.totalRegistros = resultado.totalRegistros;
            resultado.registros.forEach( registro => {
                resultset.registros.push( this.newEntityInstance().deserialize(registro) );
            });
            return resultset;
        }));
    }
  
}
