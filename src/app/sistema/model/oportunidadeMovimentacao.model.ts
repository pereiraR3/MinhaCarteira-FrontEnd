import {AbstractEntity} from './abstract-entity.model';
import { Oportunidade } from './oportunidade.model';

export class OportunidadeMovimentacao extends AbstractEntity{
    id:number;
    tipo:string;
    descricao:string;
    dataInicio:Date;
    dataFim:Date;
    dataAtualizacao: Date;
    oportunidade: Oportunidade;
    identificador_usuario:number;
    identificador_unidade:number;
    identificador_parceiro:number;
    override deserialize(input: any){
        Object.assign(this, input);
        return this;
    }
    getId(): number {
    return this.id;
  }
}
