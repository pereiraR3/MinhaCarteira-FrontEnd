import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { Validators } from 'ngx-editor';
import { Md5 } from 'ts-md5';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ParceiroService } from '../../../services/ParceiroService.service';
import { ProdutoService } from '../../../services/produtoService.service';
import { Produto } from '../../../model/produto.model';


@Component({
  standalone:false,
  selector: 'app-incluir-produto',
  templateUrl: './incluir-produto.component.html',
  styleUrl: './incluir-produto.component.scss'
})
export class IncluirProdutoComponent implements OnInit {

  private formBuilder: UntypedFormBuilder;
  produtoform!: UntypedFormGroup;
  selectedParceiro:any;
  constructor( formBuilder: UntypedFormBuilder, 
               private router: Router, 
               private toastr: ToastrService, 
               public parceiroService:ParceiroService, 
               public produtoService:ProdutoService){
    this.formBuilder = formBuilder;
  }

  public ngOnInit(): void{
    this.produtoform = this.formBuilder.group({
      nome: [null, Validators.required, Validators.minLength(3)],
      descricao: [null, Validators.required, Validators.minLength(3)],
      status:[null],
     desconto: [null, Validators.required],
      
    });
  }

  get form() {
    return this.produtoform.controls;
  }

    salvar() {
        const produto: Produto = new Produto();
        produto.nome = this.produtoform.controls.nome.value;
        produto.status = this.produtoform.controls.status.value; 
        produto.status = "ATIVO";
        produto.descricao  = this.produtoform.controls.descricao.value;
        produto.desconto  = this.produtoform.controls.desconto.value;
        
        this.produtoService.incluir( produto ).subscribe( observer => {
          this.toastr.success('Cadastrado com sucesso','Produto', {
            timeOut: 3000,
            positionClass: 'toast-top-right',
          });
          this.voltar()
        }, error => {
          this.toastr.error("Produto não cadastrado", 'Produto',{
            timeOut:3000,
            positionClass:'toast-top-right',
          });
          console.log(error)
        }); 
    }

    voltar() {
      this.router.navigateByUrl('/ks-portal/produto');
    }

}
