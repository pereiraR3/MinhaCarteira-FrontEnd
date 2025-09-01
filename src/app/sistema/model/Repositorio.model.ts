import { AbstractEntity } from "./abstract-entity.model";

export class Repositorio extends AbstractEntity{

    id:number;
    nome:string;
    titulo:string;
    tipo:string;
    public dadosFormulario: any[] = [];

    override deserialize( input: any) {
        Object.assign(this,input);
        return this;
    }

    getId(): number {
        return this.id;
    }

  }
  