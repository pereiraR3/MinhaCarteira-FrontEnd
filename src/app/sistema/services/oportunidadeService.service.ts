import { HttpClient, HttpEvent, HttpRequest } from "@angular/common/http";
import { UrlApiDinamicoService } from "./UrlApiDinamicoService.service";
import { Oportunidade } from "../model/oportunidade.model";
import { AbstractEntityService } from "./abstract-entity.service";
import { Injectable } from "@angular/core";
import { AbstractFiltro } from "../model/filtro/abstract-filtro.model";
import { Resultset } from "../model/resultset.model";
import { map, Observable } from "rxjs";
@Injectable({
  providedIn: 'root'
})
export class OportunidadeService extends AbstractEntityService<Oportunidade> {
  constructor(
    http: HttpClient,
    private urlApiDinamicoService: UrlApiDinamicoService
  ) {
    super(http);
  }

  getUrlBase(): string {
    return this.urlApiDinamicoService.apiBaseUrl + '/api/oportunidades'
  }

  newEntityInstance(): Oportunidade {
    return new Oportunidade();
  }

    getUrlAtualEmail(): String{
    return 'http://localhost:4201'
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
   


  incluirFaturaUpload(fatura: FormData): Observable<HttpEvent<any>> {
    var url = this.getUrlBase() + "/com-arquivo";
    const req = new HttpRequest('POST', url, fatura, {
      reportProgress: true,
      responseType: 'json',
    });

    return this.http.request(req);
  }

  getUrlBaseLinkTemp(): string {
    return this.urlApiDinamicoService.apiBaseUrl;
  }

  enviarEmail(body: FormData): Observable<HttpEvent<any>> {
    var url = this.getUrlBase() + "/enviaEmail";
    const req = new HttpRequest('POST', url, body, {
      reportProgress: true,
      responseType: 'json',
    });

    return this.http.request(req);
  }


  geratoken(): Observable<any> {
    var url = this.getUrlBaseLinkTemp() + "/api/linkTemp/gerarToken";
    //enviar url base para o back?
    return this.http.post(url, null, { responseType: 'text' });
  }


}