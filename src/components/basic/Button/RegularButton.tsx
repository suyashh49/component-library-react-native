/**
 * Regular Button Component
 * A filled button with customizable styling
 */

import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { Button } from 'react-native-paper';
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

export const RegularButton: React.FC<ButtonProps> = ({
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
    ...rest
}) => {
    if (!shouldRender) return null;

    const sizeStyle = SIZE_STYLES[size];

    return (
        <View style={[styles.container, containerStyle]}>
            <Button
                mode="contained"
                onPress={onPress}
                disabled={disabled || loading}
                style={[
                    styles.button,
                    { backgroundColor: disabled ? COLORS.disabled : COLORS.primaryContainer },
                    buttonStyle,
                ]}
                contentStyle={[
                    styles.buttonContent,
                    { paddingVertical: sizeStyle.paddingVertical, paddingHorizontal: sizeStyle.paddingHorizontal },
                ]}
                rippleColor="rgba(0, 0, 0, 0.2)"
                {...rest}
            >
                <View style={styles.contentRow}>
                    {loading ? (
                        <ActivityIndicator size="small" color={COLORS.white} style={styles.loader} />
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
            </Button>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        minWidth: '95%',
        alignSelf: 'center',
    },
    button: {
        borderRadius: BORDER_RADIUS.xl,
    },
    buttonContent: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    contentRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        color: COLORS.white,
        fontWeight: FONT_WEIGHT.bold,
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

export default RegularButton;
