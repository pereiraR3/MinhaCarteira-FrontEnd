import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgSelectModule } from "@ng-select/ng-select";
import { PaginadorComponent } from "./paginador/paginador.component";
import { ConfirmModalComponent } from "./modal-alert/confirm-modal/confirm-modal.component";
import { SelectContaComponent } from "../util/select/select-conta/select-conta.component";
import { SelectParceiroComponent } from "../util/select/select-parceiro/select-parceiro.component";
import { SelectProdutoComponent } from "../util/select/select-produto/select-produto.component";
import { SelectUnidadeComponent } from "../util/select/select-unidade/select-unidade.component";
import { MatPaginatorModule } from "@angular/material/paginator";

@NgModule({
  declarations: [
    PaginadorComponent,
    ConfirmModalComponent,
    SelectContaComponent,
    SelectParceiroComponent,
    SelectProdutoComponent,
    SelectUnidadeComponent,

  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgSelectModule,
    MatPaginatorModule,


  ],
  exports: [
    PaginadorComponent,
    ConfirmModalComponent,
    SelectContaComponent,
    SelectParceiroComponent,
    SelectProdutoComponent,
    SelectUnidadeComponent,
    

  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [

  ]
})
export class ComponenteSistemaModule { }