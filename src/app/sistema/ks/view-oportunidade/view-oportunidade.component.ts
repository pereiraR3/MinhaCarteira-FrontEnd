import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { UntypedFormBuilder, UntypedFormGroup } from "@angular/forms";
import { ActivatedRoute, Navigation, Router } from "@angular/router";
import { Oportunidade } from "../../model/oportunidade.model";
import { OportunidadeService } from "../../services/oportunidadeService.service";
import { ToastrService } from "ngx-toastr";
import { OportunidadeMovimentacao } from "../../model/oportunidadeMovimentacao.model";
import { OportunidadeMovimentacaoService } from "../../services/oportunidade-movimentacaoService.service";
import { OportunidadeArquivoService } from "../../services/oportunidadeArquivo.service";
import { OportunidadeArquivo } from "../../model/oportunidadeArquivo.model";

declare var HSOverlay: any
@Component({
    standalone: false,
    selector: 'app-view-oportunidade',
    templateUrl: './view-oportunidade.component.html',
    styleUrl: './view-oportunidade.component.scss'
})
export class ViewOportunidadeComponent implements OnInit {

    private formBuilder: UntypedFormBuilder;
    viewOportunidade!: UntypedFormGroup;
    state: any;
    oportunidade: Oportunidade = {} as Oportunidade;
    oportunidadeArquivo: OportunidadeArquivo= {} as OportunidadeArquivo;

    
    private oportunidade_id: number;
    public oportunidadeSelecionadaModal: Oportunidade | null = null;
    private currentNavigation: Navigation | null = null;
    public oportunidadeViewDetails: OportunidadeMovimentacao | null = null;

    constructor(formBuilder: UntypedFormBuilder,
        private router: Router,
        private route: ActivatedRoute,
        private toastr: ToastrService,
        public oportunidadeService: OportunidadeService,
        public oportunidadeArquivoService: OportunidadeArquivoService,
        public oportunidadeMovimentacaoService: OportunidadeMovimentacaoService
    ) {
        this.formBuilder = formBuilder;
        this.route.queryParams.subscribe(params => {
            this.currentNavigation = this.router.getCurrentNavigation();
            if (this.currentNavigation != null) {
                this.state = this.currentNavigation.extras.state;
                this.oportunidade = this.state.oportunidade;
            }
        });
    }

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            this.oportunidade_id = params['id'];
        });

        this.viewOportunidade = this.formBuilder.group({
            nome: [null],
            email: [null],
            telefone: [null],
            descricao: [null],
        });
        this.buscarOportunidade();

    }

    buscarOportunidade() {

        this.oportunidadeService.buscar(this.oportunidade_id).subscribe(retorno => {
            this.oportunidade = retorno;
        });

        this.oportunidadeArquivoService.buscar(this.oportunidade_id).subscribe(retorno =>{

            this.oportunidadeArquivo = retorno[0]
        })
        this.oportunidadeMovimentacaoService.buscar(this.oportunidade_id).subscribe(viewDetails => {
            if (this.oportunidadeViewDetails) {
                this.oportunidadeViewDetails.oportunidade = viewDetails.oportunidade;
            }
            this.oportunidadeViewDetails = viewDetails;
            this.carregarDadosFormulario();
        })
        
    }


    carregarDadosFormulario() {
        if (this.viewOportunidade != null) {
            this.viewOportunidade.controls.nome.setValue(this.oportunidade.nome)
            this.viewOportunidade.controls.email.setValue(this.oportunidade.email)
        }
    }






    voltar() {
        this.router.navigateByUrl('/ks-portal/oportunidades');
    }

}
