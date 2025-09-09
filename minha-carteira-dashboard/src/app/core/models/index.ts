export interface Gasto {
  id: number;
  nome: string;
  valor: number;
  data: string;
  descricao: string;
  dataCriacao: string;
  categoriaId: number;
  usuarioId: number;
  categoriaNome?: string
}

export interface User {
  id: number;
  nome: string;
  email: string;
}

export interface Page<T> {
  content: T[];
  totalPages: number;
  number: number;
}

export interface Categoria {
  id: number;
  nome: string;
  descricao: string;
  icone: string;
  cor: string;
}
