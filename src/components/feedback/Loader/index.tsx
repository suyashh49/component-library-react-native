/**
 * Loader Component
 * A customizable loading indicator with overlay support
 */

import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Dimensions } from 'react-native';
import { LoaderProps } from '../../../types';
import { COLORS } from '../../../tokens/colors';
import { SPACING, BORDER_RADIUS } from '../../../tokens/spacing';
import { FONT_SIZE } from '../../../tokens/typography';

const { width, height } = Dimensions.get('window');

export const Loader: React.FC<LoaderProps> = ({
    visible = true,
    fullScreen = true,
    text = 'Loading, please wait...',
    backgroundColor,
    spinnerColor = COLORS.primaryContainer,
    spinnerSize = 'large',
    textStyle,
    overlayStyle,
}) => {
    if (!visible) return null;

    if (fullScreen) {
        return (
            <View style={[styles.fullScreenContainer, { backgroundColor: backgroundColor || COLORS.white }, overlayStyle]}>
                <View style={styles.contentContainer}>
                    <ActivityIndicator size={spinnerSize} color={spinnerColor} />
                    {text && <Text style={[styles.text, textStyle]}>{text}</Text>}
                </View>
            </View>
        );
    }

    return (
        <View style={[styles.inlineContainer, overlayStyle]}>
            <ActivityIndicator size={spinnerSize} color={spinnerColor} />
            {text && <Text style={[styles.text, textStyle]}>{text}</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    fullScreenContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: width,
        height: height,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999,
    },
    contentContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: SPACING.xl,
        backgroundColor: COLORS.white,
        borderRadius: BORDER_RADIUS.lg,
    },
    inlineContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: SPACING.lg,
    },
    text: {
        marginTop: SPACING.md,
        fontSize: FONT_SIZE.md,
        color: COLORS.text,
        textAlign: 'center',
    },
});

export default Loader;
