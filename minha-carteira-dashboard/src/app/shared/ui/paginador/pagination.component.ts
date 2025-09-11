import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="totalPages > 1" class="flex justify-center items-center space-x-4 mt-4">
      <button (click)="goToPage(currentPage - 1)" 
              [disabled]="currentPage === 0"
              class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
        Anterior
      </button>

      <span class="text-sm text-gray-600">
        Página {{ currentPage + 1 }} de {{ totalPages }}
      </span>

      <button (click)="goToPage(currentPage + 1)" 
              [disabled]="currentPage >= totalPages - 1"
              class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
        Próximo
      </button>
    </div>
  `
})
export class PaginationComponent {
  @Input({ required: true }) currentPage!: number;
  @Input({ required: true }) totalPages!: number;
  @Output() pageChange = new EventEmitter<number>();

  goToPage(page: number): void {
    if (page >= 0 && page < this.totalPages) {
      this.pageChange.emit(page);
    }
  }
}