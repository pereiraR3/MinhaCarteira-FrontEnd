import { AbstractEntity } from "../model/abstract-entity.model";
import { AbstractFiltro } from "../model/filtro/abstract-filtro.model";
import { Resultset } from "../model/resultset.model";
import { AbstractEntityService } from "../services/abstract-entity.service";




export abstract class AbstractListarPageComponent<T extends AbstractEntity> {

    pagina: number;
    resultset: Resultset;

    constructor(
    ){
        this.pagina = 0;
    }

    abstract getService(): AbstractEntityService<T>;

    abstract getFiltro(): AbstractFiltro;


    filtrar(redefinir: boolean = false): void{
        if ( redefinir ){
            this.pagina = 0;
        }
        this.getService().filtrar( this.pagina, this.getFiltro() ).subscribe(
            resultado => this.resultset = resultado,
            erro  => {
                console.log(erro);
            }
            
            );
    }

    hasPaginaAnterior(): boolean{
        return this.pagina > 0;
    }

    hasProximaPagina(): boolean{
        return this.pagina + 1 < this.resultset.totalPaginas;
    }

    proximaPagina(): void{
        if ( this.hasProximaPagina() ){
            this.pagina += 1;
            this.filtrar();
        }
    }

    paginaAnterior(): void{
        if ( this.hasPaginaAnterior() ){
            this.pagina -= 1;
            this.filtrar();
        }
    }

    getTotalRegistro() {
        return this.resultset?.totalRegistros ?? 0;
      }

}
