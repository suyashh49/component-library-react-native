/**
 * Checkbox Component
 * A customizable checkbox with label support
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { CheckboxProps } from '../../../types';
import { COLORS } from '../../../tokens/colors';
import { SPACING, BORDER_RADIUS } from '../../../tokens/spacing';
import { FONT_SIZE, FONT_WEIGHT } from '../../../tokens/typography';
import { Check } from 'lucide-react-native';

export const Checkbox: React.FC<CheckboxProps> = ({
    checked,
    onChange,
    label,
    disabled = false,
    containerStyle,
    checkboxStyle,
    labelStyle,
    color = COLORS.primaryContainer,
}) => {
    const handlePress = () => {
        if (!disabled) {
            onChange(!checked);
        }
    };

    return (
        <TouchableOpacity
            onPress={handlePress}
            disabled={disabled}
            activeOpacity={0.7}
            style={[styles.container, containerStyle]}
        >
            <View
                style={[
                    styles.checkbox,
                    checked && { backgroundColor: color, borderColor: color },
                    disabled && styles.disabledCheckbox,
                    checkboxStyle,
                ]}
            >
                {checked && <Check size={14} color={COLORS.white} strokeWidth={3} />}
            </View>
            {label && (
                <Text
                    style={[
                        styles.label,
                        disabled && styles.disabledLabel,
                        labelStyle,
                    ]}
                >
                    {label}
                </Text>
            )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: SPACING.xs,
    },
    checkbox: {
        width: 22,
        height: 22,
        borderRadius: BORDER_RADIUS.sm,
        borderWidth: 2,
        borderColor: COLORS.border,
        backgroundColor: COLORS.white,
        alignItems: 'center',
        justifyContent: 'center',
    },
    disabledCheckbox: {
        backgroundColor: COLORS.disabled,
        borderColor: COLORS.disabled,
    },
    label: {
        marginLeft: SPACING.sm,
        fontSize: FONT_SIZE.md,
        color: COLORS.text,
    },
    disabledLabel: {
        color: COLORS.disabledText,
    },
});

export default Checkbox;
