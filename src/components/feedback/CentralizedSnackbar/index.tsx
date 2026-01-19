/**
 * Centralized Snackbar Component
 * Displays snackbar notifications based on global state
 */

import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { useSnackbar } from '../../../context/SnackbarContext';
import Snackbar from '../Snackbar';

const SNACKBAR_DURATION = 4000; // 4 seconds

export const CentralizedSnackbar: React.FC = () => {
    const { snackbarState, hideSnackbar } = useSnackbar();
    const { isVisible, message, priority } = snackbarState;

    useEffect(() => {
        if (isVisible) {
            const timer = setTimeout(() => {
                hideSnackbar();
            }, SNACKBAR_DURATION);
            return () => clearTimeout(timer);
        }
    }, [isVisible, hideSnackbar]);

    // Map priority to type
    const getSnackbarType = () => {
        switch (priority) {
            case 'success':
                return 'success';
            case 'error':
                return 'error';
            case 'warning':
                return 'warning';
            case 'info':
            default:
                return 'info';
        }
    };

    return (
        <View style={styles.container}>
            <Snackbar
                visible={isVisible}
                message={message}
                type={getSnackbarType()}
                duration={SNACKBAR_DURATION}
                onDismiss={hideSnackbar}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 9999,
    },
});

export default CentralizedSnackbar;
