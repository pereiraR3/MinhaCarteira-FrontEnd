import { Injectable, signal, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, of, tap, throwError } from 'rxjs';

/**
 * Interface para o corpo da requisição dos relatórios.
 */
export interface ReportRequest {
  usuarioId?: number;
  mes: number;
  ano: number;
}

@Injectable({ providedIn: 'root' })
export class ReportService {
  private http = inject(HttpClient);

  // Signals para controlar o estado do serviço na UI
  isLoading = signal(false);
  apiError = signal<string | null>(null);
  successMessage = signal<string | null>(null);

  /**
   * Solicita o download de um relatório de despesas mensais em PDF.
   * @param data Objeto contendo o mês e o ano do relatório.
   */
  downloadMonthlyReport(data: ReportRequest): void {
    if (this.isLoading()) return;
    this.setLoadingState();

    this.http.post('/api/reports/download-monthly-expense-report', data, {
      responseType: 'blob' // Essencial para receber arquivos
    }).pipe(
      tap(blob => {
        this.isLoading.set(false);
        this.triggerDownload(blob, `relatorio-despesas-${data.mes}-${data.ano}.pdf`);
        this.successMessage.set('Download do relatório iniciado.');
      }),
      catchError(error => this.handleError(error, 'Falha ao baixar o relatório.'))
    ).subscribe();
  }

  /**
   * Solicita o envio de um relatório de despesas mensais por e-mail.
   * @param data Objeto contendo o mês e o ano do relatório.
   */
  sendMonthlyReportByEmail(data: ReportRequest): void {
    if (this.isLoading()) return;
    this.setLoadingState();

    this.http.post('/api/reports/send-monthly-expense-report', data)
      .pipe(
        tap(() => {
          this.isLoading.set(false);
          this.successMessage.set('Relatório enviado para seu e-mail com sucesso!');
          
        }),
        catchError(error => this.handleError(error, 'Falha ao enviar o relatório por e-mail.\n'+ data.ano+' - '+data.mes+' - '+data.usuarioId))
      ).subscribe();
  }

  /**
   * Reseta os signals de estado para o estado inicial.
   */
  private setLoadingState(): void {
    this.isLoading.set(true);
    this.apiError.set(null);
    this.successMessage.set(null);
  }

  /**
   * Cria um link temporário e simula um clique para iniciar o download do arquivo.
   * @param blob O conteúdo do arquivo (PDF).
   * @param fileName O nome que o arquivo terá ao ser baixado.
   */
  private triggerDownload(blob: Blob, fileName: string): void {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  }

  /**
   * Centraliza o tratamento de erros.
   * @param error O objeto de erro.
   * @param defaultMessage A mensagem padrão a ser exibida.
   */
  private handleError(error: HttpErrorResponse, defaultMessage: string) {
    console.error(defaultMessage, error);
    this.apiError.set(defaultMessage);
    this.isLoading.set(false);
    return throwError(() => new Error(defaultMessage));
  }
}
