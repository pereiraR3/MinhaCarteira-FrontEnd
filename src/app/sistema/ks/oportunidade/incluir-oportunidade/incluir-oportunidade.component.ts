import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup,Validators  } from '@angular/forms';
//import { Validators } from 'ngx-editor';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


import { OportunidadeService } from '../../../services/oportunidadeService.service';

import { OportunidadeMovimentacaoService } from '../../../services/oportunidade-movimentacaoService.service';
import { HttpErrorResponse, HttpEventType } from '@angular/common/http';
import Cleave from 'cleave.js';
import { ValidadorDocumentoUtil } from '../../../util/validador-documento.util';


@Component({
  standalone: false,
  selector: 'app-incluir-oportunidade',
  templateUrl: './incluir-oportunidade-modal.component.html',
  styleUrl: './incluir-oportunidade.component.scss'
})
export class IncluirOportunidadeComponent implements OnInit {
  formData = new FormData();
  private formBuilder: UntypedFormBuilder;
  oportunidadeform!: UntypedFormGroup;
  arquivoSelecionado: File[] = [];
  uploadProgress: number = 0;

  @Output() fecharModalNovaOportunidade = new EventEmitter<void>();

  
  constructor(formBuilder: UntypedFormBuilder,
    private router: Router,
    private toastr: ToastrService,
    public oportunidadeService: OportunidadeService,
    public oportunidadeMovimentacaoService: OportunidadeMovimentacaoService,
  ) {
    this.formBuilder = formBuilder;
  }

  public ngOnInit(): void {
    this.oportunidadeform = this.formBuilder.group({
      nome: [null, [Validators.required, Validators.minLength(10)]],
      email: [null, [Validators.required, Validators.minLength(10),Validators.email]],
      status: [null],
      telefone: [null, [Validators.required, Validators.minLength(10)]],
      cpf:[null, [Validators.required, Validators.minLength(10)]],
      arquivo: [null, [Validators.required]],

    });
  }

  ngAfterViewInit(): void {
    const cpjFormato = new Cleave('.formato-cpf', {
      delimiters: ['.', '.','-', '-'],
      blocks: [3, 3, 3,2],
      uppercase: true,
    });
    const pn = new Cleave('.phone-number', {
    phone: true,
    phoneRegionCode: 'BR',
    numericOnly: true
    });
    const cepFormato = new Cleave('.cep-format', {
      delimiter: '-',
      blocks: [5, 3],
      uppercase: true,
    });
  }

  get form() {
    return this.oportunidadeform.controls;
  }

 onFileSelected(event: any): void {
    const file = event.target.files;
    if (file) {
      for (var i = 0; i <= file.length; i++) {
        this.arquivoSelecionado = Array.from(file); 

      }
    }
  }
  
  salvar() {
    if (this.oportunidadeform.invalid) {
      this.oportunidadeform.markAllAsTouched();
      this.toastr.error('Preencha todos os campos corretamente', 'Viabilidade', {
        timeOut: 6000,
        positionClass: 'toast-top-right',
      });
      return;
    }
    this.formData = new FormData();
    this.formData.append('nome', this.oportunidadeform.controls.nome.value)
    this.formData.append('email', this.oportunidadeform.controls.email.value)
    this.formData.append('telefone', this.oportunidadeform.controls.telefone.value)
     if (!ValidadorDocumentoUtil.validarCpf( this.oportunidadeform.controls.cpf.value)) {
          this.toastr.error('CPF Invalido', 'CPF')
          return;
        }
       
    
    this.formData.append('cpf', this.oportunidadeform.controls.cpf.value)
    if (this.arquivoSelecionado) {
     for (const file of this.arquivoSelecionado) {
        this.formData.append('arquivo[]', file, file.name);
      }
      this.formData.append('status', 'EM ANALISE');
      this.oportunidadeService.incluirFaturaUpload(this.formData).subscribe({
        next: (event) => {
          if (event.type === HttpEventType.UploadProgress) {
            this.uploadProgress = Math.round(100 * (event.loaded / (event.total || 1)));
          } else if (event.type === HttpEventType.Response) {
            this.toastr.success('Indicão cadastrada com sucesso!', 'Sucesso', {
              timeOut: 3000,
              positionClass: 'toast-top-right',
            });
            this.fecharModal()
          }
        },
        error: (err) => {
          this.uploadProgress = 0;
          this.toastr.error('Erro ao criar indicação, erro tipo: ' + (err.error || 'Ocorreu um erro'), 'Erro', {
            timeOut: 6000,
            positionClass: 'toast-top-right',
          });
          console.error("Erro no cadastro:", err.error);
        }
      });
    } else {
      this.toastr.error('Sem fatura anexada', 'Oportunidade', {
        timeOut: 6000,
        positionClass: 'toast-top-right',
      });
      console.error("Erro no cadastro:");
    }
  }

  voltar() {
    this.router.navigateByUrl('/ks/oportunidades');
  }

   fecharModal() {
    this.oportunidadeform.reset();
    this.fecharModalNovaOportunidade.emit();
  }
}
