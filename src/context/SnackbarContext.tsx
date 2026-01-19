/**
 * Snackbar Context
 * Provides centralized snackbar state management across the app
 */

import React, { createContext, useContext, useState, ReactNode } from 'react';

export type SnackbarPriority = 'success' | 'error' | 'warning' | 'info';

interface SnackbarState {
    isVisible: boolean;
    message: string;
    priority: SnackbarPriority;
}

interface SnackbarContextType {
    snackbarState: SnackbarState;
    showSnackbar: (message: string, priority: SnackbarPriority) => void;
    hideSnackbar: () => void;
}

const SnackbarContext = createContext<SnackbarContextType | undefined>(undefined);

export const SnackbarProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [snackbarState, setSnackbarState] = useState<SnackbarState>({
        isVisible: false,
        message: '',
        priority: 'info',
    });

    const showSnackbar = (message: string, priority: SnackbarPriority = 'info') => {
        setSnackbarState({
            isVisible: true,
            message,
            priority,
        });
    };

    const hideSnackbar = () => {
        setSnackbarState({
            isVisible: false,
            message: '',
            priority: 'info',
        });
    };

    return (
        <SnackbarContext.Provider value={{ snackbarState, showSnackbar, hideSnackbar }}>
            {children}
        </SnackbarContext.Provider>
    );
};

export const useSnackbar = () => {
    const context = useContext(SnackbarContext);
    if (context === undefined) {
        throw new Error('useSnackbar must be used within a SnackbarProvider');
    }
    return context;
};
