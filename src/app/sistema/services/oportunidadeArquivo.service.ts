import {AbstractEntityService} from "./abstract-entity.service";
import {UrlApiDinamicoService} from './UrlApiDinamicoService.service';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { OportunidadeArquivo } from "../model/oportunidadeArquivo.model";

@Injectable({
    providedIn: 'root' 
  })
export class OportunidadeArquivoService extends AbstractEntityService<OportunidadeArquivo>{

  constructor(
    http: HttpClient,
    private urlApiDinamicoService:UrlApiDinamicoService
  ) {
    super(http);
  }

   getUrlBase(): string {
    return this.urlApiDinamicoService.apiBaseUrl + '/api/arquivos-oportunidade'
  }

   newEntityInstance(): OportunidadeArquivo {
    return new OportunidadeArquivo();
  }

 

}
