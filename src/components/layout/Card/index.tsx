/**
 * Card Component
 * A flexible card container with multiple variants
 */

import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { CardProps, CardVariant, CardPadding } from '../../../types';
import { COLORS } from '../../../tokens/colors';
import { SPACING, BORDER_RADIUS, SHADOW } from '../../../tokens/spacing';

const PADDING_MAP: Record<CardPadding, number> = {
    none: 0,
    sm: SPACING.sm,
    md: SPACING.md,
    lg: SPACING.xl,
};

const VARIANT_STYLES: Record<CardVariant, object> = {
    elevated: {
        backgroundColor: COLORS.white,
        ...SHADOW.md,
    },
    outlined: {
        backgroundColor: COLORS.white,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    filled: {
        backgroundColor: COLORS.backgroundGray,
    },
};

export const Card: React.FC<CardProps> = ({
    children,
    variant = 'elevated',
    padding = 'md',
    onPress,
    containerStyle,
    contentStyle,
}) => {
    const paddingValue = PADDING_MAP[padding];
    const variantStyle = VARIANT_STYLES[variant];

    const content = (
        <View
            style={[
                styles.card,
                variantStyle,
                { padding: paddingValue },
                containerStyle,
            ]}
        >
            <View style={contentStyle}>{children}</View>
        </View>
    );

    if (onPress) {
        return (
            <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
                {content}
            </TouchableOpacity>
        );
    }

    return content;
};

const styles = StyleSheet.create({
    card: {
        borderRadius: BORDER_RADIUS.lg,
        overflow: 'hidden',
    },
});

export default Card;
