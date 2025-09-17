# MinhaCarteira - Front-End

## Visão Geral

Este é o projeto de **Front-End** do sistema distribuído "MinhaCarteira", desenvolvido para a disciplina de Sistemas Distribuídos. Esta aplicação é a interface web com a qual os usuários interagem, consumindo os dados dos serviços de back-end de leitura e escrita.

O sistema completo é composto por três partes:

-   **Back-End Write**: Responsável por operações de escrita (criação, atualização e deleção).
-   **Back-End Read**: Responsável por consultas, agregações e geração de relatórios.
-   **Front-End** (este repositório): Uma Single-Page Application (SPA) construída em Angular que consome as APIs dos dois back-ends, seguindo o padrão CQRS.

## Principais Funcionalidades

-   **Autenticação de Usuário**: Sistema de login seguro com tokens JWT e refresh tokens.
-   **Dashboard Principal**: Visualização centralizada dos gastos, com paginação e resumo financeiro.
-   **Gerenciamento de Gastos (CRUD)**:
    -   Adicionar, editar e excluir gastos através de modais interativos.
    -   Formulários reativos com validações em tempo real.
-   **Filtros Dinâmicos**: Filtragem de gastos por nome, período (data) e categoria.
-   **Visualização de Dados**: Rota dedicada para exibir gráficos e insights sobre os gastos.
-   **Geração de Relatórios**: Funcionalidade para solicitar e baixar relatórios mensais.

## Tecnologias Utilizadas

-   **Angular 17+**
-   **TypeScript**
-   **Tailwind CSS** para estilização
-   **Angular Signals** para gerenciamento de estado reativo e eficiente
-   **RxJS** para controle de fluxos de dados assíncronos (ex: `debounceTime` nos filtros)
-   **Chart.js** (ou similar) para a renderização de gráficos
-   **Angular CLI**

## Arquitetura do Front-End

A aplicação foi estruturada com foco em boas práticas e modularidade, utilizando os recursos mais modernos do Angular:

-   **Componentes Standalone**: A maioria dos componentes é autônoma, facilitando a reutilização e o gerenciamento de dependências.
-   **Gerenciamento de Estado Reativo**: O estado da aplicação (lista de gastos, categorias, estado de loading) é gerenciado em serviços (`GastoService`, `CategoriaService`) utilizando **Signals**, garantindo performance e uma UI sempre sincronizada.
-   **Injeção de Dependência com `inject()`**: Uso da função `inject()` para uma injeção de dependência mais limpa e flexível.
-   **Comunicação CQRS**:
    -   Todas as operações de **leitura** (GET) são direcionadas ao **Back-End Read**.
    -   Todas as operações de **escrita** (POST, PUT, DELETE) são direcionadas ao **Back-End Write**.

## Pré-requisitos

-   [Node.js](https://nodejs.org/) (versão 18 ou superior)
-   [Angular CLI](https://angular.io/cli) instalado globalmente (`npm install -g @angular/cli`)
-   Os dois serviços de **Back-End (Read e Write)** devem estar em execução.

## Como Executar Localmente

1.  **Clone o repositório:**
    ```sh
    git clone <URL_DO_SEU_REPOSITORIO_FRONTEND>
    cd <NOME_DA_PASTA>
    ```

2.  **Instale as dependências:**
    ```sh
    npm install
    ```

3.  **Configure o Ambiente:**
    Crie o arquivo `src/environments/environment.ts` e configure as URLs dos seus back-ends.

    *Exemplo de `environment.ts`:*
    ```typescript
    export const environment = {
      production: false,
      // URL do serviço que lida com login e operações de escrita
      writeApiUrl: 'http://localhost:8082/api', 

      // URL do serviço que lida com consultas e relatórios
      readApiUrl: 'http://localhost:8040/api'
    };
    ```

4.  **Execute a aplicação:**
    ```sh
    ng serve
    ```
    A aplicação estará disponível em `http://localhost:4200/`.

## Estrutura de Pastas

A estrutura principal do projeto segue o padrão do Angular:

-   `src/app/`
    -   `core/`: Contém a lógica central da aplicação.
        -   `models/`: Definições de tipos e interfaces (ex: `Gasto`, `Categoria`).
        -   `services/`: Serviços de estado e comunicação com a API (ex: `AuthService`, `GastoService`).
        -   `guards/`: Guards de rota para proteger páginas autenticadas.
    -   `features/`: Agrupa componentes "inteligentes" ou páginas completas.
        -   `dashboard/`: O componente principal do dashboard.
        -   `login/`: A página de login.
    -   `shared/` ou `ui/`: Agrupa componentes "burros" e reutilizáveis.
        -   `gasto-form/`: Formulário de criação/edição de gastos.
        -   `gasto-list/`: A lista que exibe os gastos.
        -   `modal/`: Componente genérico de modal.

## Integração com o Back-End

-   **Autenticação**: O fluxo de login (`/auth/authenticate`) e refresh de token (`/auth/refresh`) é direcionado ao **Back-End Write**. O token JWT obtido é armazenado e enviado em todas as requisições subsequentes.
-   **Leitura de Dados**: A busca por gastos, categorias e dados para relatórios (`GET /api/gasto`, `GET /api/categoria`) é feita no **Back-End Read**.
-   **Escrita de Dados**: A criação, atualização e exclusão de gastos (`POST`, `PUT`, `DELETE /api/gasto`) são enviadas para o **Back-End Write**.

---

Projeto desenvolvido para a disciplina de **Sistemas Distribuídos**.
**Desenvolvido por**: Vinícius P. Vieira, Anthony Ricardo e Alan Bruno.
