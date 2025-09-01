import {AbstractFiltro} from './abstract-filtro.model';

export class OportunidadeMovimentacaoFiltro extends AbstractFiltro{
  oportunidadeId: number;
  tipo: string; 
  identificador: string
  somenteAtivos: boolean;

}
