import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Navigation, Router } from '@angular/router';
import { Md5 } from 'ts-md5';
import { Repositorio } from '../../../model/Repositorio.model';
import { RepositorioService } from '../../../services/RepositorioService.service';

declare var jQuery: any;
declare var FormAdvanced: any;
declare var $: any;
@Component({
  standalone:false,
  selector: 'app-editar-repositorio',
  templateUrl: './editar-repositorio.component.html',
  styleUrls: ['./editar-repositorio.component.css']
})
export class EditarRepositorioComponent  implements OnInit {

    private formBuilder: FormBuilder;
   // private messageService: MessageService;
    state: any;
    repositorio:  Repositorio = {} as  Repositorio;
    private currentNavigation: Navigation|null = null;
    private repositorioService: RepositorioService;
    repositorioForm: FormGroup;
    public registrosForm: any[] = [];

    constructor(
        formBuilder: FormBuilder,
        //messageService:MessageService,
        repositorioService: RepositorioService,
        private router: Router,
        private route: ActivatedRoute
    ){
        this.formBuilder = formBuilder;
        //this.messageService = messageService;
        this.repositorioService = repositorioService;

        this.route.queryParams.subscribe(params => {
          this.currentNavigation = this.router.getCurrentNavigation();
          if(this.currentNavigation  != null) {
            this.state = this.currentNavigation.extras.state;
            this.repositorio = this.state.repositorio;
          }
        });
    }

    public ngOnInit(): void{
        this.repositorioForm = this.formBuilder.group({
          nome: [null,[Validators.required, Validators.minLength(3)]],
          titulo: [null],
          tipo: [null],
        });    
        this.carregarDadosFormulario();
      }
    
        carregarDadosFormulario(){
          if(this.repositorioForm != null) {
            this.repositorioForm.controls.nome.setValue(this.repositorio.nome);
            this.repositorioForm.controls.titulo.setValue(this.repositorio.titulo);
            this.repositorioForm.controls.tipo.setValue(this.repositorio.tipo);
            //this.listarRegistrosForm(this.repositorio.tipo);
          }
        }


    
  listarRegistrosForm(tipoRepositorio:String) {
    this.repositorioForm.controls.tipo.setValue(tipoRepositorio);
    this.repositorioService.listarRegistrosForm(tipoRepositorio)
                          .then( (registrosForm:any) => {
                            this.registrosForm = registrosForm;
                            this.repositorio.dadosFormulario = registrosForm;
                          }).catch((param: any) =>{
                             console.log(param);
                          });
   } 

    getForm(): FormGroup {
        return this.repositorioForm;
    }

    salvar(): void{
      
        this.repositorio.nome = this.repositorioForm.controls.nome.value;
        this.repositorio.titulo = this.repositorioForm.controls.titulo.value;
        this.repositorio.tipo = this.repositorioForm.controls.tipo.value;
        this.repositorioService.alterar( this.repositorio ).subscribe( observer => {
           // this.messageService.dispatchMessage( AppMessage.REGISTRO_INCLUIDO );
           console.log('appMessage')
            this.voltar();
        });
    }


    voltar() {
      this.router.navigateByUrl('/repositorio');
    }

}