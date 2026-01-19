/**
 * Snackbar Component
 * A notification toast with different types
 */

import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Animated, TouchableOpacity } from 'react-native';
import { SnackbarProps, SnackbarType } from '../../../types';
import { COLORS } from '../../../tokens/colors';
import { SPACING, BORDER_RADIUS } from '../../../tokens/spacing';
import { FONT_SIZE, FONT_WEIGHT } from '../../../tokens/typography';

const TYPE_STYLES: Record<SnackbarType, { backgroundColor: string; textColor: string }> = {
    success: {
        backgroundColor: COLORS.success,
        textColor: COLORS.white,
    },
    error: {
        backgroundColor: COLORS.error,
        textColor: COLORS.white,
    },
    warning: {
        backgroundColor: COLORS.warning,
        textColor: COLORS.black,
    },
    info: {
        backgroundColor: COLORS.info,
        textColor: COLORS.white,
    },
};

export const Snackbar: React.FC<SnackbarProps> = ({
    visible,
    message,
    type = 'info',
    duration = 3000,
    onDismiss,
    action,
    containerStyle,
    textStyle,
}) => {
    const [fadeAnim] = useState(new Animated.Value(0));
    const [isVisible, setIsVisible] = useState(visible);

    useEffect(() => {
        if (visible) {
            setIsVisible(true);
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true,
            }).start();

            if (duration > 0) {
                const timer = setTimeout(() => {
                    handleDismiss();
                }, duration);
                return () => clearTimeout(timer);
            }
        } else {
            handleDismiss();
        }
    }, [visible]);

    const handleDismiss = () => {
        Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
        }).start(() => {
            setIsVisible(false);
            onDismiss?.();
        });
    };

    if (!isVisible) return null;

    const typeStyle = TYPE_STYLES[type];

    return (
        <Animated.View
            style={[
                styles.container,
                { backgroundColor: typeStyle.backgroundColor, opacity: fadeAnim },
                containerStyle,
            ]}
        >
            <Text style={[styles.message, { color: typeStyle.textColor }, textStyle]} numberOfLines={2}>
                {message}
            </Text>
            {action && (
                <TouchableOpacity onPress={action.onPress} style={styles.actionButton}>
                    <Text style={[styles.actionText, { color: typeStyle.textColor }]}>{action.label}</Text>
                </TouchableOpacity>
            )}
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: SPACING.xxl,
        left: SPACING.lg,
        right: SPACING.lg,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: SPACING.md,
        paddingHorizontal: SPACING.lg,
        borderRadius: BORDER_RADIUS.md,
        zIndex: 9999,
        elevation: 6,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
    },
    message: {
        flex: 1,
        fontSize: FONT_SIZE.sm,
        fontWeight: FONT_WEIGHT.regular,
    },
    actionButton: {
        marginLeft: SPACING.md,
        paddingHorizontal: SPACING.sm,
        paddingVertical: SPACING.xs,
    },
    actionText: {
        fontSize: FONT_SIZE.sm,
        fontWeight: FONT_WEIGHT.bold,
        textTransform: 'uppercase',
    },
});

export default Snackbar;
