
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioFiltro } from '../../../model/filtro/usuario-filtro.model';
import { Usuario } from '../../../model/usuario.model';
import { UsuarioService } from '../../../services/UsuarioService.service';
import { AbstractEntityService } from '../../../services/abstract-entity.service';
import { AbstractListarPageComponent } from '../../../page/abstract-listar-page.component';

declare var $: any;
@Component({
  standalone:false,
  selector: 'app-listar-usuario',
  templateUrl: './listar-usuario.component.html',
  styleUrl: './listar-usuario.component.scss'
})
export class ListarUsuariosComponent  extends AbstractListarPageComponent<Usuario> implements OnInit, OnDestroy{
 
  ordersColumn =[
    {header:"Sequencial",field:"Sequencial"},
    {header:"Nome",field:"Nome"},
    {header:"Login",field:"Login"},
    {header:"E-mail",field:"E-mail"},
    {header:"Conta",field:"Conta"},
    {header:"Opção",field:"Opção"},
  ]

  filtro: UsuarioFiltro;
  page:any;

  constructor(public usuarioService: UsuarioService, private router: Router,
    public fb: FormBuilder,
    ){
    super();
    this.usuarioService = usuarioService;
  }

  ngOnInit(): void {
        this.filtro = new UsuarioFiltro();
        this.filtroNomeUsuario("");
  }


  filtrarPaginacao(event:any) {
    var pagina = event - 1;
    this.pagina = pagina;
    this.filtrar();
  }

  filtroNomeUsuario(nome:string) {
    this.pagina = 0;
    this.filtro.nome = nome;
    if( this.filtro.nome.length > 2) {
      this.filtrar();
    } else if( this.filtro.nome.length == 0) {
      this.filtrar();
    }
  }



  getFiltro(): UsuarioFiltro {
    return this.filtro;
  }


  getService(): AbstractEntityService<Usuario> {
      return this.usuarioService;
  }

  ngOnDestroy(): void {

  }


  editarUsuario(usuario: Usuario) {
    
    this.router.navigateByUrl('/administracao/usuario/editar', {
      state: { usuario: usuario }
     });
  }

  onPageChange(pageIndex: any) {
    this.pagina = pageIndex;
    this.filtrar();
  }


}
