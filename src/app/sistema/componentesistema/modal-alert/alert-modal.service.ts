import { Injectable, EventEmitter } from '@angular/core';
import { AlertTypes } from './alert-types.enum';

@Injectable({
  providedIn: 'root'
})
export class AlertModalService {
  private alertTimeoutHandle?: any;
  private confirmResolver?: (value: boolean) => void;

  // Eventos para controle do conteúdo dos modais
  alertChange = new EventEmitter<{ message: string; type: AlertTypes }>();
  alertClose = new EventEmitter<void>();

  confirmChange = new EventEmitter<{
    title: string;
    msg: string;
    okTxt?: string;
    cancelTxt?: string;
  }>();

  // Mostra alerta
  showAlert(message: string, type: AlertTypes, dismissTimeout?: number) {
    if (this.alertTimeoutHandle) {
      clearTimeout(this.alertTimeoutHandle);
    }

    this.alertChange.emit({ message, type });

    if (dismissTimeout) {
      this.alertTimeoutHandle = setTimeout(() => {
        this.hideAlert();
      }, dismissTimeout);
    }
  }

  hideAlert() {
    this.alertClose.emit();
  }

  showAlertDanger(message: string) {
    this.showAlert(message, AlertTypes.DANGER);
  }

  showAlertSuccess(message: string) {
    this.showAlert(message, AlertTypes.SUCCESS, 3000);
  }

  // Mostra modal de confirmação e abre HSOverlay
  showConfirm(
    title: string,
    msg: string,
    okTxt?: string,
    cancelTxt?: string
  ): Promise<boolean> {
    this.confirmChange.emit({ title, msg, okTxt, cancelTxt });

    // Aguarda renderização do Angular e abre o modal com HSOverlay
    setTimeout(() => {
      (window as any).HSOverlay?.open?.('#hs-vertically-centered-modal');
    });

    return new Promise<boolean>(resolve => {
      this.confirmResolver = resolve;
    });
  }

  // Chamado pelo componente ConfirmModal ao confirmar
  confirm() {
    this.closeConfirmModal();
    if (this.confirmResolver) {
      this.confirmResolver(true);
      this.confirmResolver = undefined;
    }
  }

  // Chamado pelo componente ConfirmModal ao cancelar
  cancel() {
    this.closeConfirmModal();
    if (this.confirmResolver) {
      this.confirmResolver(false);
      this.confirmResolver = undefined;
    }
  }

  // Fecha o modal programaticamente
  private closeConfirmModal() {
    (window as any).HSOverlay?.close?.('#hs-vertically-centered-modal');
  }
}