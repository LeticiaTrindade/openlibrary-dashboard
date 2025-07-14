# 📚 Dashboard de Livros - OpenLibrary

Projeto de dashboard que consome a API da OpenLibrary para **listar, pesquisar e explorar livros** de forma prática, limpa e responsiva.

---

## ✨ Visão Geral

O projeto permite:
- Pesquisar livros utilizando a API da OpenLibrary.
- Visualizar dados relevantes dos livros (capa, autor, ano).
- Interface responsiva utilizando Material-UI.
- Código organizado, componentizado e de fácil manutenção.

---

## 🚀 Tecnologias

- **React 19.x**
- **Material-UI 7.x**
- **Axios**
- **Lodash.debounce** (para otimização de requisições de busca)
- **CSS Modules** (ou `App.css` global, conforme necessidade)

---

## ⚙️ Instalação

1️⃣ Clone o repositório:
git clone https://github.com/leticiatrindade/openlibrary-dashboard.git

2️⃣ Instale as dependências:
bash
Copiar
Editar
npm install

3️⃣ Inicie o projeto:
Copiar
Editar
npm start

---

## 📜 Scripts Disponíveis

npm start: Inicia o projeto em modo de desenvolvimento.

npm run build: Gera o build de produção otimizado.

## 🛠️ Decisões Técnicas
Material-UI para rápida prototipagem e responsividade.

Axios para requisições HTTP pela simplicidade e controle de interceptadores.

Estrutura de componentização clara para reuso e manutenção.

Uso de hooks personalizados (useBooks) para controle de estado e separação de responsabilidades.

Debounce no campo de pesquisa para evitar requisições excessivas.

Separação de camadas de serviços para facilitar a manutenção.

## 📈 Próximos Passos
Com mais tempo, as seguintes funcionalidades seriam implementadas:

### ✅ Favoritos

Sistema de favoritos utilizando localStorage.

Persistência entre sessões.

Contador de livros favoritados.

### ✅ Visualização de Dados (Diferencial)
Implementar gráficos usando Chart.js ou D3.js, como:

Distribuição de livros por década.

Top 10 autores mais encontrados.

Gráfico de barras com anos de publicação.

### ✅ Testes Unitários

Implementar pelo menos 3 testes usando React Testing Library e Jest, garantindo estabilidade de componentes críticos.

### ✅ Storybook

Documentar pelo menos 1 componente com Storybook para facilitar o design system.