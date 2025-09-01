import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Navigation, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Oportunidade } from '../../../model/oportunidade.model';
import { OportunidadeService } from '../../../services/oportunidadeService.service';
import Cleave from 'cleave.js';

@Component({
    standalone: false,
    selector: 'app-editar-oportunidade',
    templateUrl: './editar-oportunidade-modal.component.html',
    styleUrl: './editar-oportunidade.component.scss'
})
export class EditarOportunidadeComponent implements OnInit {
    formData = new FormData();

    private formBuilder: UntypedFormBuilder;
    oportunidadeform!: UntypedFormGroup;
    @Input() oportunidade: Oportunidade;

    private _oportunidade: Oportunidade;
    @Input()
      set setarOportunidadeEditarModal(value: Oportunidade) {
        this._oportunidade = value;
        this.carregarDadosFormulario()
      }
      @Output() fecharModalOportunidade = new EventEmitter<boolean>();

    state: any;
    private currentNavigation: Navigation | null = null;

    constructor(formBuilder: UntypedFormBuilder,
        private router: Router,
        private route: ActivatedRoute,
        private toastr: ToastrService,
        public oportunidadeService: OportunidadeService,
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

    public ngOnInit(): void {
        this.oportunidadeform = this.formBuilder.group({
            id: [null],
                nome: [null, [Validators.required, Validators.minLength(10)]],
                email: [null, [Validators.required, Validators.minLength(10),Validators.email]],
                status: [null],
                telefone: [null, [Validators.required, Validators.minLength(10)]],
                cpf:[null, [Validators.required, Validators.minLength(10)]],
        });

        this.carregarDadosFormulario()
    }

         ngAfterViewInit():void{
     const cpjFormato = new Cleave('.formato-cpf-cnpj', {
      delimiters: ['.', '.','/', '-'],
      blocks: [2, 3, 3, 4],
       numeral: true,
      uppercase: true,
    });
    const pn = new Cleave('.phone-number', {
      blocks: [2, 4, 3, 4],
    });
      const cepFormato = new Cleave('.cep-format', {
      delimiter: '-',
      blocks: [5,3],
      uppercase: true,
    });
    }
    carregarDadosFormulario() {
        if (this.form != null) {
            this.oportunidadeform.controls.nome.setValue(this._oportunidade.nome);
            this.oportunidadeform.controls.email.setValue(this._oportunidade.email);
            this.oportunidadeform.controls.telefone.setValue(this._oportunidade.telefone);
            this.oportunidadeform.controls.cpf.setValue(this._oportunidade.cpf);
        }
    }

    get form() {
        return this.oportunidadeform.controls;
    }

    salvar() {


        this._oportunidade.email = this.form.email.value
        this._oportunidade.telefone = this.form.telefone.value
        this._oportunidade.nome = this.form.nome.value
        this._oportunidade.cpf = this.form.cpf.value

        this.oportunidadeService.alterar(this._oportunidade).subscribe(observer => {
            this.toastr.success('Atualizado com sucesso', 'Oportunidade', {
                timeOut: 3000,
                positionClass: 'toast-top-right',
            });
       
            this.fecharModal()
        }, error => {
            this.toastr.error('Erro ao editar oportunidade:'+ error, 'Oportunidade', {
                timeOut: 3000,
                positionClass: 'toast-top-right',
            });
            console.log(error)
        });
    }


  fecharModal() {
    this.oportunidadeform.reset();
    this.fecharModalOportunidade.emit();
  }




}
