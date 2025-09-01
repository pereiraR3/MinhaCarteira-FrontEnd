import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { ListarUsuariosComponent } from './usuario/listar-usuario/listar-usuarios.component';
import { SpkReusableTablesComponent } from '../../../@spk/spk-reusable-tables/spk-reusable-tables.component';
import { IncluirUsuarioComponent } from './usuario/incluir-usuario/incluir-usuario.component';
import { EditarUsuarioComponent } from './usuario/editar-usuario/editar-usuario.component';
import { ShowcodeCardComponent } from '../../shared/components/showcode-card/showcode-card.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { SpkNgSelectComponent } from '../../../@spk/spk-ng-select/spk-ng-select.component';
import { SelectContaComponent } from '../util/select/select-conta/select-conta.component';
import { LoginSistemaComponent } from '../login/login-sistema/login-sistema.component';
import { ErrorInterceptor } from '../interceptors/http-error.interceptor';
import { HttpHeadersInterceptor } from '../interceptors/http-headers.interceptor';
import { IncluirUnidadeFederativaComponent } from '../cadastro/unidade-federativa/incluir-unidade-federativa/incluir-unidade-federativa.component';
import { EditarUnidadeFederativaComponent } from '../cadastro/unidade-federativa/editar-unidade-federativa/editar-unidade-federativa.component';
import { ListarUnidadeFederativaComponent } from '../cadastro/unidade-federativa/listar-unidade-federativa/listar-unidade-federativa.component';
import { IncluirMunicipioComponent } from '../cadastro/municipio/incluir-municipio/incluir-municipio.component';
import { EditarMunicipioComponent } from '../cadastro/municipio/editar-municipio/editar-municipio.component';
import { ListarMunicipioComponent } from '../cadastro/municipio/listar-municipio/listar-municipio.component';
import { IncluirPaisComponent } from '../cadastro/pais/incluir-pais/incluir-pais.component';
import { EditarPaisComponent } from '../cadastro/pais/editar-pais/editar-pais.component';
import { ListarPaisComponent } from '../cadastro/pais/listar-pais/listar-pais.component';
import { IncluirRegiaoComponent } from '../cadastro/regiao/incluir-regiao/incluir-regiao.component';
import { EditarRegiaoComponent } from '../cadastro/regiao/editar-regiao/editar-regiao.component';
import { ListarRegiaoComponent } from '../cadastro/regiao/listar-regiao/listar-regiao.component';
import { SharedModule } from '../../shared/shared.module';
import { ListarRepositorioComponent } from './repositorio/listar-repositorio/listar-repositorio.component';
import { EditarRepositorioComponent } from './repositorio/editar-repositorio/editar-repositorio.component';
import { IncluirRepositorioComponent } from './repositorio/incluir-repositorio/incluir-repositorio.component';
import { ComponenteSistemaModule } from "../componentesistema/componentesistema.module";



@NgModule({
  declarations: [
    ListarUsuariosComponent,
    IncluirUsuarioComponent,
    EditarUsuarioComponent,
    IncluirUnidadeFederativaComponent,
    EditarUnidadeFederativaComponent,
    ListarUnidadeFederativaComponent,
    IncluirMunicipioComponent,
    EditarMunicipioComponent,
    ListarMunicipioComponent,
    IncluirPaisComponent,
    EditarPaisComponent,
    ListarPaisComponent,
    IncluirRegiaoComponent,
    EditarRegiaoComponent,
    ListarRegiaoComponent,
    ListarRepositorioComponent,
    EditarRepositorioComponent,
    IncluirRepositorioComponent,
    //SelectContaComponent,
    LoginSistemaComponent,
    
  ],
  imports: [
    //CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    ShowcodeCardComponent,
    SpkReusableTablesComponent,
    SpkNgSelectComponent,
    NgSelectModule,
    SharedModule,
    ComponenteSistemaModule
]
})
export class AdministracaoModule {}
