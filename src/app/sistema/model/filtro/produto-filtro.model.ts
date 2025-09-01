import {AbstractFiltro} from './abstract-filtro.model';

export class ProdutoFiltro extends AbstractFiltro{

  descricao: string; //nome da unidade ainda não está implementado no back-end
  somenteAtivos: boolean;

}
