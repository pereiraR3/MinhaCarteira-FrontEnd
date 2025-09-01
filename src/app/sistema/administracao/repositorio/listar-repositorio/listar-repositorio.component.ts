import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AbstractListarPageComponent } from '../../../page/abstract-listar-page.component';
import { Repositorio } from '../../../model/Repositorio.model';
import { RepositorioService } from '../../../services/RepositorioService.service';
import { RepositorioFiltro } from '../../../model/filtro/repositorio-filtro.model';
import { AbstractEntityService } from '../../../services/abstract-entity.service';


declare var $: any;
@Component({
  standalone:false,
  selector: 'app-listar-repositorio',
  templateUrl: './listar-repositorio.component.html',
  styleUrls: ['./listar-repositorio.component.css']
})
export class ListarRepositorioComponent extends AbstractListarPageComponent<Repositorio> implements OnInit, OnDestroy{


  filtro: RepositorioFiltro;
  page:any;

  constructor(public repositorioService: RepositorioService, private router: Router,
    public fb: FormBuilder,
   // public notificationService:NotificationService
    ){
    super();
    this.repositorioService = repositorioService;
  }
 ordersColumn = [
    { header: "Sequencial", field: "Sequencial" },
    { header: "Nome", field: "nome" },
    { header: "Titulo", field: "titulo" },
    { header: "Tipo", field: "tipo" },
    { header: "Ações", field: "acoes" },
  ]
  ngOnInit(): void {
        this.filtro = new RepositorioFiltro();
        this.filtroNomeRepositorio("");
  }


  filtrarPaginacao(event:any) {
    var pagina = event - 1;
    this.pagina = pagina;
    this.filtrar();
  }

  filtroNomeRepositorio(nome:string) {
    this.pagina = 0;
    this.filtro.nome = nome;
    if( this.filtro.nome.length > 2) {
      this.filtrar();
    } else if( this.filtro.nome.length == 0) {
      this.filtrar();
    }
  }



  getFiltro(): RepositorioFiltro {
    return this.filtro;
  }


  getService(): AbstractEntityService<Repositorio> {
      return this.repositorioService;
  }

  ngOnDestroy(): void {

  }

  onPageChange(pageIndex: any) {
    this.pagina = pageIndex;
    this.filtrar();
  }
  
  editarRepositorio(repositorio: Repositorio) {
    this.router.navigateByUrl('/repositorio/editar', {
      state: { repositorio: repositorio }
     });
  }


}
