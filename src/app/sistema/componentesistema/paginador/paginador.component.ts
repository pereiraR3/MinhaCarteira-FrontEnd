
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';

@Component({
  standalone: false,
  selector: 'app-paginador',
  templateUrl: './paginador.component.html',
  styleUrls: ['./paginador.component.scss']
})
export class PaginadorComponent {
  @Input() length: number = 0;
  @Input() pageSize: number = 10;
  @Input() pageIndex: number = 0;
  @Input() hidePageSize: boolean = false;

  @Output() page: EventEmitter<number> = new EventEmitter();

  onPageEvent(event: any) {
    this.page.emit(event.pageIndex);
  }
}