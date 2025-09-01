import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AlertModalService } from '../alert-modal.service';

@Component({
  standalone: false,
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss']
})
export class ConfirmModalComponent implements OnInit {
  title = 'Confirmação';
  msg = 'Você tem certeza?';
  cancelTxt = 'Cancelar';
  okTxt = 'Sim';

  constructor(public alertService: AlertModalService) {}

  ngOnInit() {
    // Escuta evento do serviço
    this.alertService.confirmChange.subscribe(data => {
      this.title = data.title;
      this.msg = data.msg;
      this.okTxt = data.okTxt ?? 'Sim';
      this.cancelTxt = data.cancelTxt ?? 'Cancelar';
    });
  }


  @Output() confirm = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  onConfirm() {
    this.confirm.emit();
  }

  onCancel() {
    this.cancel.emit();
  }
}