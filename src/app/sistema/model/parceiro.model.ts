import {Conta} from "./Conta.model";
import {AbstractEntity} from './abstract-entity.model';

export class Parceiro extends AbstractEntity{
  parceiro_id:number;
  nome:string;
  cnpj:string
  cep:string
  logradouro:string
  numero:string
  complemento:string
  bairro:string
  cidade:string
  uf:string
  email:string
  ativo:boolean
  conta:Conta;
  produto: Number;
  dataCadastro:Date;
  dataAtualizacao:Date;
  override deserialize(input: any){
    Object.assign(this, input);
    return this;
  }

   getId(): number {
    return this.parceiro_id;
  }
}
