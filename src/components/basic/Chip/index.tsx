/**
 * Chip Component
 * A selectable chip with icon support
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Chip as PaperChip } from 'react-native-paper';
import { ChipProps } from '../../../types';
import { COLORS } from '../../../tokens/colors';
import { SPACING, BORDER_RADIUS } from '../../../tokens/spacing';
import { FONT_SIZE, FONT_WEIGHT } from '../../../tokens/typography';

export const Chip: React.FC<ChipProps> = ({
    text,
    selected = false,
    onPress,
    mode = 'flat',
    icon,
    disabled = false,
    containerStyle,
    chipStyle,
    textStyle,
    selectedChipStyle,
    selectedTextStyle,
    shouldRender = true,
}) => {
    if (!shouldRender) return null;

    return (
        <View style={[styles.container, containerStyle]}>
            <PaperChip
                mode={mode}
                selected={selected}
                onPress={onPress}
                disabled={disabled}
                icon={icon ? () => icon : undefined}
                style={[
                    styles.chip,
                    chipStyle,
                    disabled && styles.disabledChip,
                    selected && styles.selectedChip,
                    selected && selectedChipStyle,
                ]}
                textStyle={[
                    styles.text,
                    textStyle,
                    disabled && styles.disabledText,
                    selected && styles.selectedText,
                    selected && selectedTextStyle,
                ]}
            >
                {text}
            </PaperChip>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignSelf: 'flex-start',
        paddingVertical: SPACING.xs,
    },
    chip: {
        borderRadius: BORDER_RADIUS.full,
        backgroundColor: COLORS.chipBackground,
    },
    text: {
        fontSize: FONT_SIZE.xs,
        fontWeight: FONT_WEIGHT.regular,
        color: COLORS.chipText,
        textAlign: 'center',
    },
    selectedChip: {
        backgroundColor: COLORS.chipSelectedBackground,
    },
    selectedText: {
        color: COLORS.chipSelectedText,
    },
    disabledChip: {
        backgroundColor: COLORS.disabled,
        opacity: 0.5,
    },
    disabledText: {
        color: COLORS.chipText,
    },
});

export default Chip;
