import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Md5 } from 'ts-md5';
import { RepositorioService } from '../../../services/RepositorioService.service';
import { Repositorio } from '../../../model/Repositorio.model';

declare var jQuery: any;
declare var FormAdvanced: any;
declare var $: any;
@Component({
  standalone: false,
  selector: 'app-incluir-repositorio',
  templateUrl: './incluir-repositorio.component.html',
  styleUrls: ['./incluir-repositorio.component.css']
})
export class IncluirRepositorioComponent implements OnInit {

  private formBuilder: FormBuilder;
  //private messageService: MessageService;
  private repositorioService: RepositorioService;
  repositorioForm: FormGroup;
  contas: any;
  public registrosForm: any[] = [];
  constructor(
    formBuilder: FormBuilder,
    //messageService:MessageService,
    repositorioService: RepositorioService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.formBuilder = formBuilder;
    // this.messageService = messageService;
    this.repositorioService = repositorioService;
  }

  public ngOnInit(): void {
    this.repositorioForm = this.formBuilder.group({
      nome: [null, [Validators.required, Validators.minLength(3)]],
      titulo: [null],
      tipo: [null],
    });
  }



  listarRegistrosForm(event: Event) {
    const tipoRepositorio = (event.target as HTMLSelectElement).value;
    this.repositorioForm.controls.tipo.setValue(tipoRepositorio);
    this.repositorioService.listarRegistrosForm(tipoRepositorio)
      .then((registrosForm: any) => {
        this.registrosForm = registrosForm;
      })
      .catch((param: any) => {
        console.log(param);
      });
  }

  getForm(): FormGroup {
    return this.repositorioForm;
  }

  salvar(): void {
    const repositorio: Repositorio = new Repositorio();

    repositorio.nome = this.repositorioForm.controls.nome.value;
    repositorio.titulo = this.repositorioForm.controls.titulo.value;
    repositorio.tipo = this.repositorioForm.controls.tipo.value;
    repositorio.dadosFormulario = this.registrosForm
    this.repositorioService.incluir(repositorio).subscribe(observer => {

      console.log("mensagem App")
      this.voltar();
    });
  }


  voltar() {
    this.router.navigateByUrl('/repositorio');
  }

}