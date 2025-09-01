import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';

import { ActivatedRoute, Navigation, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Produto } from '../../../model/produto.model';
import { ProdutoService } from '../../../services/produtoService.service';
import { ParceiroService } from '../../../services/ParceiroService.service';

@Component({
  standalone:false,
  selector: 'app-editar-produto',
  templateUrl: './editar-produto.component.html',
  styleUrl: './editar-produto.component.scss'
})
export class EditarProdutoComponent implements OnInit {
  selectedParceiro: any;
  private formBuilder: UntypedFormBuilder;
  produtoform!: UntypedFormGroup;
  
  state: any;
  private currentNavigation: Navigation|null = null;
  produto: Produto = {} as Produto;
  constructor( formBuilder: UntypedFormBuilder, 
               private router: Router, 
               private route: ActivatedRoute,
               private toastr: ToastrService, 
               public parceiroService:ParceiroService, 
               public produtoService:ProdutoService){
    this.formBuilder = formBuilder;

    
    this.route.queryParams.subscribe(params => {
      this.currentNavigation = this.router.getCurrentNavigation();
      if(this.currentNavigation  != null) {
        this.state = this.currentNavigation.extras.state;
        this.produto = this.state.produto;
      }
    });
  }
  
  public ngOnInit(): void{
    this.produtoform = this.formBuilder.group({
      nome: [null],
      descricao: [null],
      status: [null],
      parceiro: [null],
    });
    
    this.carregarDadosFormulario()
  }




carregarDadosFormulario(){
  
  if(this.produtoform != null) {
    this.produtoform.controls.nome.setValue(this.produto.nome);
    this.produtoform.controls.descricao.setValue(this.produto.descricao);
   //this.produtoform.controls.parceiro.setValue(this.produto.parceiro);
   this.produtoform.controls.status.setValue(this.produto.status);
    //if(this.produto.parceiro != null) {
    //  this.selectedParceiro = this.produto.parceiro.parceiro_id;
    //}
  
  }
}



  get form() {
    return this.produtoform.controls;
  }

    salvar() {
      const produto: Produto = new Produto();
      produto.id =  this.produto.id;
      produto.descricao = this.produtoform.controls.descricao.value; 
      
        this.produtoService.alterar( produto ).subscribe( observer => {
          this.toastr.success('Atualizado com sucesso','produto', {
            timeOut: 3000,
            positionClass: 'toast-top-right',
          });
          this.voltar()
        }, error => {
          console.log(error)
        }); 
    }


   

    voltar() {
      this.router.navigateByUrl('/ks-portal/produto');
    }

}
