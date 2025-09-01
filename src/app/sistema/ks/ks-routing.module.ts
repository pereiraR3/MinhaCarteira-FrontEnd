import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListarParceiroComponent } from '../ks/parceiro/listar-parceiro/listar-parceiro.component';
import { EditarParceiroComponent } from './parceiro/editar-parceiro/editar-parceiro.component';
import { IncluirParceiroComponent } from './parceiro/incluir-parceiro/incluir-parceiro.component';
import { ListarProdutoComponent } from './produto/listar-produto/listar-produto.component';
import { EditarProdutoComponent } from './produto/editar-produto/editar-produto.component';
import { IncluirProdutoComponent } from './produto/incluir-produto/incluir-produto.component';
import { ListarUnidadeComponent } from './unidade/listar-unidade/listar-unidade.component';
import { EditarUnidadeComponent } from './unidade/editar-unidade/editar-unidade.component';
import { IncluirUnidadeComponent } from './unidade/incluir-unidade/incluir-unidade.component';
import { ListarUsuarioParceiroComponent } from './usuario-parceiro/listar-usuario-parceiro/listar-usuario-parceiro.component';
import { IncluirUsuarioParceiroComponent } from './usuario-parceiro/incluir-usuario-parceiro/incluir-usuario-parceiro.component';
import { EditarUsuarioParceiroComponent } from './usuario-parceiro/editar-usuario-parceiro/editar-usuario-parceiro.component';
import { TelaVisualizacaoComponent } from './tela-view/tela-visualizacao.component';
import { ListarOportunidadeComponent } from './oportunidade/listar-oportunidade/listar-oportunidade.component';
import { IncluirOportunidadeComponent } from './oportunidade/incluir-oportunidade/incluir-oportunidade.component';
import { EditarOportunidadeComponent } from './oportunidade/editar-oportunidade/editar-oportunidade.component';
import { IncluirOportunidadeMovimentacaoComponent } from './oportunidade-movimento/incluir-oportunidade-movimentacao/incluir-oportunidade-movimentacao.component';
import { ListarOportunidadeMovimentacaoComponent } from './oportunidade-movimento/listar-oportunidade-movimentacao/listar-oportunidade-movimentacao.component';
import { EditarOportunidadeMovimentacaoComponent } from './oportunidade-movimento/editar-oportunidade-movimentacao/editar-oportunidade-movimentacao.component';
import { ViewOportunidadeComponent } from './view-oportunidade/view-oportunidade.component';
import { ListarOportunidadesAssumidasComponent } from './oportunidade/listar-oportunidade-assumidas/listar-oportunidade-assumidas.component';
import { VisualizarAnexoPdfComponent } from './pdf/visualizar-anexo-pdf.component';

const ks: Routes = [
    {path: 'ks-portal/parceiro', component: ListarParceiroComponent },
    {path: 'ks-portal/parceiro/editar', component: EditarParceiroComponent },
    {path: 'ks-portal/parceiro/incluir', component: IncluirParceiroComponent },

    {path: 'ks-portal/produto', component: ListarProdutoComponent },
    {path: 'ks-portal/produto/editar', component: EditarProdutoComponent },
    {path: 'ks-portal/produto/incluir', component: IncluirProdutoComponent },

    {path: 'ks-portal/unidade', component: ListarUnidadeComponent },
    {path: 'ks-portal/unidade/editar', component: EditarUnidadeComponent },
    {path: 'ks-portal/unidade/incluir', component: IncluirUnidadeComponent },

    {path: 'ks-portal/usuario_parceiro', component: ListarUsuarioParceiroComponent },
    {path: 'ks-portal/usuario_parceiro/incluir', component: IncluirUsuarioParceiroComponent }, 
    {path: 'ks-portal/usuario_parceiro/editar', component: EditarUsuarioParceiroComponent }, 

    {path: 'ks-portal/tela_visualizacao/:id', component: TelaVisualizacaoComponent }, 

    {path: 'ks-portal/oportunidades', component: ListarOportunidadeComponent},
    {path: 'ks-portal/oportunidades/incluir', component: IncluirOportunidadeComponent},
    {path: 'ks-portal/oportunidades/editar', component: EditarOportunidadeComponent},
    {path: 'ks-portal/visualizar-oportunidade/:id', component: ViewOportunidadeComponent }, 
     {path: 'ks-portal/oportunidadeMovimentacao', component: ListarOportunidadeMovimentacaoComponent},
    {path: 'ks-portal/oportunidadeMovimentacao/incluir', component: IncluirOportunidadeMovimentacaoComponent},
    {path: 'ks-portal/oportunidadeMovimentacao/editar', component: EditarOportunidadeMovimentacaoComponent},

    {path: 'ks-portal/visualizar-oportunidade/:id', component: ViewOportunidadeComponent }, 
    {path: 'ks-portal/oportunidades-assumidas', component: ListarOportunidadesAssumidasComponent },
        { path: 'ks-portal/visualizaranexopdf/:id', component: VisualizarAnexoPdfComponent },


];
@NgModule({
    imports: [RouterModule.forChild(ks)],
    exports: [RouterModule]
})
export class KsRoutingModule {
    static routes = ks;
}
