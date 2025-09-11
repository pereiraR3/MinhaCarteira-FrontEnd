import { Injectable, signal, inject, effect } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { tap, catchError, of, Observable, throwError } from 'rxjs';
import { Gasto } from '../models';
import { Page } from '../models';
import { AuthService } from './auth.service';
import { GastoPayload } from '../../shared/ui/gasto-form/gasto-form.component';
export interface FilterCriteria {
  nome?: string;
  dataInicio?: string;
  dataFim?: string;
}
@Injectable({
  providedIn: 'root'
})
export class GastoService {
  private http = inject(HttpClient);
  private authService = inject(AuthService);

  gastos = signal<Gasto[]>([]);
  //changePage = signal(1);
  currentPage = signal(0);
  totalPages = signal(0);
  totalGastos = signal(0);
  isLoading = signal(false);
  apiError = signal<string | null>(null);
  private _gastos = signal<Gasto[]>([]);

  private initialLoadDoneForUser: number | null = null;


  constructor() {
    effect(() => {
      const userId = this.authService.userId();

      if (userId && userId !== this.initialLoadDoneForUser) {
        console.log(`Usuário com ID: ${userId} mudou. Carregando gastos...`);
        this.loadGastos(this.currentPage());
        this.initialLoadDoneForUser = userId;
      } else if (!userId && this.initialLoadDoneForUser !== null) {
        console.log('Nenhum usuário. Limpando estado de gastos.');
        this.resetState();
        this.initialLoadDoneForUser = null;
      }
    });
  }

  private filterState = signal<FilterCriteria>({});

  applyFilters(newFilters: FilterCriteria): void {
    this.filterState.set(newFilters); // Atualiza o estado do filtro
    this.loadGastos(0);// Recarrega os dados da primeira página com os novos filtros
  }

  changePage(page: number): void {
    if (page >= 0 && page < this.totalPages()) {
      this.loadGastos(page);
    }
  }

  // ÚNICA FUNÇÃO DE CARREGAMENTO - agora privada
  private loadGastos(page: number): void {
    const userId = this.authService.userId();
    if (!userId || this.isLoading()) return;

    this.isLoading.set(true);
    this.apiError.set(null);
    const size = 10;
    const currentFilters = this.filterState();

    let params = new HttpParams()
      .set('usuarioId', userId.toString())
      .set('page', page.toString())
      .set('size', size.toString());

    if (currentFilters.nome) params = params.append('nome', currentFilters.nome);
    if (currentFilters.dataInicio) params = params.append('dataInicio', currentFilters.dataInicio);
    if (currentFilters.dataFim) params = params.append('dataFim', currentFilters.dataFim);

    this.http.get<Page<Gasto>>('/api/gasto/find-by-filter', { params })
      .pipe(
        tap(response => {
          if (!response) return;

          // CORRIGIDO: Sempre substitui a lista, não importa a página.
          // Isso é o correto para paginação, diferente do "carregar mais".
          this.gastos.set(response.content);

          this.currentPage.set(page);
          this.totalPages.set(response.totalPages);
          this.isLoading.set(false);
        }),
        catchError(error => {
          this.apiError.set('Falha ao carregar os gastos.');
          this.isLoading.set(false);
          return of(null);
        })
      ).subscribe();
  }

  loadMoreGastos(): void {
    const nextPage = this.currentPage() + 1;
    if (nextPage < this.totalPages()) {
      const user = this.authService.currentUser();
      if (user) {
        this.loadGastos(this.currentPage()); // Mantém os filtros atuais
      }
    }
  }

  addGasto(novoGasto: GastoPayload): void {
    const user = this.authService.currentUser();
    if (!user) {
      this.apiError.set('Usuário não autenticado.');
      return;
    }

    const body = {
      nome: novoGasto.nome,
      descricao: novoGasto.descricao,
      valor: novoGasto.valor,
      categoriaId: novoGasto.categoriaId,
      data: novoGasto.data,
      usuarioId: user.id
    };

    this.http.post<Gasto>('/api/gasto/create', body)
      .subscribe({
        next: (gastoCriadoPelaApi) => {
          this.gastos.update(gastosAtuais => [gastoCriadoPelaApi, ...gastosAtuais]);
        },
        error: (error) => {
          console.error('Erro ao adicionar gasto:', error);
          this.apiError.set('Falha ao adicionar gasto. Tente novamente.');
        }
      });
  }

  deleteGasto(id: number): void {
    const user = this.authService.currentUser();
    if (user) {
      this.http.delete(`/api/gasto/${id}`)
        .subscribe({
          next: () => {
            this.gastos.update(existing => existing.filter(gasto => gasto.id !== id));
            this.loadGastos(this.currentPage());
          },
          error: (error) => {
            console.error('Erro ao deletar gasto:', error);
            this.apiError.set('Falha ao deletar gasto. Tente novamente.');
          }
        });
    }
  }

  updateGasto(gasto: Gasto): void {
    const user = this.authService.currentUser();
    if (user) {
      this.http.put<Gasto>(`/api/gasto/${gasto.id}`, { ...gasto, usuarioId: user.id })
        .subscribe({
          next: (gasto) => {
            this.gastos.update(existing => existing.map(g => g.id === gasto.id ? gasto : g));
            this.loadGastos(this.currentPage());
          },
          error: (error) => {
            console.error('Erro ao atualizar gasto:', error);
            this.apiError.set('Falha ao atualizar gasto. Tente novamente.');
          }
        });
    }
  }
  createGasto(gastoPayload: GastoPayload): Observable<Gasto> {
    this.isLoading.set(true);
    // Associa o ID do usuário logado ao novo gasto
    const userId = this.authService.userId();
    if (!userId) {
      const errorMsg = 'Usuário não autenticado.';
      this.apiError.set(errorMsg);
      this.isLoading.set(false);
      return throwError(() => new Error(errorMsg));
    }
    const gastoCompleto = { ...gastoPayload, usuarioId: userId };

    return this.http.post<Gasto>('/api/gasto/create', gastoCompleto).pipe(
      tap(novoGasto => {
        this._gastos.update(gastosAtuais => [novoGasto, ...gastosAtuais]);
        this.isLoading.set(false);
      }),
      catchError(err => this.handleError(err, 'Falha ao criar o gasto.'))
    );
  }

  fetchGastos(page: number): void {
    if (this.isLoading()) return;
    this.isLoading.set(true);
    this.apiError.set(null);
    const size = 10;

    this.http.get<Page<Gasto>>(`/api/gasto/find-by-filter?page=${page}&size=${size}`)
      .pipe(
        tap(response => {
          if (page === 0) {
            this._gastos.set(response.content);
          } else {
            this._gastos.update(existing => [...existing, ...response.content]);
          }
          this.currentPage.set(page);
          this.totalPages.set(response.totalPages);
          this.isLoading.set(false);
        }),
        catchError(err => this.handleError(err, 'Falha ao buscar gastos.'))
      ).subscribe();
  }
  private resetState(): void {
    this.gastos.set([]);
    this.currentPage.set(0);
    this.totalPages.set(0);
    this.totalGastos.set(0);
    this.isLoading.set(false);
    this.apiError.set(null);
  }
  private handleError(error: HttpErrorResponse, defaultMessage: string): Observable<never> {
    console.error(defaultMessage, error);
    this.apiError.set(defaultMessage);
    this.isLoading.set(false);
    return throwError(() => new Error(defaultMessage));
  }
}