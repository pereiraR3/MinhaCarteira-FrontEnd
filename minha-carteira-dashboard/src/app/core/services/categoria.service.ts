import { Injectable, signal, inject, effect } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { tap, catchError, of, Observable } from 'rxjs';
import { Categoria, Page } from '../models';
import { AuthService } from './auth.service';
import { shareReplay } from 'rxjs/operators';
import { expand, map, reduce  } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  private http = inject(HttpClient);
  private authService = inject(AuthService);
  private readonly PAGE_SIZE = 20;

  openSelect = signal(false);
  categorias = signal<Categoria[]>([]);
  currentPage = signal(0);
  totalPages = signal(0);
  isLoading = signal(false);
  apiError = signal<string | null>(null);

  constructor() {
    // Este effect agora reage à abertura do select para carregar os dados,
    // mas apenas se a lista de categorias estiver vazia.
    effect(() => {
      // A condição foi ajustada para buscar apenas quando a lista está vazia.
      // Isso quebra o loop infinito.
      if (this.openSelect() && this.categorias().length === 0 && !this.isLoading()) {
        this.fetchCategorias(0);
      }
    });

    // Um segundo effect para reagir ao login/logout
    effect(() => {
      if (this.authService.isAuthenticated()) {
        // Se quiser carregar as categorias logo após o login, pode chamar aqui
        // this.loadInitialCategorias();
      } else {
        // Limpa o estado quando o usuário faz logout
        this.resetState();
      }
    })
  }
  private fetchCategoriasByPage(page: number): Observable<Page<Categoria>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', this.PAGE_SIZE.toString());

    return this.http.get<Page<Categoria>>(`/api/categoria/find-by-filter`, { params });
  }
  /**
   * Carrega a lista inicial de categorias, se ainda não tiver sido carregada.
   */
  loadInitialCategorias(): void {
    if (this.authService.currentUser() && this.categorias().length === 0) {
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
        // Lançar o erro é melhor para o chamador poder tratar.
        throw new Error(`Categoria com id ${id} não encontrada`);
      })
    );
  }


  public getCategorias(): Observable<Categoria[]> {
    return this.categorias$;
  }

  /**
   * Busca a próxima página de categorias.
   */
  loadMoreCategorias(): void {
    const nextPage = this.currentPage() + 1;
    if (nextPage < this.totalPages() && !this.isLoading()) { // Adicionado !isLoading()
      this.fetchCategorias(nextPage);
    }
  }

  /**
   * Limpa o estado do serviço.
   */
  resetState(): void {
    this.categorias.set([]);
    this.currentPage.set(0);
    this.totalPages.set(0);
    this.isLoading.set(false);
    this.apiError.set(null);
    this.openSelect.set(false);
  }


  private categorias$ = this.fetchCategoriasByPage(0).pipe(
    // 1. O operador 'expand' busca as páginas em sequência.
    // Ele recebe a resposta da página anterior e decide se busca a próxima.
    expand(response => {
      const nextPage = response.number + 1;
      if (nextPage < response.totalPages) {
        return this.fetchCategoriasByPage(nextPage);
      } else {
        // Quando não há mais páginas, retorna EMPTY para parar a recursão.
        return of();
      }
    }),
    // 2. O operador 'map' extrai apenas o array 'content' de cada resposta de página.
    map(response => response.content),
    // 3. O operador 'reduce' acumula o 'content' de cada página em um único array.
    reduce((acc, content) => [...acc, ...content], [] as Categoria[]),
    // 4. shareReplay(1) armazena o array final e completo em cache.
    shareReplay(1),
    
  );
  /**
   * Método central para buscar categorias da API de forma paginada.
   * @param page O número da página a ser buscada.
   */
  private fetchCategorias(page: number): void {
    if (this.isLoading()) return;

    this.isLoading.set(true);
    this.apiError.set(null);
    const size = 10;

    // Usando HttpParams para construir a URL de forma mais segura
    const params = { page: page.toString(), size: size.toString() };

    this.http.get<Page<Categoria>>(`/api/categoria/find-by-filter`, { params })
      .pipe(
        tap(response => {
          if (!response || !response.content) {
            this.isLoading.set(false);
            return;
          };

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
