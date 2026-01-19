/**
 * Avatar Component
 * Displays user avatar with image or initials fallback
 */

import React from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { AvatarProps, AvatarSize } from '../../../types';
import { COLORS } from '../../../tokens/colors';
import { FONT_WEIGHT } from '../../../tokens/typography';

const SIZE_MAP: Record<AvatarSize, number> = {
    xs: 24,
    sm: 32,
    md: 40,
    lg: 56,
    xl: 72,
};

const FONT_SIZE_MAP: Record<AvatarSize, number> = {
    xs: 10,
    sm: 12,
    md: 16,
    lg: 24,
    xl: 28,
};

const getInitials = (name: string): string => {
    if (!name) return '';
    const parts = name.trim().split(' ');
    if (parts.length === 1) {
        return parts[0].charAt(0).toUpperCase();
    }
    return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
};

export const Avatar: React.FC<AvatarProps> = ({
    source,
    name = '',
    size = 'md',
    customSize,
    containerStyle,
    imageStyle,
    textStyle,
    onPress,
}) => {
    const avatarSize = customSize || SIZE_MAP[size];
    const fontSize = customSize ? customSize * 0.4 : FONT_SIZE_MAP[size];
    const initials = getInitials(name);

    const content = source ? (
        <Image
            source={source}
            style={[
                styles.image,
                {
                    width: avatarSize,
                    height: avatarSize,
                    borderRadius: avatarSize / 2,
                },
                imageStyle,
            ]}
            resizeMode="cover"
        />
    ) : (
        <View
            style={[
                styles.initialsContainer,
                {
                    width: avatarSize,
                    height: avatarSize,
                    borderRadius: avatarSize / 2,
                },
            ]}
        >
            <Text style={[styles.initials, { fontSize }, textStyle]}>{initials}</Text>
        </View>
    );

    if (onPress) {
        return (
            <TouchableOpacity
                onPress={onPress}
                activeOpacity={0.7}
                style={[styles.container, containerStyle]}
            >
                {content}
            </TouchableOpacity>
        );
    }

    return <View style={[styles.container, containerStyle]}>{content}</View>;
};

const styles = StyleSheet.create({
    container: {},
    image: {},
    initialsContainer: {
        backgroundColor: COLORS.primaryContainer,
        alignItems: 'center',
        justifyContent: 'center',
    },
    initials: {
        color: COLORS.white,
        fontWeight: FONT_WEIGHT.bold,
    },
});

export default Avatar;
