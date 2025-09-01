import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';

import { ActivatedRoute, Navigation, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { ParceiroService } from '../../../services/ParceiroService.service';
import { UnidadeService } from '../../../services/unidadeService.service.js';
import { Unidade } from '../../../model/unidade.model';

@Component({
  standalone: false,
  selector: 'app-editar-unidade',
  templateUrl: './editar-unidade.component.html',
  styleUrl: './editar-unidade.component.scss'
})
export class EditarUnidadeComponent implements OnInit {
  selectedParceiro: any;
  private formBuilder: UntypedFormBuilder;
  unidadeform!: UntypedFormGroup;
  @Input() unidade: Unidade;
  state: any;
  @Output() closeModal =  new EventEmitter<boolean>();
  
  constructor(formBuilder: UntypedFormBuilder,
    private toastr: ToastrService,
    public parceiroService: ParceiroService,
    public unidadeService: UnidadeService) {
    this.formBuilder = formBuilder;
  }

  public ngOnInit(): void {
    this.unidadeform = this.formBuilder.group({
      nome: [null],
      descricao: [null],
      status: [null],
    });

    this.carregarDadosFormulario()
  }




  carregarDadosFormulario() {

    if (this.unidadeform != null && this.unidade != null) {
      this.unidadeform.controls.descricao.setValue(this.unidade.descricao);
      this.unidadeform.controls.nome.setValue(this.unidade.nome);
    }
  }

  get form() {
    return this.unidadeform.controls;
  }

  salvar() {
    
    const unidade: Unidade = new Unidade();
    unidade.id = this.unidade.id;
    unidade.nome = this.unidadeform.controls.nome.value
    unidade.descricao = this.unidadeform.controls.descricao.value;
    this.unidadeService.alterar(unidade).subscribe(observer => {
      this.toastr.success('Atualizado com sucesso', 'unidade', {
        timeOut: 3000,
        positionClass: 'toast-top-right',
      });
      this.closeModal.emit(true)
      window.location.reload()
    }, error => {
      console.log(error)
    });
  }

  voltar() {
    this.closeModal.emit(false)
  }

}
