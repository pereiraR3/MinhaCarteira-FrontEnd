import {AbstractEntity} from './abstract-entity.model';
import { Conta } from './Conta.model';
import { Parceiro } from './parceiro.model';
import { Unidade } from './unidade.model';

export class UsuarioParceiro extends AbstractEntity{

    id:number;
    nome:string;
    email:string;
    cpf_cnpj:string;
    login:string;
    senha:string;
    celular:string
    parceiro:Parceiro;
    public unidades:Unidade[];
    perfil:string;
    assinatura:string;
    titulo:string;
    funcao:string;
    dataCadastro:Date;
    dataAtualizacao:Date;
    
  override deserialize( input: any) {
        Object.assign(this,input);
        //this.unidades = input.unidades ? input.unidades.map(u => new Unidade().deserialize(u)) : [];
        return this;
    }
    getId(): number {
        return this.id;
    }
}
