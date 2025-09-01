import { AbstractEntity } from "./abstract-entity.model";
import { Arquivo } from "./Arquivo.model";

export class Oportunidade extends AbstractEntity{
    id:number;
    nome:string
    status:string;
    email:string;
    cpf:string;
    telefone:string;
    
    
    override deserialize(input: any){
        Object.assign(this, input);
        return this;
    }
    getId(): number {
    return this.id;
  }
}