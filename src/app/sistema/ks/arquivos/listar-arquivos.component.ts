import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { UntypedFormBuilder } from "@angular/forms";
import { ActivatedRoute, Navigation, Router } from "@angular/router";
import { Oportunidade } from "../../model/oportunidade.model";
import { ToastrService } from "ngx-toastr";


import { AbstractEntityService } from "../../services/abstract-entity.service";
import { AbstractListarPageComponent } from "../../page/abstract-listar-page.component";
import { Resultset } from "../../model/resultset.model";
import { OportunidadeArquivoFiltro } from "../../model/filtro/oportunidadeArquivo-filtro.model";
import { OportunidadeArquivo } from "../../model/oportunidadeArquivo.model";
import { OportunidadeArquivoService } from "../../services/oportunidadeArquivo.service";

declare var HSOverlay: any
@Component({
    standalone: false,
    selector: 'app-listar-arquivos',
    templateUrl: './listar-arquivos.component.html',

})
export class ListaArquivosComponent extends AbstractListarPageComponent<OportunidadeArquivo> implements OnInit {
    formBuilder: UntypedFormBuilder;
    currentNavigation: Navigation | null;
    state: any;
    filtro: OportunidadeArquivoFiltro;
    private _oportunidade: Oportunidade;
    override resultset: Resultset = new Resultset();

 ordersColumn = [
    { header: "Nome", field: "nome" },

  ]

    @Input() set oportunidade(value: Oportunidade) {
        if (value && value.id) {
            this._oportunidade = value;
            this.filtro = new OportunidadeArquivoFiltro();
            this.filtroPorOportunidade(this._oportunidade.id)

        }
    }

    constructor(formBuilder: UntypedFormBuilder,
        private router: Router,
        private route: ActivatedRoute,
        private toastr: ToastrService,
        public oportunidadeArquivoService: OportunidadeArquivoService,
    ) {
        super()
        this.formBuilder = formBuilder;
        this.route.queryParams.subscribe(params => {
            this.currentNavigation = this.router.getCurrentNavigation();
            if (this.currentNavigation != null) {
                this.state = this.currentNavigation.extras.state;
            }
        });
    }

    get oportunidade(): Oportunidade {
        return this._oportunidade;
    }
    ngOnInit():void {
    }

    filtrarPaginacao(event: any) {
        var pagina = event - 1;
        this.pagina = pagina;
        this.filtrar();
    }


    filtroPorOportunidade(id_oportunidade: number) {
        this.pagina = 0;
        this.filtro.oportunidade_id = id_oportunidade;
        if (this.filtro.oportunidade_id) {
            this.filtrar();
        }
    }

    getFiltro(): OportunidadeArquivoFiltro {
        if (this.oportunidade && this.oportunidade.id) {
      (this.filtro as any).oportunidadeId = this.oportunidade.id
    }
        return this.filtro;
    }
    onPageChange(pageIndex: number) {
        this.pagina = pageIndex;
        this.filtrar();
    }


    getService(): AbstractEntityService<OportunidadeArquivo> {
        return this.oportunidadeArquivoService;
    }

    ngOnDestroy(): void { }

    visualizarFatura(oportunidadeArquivo: OportunidadeArquivo){
        
    this.router.navigateByUrl('/ks-portal/visualizaranexopdf/'+ oportunidadeArquivo.id, {
      state: { oportunidadeArquivo: oportunidadeArquivo }
        });
    }

}
