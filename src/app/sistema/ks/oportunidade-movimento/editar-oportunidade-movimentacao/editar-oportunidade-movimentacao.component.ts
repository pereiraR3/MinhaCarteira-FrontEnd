import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { ActivatedRoute, Navigation, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { OportunidadeMovimentacao } from '../../../model/oportunidadeMovimentacao.model';
import { OportunidadeMovimentacaoService } from '../../../services/oportunidade-movimentacaoService.service';

@Component({
    standalone: false,
    selector: 'app-editar-oportunidade-movimentacao',
    templateUrl: './editar-oportunidade-movimentacao.component.html',
    styleUrl: './editar-oportunidade-movimentacao.component.scss'
})
export class EditarOportunidadeMovimentacaoComponent implements OnInit {

    private formBuilder: UntypedFormBuilder;
    oportunidadeMovimentacaoform!: UntypedFormGroup;
    @Input() oportunidadeMovimentacao: OportunidadeMovimentacao;
    state: any;
    private currentNavigation: Navigation | null = null;
    @Output() closeModal = new EventEmitter<boolean>();
    
    constructor(formBuilder: UntypedFormBuilder,
        private router: Router,
        private route: ActivatedRoute,
        private toastr: ToastrService,

       
        public oportunidadeMovimentacaoService: OportunidadeMovimentacaoService,
    ) {
        this.formBuilder = formBuilder;


        this.route.queryParams.subscribe(params => {
            this.currentNavigation = this.router.getCurrentNavigation();
            if (this.currentNavigation != null) {
                this.state = this.currentNavigation.extras.state;
                this.oportunidadeMovimentacao = this.state.oportunidadeMovimentacao;
            }
        });
    }

    public ngOnInit(): void {
        this.oportunidadeMovimentacaoform = this.formBuilder.group({
            tipo: [null],
            descricao: [null],
            dataInicio: [null],
            dataAtualizacao: [null],
            identificador_usuario: [null],
        
        });

        this.carregarDadosFormulario()
    }


    carregarDadosFormulario() {

        if (this.oportunidadeMovimentacaoform != null) {
            this.oportunidadeMovimentacaoform.controls.tipo.setValue(this.oportunidadeMovimentacao.tipo);
            this.oportunidadeMovimentacaoform.controls.descricao.setValue(this.oportunidadeMovimentacao.descricao);
            this.oportunidadeMovimentacaoform.controls.dataInicio.setValue(this.oportunidadeMovimentacao.dataInicio);
            this.oportunidadeMovimentacaoform.controls.dataAtualizacao.setValue(this.oportunidadeMovimentacao.dataAtualizacao);
            this.oportunidadeMovimentacaoform.controls.identificador_usuario.setValue(this.oportunidadeMovimentacao.identificador_usuario);
        }
    }



    get form() {
        return this.oportunidadeMovimentacaoform.controls;
    }

    salvar() {
        const oportunidadeMovimentacao: OportunidadeMovimentacao = new OportunidadeMovimentacao();
        
        oportunidadeMovimentacao.tipo = this.oportunidadeMovimentacaoform.controls.tipo.value;
        oportunidadeMovimentacao.descricao = this.oportunidadeMovimentacaoform.controls.descricao.value;
        oportunidadeMovimentacao.dataInicio = this.oportunidadeMovimentacaoform.controls.dataInicio.value;
        oportunidadeMovimentacao.dataAtualizacao = this.oportunidadeMovimentacaoform.controls.dataAtualizacao.value;
        oportunidadeMovimentacao.identificador_usuario =  this.oportunidadeMovimentacaoform.controls.identificador_usuario.value;
        this.oportunidadeMovimentacaoService.alterar(oportunidadeMovimentacao).subscribe(observer => {
            this.toastr.success('Atualizado com sucesso', 'Oportunidade', {
                timeOut: 3000,
                positionClass: 'toast-top-right',
            });
            this.closeModal.emit(true)
            window.location.reload()
            //this.voltar()
        }, error => {
            console.log(error)
        });
    }




    voltar() {
        //this.router.navigateByUrl('/ks/oportunidade');
        this.closeModal.emit(false)
    }


}
