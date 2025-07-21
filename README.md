# 📚 Dashboard de Livros - OpenLibrary
## Visão Geral
Este projeto é um Dashboard de Livros desenvolvido com React e Material-UI, que consome a API pública da OpenLibrary.
A aplicação permite ao usuário pesquisar, listar, filtrar e visualizar detalhes de livros de forma dinâmica e responsiva, com recursos de paginação, filtros avançados e visualização gráfica.

## Deploy Online
✅ Acesse a aplicação online:
[https://leticiatrindade.github.io/openlibrary-dashboard](https://leticiatrindade.github.io/openlibrary-dashboard)

## Funcionalidades principais:

  * Listagem de livros em cards responsivos com título, autores, ano de publicação e capa (ou placeholder).

  * Campo de busca dinâmica com debounce de 500ms.

  * Paginação com botões de navegação e informações de página.

  * Detalhes do livro em modal com capa em tamanho médio, autores, ano, páginas e editora.

  * Filtros avançados por ano de publicação (slider), idioma e ordenação por relevância/data/título.

  * Visualização de dados com gráficos usando Chart.js.

  * Tratamento completo de estados: carregamento, erro, vazio e sucesso.

## Tecnologias
  * React 19.1.0

  * Material-UI

  * Axios

  * Chart.js (gráficos)

  * React Testing Library (planejado para testes unitários)

## Instalação
Clone o repositório e instale as dependências:

```
npm install
```
Inicie o ambiente de desenvolvimento:
```
npm start
```
A aplicação estará disponível em http://localhost:3000.

---
## Scripts Disponíveis
  * **npm start** — Inicia o projeto em modo desenvolvimento.

  * **npm test** — Executa testes unitários (a implementar).

  * **npm run build** — Gera o build de produção.

  * **npm run storybook** — Executa o Storybook (não implementado nesta versão).

## Decisões Técnicas
  * **Arquitetura modular:** o projeto segue uma estrutura de pastas clara e organizada (components/, hooks/, services/, pages/, utils/).

  * **Hooks customizados:** useBooks para requisição à API OpenLibrary, useDebounce para otimização de busca.

  * **Componentização:** componentes desacoplados para BookCard, BookModal, SearchBar, Loading, Pagination, AdvancedFilters e BookCharts.

  * **Responsividade:** grid com Material-UI e estilizações reativas para diferentes tamanhos de tela.

  * **API:** integração via Axios com tratamento de erros.

  * **Feedback ao usuário:** estados de loading, erro e vazio, com UX amigável.

  * **Visualização de Dados:** implementação de gráficos simples como diferencial técnico usando Chart.js.

## Próximos Passos
Caso fosse possível evoluir este projeto, as melhorias e extensões previstas seriam:

✅ **Filtros avançados por ano, idioma e ordenação**

✅ **Gráficos para visualização de dados**

🚧 **Testes unitários** com React Testing Library para validar renderização, busca e estados de carregamento/erro.

🚧 **Storybook** para documentação visual de componentes reutilizáveis.

🚧 **Sistema de favoritos** persistente usando **localStorage**.

🚧 **Histórico de buscas recentes** e **sugestões de busca**.

🚧 **Aprimorar acessibilidade** com navegação via teclado e suporte total a leitores de tela.

🚧 **Melhorias de responsividade** para dispositivos móveis e tablets.
