/**
 * Confirmation Dialog Component
 * A pre-built modal for confirmation actions
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ConfirmationDialogProps } from '../../../types';
import { COLORS } from '../../../tokens/colors';
import { SPACING, BORDER_RADIUS } from '../../../tokens/spacing';
import { FONT_SIZE, FONT_WEIGHT } from '../../../tokens/typography';
import Modal from '../Modal';
import { Button } from '../../basic/Button';

export const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
    visible,
    title,
    message,
    onConfirm,
    onCancel,
    confirmText = 'Confirm',
    cancelText = 'Cancel',
    confirmVariant = 'primary',
    containerStyle,
    titleStyle,
    messageStyle,
    testID,
}) => {
    return (
        <Modal
            visible={visible}
            onDismiss={onCancel}
            presentation="centered"
            showHandle={false}
            testID={testID}
            modalStyle={[styles.modal, containerStyle]}
        >
            <View style={styles.content}>
                <Text style={[styles.title, titleStyle]}>{title}</Text>
                <Text style={[styles.message, messageStyle]}>{message}</Text>

                <View style={styles.buttonContainer}>
                    <Button
                        text={confirmText}
                        onPress={onConfirm}
                        variant="regular"
                        containerStyle={styles.buttonWrapper}
                        buttonStyle={[
                            styles.confirmButton,
                            confirmVariant === 'danger' && styles.dangerButton,
                        ]}
                        textStyle={styles.confirmButtonText}
                    />
                    <Button
                        text={cancelText}
                        onPress={onCancel}
                        variant="outline"
                        containerStyle={styles.buttonWrapper}
                        buttonStyle={styles.cancelButton}
                        textStyle={styles.cancelButtonText}
                    />
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modal: {
        minWidth: 280,
        padding: SPACING.xl,
    },
    content: {
        alignItems: 'center',
    },
    title: {
        fontSize: FONT_SIZE.xl,
        fontWeight: FONT_WEIGHT.bold,
        color: COLORS.text,
        textAlign: 'center',
        marginBottom: SPACING.sm,
    },
    message: {
        fontSize: FONT_SIZE.md,
        fontWeight: FONT_WEIGHT.regular,
        color: COLORS.textSecondary,
        textAlign: 'center',
        marginBottom: SPACING.xl,
        lineHeight: 22,
    },
    buttonContainer: {
        width: '100%',
        gap: SPACING.md,
    },
    buttonWrapper: {
        width: '100%',
    },
    confirmButton: {
        borderRadius: BORDER_RADIUS.xl,
    },
    dangerButton: {
        backgroundColor: COLORS.error,
    },
    confirmButtonText: {
        color: COLORS.white,
        fontWeight: FONT_WEIGHT.bold,
        fontSize: FONT_SIZE.md,
    },
    cancelButton: {
        borderRadius: BORDER_RADIUS.xl,
        borderColor: COLORS.primaryContainer,
        borderWidth: 1.5,
        backgroundColor: COLORS.white,
    },
    cancelButtonText: {
        color: COLORS.primaryContainer,
        fontWeight: FONT_WEIGHT.bold,
        fontSize: FONT_SIZE.md,
    },
});

export default ConfirmationDialog;
