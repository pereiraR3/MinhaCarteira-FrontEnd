import {AbstractEntity} from './abstract-entity.model';
import { Conta } from './Conta.model';
import { Parceiro } from './parceiro.model';
import { Unidade } from './unidade.model';

export class Usuario extends AbstractEntity{

  id:number;
  nome:string;
  email:string;
  cpf:string;
  dataNascimento:Date;
  assinatura:string;
  celular:string;
  funcao:string;
  login:string;
  senha:string;
  conta:Conta;
  perfil:string;
  


  override deserialize( input: any) {
        Object.assign(this,input);
        return this;
    }
    getId(): number {
        return this.id;
    }
}
