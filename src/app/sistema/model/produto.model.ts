
import {AbstractEntity} from './abstract-entity.model';


export class Produto extends AbstractEntity{
  id:number;
  nome:string;
  status:string;
  descricao:string;
  dataCadastro:Date;
  dataAtualizacao:Date;
  desconto:number;

  override deserialize(input: any){
    Object.assign(this, input);
    return this;
  }

   getId(): number {
    return this.id;
  }
}
