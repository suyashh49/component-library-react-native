/**
 * Spacing Tokens for Component Library
 * Consistent spacing scale based on 4px grid
 */

export const SPACING = {
    /** 0px */
    none: 0,
    /** 4px */
    xs: 4,
    /** 8px */
    sm: 8,
    /** 12px */
    md: 12,
    /** 16px */
    lg: 16,
    /** 20px */
    xl: 20,
    /** 24px */
    xxl: 24,
    /** 32px */
    xxxl: 32,
    /** 48px */
    huge: 48,
};

export const BORDER_RADIUS = {
    none: 0,
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    xxl: 20,
    full: 9999,
};

export const SHADOW = {
    none: {},
    sm: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    md: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 4,
        elevation: 4,
    },
    lg: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 8,
    },
};

export default {
    SPACING,
    BORDER_RADIUS,
    SHADOW,
};
