import { Repositorio } from "./Repositorio.model";
import { AbstractEntity } from "./abstract-entity.model";

export class Arquivo extends AbstractEntity{

    id:number;
    repositorio:Repositorio;
    tipo:string;
    nome:string;
    tamanho:number;
    anexoMd5:string;
    caminho:string;
    meta:string;

    override deserialize( input: any) {
        Object.assign(this,input);
        return this;
    }

    getId(): number {
        return this.id;
    }

  }
  