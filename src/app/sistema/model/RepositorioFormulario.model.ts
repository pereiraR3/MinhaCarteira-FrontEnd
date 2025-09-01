import { Repositorio } from "./Repositorio.model";
import { AbstractEntity } from "./abstract-entity.model";

export class RepositorioFormulario extends AbstractEntity{

    id:number;
    repositorio:Repositorio;
    nome:string;
    descricao:string;
    valor:string;


    override deserialize( input: any) {
        Object.assign(this,input);
        return this;
    }

    getId(): number {
        return this.id;
    }

  }
  