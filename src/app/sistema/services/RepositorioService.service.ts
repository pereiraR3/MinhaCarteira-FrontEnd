import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from '@angular/core';

import { AbstractEntityService } from './abstract-entity.service';

import { Repositorio } from "../model/Repositorio.model";
import { UrlApiDinamicoService } from "./UrlApiDinamicoService.service";
import { RegistroFormRepositorio } from "../model/RegistroFormRepositorio.model";


@Injectable({
  providedIn: 'root'
})
export class RepositorioService extends AbstractEntityService<Repositorio>{


  constructor(
      http: HttpClient,
      private urlApiDinamicoService:UrlApiDinamicoService
    ) {
      super(http);
    }

 
   getUrlBase(): string {
    return this.urlApiDinamicoService.apiBaseUrl + '/api/repositorios'
  }

  newEntityInstance(): Repositorio {
      return new Repositorio();
  }


  listarRegistrosForm(tipoRepositorio:String):Promise<RegistroFormRepositorio> {
    if( tipoRepositorio == "SISTEMA_ARQUIVO") {
       return this.listarFormSistemaArquivo();
    } else if(tipoRepositorio == "AWS_S3") {
       return this.listarFormAmazonS3();
    } else if(tipoRepositorio == "GOOGLE_STORAGE") {
       return this.listarFormGoogleStorage();
    }
    
    return Promise.reject(new Error("Tipo de repositório desconhecido: " + tipoRepositorio));
   }

   listarFormSistemaArquivo():Promise<RegistroFormRepositorio> {
         return this.http.get(this.getUrlBase() + '/formSistemaArquivo').toPromise().then((resposta: any) => resposta)    
   }


   listarFormAmazonS3():Promise<RegistroFormRepositorio> {
      return this.http.get(this.getUrlBase() + '/formAmazonS3').toPromise().then((resposta: any) => resposta)
   }


   listarFormGoogleStorage():Promise<RegistroFormRepositorio> {
       return this.http.get(this.getUrlBase() + '/formGoogleStorage').toPromise().then((resposta: any) => resposta)
   }

}