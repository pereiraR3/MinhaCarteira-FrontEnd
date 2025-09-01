import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { ListarParceiroComponent } from './parceiro/listar-parceiro/listar-parceiro.component';
import { SpkReusableTablesComponent } from '../../../@spk/spk-reusable-tables/spk-reusable-tables.component';
import { SpkNgSelectComponent } from '../../../@spk/spk-ng-select/spk-ng-select.component';
import { CommonModule } from '@angular/common'; 
import { ShowcodeCardComponent } from '../../shared/components/showcode-card/showcode-card.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditarParceiroComponent } from './parceiro/editar-parceiro/editar-parceiro.component';
import { IncluirParceiroComponent } from './parceiro/incluir-parceiro/incluir-parceiro.component';
import { ListarProdutoComponent } from './produto/listar-produto/listar-produto.component';
import { EditarProdutoComponent } from './produto/editar-produto/editar-produto.component';
import { IncluirProdutoComponent } from './produto/incluir-produto/incluir-produto.component';
import { ListarUnidadeComponent } from './unidade/listar-unidade/listar-unidade.component';
import { IncluirUnidadeComponent } from './unidade/incluir-unidade/incluir-unidade.component';
import { EditarUnidadeComponent } from './unidade/editar-unidade/editar-unidade.component';
import { ListarUsuarioParceiroComponent } from './usuario-parceiro/listar-usuario-parceiro/listar-usuario-parceiro.component';
import { IncluirUsuarioParceiroComponent } from './usuario-parceiro/incluir-usuario-parceiro/incluir-usuario-parceiro.component';
import { EditarUsuarioParceiroComponent } from './usuario-parceiro/editar-usuario-parceiro/editar-usuario-parceiro.component';
import { TelaVisualizacaoComponent } from './tela-view/tela-visualizacao.component';
import { ListarOportunidadeComponent } from './oportunidade/listar-oportunidade/listar-oportunidade.component';
import { IncluirOportunidadeComponent } from './oportunidade/incluir-oportunidade/incluir-oportunidade.component';
import { EditarOportunidadeComponent } from './oportunidade/editar-oportunidade/editar-oportunidade.component';
import { ListarOportunidadeMovimentacaoComponent } from './oportunidade-movimento/listar-oportunidade-movimentacao/listar-oportunidade-movimentacao.component';
import { IncluirOportunidadeMovimentacaoComponent } from './oportunidade-movimento/incluir-oportunidade-movimentacao/incluir-oportunidade-movimentacao.component';
import { EditarOportunidadeMovimentacaoComponent } from './oportunidade-movimento/editar-oportunidade-movimentacao/editar-oportunidade-movimentacao.component';
import { ViewOportunidadeComponent } from './view-oportunidade/view-oportunidade.component';
import { QRCodeComponent } from 'angularx-qrcode';
import { ListarOportunidadesAssumidasComponent } from './oportunidade/listar-oportunidade-assumidas/listar-oportunidade-assumidas.component';
import { ListaArquivosComponent } from './arquivos/listar-arquivos.component';
import { ComponenteSistemaModule } from '../componentesistema/componentesistema.module';
import { VisualizarAnexoPdfComponent } from './pdf/visualizar-anexo-pdf.component';


@NgModule({
  declarations: [
    ListarParceiroComponent,
    EditarParceiroComponent,
    IncluirParceiroComponent,

    ListarProdutoComponent,
    EditarProdutoComponent,
    IncluirProdutoComponent,

    ListarUnidadeComponent,
    EditarUnidadeComponent,
    IncluirUnidadeComponent,

    EditarParceiroComponent,
    IncluirParceiroComponent,
    ListarParceiroComponent,
    
    ListarUsuarioParceiroComponent,
    IncluirUsuarioParceiroComponent,
    EditarUsuarioParceiroComponent,

    ListarOportunidadeComponent,
    IncluirOportunidadeComponent,
    EditarOportunidadeComponent,

    ListarOportunidadeMovimentacaoComponent,
    IncluirOportunidadeMovimentacaoComponent,
    EditarOportunidadeMovimentacaoComponent,
    
    TelaVisualizacaoComponent,
    ViewOportunidadeComponent,

    ListarOportunidadesAssumidasComponent,
    ListaArquivosComponent,
 VisualizarAnexoPdfComponent
    
    ],
    imports: [
    FormsModule,
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    ShowcodeCardComponent,
    SpkReusableTablesComponent,
    NgSelectModule,
    SpkNgSelectComponent,
    QRCodeComponent,
    ComponenteSistemaModule,
    
]
})
export class KsModule {}