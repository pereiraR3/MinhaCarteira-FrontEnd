import { Injectable, signal, inject, effect } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, catchError, of, Observable } from 'rxjs';
import { Categoria, Page } from '../models';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  private http = inject(HttpClient);
  private authService = inject(AuthService);

  openSelect = signal(false);
  categorias = signal<Categoria[]>([]);
  currentPage = signal(0);
  totalPages = signal(0);
  isLoading = signal(false);
  apiError = signal<string | null>(null);

 constructor() {
    const user = this.authService.currentUser();

     effect(() => {
        if (this.openSelect() && this.categorias().length <= 1) {
          console.log('Condições atendidas, buscando categorias...');
          this.fetchCategorias(0);
        }
    });
  }

  /**
   * Carrega a lista inicial de categorias.
   * Este método deve ser chamado pelo AuthService após o login.
   */
  loadInitialCategorias(): void {
    const user = this.authService.currentUser();
    if (user) {
      this.fetchCategorias(0);
    }
  }

  /**
   * Busca uma única categoria pelo ID.
   * @param id O ID da categoria a ser encontrada.
   * @returns Um Observable com a categoria correspondente.
   */
  getCategoriaById(id: number): Observable<Categoria> {
    return this.http.get<Categoria>(`/api/categoria/${id}`).pipe(
      catchError(error => {
        this.handleError('Falha ao buscar a categoria.');
        throw new Error('Categoria não encontrada');
      })
    );
  }

  /**
   * Busca a próxima página de categorias.
   */
  loadMoreCategorias(): void {
    const nextPage = this.currentPage() + 1;
    if (nextPage < this.totalPages()) {
        this.fetchCategorias(nextPage);
    }
  }

  /**
   * Limpa o estado do serviço.
   * Deve ser chamado pelo AuthService durante o processo de logout.
   */
  resetState(): void {
    this.categorias.set([]);
    this.currentPage.set(0);
    this.totalPages.set(0);
    this.isLoading.set(false);
    this.apiError.set(null);
  }

  /**
   * Método central para buscar categorias da API de forma paginada.
   * @param page O número da página a ser buscada.
   */
  private fetchCategorias(page: number): void {
    if (this.isLoading()) return;

    this.isLoading.set(true);
    this.apiError.set(null);
    const size = 10;

    this.http.get<Page<Categoria>>(`/api/categoria/find-by-filter?page=${page}&size=${size}`)
      .pipe(
        tap(response => {
          if (!response) return;

          if (page === 0) {
            this.categorias.set(response.content);
          } else {
            this.categorias.update(existing => [...existing, ...response.content]);
          }

          this.currentPage.set(page);
          this.totalPages.set(response.totalPages);
          this.isLoading.set(false);
        }),
        catchError(error => {
          this.handleError('Falha ao carregar as categorias.');
          return of(null);
        })
      ).subscribe();
  }

  /**
   * Centraliza o tratamento de erros.
   * @param message A mensagem de erro a ser exibida para o usuário.
   */
  private handleError(message: string): void {
    console.error(message);
    this.apiError.set(message);
    this.isLoading.set(false);
  }
}

