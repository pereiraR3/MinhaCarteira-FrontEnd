import { HttpClient } from "@angular/common/http";
import { UrlApiDinamicoService } from "./UrlApiDinamicoService.service";
import { AbstractEntityService } from "./abstract-entity.service";
import { OportunidadeMovimentacao } from "../model/oportunidadeMovimentacao.model";
import { Injectable } from "@angular/core";
import { Resultset } from "../model/resultset.model";
import { map, Observable } from "rxjs";
import { AbstractFiltro } from "../model/filtro/abstract-filtro.model";
@Injectable({
  providedIn: 'root'
})
export class OportunidadeMovimentacaoService extends AbstractEntityService<OportunidadeMovimentacao> {
  constructor(
    http: HttpClient,
    private urlApiDinamicoService: UrlApiDinamicoService
  ) {
    super(http);
  }

  getUrlBase(): string {
    return this.urlApiDinamicoService.apiBaseUrl + '/api/oportunidadeMovimentacao'
  }

  newEntityInstance(): OportunidadeMovimentacao {
    return new OportunidadeMovimentacao();
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