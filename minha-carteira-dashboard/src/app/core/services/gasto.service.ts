import { Injectable, signal, inject, effect } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, catchError, of } from 'rxjs';
import { Gasto } from '../models';
import { Page } from '../models';
import { AuthService } from './auth.service';
import { GastoPayload } from '../../shared/ui/gasto-form/gasto-form.component';

@Injectable({
  providedIn: 'root'
})
export class GastoService {
  private http = inject(HttpClient);
  private authService = inject(AuthService);

  gastos = signal<Gasto[]>([]);
  changePage = signal(1);
  currentPage = signal(0);
  totalPages = signal(0);
  totalGastos = signal(0);
  isLoading = signal(false);
  apiError = signal<string | null>(null);

  private initialLoadDoneForUser: number | null = null;


constructor() {
    effect(() => {
      const userId = this.authService.userId();

      if (userId && userId !== this.initialLoadDoneForUser) {
        console.log(`Usuário com ID: ${userId} mudou. Carregando gastos...`);
        this.loadGastos(userId, 0);
        this.initialLoadDoneForUser = userId;
      } else if (!userId && this.initialLoadDoneForUser !== null) {
        console.log('Nenhum usuário. Limpando estado de gastos.');
        this.resetState();
        this.initialLoadDoneForUser = null;
      }
    });
  }

  loadGastos(usuarioId: number, page: number): void {
    if (this.isLoading()) return;

    this.isLoading.set(true);
    this.apiError.set(null);
    const size = 10;

    this.http.get<Page<Gasto>>(`/api/gasto/find-by-filter?usuarioId=${usuarioId}&page=${page}&size=${size}`)
      .pipe(
        tap(response => {
          if(!response) return;

          if (page === 0) {
            this.gastos.set(response.content);
          } else {
            this.gastos.update(existing => [...existing, ...response.content]);
          }
          this.currentPage.set(page);
          this.totalPages.set(response.totalPages);
          this.isLoading.set(false);
        }),
        catchError(error => {
          console.error('API Error:', error);
          this.apiError.set('Falha ao carregar os gastos. Tente novamente.');
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
        this.loadGastos(user.id, nextPage);
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
    if(user) {
      this.http.delete(`/api/gasto/${id}`)
        .subscribe({
          next: () => {
            this.gastos.update(existing => existing.filter(gasto => gasto.id !== id));
            this.loadGastos(user.id, 0);
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
    if(user) {
      this.http.put<Gasto>(`/api/gasto/${gasto.id}`, { ...gasto, usuarioId: user.id })
        .subscribe({
          next: (gasto) => {
            this.gastos.update(existing => existing.map(g => g.id === gasto.id ? gasto : g));
            this.loadGastos(user.id, 0);
          },
          error: (error) => {
            console.error('Erro ao atualizar gasto:', error);
            this.apiError.set('Falha ao atualizar gasto. Tente novamente.');
          }
        });
    }
  }

  private resetState(): void {
    this.gastos.set([]);
    this.currentPage.set(0);
    this.totalPages.set(0);
    this.totalGastos.set(0);
    this.isLoading.set(false);
    this.apiError.set(null);
  }
}