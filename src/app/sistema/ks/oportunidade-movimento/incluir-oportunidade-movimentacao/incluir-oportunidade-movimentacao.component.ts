import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { Validators } from 'ngx-editor';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { OportunidadeMovimentacao } from '../../../model/oportunidadeMovimentacao.model';
import { OportunidadeMovimentacaoService } from '../../../services/oportunidade-movimentacaoService.service';


@Component({
  standalone: false,
  selector: 'app-incluir-oportunidade-movimentacao',
  templateUrl: './incluir-oportunidade-movimentacao.component.html',
  styleUrl: './incluir-oportunidade-movimentacao.component.scss'
})
export class IncluirOportunidadeMovimentacaoComponent implements OnInit {

  private formBuilder: UntypedFormBuilder;
  oportunidadeMovimentacaoform!: UntypedFormGroup;

  constructor(formBuilder: UntypedFormBuilder,
    private router: Router,
    private toastr: ToastrService,

    public oportunidadeMovimentavaoService: OportunidadeMovimentacaoService,
  ) {
    this.formBuilder = formBuilder;
  }

  public ngOnInit(): void {
    this.oportunidadeMovimentacaoform = this.formBuilder.group({
      tipo: [null, Validators.required, Validators.minLength(3)],
      descricao: [null, Validators.required, Validators.minLength(3)],
      dataInicio: [null],
      //oportunidade:[null],
      dataAtualizacao: [null],

    });
  }

  get form() {
    return this.oportunidadeMovimentacaoform.controls;
  }

  salvar() {
    const oportunidadeMovimentacao: OportunidadeMovimentacao = new OportunidadeMovimentacao();
    oportunidadeMovimentacao.tipo = this.oportunidadeMovimentacaoform.controls.tipo.value;
    oportunidadeMovimentacao.descricao = this.oportunidadeMovimentacaoform.controls.tipo.value;
    oportunidadeMovimentacao.dataInicio = this.oportunidadeMovimentacaoform.controls.dataInicio.value;
    oportunidadeMovimentacao.dataAtualizacao = this.oportunidadeMovimentacaoform.controls.dataAtualizacao.value;
    oportunidadeMovimentacao.identificador_usuario = this.oportunidadeMovimentacaoform.controls.identificador_usuario.value;

    this.oportunidadeMovimentavaoService.incluir(oportunidadeMovimentacao).subscribe(observer => {
      this.toastr.success('Cadastrado com sucesso', 'OportunidadeMovimentacao', {
        timeOut: 3000,

        positionClass: 'toast-top-right',
      });
      this.voltar()
    }, error => {
      this.toastr.error("Oportuniadde não cadastrado", 'OportunidadeMovimentacao', {
        timeOut: 3000,
        positionClass: 'toast-top-right',
      });
      console.log(error)
    });
  }

  voltar() {
    this.router.navigateByUrl('/ks-portal/oportunidadeMovimentacaos');
  }

}
