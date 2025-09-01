import { AbstractEntity } from "./abstract-entity.model";
import { Arquivo } from "./Arquivo.model";
import { Oportunidade } from "./oportunidade.model";

export class OportunidadeArquivo extends AbstractEntity{
    id:number;
    oportunidade:Oportunidade
    arquivo:Arquivo;
    tipoDocumento:string;

    
    override deserialize(input: any){
        Object.assign(this, input);
        return this;
    }
    getId(): number {
    return this.id;
  }
}