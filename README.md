# Explora Trip — Front-End  
O **Explora Trip** é um aplicativo Web que visa facilitar a vida dos exploradores e aventureiros, com uma solução integrada para organizar as viagens centralizando informações essenciais como **roteiro, orçamento e locais para visitar**! Além disso, é possível **incluir participantes** nas viagens, permitindo o planejamento colaborativo com **amigos e família**.

---

### 🚀 Funcionalidades  
#### Projeto em Desenvolvimento — nem todas as funcionalidades estão concluídas ainda!

#### 🧑‍💼 Usuários  
- Cadastro e login de usuários  
- Validação de formulários e feedback visual de erros  
- Edição de perfil do usuário  
- Logout e persistência de sessão  

#### 🌍 Viagens  
- Listagem de viagens do usuário  
- Criação, edição e exclusão de viagens  
- Associação de orçamento à viagem  
- Adição de participantes com papéis (editor ou visualizador)  
- Visualização detalhada da viagem com seus locais e gastos  

#### 📍 Locais das viagens  
- CRUD completo de locais associados a uma viagem  
- Campos de descrição, valor estimado, data/hora e tipo (passeio, refeição etc.)  
- Filtros e busca de locais por tags (ex: restaurante, passeio, praia)  
- Atualização dinâmica do orçamento da viagem com base nos locais adicionados  

---

### 🧩 Arquitetura  

<img width="1651" height="1351" alt="Arquitetura ExploraTrip Front" src="https://github.com/user-attachments/assets/7bd5053f-8aad-493b-a0a9-d60ba0e00196" />

A arquitetura do front-end segue princípios de **modularização e separação de responsabilidades**, buscando escalabilidade e manutenibilidade a longo prazo.

1. **Components:**  
   Componentes reutilizáveis e desacoplados, organizados por contexto e função.  

2. **Pages / Views:**  
   Páginas que representam as rotas principais da aplicação, compostas por múltiplos componentes.  

3. **Hooks / Contexts:**  
   Controle de estado global (autenticação, tema, viagens, etc.) e hooks customizados para manipulação de dados e efeitos colaterais.  

4. **Services (API Layer):**  
   Responsável pela comunicação com o back-end via HTTP, abstraindo chamadas e tratamento de erros com interceptors e tipagem segura.  

5. **Routes:**  
   Sistema de rotas protegido, garantindo acesso apenas a usuários autenticados nas áreas restritas.  

6. **Utils / Types:**  
   Funções utilitárias e tipagens TypeScript para manter o código padronizado e seguro.  

---

### 🧠 Tecnologias  
- **Next.js** (framework React com SSR e otimização automática)  
- **TypeScript** (tipagem estática e segurança em tempo de desenvolvimento)  
- **SCSS / CSS Modules** (estilização modular e manutenção simplificada)  
- **React Hook Form** (manipulação de formulários e validação)  
- **ESLint + Prettier** (padrões de código e formatação consistente)  

---

### 🔗 Integração com o Back-End  
O front-end se comunica com a **API ASP.NET** hospedada em container Docker.  
As respostas seguem o **Result Pattern**, padronizando mensagens de sucesso e erro no consumo da API.

---

### 📦 Instalação e Execução  

```bash
# Clone o repositório
git clone https://github.com/Vinicius-Rodriguess/exploraTrip-front.git

# Acesse o diretório
cd exploraTrip-front

# Instale as dependências
npm install

# Crie um arquivo .env com as variáveis necessárias
# Exemplo:
# NEXT_PUBLIC_API_URL=http://localhost:8080

# Execute o projeto em modo de desenvolvimento
npm run dev
