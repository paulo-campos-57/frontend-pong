import { useState, useEffect, useCallback, useRef } from 'react';
import io from 'socket.io-client';

const SOCKET_SERVER_URL = 'https://backend-pong.onrender.com';

export const useSocket = () => {
    const socketRef = useRef(null);
    const [socket, setSocket] = useState(null);

    const [gameState, setGameState] = useState(null);
    const [log, setLog] = useState([]);
    const [isConnecting, setIsConnecting] = useState(true);
    const [connectionError, setConnectionError] = useState(null);
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        if (socketRef.current) return;

        console.log(`[Socket] Iniciando conexão...`);
        setIsConnecting(true);
        setConnectionError(null);

        const newSocket = io(SOCKET_SERVER_URL, {
            transports: ['websocket', 'polling'],
            reconnection: true,
            reconnectionAttempts: 5,
            reconnectionDelay: 1000,
            timeout: 20000
        });

        socketRef.current = newSocket;
        setSocket(newSocket);

        newSocket.on('connect', () => {
            console.log(`[Socket] Conectado! ID: ${newSocket.id}`);
            setIsConnecting(false);
            setIsConnected(true);
            setConnectionError(null);
        });

        newSocket.on('connect_error', (err) => {
            console.error(`[Socket] Erro de conexão:`, err);
            setIsConnecting(false);
            setIsConnected(false);
            setConnectionError(`Não foi possível conectar ao servidor. Verifique se o backend está rodando.`);
        });

        newSocket.on('disconnect', (reason) => {
            console.log(`[Socket] Desconectado. Razão: ${reason}`);
            setIsConnected(false);
            if (reason === 'io server disconnect') {
                newSocket.connect();
            }
        });

        newSocket.on('reconnect_attempt', (attemptNumber) => {
            console.log(`[Socket] Tentativa de reconexão #${attemptNumber}`);
            setIsConnecting(true);
        });

        newSocket.on('game_state', (state) => {
            console.log('[Socket] Estado do jogo recebido');
            setGameState(state);
        });

        newSocket.on('game_log', (message) => {
            console.log('[Socket] Log:', message);
            setLog(prevLog => [message, ...prevLog].slice(0, 10));
        });

        newSocket.on('game_error', (message) => {
            console.error('[Socket] Erro do jogo:', message);
            setLog(prevLog => [`[ERRO] ${message}`, ...prevLog]);
        });

        newSocket.on('game_created', (data) => {
            console.log('[Socket] Jogo criado:', data);
            setLog(prevLog => [`Jogo ${data.gameId} criado!`, ...prevLog]);
        });

        newSocket.on('game_joined', (data) => {
            console.log('[Socket] Entrou no jogo:', data);
            setLog(prevLog => [`Entrou no jogo ${data.gameId}!`, ...prevLog]);
        });

        newSocket.on('game_over', (data) => {
            console.log('[Socket] Jogo finalizado:', data);
            setLog(prevLog => [`Jogo finalizado! Vencedor: ${data.winner}`, ...prevLog]);
        });

        return () => {
            console.log(`[Socket] Limpando conexão...`);
            if (socketRef.current) {
                socketRef.current.removeAllListeners();
                socketRef.current.disconnect();
                socketRef.current = null;
                setSocket(null);
            }
        };
    }, []);

    const emitEvent = useCallback((eventName, data) => {
        if (socketRef.current && socketRef.current.connected) {
            console.log(`[Socket] Emitindo ${eventName}:`, data);
            socketRef.current.emit(eventName, data);
        } else {
            console.error(`[Socket] Não foi possível emitir ${eventName}: Socket não conectado`);
        }
    }, []);

    const createGame = useCallback((playerName, maxScore) => {
        emitEvent('create_game', { playerName, maxScore: parseInt(maxScore) });
    }, [emitEvent]);

    const joinGame = useCallback((playerName, gameId) => {
        emitEvent('join_game', { playerName, gameId });
    }, [emitEvent]);

    return {
        gameState,
        log,
        isConnecting,
        isConnected,
        connectionError,
        emitEvent,
        createGame,
        joinGame,
        socket: socketRef.current
    };
};