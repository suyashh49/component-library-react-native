/**
 * RadioGroup Component
 * A group of radio buttons with single selection
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { RadioGroupProps, RadioOption } from '../../../types';
import { COLORS } from '../../../tokens/colors';
import { SPACING, BORDER_RADIUS } from '../../../tokens/spacing';
import { FONT_SIZE } from '../../../tokens/typography';

export function RadioGroup<T = string>({
    options,
    value,
    onChange,
    orientation = 'vertical',
    disabled = false,
    containerStyle,
    optionStyle,
    labelStyle,
    color = COLORS.primaryContainer,
}: RadioGroupProps<T>) {
    const handleSelect = (optionValue: T) => {
        if (!disabled) {
            onChange(optionValue);
        }
    };

    const renderOption = (option: RadioOption<T>, index: number) => {
        const isSelected = option.value === value;

        return (
            <TouchableOpacity
                key={`${option.value}-${index}`}
                onPress={() => handleSelect(option.value)}
                disabled={disabled}
                activeOpacity={0.7}
                style={[
                    styles.option,
                    orientation === 'horizontal' && styles.optionHorizontal,
                    optionStyle,
                ]}
            >
                <View
                    style={[
                        styles.radio,
                        isSelected && { borderColor: color },
                        disabled && styles.disabledRadio,
                    ]}
                >
                    {isSelected && (
                        <View
                            style={[
                                styles.radioInner,
                                { backgroundColor: disabled ? COLORS.disabledText : color },
                            ]}
                        />
                    )}
                </View>
                <Text
                    style={[
                        styles.label,
                        disabled && styles.disabledLabel,
                        labelStyle,
                    ]}
                >
                    {option.label}
                </Text>
            </TouchableOpacity>
        );
    };

    return (
        <View
            style={[
                styles.container,
                orientation === 'horizontal' && styles.containerHorizontal,
                containerStyle,
            ]}
        >
            {options.map(renderOption)}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
    },
    containerHorizontal: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    option: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: SPACING.sm,
    },
    optionHorizontal: {
        marginRight: SPACING.xl,
    },
    radio: {
        width: 22,
        height: 22,
        borderRadius: BORDER_RADIUS.full,
        borderWidth: 2,
        borderColor: COLORS.border,
        backgroundColor: COLORS.white,
        alignItems: 'center',
        justifyContent: 'center',
    },
    radioInner: {
        width: 12,
        height: 12,
        borderRadius: BORDER_RADIUS.full,
    },
    disabledRadio: {
        borderColor: COLORS.disabled,
        backgroundColor: COLORS.disabled,
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

export default RadioGroup;
