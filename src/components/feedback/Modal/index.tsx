/**
 * Modal Component
 * A flexible modal with multiple presentation styles
 */

import React from 'react';
import {
    View,
    StyleSheet,
    Modal as RNModal,
    TouchableWithoutFeedback,
    Dimensions,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ModalProps } from '../../../types';
import { COLORS } from '../../../tokens/colors';
import { SPACING, BORDER_RADIUS } from '../../../tokens/spacing';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

export const Modal: React.FC<ModalProps> = ({
    visible,
    onDismiss,
    presentation = 'bottomSheet',
    children,
    showHandle = true,
    backdropColor = 'rgba(32, 32, 32, 0.5)',
    modalStyle,
    animationType,
    testID,
}) => {
    const insets = useSafeAreaInsets();
    
    const getAnimationType = () => {
        if (animationType) return animationType;
        switch (presentation) {
            case 'bottomSheet':
                return 'fade';
            case 'centered':
                return 'fade';
            case 'fullScreen':
                return 'slide';
            default:
                return 'fade';
        }
    };

    const renderContent = () => {
        switch (presentation) {
            case 'bottomSheet':
                return (
                    <View style={styles.bottomSheetWrapper}>
                        <TouchableWithoutFeedback onPress={onDismiss}>
                            <View style={[styles.backdrop, { backgroundColor: backdropColor }]} />
                        </TouchableWithoutFeedback>
                        <KeyboardAvoidingView
                            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                            style={styles.keyboardView}
                        >
                            <View style={[styles.bottomSheet, { paddingBottom: SPACING.xl + insets.bottom }, modalStyle]}>
                                {showHandle && <View style={styles.handle} />}
                                {children}
                            </View>
                        </KeyboardAvoidingView>
                    </View>
                );

            case 'centered':
                return (
                    <View style={styles.centeredWrapper}>
                        <TouchableWithoutFeedback onPress={onDismiss}>
                            <View style={[styles.backdrop, { backgroundColor: backdropColor }]} />
                        </TouchableWithoutFeedback>
                        <View style={[styles.centeredModal, modalStyle]}>{children}</View>
                    </View>
                );

            case 'fullScreen':
                return (
                    <View style={[styles.fullScreenModal, modalStyle]}>
                        {children}
                    </View>
                );

            default:
                return children;
        }
    };

    return (
        <RNModal
            visible={visible}
            transparent={presentation !== 'fullScreen'}
            animationType={getAnimationType()}
            onRequestClose={onDismiss}
            testID={testID}
        >
            {renderContent()}
        </RNModal>
    );
};

const styles = StyleSheet.create({
    bottomSheetWrapper: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    backdrop: {
        ...StyleSheet.absoluteFillObject,
    },
    keyboardView: {
        justifyContent: 'flex-end',
    },
    bottomSheet: {
        backgroundColor: COLORS.white,
        borderTopLeftRadius: BORDER_RADIUS.xl,
        borderTopRightRadius: BORDER_RADIUS.xl,
        paddingHorizontal: SPACING.xl,
        paddingTop: SPACING.md,
        maxHeight: SCREEN_HEIGHT * 0.9,
    },
    handle: {
        width: 40,
        height: 4,
        backgroundColor: COLORS.divider,
        borderRadius: BORDER_RADIUS.full,
        alignSelf: 'center',
        marginBottom: SPACING.lg,
    },
    centeredWrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    centeredModal: {
        backgroundColor: COLORS.white,
        borderRadius: BORDER_RADIUS.lg,
        padding: SPACING.xl,
        marginHorizontal: SPACING.xl,
        maxWidth: '90%',
        maxHeight: '80%',
    },
    fullScreenModal: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
});

export default Modal;
