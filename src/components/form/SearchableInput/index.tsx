/**
 * SearchableInput Component
 * A search input with icon and clear button
 */

import React from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { SearchableInputProps } from '../../../types';
import { COLORS } from '../../../tokens/colors';
import { SPACING, BORDER_RADIUS } from '../../../tokens/spacing';
import { FONT_SIZE } from '../../../tokens/typography';
import { Search, X } from 'lucide-react-native';

export const SearchableInput: React.FC<SearchableInputProps> = ({
    value,
    onChangeText,
    placeholder = 'Search...',
    onSubmit,
    onClear,
    disabled = false,
    containerStyle,
    inputStyle,
    leftIcon,
    showClearButton = true,
}) => {
    const handleClear = () => {
        onChangeText('');
        onClear?.();
    };

    return (
        <View style={[styles.container, disabled && styles.containerDisabled, containerStyle]}>
            <View style={styles.iconContainer}>
                {leftIcon || <Search size={18} color={COLORS.textSecondary} />}
            </View>

            <TextInput
                style={[styles.input, inputStyle]}
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
                placeholderTextColor={COLORS.textSecondary}
                editable={!disabled}
                onSubmitEditing={onSubmit}
                returnKeyType="search"
            />

            {showClearButton && value.length > 0 && (
                <TouchableOpacity onPress={handleClear} style={styles.clearButton}>
                    <X size={18} color={COLORS.textSecondary} />
                </TouchableOpacity>
            )}

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.backgroundGray,
        borderRadius: BORDER_RADIUS.lg,
        paddingHorizontal: SPACING.md,
        height: 48,
    },
    containerDisabled: {
        backgroundColor: COLORS.disabled,
    },
    iconContainer: {
        marginRight: SPACING.sm,
    },
    input: {
        flex: 1,
        fontSize: FONT_SIZE.md,
        color: COLORS.text,
        paddingVertical: SPACING.sm,
    },
    clearButton: {
        padding: SPACING.xs,
        marginLeft: SPACING.xs,
    },
});

export default SearchableInput;
