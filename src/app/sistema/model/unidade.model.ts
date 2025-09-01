
import {AbstractEntity} from './abstract-entity.model';
import { Parceiro } from './parceiro.model';
import { Produto } from './produto.model';

export class Unidade extends AbstractEntity{
  id:number;
  nome:string;
  status:string;
  descricao:string;
  parceiro:number;
  dataCadastro:Date;
  dataAtualizacao:Date;

  override deserialize(input: any){
    Object.assign(this, input);
    return this;
  }

   getId(): number {
    return this.id;
  }
  
}
