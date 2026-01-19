/**
 * Header Component
 * A flexible navigation header/app bar
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, StatusBar } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { HeaderProps } from '../../../types';
import { COLORS } from '../../../tokens/colors';
import { SPACING } from '../../../tokens/spacing';
import { FONT_SIZE, FONT_WEIGHT } from '../../../tokens/typography';
import { ArrowLeft } from 'lucide-react-native';

export const Header: React.FC<HeaderProps> = ({
    title,
    leftAction,
    rightAction,
    onBackPress,
    showBackButton = true,
    containerStyle,
    titleStyle,
    backgroundColor = COLORS.white,
}) => {
    const insets = useSafeAreaInsets();

    const renderLeftAction = () => {
        if (leftAction) {
            return <View style={styles.actionContainer}>{leftAction}</View>;
        }

        if (showBackButton && onBackPress) {
            return (
                <TouchableOpacity onPress={onBackPress} style={styles.actionContainer}>
                    <ArrowLeft size={24} color={COLORS.text} />
                </TouchableOpacity>
            );
        }

        return <View style={styles.actionContainer} />;
    };

    return (
        <View
            style={[
                styles.container,
                { paddingTop: insets.top, backgroundColor },
                containerStyle,
            ]}
        >
            <StatusBar barStyle="dark-content" backgroundColor={backgroundColor} />
            <View style={styles.content}>
                {renderLeftAction()}

                <View style={styles.titleContainer}>
                    {title && (
                        <Text style={[styles.title, titleStyle]} numberOfLines={1}>
                            {title}
                        </Text>
                    )}
                </View>

                <View style={styles.actionContainer}>
                    {rightAction}
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
    },
    content: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 56,
        paddingHorizontal: SPACING.md,
    },
    actionContainer: {
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    titleContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: FONT_SIZE.lg,
        fontWeight: FONT_WEIGHT.bold,
        color: COLORS.text,
        textAlign: 'center',
    },
});

export default Header;
