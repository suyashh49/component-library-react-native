/**
 * Divider Component
 * A simple line divider with customizable style
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { DividerProps } from '../../../types';
import { COLORS } from '../../../tokens/colors';

export const Divider: React.FC<DividerProps> = ({
    orientation = 'horizontal',
    dashed = false,
    color = COLORS.divider,
    thickness = 1,
    style,
}) => {
    const isHorizontal = orientation === 'horizontal';

    return (
        <View
            testID="divider"
            style={[
                styles.base,
                isHorizontal ? styles.horizontal : styles.vertical,
                {
                    borderColor: color,
                    borderWidth: thickness,
                    borderStyle: dashed ? 'dashed' : 'solid',
                },
                isHorizontal
                    ? { borderBottomWidth: thickness, borderTopWidth: 0, borderLeftWidth: 0, borderRightWidth: 0 }
                    : { borderRightWidth: thickness, borderTopWidth: 0, borderBottomWidth: 0, borderLeftWidth: 0 },
                style,
            ]}
        />
    );
};

const styles = StyleSheet.create({
    base: {},
    horizontal: {
        width: '100%',
        height: 0,
    },
    vertical: {
        height: '100%',
        width: 0,
    },
});

export default Divider;
