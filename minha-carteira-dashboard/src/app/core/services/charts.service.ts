import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PageVWGastosMensaisPorCategoriaResponseDTO } from '../models';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = 'http://localhost:8083/api'; // Altere para a URL da sua API

  constructor(private http: HttpClient) { }

  getGastosMensais(
    // Parâmetros para o filtro
    categoria?: string,
    ano?: number,
    mes?: number,
    usuarioId?: number
  ): Observable<PageVWGastosMensaisPorCategoriaResponseDTO> {
    let params = new HttpParams();
    if (categoria) {
      params = params.append('categoria', categoria);
    }
    if (ano) {
      params = params.append('ano', ano.toString());
    }
    if (mes) {
      params = params.append('mes', mes.toString());
    }
    if (usuarioId) {
      params = params.append('usuarioId', usuarioId.toString());
    }

    return this.http.get<PageVWGastosMensaisPorCategoriaResponseDTO>(
      `${this.apiUrl}/vw-gastos-mensais/find-by-filter`,
      { params }
    );
  }

  // Você pode adicionar aqui os outros métodos para os demais endpoints...
}