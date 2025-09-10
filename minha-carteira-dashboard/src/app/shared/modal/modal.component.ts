import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (isOpen) {
      <div class="fixed inset-0 bg-black bg-opacity-50 p-6 z-40" (click)="closeModal.emit()"></div>
      <div class="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div class="bg-white rounded-lg shadow-xl w-full max-w-lg">
          <header class="flex justify-between items-center p-4 border-b">
            <h3 class="text-lg font-bold">{{ title }}</h3>
            <button (click)="closeModal.emit()" class="text-gray-500 hover:text-gray-800">&times;</button>
          </header>
          <main class="p-6">
            <ng-content></ng-content>
          </main>
        </div>
      </div>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalComponent {
  @Input() isOpen = false;
  @Input() title = 'Modal';
  @Output() closeModal = new EventEmitter<void>();
}