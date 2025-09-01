import {AbstractFiltro} from './abstract-filtro.model';

export class OportunidadeArquivoFiltro extends AbstractFiltro{

  oportunidade_id:number;
  tipoDocumento: string;
  somenteAtivos: boolean;

}
