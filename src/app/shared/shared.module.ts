import { NgModule } from '@angular/core';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ContentLayoutComponent } from './layouts/content-layout/content-layout.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SwitcherComponent } from './components/switcher/switcher.component';
import { ColorPickerModule, ColorPickerService } from 'ngx-color-picker';
import { PageHeaderComponent } from './components/page-header/page-header.component';
import { AuthenticationLayoutComponent } from './layouts/authentication-layout/authentication-layout.component';
import { TabToTopComponent } from './components/tab-to-top/tab-to-top.component';
import { LandingSwitcherComponent } from './components/landing-switcher/landing-switcher.component';
import { LandingLayoutComponent } from './layouts/landing-layout/landing-layout.component';
import { SvgReplaceDirective } from './directives/svgReplace.directive';
import { OverlayscrollbarsModule } from 'overlayscrollbars-ngx';
import { FullscreenDirective } from './directives/fullscreen.directive';
import { HoverEffectSidebarDirective } from './directives/hover-effect-sidebar.directive copy';
//import { AdministracaoModule } from '../sistema/administracao/administracao.module';
import { PaginadorComponent } from '../sistema/page/paginador/paginador.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorInterceptor } from '../sistema/interceptors/http-error.interceptor';
import { HttpHeadersInterceptor } from '../sistema/interceptors/http-headers.interceptor';
import { KsModule } from '../sistema/ks/ks.module';
import { AdministracaoModule } from '../sistema/administracao/administracao.module';
import { MatPaginatorModule } from '@angular/material/paginator';
import { SelectContaComponent } from '../sistema/util/select/select-conta/select-conta.component';
// import { NgxColorsModule } from 'ngx-colors';
//
import { NgSelectModule } from '@ng-select/ng-select';
import { SelectParceiroComponent } from '../sistema/util/select/select-parceiro/select-parceiro.component';
import { SelectProdutoComponent } from '../sistema/util/select/select-produto/select-produto.component';
import { SelectUnidadeComponent } from '../sistema/util/select/select-unidade/select-unidade.component';
import { UsuarioAutenticacaoDropDownComponent } from '../sistema/componentesistema/usuario-autenticacao-drop-down/usuario-autenticacao-drop-down.component';

@NgModule({
    declarations: [
        HeaderComponent,
        SidebarComponent,
        ContentLayoutComponent,  
        SwitcherComponent,
        PageHeaderComponent,
        TabToTopComponent,
        FooterComponent,
        SvgReplaceDirective,
        AuthenticationLayoutComponent,
        LandingSwitcherComponent,
        LandingLayoutComponent,
        HoverEffectSidebarDirective,
        PaginadorComponent,
        

        UsuarioAutenticacaoDropDownComponent
               
    ],
    
    imports:[
        CommonModule,
        RouterModule,
        OverlayscrollbarsModule,
        FormsModule,
        ReactiveFormsModule,
        FullscreenDirective,
        ColorPickerModule,
        MatPaginatorModule,
        KsModule,
        NgSelectModule,
        
        
        

       
        
    ],
    exports:[
        HeaderComponent,
        SidebarComponent,
        ContentLayoutComponent,
        SwitcherComponent,
        PageHeaderComponent, 
        TabToTopComponent,
        FooterComponent,
        AuthenticationLayoutComponent,
        LandingSwitcherComponent,
        LandingLayoutComponent,
        HoverEffectSidebarDirective,
        PaginadorComponent,
        CommonModule,
        //
        NgSelectModule, 
        
    ],  providers: [
        {
          provide: HTTP_INTERCEPTORS,
          useClass: ErrorInterceptor,
          multi: true
      },
      {
          provide: HTTP_INTERCEPTORS,
          useClass:  HttpHeadersInterceptor,
          multi: true
      },
    ]
})
export class SharedModule { }
 