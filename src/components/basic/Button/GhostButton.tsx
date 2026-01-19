/**
 * Ghost Button Component
 * A text-only button with minimal styling
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { ButtonProps } from '../../../types';
import { COLORS } from '../../../tokens/colors';
import { SPACING, BORDER_RADIUS } from '../../../tokens/spacing';
import { FONT_SIZE, FONT_WEIGHT } from '../../../tokens/typography';

const SIZE_STYLES = {
    sm: {
        paddingVertical: SPACING.xs,
        paddingHorizontal: SPACING.md,
        fontSize: FONT_SIZE.sm,
    },
    md: {
        paddingVertical: SPACING.sm,
        paddingHorizontal: SPACING.lg,
        fontSize: FONT_SIZE.md,
    },
    lg: {
        paddingVertical: SPACING.md,
        paddingHorizontal: SPACING.xl,
        fontSize: FONT_SIZE.lg,
    },
};

export const GhostButton: React.FC<ButtonProps> = ({
    text = '',
    onPress,
    size = 'md',
    disabled = false,
    loading = false,
    leftIcon,
    rightIcon,
    containerStyle,
    buttonStyle,
    textStyle,
    shouldRender = true,
}) => {
    if (!shouldRender) return null;

    const sizeStyle = SIZE_STYLES[size];

    return (
        <View style={[styles.container, containerStyle]}>
            <TouchableOpacity
                onPress={onPress}
                disabled={disabled || loading}
                activeOpacity={0.7}
                style={[
                    styles.button,
                    {
                        paddingVertical: sizeStyle.paddingVertical,
                        paddingHorizontal: sizeStyle.paddingHorizontal,
                    },
                    buttonStyle,
                ]}
            >
                <View style={styles.contentRow}>
                    {loading ? (
                        <ActivityIndicator size="small" color={COLORS.primaryContainer} style={styles.loader} />
                    ) : (
                        <>
                            {leftIcon && <View style={styles.leftIcon}>{leftIcon}</View>}
                            <Text
                                style={[
                                    styles.text,
                                    { fontSize: sizeStyle.fontSize },
                                    disabled && styles.disabledText,
                                    textStyle,
                                ]}
                            >
                                {text}
                            </Text>
                            {rightIcon && <View style={styles.rightIcon}>{rightIcon}</View>}
                        </>
                    )}
                </View>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignSelf: 'center',
    },
    button: {
        borderRadius: BORDER_RADIUS.md,
        backgroundColor: 'transparent',
    },
    contentRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        color: COLORS.primaryContainer,
        fontWeight: FONT_WEIGHT.medium,
        textAlign: 'center',
    },
    disabledText: {
        color: COLORS.disabledText,
    },
    leftIcon: {
        marginRight: SPACING.sm,
    },
    rightIcon: {
        marginLeft: SPACING.sm,
    },
    loader: {
        marginRight: SPACING.sm,
    },
});

export default GhostButton;
