/**
 * Typography Tokens for Component Library
 */

export const FONT_FAMILY = {
    regular: 'Inter',
    medium: 'Inter',
    bold: 'Inter',
};

export const FONT_SIZE = {
    xs: 10,
    sm: 12,
    md: 14,
    lg: 16,
    xl: 18,
    xxl: 24,
    xxxl: 32,
};

export const LINE_HEIGHT = {
    xs: 14,
    sm: 16,
    md: 20,
    lg: 24,
    xl: 28,
    xxl: 32,
    xxxl: 40,
};

export const FONT_WEIGHT = {
    regular: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
};

export const LETTER_SPACING = {
    tight: -0.5,
    normal: 0,
    wide: 0.5,
    wider: 1,
};

// Pre-defined text styles
export const TEXT_STYLES = {
    heading1: {
        fontFamily: FONT_FAMILY.bold,
        fontSize: FONT_SIZE.xxxl,
        lineHeight: LINE_HEIGHT.xxxl,
        fontWeight: FONT_WEIGHT.bold,
    },
    heading2: {
        fontFamily: FONT_FAMILY.bold,
        fontSize: FONT_SIZE.xxl,
        lineHeight: LINE_HEIGHT.xxl,
        fontWeight: FONT_WEIGHT.bold,
    },
    heading3: {
        fontFamily: FONT_FAMILY.bold,
        fontSize: FONT_SIZE.xl,
        lineHeight: LINE_HEIGHT.xl,
        fontWeight: FONT_WEIGHT.bold,
    },
    body: {
        fontFamily: FONT_FAMILY.regular,
        fontSize: FONT_SIZE.md,
        lineHeight: LINE_HEIGHT.md,
        fontWeight: FONT_WEIGHT.regular,
    },
    bodySmall: {
        fontFamily: FONT_FAMILY.regular,
        fontSize: FONT_SIZE.sm,
        lineHeight: LINE_HEIGHT.sm,
        fontWeight: FONT_WEIGHT.regular,
    },
    caption: {
        fontFamily: FONT_FAMILY.regular,
        fontSize: FONT_SIZE.xs,
        lineHeight: LINE_HEIGHT.xs,
        fontWeight: FONT_WEIGHT.regular,
    },
    button: {
        fontFamily: FONT_FAMILY.bold,
        fontSize: FONT_SIZE.md,
        lineHeight: LINE_HEIGHT.md,
        fontWeight: FONT_WEIGHT.bold,
        letterSpacing: LETTER_SPACING.wide,
    },
    label: {
        fontFamily: FONT_FAMILY.medium,
        fontSize: FONT_SIZE.sm,
        lineHeight: LINE_HEIGHT.sm,
        fontWeight: FONT_WEIGHT.medium,
    },
};

export default {
    FONT_FAMILY,
    FONT_SIZE,
    LINE_HEIGHT,
    FONT_WEIGHT,
    LETTER_SPACING,
    TEXT_STYLES,
};
