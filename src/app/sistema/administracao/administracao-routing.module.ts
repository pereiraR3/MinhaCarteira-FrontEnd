import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
/*
import { EditarUsuarioComponent } from './usuario/editar-usuario/editar-usuario.component';
import { IncluirUsuarioComponent } from './usuario/incluir-usuario/incluir-usuario.component';
import { ListarUsuariosComponent } from './usuario/listar-usuario/listar-usuarios.component';
import { ListarUnidadeFederativaComponent } from '../cadastro/unidade-federativa/listar-unidade-federativa/listar-unidade-federativa.component';
import { IncluirUnidadeFederativaComponent } from '../cadastro/unidade-federativa/incluir-unidade-federativa/incluir-unidade-federativa.component';
import { EditarUnidadeFederativaComponent } from '../cadastro/unidade-federativa/editar-unidade-federativa/editar-unidade-federativa.component';
import { ListarMunicipioComponent } from '../cadastro/municipio/listar-municipio/listar-municipio.component';
import { IncluirMunicipioComponent } from '../cadastro/municipio/incluir-municipio/incluir-municipio.component';
import { EditarMunicipioComponent } from '../cadastro/municipio/editar-municipio/editar-municipio.component';
import { ListarPaisComponent } from '../cadastro/pais/listar-pais/listar-pais.component';
import { IncluirPaisComponent } from '../cadastro/pais/incluir-pais/incluir-pais.component';
import { EditarPaisComponent } from '../cadastro/pais/editar-pais/editar-pais.component';
import { ListarRegiaoComponent } from '../cadastro/regiao/listar-regiao/listar-regiao.component';
import { IncluirRegiaoComponent } from '../cadastro/regiao/incluir-regiao/incluir-regiao.component';
import { EditarRegiaoComponent } from '../cadastro/regiao/editar-regiao/editar-regiao.component';
import { EditarRepositorioComponent } from './repositorio/editar-repositorio/editar-repositorio.component';
import { IncluirRepositorioComponent } from './repositorio/incluir-repositorio/incluir-repositorio.component';
import { ListarRepositorioComponent } from './repositorio/listar-repositorio/listar-repositorio.component';*/

const admin: Routes = [
  /*{ path: 'administracao/usuario', component: ListarUsuariosComponent },
  { path: 'administracao/usuario/incluir', component: IncluirUsuarioComponent },
  { path: 'administracao/usuario/editar', component: EditarUsuarioComponent }, 

  { path: 'administracao/unidadefederativa', component: ListarUnidadeFederativaComponent },
  { path: 'administracao/unidadefederativa/incluir', component: IncluirUnidadeFederativaComponent },
  { path: 'administracao/unidadefederativa/editar', component: EditarUnidadeFederativaComponent }, 

  { path: 'administracao/municipio', component: ListarMunicipioComponent  },
  { path: 'administracao/municipio/incluir', component:IncluirMunicipioComponent   },
  { path: 'administracao/municipio/editar', component: EditarMunicipioComponent }, 

  { path: 'administracao/pais', component: ListarPaisComponent  },
  { path: 'administracao/pais/incluir', component:IncluirPaisComponent   },
  { path: 'administracao/pais/editar', component: EditarPaisComponent }, 


  { path: 'administracao/regiao', component: ListarRegiaoComponent  },
  { path: 'administracao/regiao/incluir', component:IncluirRegiaoComponent   },
  { path: 'administracao/regiao/editar', component: EditarRegiaoComponent }, 

  { path: 'administracao/repositorio', component: ListarRepositorioComponent }, 
  { path: 'administracao/repositorio/incluir', component: IncluirRepositorioComponent }, 
  { path: 'administracao/repositorio/editar', component: EditarRepositorioComponent }, */


];
@NgModule({
  imports: [RouterModule.forChild(admin)],
  exports: [RouterModule]
})
export class administracaoRoutingModule { 
  static routes = admin;
}