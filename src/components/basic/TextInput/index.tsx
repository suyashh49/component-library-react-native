/**
 * TextInput Component
 * A customizable text input with label and error support
 */

import React, { useState } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { Icon, IconButton, TextInput as PaperTextInput } from 'react-native-paper';
import { TextInputProps } from '../../../types';
import { COLORS } from '../../../tokens/colors';
import { SPACING, BORDER_RADIUS } from '../../../tokens/spacing';
import { FONT_SIZE } from '../../../tokens/typography';
import { Eye, EyeOff } from 'lucide-react-native';

export const TextInput: React.FC<TextInputProps> = ({
    label = '',
    value = '',
    placeholder = '',
    onChangeText,
    mode = 'outlined',
    isRequired = false,
    isError = false,
    errorMessage,
    disabled = false,
    secureTextEntry = false,
    multiline = false,
    maxLength,
    containerStyle,
    inputStyle,
    labelStyle,
    errorStyle,
    backgroundColor,
    textColor,
    validationRegex,
    validationErrorMessage = 'Invalid input format',
    validateOnChange = false,
    shouldRender = true,
    ...rest
}) => {
    if (!shouldRender) return null;

    const [validationError, setValidationError] = useState<string>('');
    const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

    // Handler for text change with regex validation
    const handleTextChange = (text: string) => {
        // Call the original onChangeText
        onChangeText?.(text);

        // Validate if validateOnChange is true and regex is provided
        if (validateOnChange && validationRegex) {
            if (text && !validationRegex.test(text)) {
                setValidationError(validationErrorMessage);
            } else {
                setValidationError('');
            }
        } else if (validateOnChange && !validationRegex) {
            // Clear validation error if no regex is provided
            setValidationError('');
        }
    };

    // Handler for blur event (when user leaves the input)
    const handleBlur = () => {
        if (validationRegex && value) {
            if (!validationRegex.test(value)) {
                setValidationError(validationErrorMessage);
            } else {
                setValidationError('');
            }
        }
    };

    // Determine if there's an error to display
    const hasError = isError || !!validationError;
    const displayErrorMessage = errorMessage || validationError;

   return(
        <View style={[styles.container, containerStyle]}>
            <PaperTextInput
                label={
                    <Text style={[styles.label, labelStyle]}>
                        {label}
                        {isRequired && <Text style={styles.required}> *</Text>}
                    </Text>
                }
                value={value}
                placeholder={placeholder}
                onChangeText={handleTextChange}
                onBlur={handleBlur}
                mode={mode}
                disabled={disabled}
                secureTextEntry={secureTextEntry && !isPasswordVisible}
                multiline={multiline}
                maxLength={maxLength}
                textColor={textColor || COLORS.text}
                style={[
                    styles.input,
                    { backgroundColor: backgroundColor || COLORS.background },
                    hasError && styles.inputError,
                    inputStyle,
                ]}
                outlineStyle={[
                    styles.outline,
                    hasError && styles.outlineError,
                ]}
                activeOutlineColor={hasError ? COLORS.error : COLORS.primary}
                outlineColor={hasError ? COLORS.error : COLORS.border}
                right={
                    secureTextEntry ? (
                        <PaperTextInput.Icon
                            icon={() => 
                                isPasswordVisible ? (
                                    <EyeOff size={20} color={COLORS.textSecondary} />
                                ) : (
                                    <Eye size={20} color={COLORS.textSecondary} />
                                )
                            }
                            onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                        />
                    ) : undefined
                }
                {...rest}
            />
            {hasError && displayErrorMessage && (
                <Text style={[styles.errorText, errorStyle]}>{displayErrorMessage}</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        marginBottom: SPACING.sm,
    },
    input: {
        width: '100%',
        fontSize: FONT_SIZE.md,
    },
    outline: {
        borderRadius: BORDER_RADIUS.md,
    },
    outlineError: {
        borderColor: COLORS.error,
    },
    inputError: {
        borderColor: COLORS.error,
    },
    label: {
        color: COLORS.textSecondary,
        fontSize: FONT_SIZE.sm,
    },
    required: {
        color: COLORS.error,
    },
    errorText: {
        color: COLORS.error,
        fontSize: FONT_SIZE.xs,
        marginTop: SPACING.xs,
        marginLeft: SPACING.xs,
    },
});

export default TextInput;
