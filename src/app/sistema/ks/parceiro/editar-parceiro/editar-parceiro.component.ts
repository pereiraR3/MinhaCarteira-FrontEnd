import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { ContaService } from '../../../services/ContaService.service';
import { ActivatedRoute, Navigation, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Parceiro } from '../../../model/parceiro.model';
import { ParceiroService } from '../../../services/ParceiroService.service';
import { ProdutoService } from '../../../services/produtoService.service';
import { BuscarCepService } from '../../../services/BuscarCep.service';
import { Cep } from '../../../model/Cep.interface';

@Component({
  standalone:false,
  selector: 'app-editar-parceiro',
  templateUrl: './editar-parceiro.component.html',
  styleUrl: './editar-parceiro.component.scss'
})
export class EditarParceiroComponent implements OnInit {

  private formBuilder: UntypedFormBuilder;
  parceiroform!: UntypedFormGroup;
  selectedConta:any;
  SelectedProduto:any;
  state: any;
  private currentNavigation: Navigation|null = null;
  parceiro: Parceiro = {} as Parceiro;
  constructor( formBuilder: UntypedFormBuilder, 
               private router: Router, 
               private route: ActivatedRoute,
               private toastr: ToastrService, 
               public produtoService:ProdutoService,
               public contaService:ContaService, 
               public parceiroService:ParceiroService,
              private buscarCepService: BuscarCepService){
    this.formBuilder = formBuilder;

    
    this.route.queryParams.subscribe(params => {
      this.currentNavigation = this.router.getCurrentNavigation();
      if(this.currentNavigation  != null) {
        this.state = this.currentNavigation.extras.state;
        this.parceiro = this.state.parceiro;
      }
    });
  }
  
  public ngOnInit(): void{
    this.parceiroform = this.formBuilder.group({
      nome: [null],
      conta: [null],
      cnpj: [null],
      cep: [null],
      logradouro: [null],
      numero: [null],
      complemento: [null],
      bairro: [null],
      cidade: [null],
      uf: [null],
      email: [null],
      ativo: [null],
      produto: [null],
      


  
    });
    
    this.carregarDadosFormulario()
  }




carregarDadosFormulario(){
  
  if(this.parceiroform != null) {
    this.parceiroform.controls.nome.setValue(this.parceiro.nome);
    this.parceiroform.controls.conta.setValue(this.parceiro.conta);
    this.parceiroform.controls.cnpj.setValue(this.parceiro.cnpj);
    this.parceiroform.controls.cep.setValue(this.parceiro.cep);
    this.parceiroform.controls.logradouro.setValue(this.parceiro.logradouro);
    this.parceiroform.controls.numero.setValue(this.parceiro.numero);
    this.parceiroform.controls.complemento.setValue(this.parceiro.complemento);
    this.parceiroform.controls.bairro.setValue(this.parceiro.bairro);
    this.parceiroform.controls.cidade.setValue(this.parceiro.cidade);
    this.parceiroform.controls.uf.setValue(this.parceiro.uf);
    this.parceiroform.controls.email.setValue(this.parceiro.email);
    this.parceiroform.controls.ativo.setValue(this.parceiro.ativo);
    //this.parceiroform.controls.produto.setValue(this.parceiro.produto);
    this,this.SelectedProduto = this.parceiro.produto;
    if(this.parceiro.conta != null) {
      this.selectedConta = this.parceiro.conta.id;
    }
  
  }
}



  get form() {
    return this.parceiroform.controls;
  }

    salvar() {
      const parceiro: Parceiro = new Parceiro();
      parceiro.parceiro_id =  this.parceiro.parceiro_id;
      parceiro.nome = this.parceiroform.controls.nome.value; 
      parceiro.conta =  this.selectedConta;
      parceiro.cnpj = this.parceiroform.controls.cnpj.value;
      parceiro.cep = this.parceiroform.controls.cep.value;
      parceiro.logradouro = this.parceiroform.controls.logradouro.value;
      parceiro.numero = this.parceiroform.controls.numero.value;
      parceiro.complemento = this.parceiroform.controls.complemento.value;
      parceiro.bairro = this.parceiroform.controls.bairro.value;
      parceiro.cidade = this.parceiroform.controls.cidade.value;
      parceiro.uf = this.parceiroform.controls.uf.value;
      parceiro.email = this.parceiroform.controls.email.value;
      if (this.parceiroform.controls.ativo.value== "true"){
        parceiro.ativo = true;
      }else{
        parceiro.ativo = false;
      }
      parceiro.ativo = parceiro.ativo;
      parceiro.produto = this.SelectedProduto;
        this.parceiroService.alterar( parceiro ).subscribe( observer => {
          this.toastr.success('Atualizado com sucesso','Parceiro', {
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
