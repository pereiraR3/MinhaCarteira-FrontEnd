import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { Validators } from 'ngx-editor';
import { ContaService } from '../../../services/ContaService.service';
import { Md5 } from 'ts-md5';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ParceiroService } from '../../../services/ParceiroService.service';
import { Parceiro } from '../../../model/parceiro.model';
import { ProdutoService } from '../../../services/produtoService.service';
import { BuscarCepService } from '../../../services/BuscarCep.service';
import { Cep } from '../../../model/Cep.interface';
import { ValidadorDocumentoUtil } from '../../../util/validador-documento.util';
import { timeout } from 'rxjs';
import { validColorValidator } from 'ngx-colors';

@Component({
  standalone:false,
  selector: 'app-incluir-parceiro',
  templateUrl: './incluir-parceiro.component.html',
  styleUrl: './incluir-parceiro.component.scss'
})
export class IncluirParceiroComponent implements OnInit {

  private formBuilder: UntypedFormBuilder;
  parceiroform!: UntypedFormGroup;
  selectedConta:any;
  selectedProduto:any;
  constructor( formBuilder: UntypedFormBuilder, 
               private router: Router, 
               private toastr: ToastrService, 
               public contaService:ContaService, 
               public produtoService:ProdutoService,
               public parceiroService:ParceiroService,
               private buscarCepService: BuscarCepService){
    this.formBuilder = formBuilder;
  }

  public ngOnInit(): void{
    this.parceiroform = this.formBuilder.group({
      nome: [null,Validators.required, Validators.minLength(3)],
      email: [null,Validators.required, Validators.minLength(3)],
      cnpj: [null, Validators.required, Validators.minLength(3)],
      cep: [null, [Validators.required, Validators.minLength(3)]],
      logradouro: [null, [Validators.required, Validators.minLength(3)]],
      numero: [null, [Validators.required, Validators.minLength(1)]],
      complemento: [null, Validators.minLength(1)],
      bairro: [null, [Validators.required, Validators.minLength(3)]],
      cidade: [null, [Validators.required, Validators.minLength(3)]],
      ativo: [null, Validators.required],
      uf: [null, [Validators.required, Validators.minLength(2)]],
      conta: [true],
      perfil: [null],
    });
  }

  get form() {
    return this.parceiroform.controls;
  }

    salvar() {
        const parceiro: Parceiro = new Parceiro();
        parceiro.nome = this.parceiroform.controls.nome.value; 
        parceiro.email  = this.parceiroform.controls.email.value;
        parceiro.cnpj = this.parceiroform.controls.cnpj.value;
        parceiro.cep  = this.parceiroform.controls.cep.value;
        parceiro.logradouro  = this.parceiroform.controls.logradouro.value;
        parceiro.numero  = this.parceiroform.controls.numero.value;
        parceiro.complemento  = this.parceiroform.controls.complemento.value;
        parceiro.bairro  = this.parceiroform.controls.bairro.value;
        parceiro.cidade  = this.parceiroform.controls.cidade.value;

        parceiro.uf  = this.parceiroform.controls.uf.value;
        parceiro.ativo  = this.parceiroform.controls.ativo.value;
        
        parceiro.conta =  this.selectedConta; 
        parceiro.produto = this.selectedProduto;
      
          this.parceiroService.incluir( parceiro ).subscribe( observer => {
            this.toastr.success('Cadastrado com sucesso','Parceiro', {
              timeOut: 3000,
              positionClass: 'toast-top-right',
            });
            this.voltar()
          }, error => {
            console.log(error)
          }); 
        
    }

    voltar() {
      this.router.navigateByUrl('/ks-portal/parceiro');
    }

    buscarCep(cep:String) {
      cep = cep.replace(".", "");
      cep = cep.replace("-", "");
      
      this.buscarCepService.buscarCep(cep)
                            .then( (cepSelecionado: Cep) => {
                              this.parceiroform.controls.cep.setValue(cepSelecionado.cep);
                              this.parceiroform.controls.logradouro.setValue(cepSelecionado.logradouro);
                              this.parceiroform.controls.bairro.setValue(cepSelecionado.bairro);
                              this.parceiroform.controls.cidade.setValue(cepSelecionado.localidade);
                              this.parceiroform.controls.uf.setValue(cepSelecionado.uf);
                              this.parceiroform.controls.complemento.setValue(cepSelecionado.complemento);
                            }).catch((param: any) =>{
                               console.log(param);
                            });
   }

}
