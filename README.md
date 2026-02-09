# 🚀 Task List Project - Full Stack

Esta é uma aplicação completa para gerenciamento de tarefas, desenvolvida como um desafio técnico. O projeto foca em uma arquitetura moderna, escalável e com funcionalidades que vão além dos requisitos básicos, como exclusão lógica e paginação de dados.

🔗 **Repositório do Projeto:** [https://github.com/Jessicakgs/fullstack1](https://github.com/Jessicakgs/fullstack1)

---

## 🛠 Stack Utilizada

### **Backend**

- **Java 21 (LTS)**
- **Spring Boot 3**
- **Spring Data JPA**
- **PostgreSQL:** Banco de dados relacional para persistência robusta.
- **Bean Validation:** Validação rigorosa de dados de entrada.
- **Maven:** Gerenciamento de dependências.

### **Frontend**

- **React (TypeScript)**
- **Vite:** Build system ultra-rápido.
- **Material UI (MUI):** Design system para uma interface profissional e responsiva.
- **TanStack Query (React Query):** Sincronização de estado do servidor e cache eficiente.
- **Axios:** Cliente HTTP.

---

## 📂 Estrutura de Pastas

O projeto utiliza uma estrutura clara e padronizada para facilitar a manutenção:

### **[Backend]** `jtech-tasklist-backend/demo`

- `config`: Configurações globais (CORS, Beans).
- `controller`: Endpoints REST da API.
- `service`: Camada de lógica de negócio (onde residem as regras de Soft Delete e Paginação).
- `repository`: Abstração de acesso ao banco de dados.
- `domain`: Entidades que representam o modelo de dados.
- `dto`: Objetos de transferência para segurança e performance.

### **[Frontend]** `jtech-tasklist-frontend/front`

- `api`: Serviços de comunicação com o backend.
- `components`: Componentes reutilizáveis da interface.
- `hooks`: Lógica extraída e integração com TanStack Query.
- `assets`: Estilos e recursos estáticos.

---

## ⚙️ Como Rodar Localmente

### **Pré-requisitos**

- JDK 21 instalado.
- Node.js (versão 18 ou superior).
- PostgreSQL ativo ou Docker instalado.

### **Passo a Passo**

1.  **Clone o repositório:**

    ```bash
    git clone [https://github.com/Jessicakgs/fullstack1.git](https://github.com/Jessicakgs/fullstack1.git)
    ```

2.  **Configurar e Rodar o Backend:**
    O projeto inclui um arquivo `docker-compose.yml` para facilitar a subida do banco de dados.

    ```bash
    cd jtech-tasklist-backend/demo
    docker-compose up -d # Para subir o banco PostgreSQL
    ./mvnw spring-boot:run
    ```

    A API estará em: `http://localhost:8080`

3.  **Configurar e Rodar o Frontend:**
    ```bash
    cd jtech-tasklist-frontend/front
    npm install # ou yarn install
    npm run dev # ou yarn dev
    ```
    O frontend estará em: `http://localhost:5173`

---

## 🧪 Como Rodar os Testes

Para garantir que as regras de negócio estão íntegras:

**Backend:**

```bash
./mvnw test
```

## 🧠 Decisões Técnicas & Diferenciais

- **Java 21:** Utilização da versão LTS mais recente para aproveitar as melhorias de performance e sintaxe.
- **PostgreSQL:** Escolhido como banco de dados principal para simular um ambiente de produção real e persistência duradoura.
- **Soft Delete (Exclusão Lógica):** Implementado para garantir a integridade dos dados e permitir a recuperação de informações, mantendo um histórico no banco sem remover fisicamente o registro. (**Feature extra**).
- **Paginação de Dados:** Implementada nos endpoints de listagem para garantir que a aplicação continue performática mesmo com grandes volumes de tarefas. (**Feature extra**).
- **TanStack Query:** Utilizado para gerenciar estados assíncronos, proporcionando uma experiência de usuário sem "loaders" excessivos através do cache inteligente.
- **DTO Pattern:** Utilizado para desvincular o modelo de banco de dados da camada de visualização, garantindo que apenas os dados necessários sejam trafegados.

---

## 🚀 Melhorias Futuras

- **Autenticação e Autorização:** Implementar Spring Security com JWT para proteção de rotas.
- **Testes E2E:** Adicionar testes de ponta a ponta com Cypress no frontend.
- **Documentação:** Integrar Swagger/OpenAPI para facilitar o consumo da API por terceiros.

---

Feito com ❤️ por Jessica
