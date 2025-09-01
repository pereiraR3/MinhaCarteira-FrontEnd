import {AbstractEntityService} from "./abstract-entity.service";
import {UrlApiDinamicoService} from './UrlApiDinamicoService.service';
import {Injectable} from '@angular/core';

import {Observable} from "rxjs";
import {map} from 'rxjs/operators';
import { AbstractFiltro } from "../model/filtro/abstract-filtro.model";
import { Resultset } from "../model/resultset.model";

import {HttpClient} from '@angular/common/http';
import { Produto } from "../model/produto.model";

@Injectable({
    providedIn: 'root' 
  })
export class ProdutoService extends AbstractEntityService<Produto>{

  constructor(
    http: HttpClient,
    private urlApiDinamicoService:UrlApiDinamicoService
  ) {
    super(http);
  }

   getUrlBase(): string {
    return this.urlApiDinamicoService.apiBaseUrl + '/api/produtos'
  }

   newEntityInstance(): Produto {
    return new Produto();
  }

 
  override filtrar(pagina: number, filtro: AbstractFiltro): Observable<Resultset> {
    return this.http.post<any>(this.getUrlBase() + '/filtrar?pagina=' + pagina, filtro.serialize()).pipe(
      map(apiResponse => {
        const resultset: Resultset = new Resultset();
        resultset.totalPaginas = apiResponse.totalPages;
        resultset.totalRegistros = apiResponse.totalElements;
        resultset.registros = apiResponse.content.map((registro: any) => {
          return this.newEntityInstance().deserialize(registro);
        });
        return resultset;
      })
    );
  }

  
}
