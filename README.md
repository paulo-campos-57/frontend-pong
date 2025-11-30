<div align="center">
  <h1>
    <img src="https://skillicons.dev/icons?i=react,vite,javascript,css" /><br>Pong Multiplayer - Frontend
  </h1>
</div>

Frontend para jogo Pong multiplayer em tempo real usando React, Socket.IO Client e Vite.

[![React](https://img.shields.io/badge/React-18.x-blue.svg)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.x-purple.svg)](https://vitejs.dev/)
[![Socket.IO Client](https://img.shields.io/badge/Socket.IO_Client-4.6.1-blue.svg)](https://socket.io/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Sobre

Este é o cliente frontend que permite jogar Pong multiplayer em tempo real. Interface interativa onde dois jogadores em diferentes computadores podem jogar juntos através de WebSockets.

### Funcionalidades

- Interface intuitiva para criar e entrar em partidas
- Renderização do jogo em canvas HTML5
- Controles responsivos em tempo real
- Placar ao vivo e log de eventos
- Efeitos visuais neon estilizados
- Reconexão automática ao servidor
- Sistema de navegação com React Router

## Deploy

O frontend está hospedado na Vercel:

**URL de Produção:** `https://frontend-pong.vercel.app`

## Tecnologias

- **React** - Biblioteca para interfaces
- **Vite** - Build tool e dev server
- **Socket.IO Client** - WebSocket para comunicação em tempo real
- **React Router** - Navegação entre páginas
- **CSS3** - Estilização com efeitos neon

## Instalação Local

### Pré-requisitos

- Node.js 18.x ou superior
- npm ou yarn
- Backend rodando (veja [backend-pong](https://github.com/paulo-campos-57/backend-pong))

### Passos

1. Clone o repositório:
```bash
git clone https://github.com/paulo-campos-57/frontend-pong.git
cd frontend-pong
```

2. Instale as dependências:
```bash
npm install
```

3. Configure a URL do backend:

Edite o arquivo `src/hooks/useSocket.js`:
```javascript
const SOCKET_SERVER_URL = 'http://localhost:4000'; // Para desenvolvimento local
// ou
const SOCKET_SERVER_URL = 'https://backend-pong.onrender.com'; // Para produção
```

4. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

5. Acesse:
- **Aplicação:** `http://localhost:5173`

## Como Jogar

### Criando uma Partida

1. Acesse a página inicial
2. Digite seu nome
3. Escolha a pontuação máxima (ex: 5, 10, 15)
4. Clique em **"Criar Jogo"**
5. Compartilhe o **ID do Jogo** com outro jogador

### Entrando em uma Partida

1. Acesse a página inicial
2. Digite seu nome
3. Insira o **ID do Jogo** fornecido
4. Clique em **"Entrar no Jogo"**

### Controles

- **Jogador 1 (esquerda):**
  - `W` - Mover para cima
  - `S` - Mover para baixo

- **Jogador 2 (direita):**
  - `↑` - Mover para cima
  - `↓` - Mover para baixo

## Componentes Principais

### `useSocket` (Hook)
Gerencia a conexão WebSocket com o backend.

**Retorna:**
```javascript
{
  gameState,      // Estado atual do jogo
  log,            // Array de eventos
  isConnecting,   // Status de conexão
  isConnected,    // Conectado?
  connectionError,// Erros de conexão
  emitEvent,      // Emitir evento genérico
  createGame,     // Criar partida
  joinGame,       // Entrar em partida
  socket          // Instância do socket
}
```

### `GameCanvas`
Renderiza o jogo usando Canvas API.

**Props:**
- `gameState` - Estado do jogo do servidor

### `GameLobby`
Interface para criar ou entrar em partidas.

**Props:**
- `setPlayerRole` - Define papel do jogador (player1/player2)
- `setGameId` - Define ID da partida

### `Scoreboard`
Exibe placar e status da partida.

**Props:**
- `gameState` - Estado do jogo
- `playerRole` - Papel do jogador local

### `EventLog`
Mostra log de eventos em tempo real.

**Props:**
- `log` - Array de mensagens

## Eventos Socket.IO

O frontend consome os seguintes eventos do servidor:

| Evento | Descrição |
|--------|-----------|
| `game_created` | Jogo criado com sucesso |
| `game_joined` | Entrada no jogo confirmada |
| `game_state` | Atualização do estado (60 FPS) |
| `game_log` | Mensagens de log |
| `game_error` | Erros do servidor |
| `game_over` | Fim da partida |

## Configuração

### Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto:

```bash
VITE_SOCKET_SERVER_URL=https://backend-pong.onrender.com
```

Use no código:
```javascript
const SOCKET_SERVER_URL = import.meta.env.VITE_SOCKET_SERVER_URL;
```

### Build para Produção

```bash
npm run build
```

Os arquivos otimizados serão gerados em `dist/`.

## Scripts

```json
{
  "dev": "vite",                 // Desenvolvimento
  "build": "vite build",         // Produção
  "preview": "vite preview",     // Preview da build
  "lint": "eslint . --ext js,jsx" // Linting
}
```

## Troubleshooting

### Não conecta ao servidor
- Verifique se o backend está rodando
- Confirme a URL em `useSocket.js`
- Verifique o console do navegador para erros

### Partida não inicia
- Certifique-se de que ambos jogadores entraram
- Verifique se o `gameId` está correto
- Confira o log de eventos no painel lateral

### Input lag
- Verifique sua conexão com a internet
- O servidor pode estar hibernando (Render Free Tier)
- Aguarde alguns segundos para estabilizar

### Canvas não renderiza
- Limpe o cache do navegador
- Verifique se `gameState` está sendo recebido
- Abra o DevTools e veja erros no console

## Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## Desenvolvedores

- **Estela Lacerda** - [GitHub](https://github.com/EstelaLacerda)
- **Paulo Campos** - [GitHub](https://github.com/paulo-campos-57)

---

Este projeto utiliza o backend disponível no seguinte <a href='https://github.com/paulo-campos-57/backend-pong' target='_blank'>repositório</a>.
