import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Cep } from "../model/Cep.interface";


@Injectable({
    providedIn: 'root'
  })
  export class BuscarCepService {

    constructor( private http: HttpClient) { }

    buscarCep(  cep:String ):Promise<Cep> {
         const url = "https://viacep.com.br/ws/"+cep+"/json/"
          return this.http.get(url).toPromise().then((resposta: any) => resposta)

    }

}
