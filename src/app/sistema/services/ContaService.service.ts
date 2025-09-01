import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { Conta } from "../model/Conta.model";
import { AbstractEntityService } from "./abstract-entity.service";
import { UrlApiDinamicoService } from "./UrlApiDinamicoService.service";
;

@Injectable({
  providedIn: 'root'
})
export class ContaService extends AbstractEntityService<Conta>{
 


  constructor(
      http: HttpClient,
      private urlApiDinamicoService:UrlApiDinamicoService
  ) {
      super(http);
  }

  getUrlBase(): string {
      return this.urlApiDinamicoService.apiBaseUrl  +  '/api/contas';
  }


  newEntityInstance(): Conta {
    return new Conta();
}


}
