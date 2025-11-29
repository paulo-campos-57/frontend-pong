import React, { createContext, useContext } from 'react';
import { useSocket } from '../hooks/useSocket';

const SocketContext = createContext(null);

export const SocketProvider = ({ children }) => {
    const socket = useSocket();
    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    );
};

export const useSocketContext = () => {
    const context = useContext(SocketContext);
    if (!context) {
        throw new Error('useSocketContext deve ser usado dentro de SocketProvider');
    }
    return context;
};