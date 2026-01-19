/**
 * ListItem Component
 * A standardized list item with icon support
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ListItemProps } from '../../../types';
import { COLORS } from '../../../tokens/colors';
import { SPACING, BORDER_RADIUS } from '../../../tokens/spacing';
import { FONT_SIZE, FONT_WEIGHT } from '../../../tokens/typography';
import { ChevronRight } from 'lucide-react-native';

export const ListItem: React.FC<ListItemProps> = ({
    title,
    subtitle,
    leftElement,
    rightElement,
    onPress,
    disabled = false,
    containerStyle,
    titleStyle,
    subtitleStyle,
}) => {
    const content = (
        <View style={[styles.container, disabled && styles.disabledContainer, containerStyle]}>
            {leftElement && <View style={styles.leftElement}>{leftElement}</View>}

            <View style={styles.textContainer}>
                <Text
                    style={[styles.title, disabled && styles.disabledText, titleStyle]}
                    numberOfLines={1}
                >
                    {title}
                </Text>
                {subtitle && (
                    <Text
                        style={[styles.subtitle, disabled && styles.disabledText, subtitleStyle]}
                        numberOfLines={2}
                    >
                        {subtitle}
                    </Text>
                )}
            </View>

            <View style={styles.rightElement}>
                {rightElement || (onPress && <ChevronRight size={20} color={COLORS.textSecondary} />)}
            </View>
        </View>
    );

    if (onPress && !disabled) {
        return (
            <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
                {content}
            </TouchableOpacity>
        );
    }

    return content;
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: SPACING.md,
        paddingHorizontal: SPACING.md,
        backgroundColor: COLORS.white,
        borderRadius: BORDER_RADIUS.md,
        minHeight: 56,
    },
    disabledContainer: {
        opacity: 0.5,
    },
    leftElement: {
        marginRight: SPACING.md,
    },
    textContainer: {
        flex: 1,
    },
    title: {
        fontSize: FONT_SIZE.md,
        fontWeight: FONT_WEIGHT.medium,
        color: COLORS.text,
    },
    subtitle: {
        fontSize: FONT_SIZE.sm,
        color: COLORS.textSecondary,
        marginTop: SPACING.xs,
    },
    disabledText: {
        color: COLORS.disabledText,
    },
    rightElement: {
        marginLeft: SPACING.sm,
    },
});

export default ListItem;
