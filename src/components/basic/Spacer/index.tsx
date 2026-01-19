/**
 * Spacer Component
 * A flexible spacing utility component
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SpacerProps } from '../../../types';

export const Spacer: React.FC<SpacerProps> = ({
    size = 10,
    horizontal = false,
    debug = false,
}) => {
    return (
        <View
            testID="spacer"
            style={[
                styles.container,
                horizontal ? { width: size, height: '100%' } : { height: size, width: '100%' },
                debug && styles.debug,
            ]}
        >
            {debug && <Text style={styles.debugText}>Spacer: {size}px</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexShrink: 0,
    },
    debug: {
        borderWidth: 1,
        borderColor: 'red',
        backgroundColor: 'rgba(255, 0, 0, 0.1)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    debugText: {
        fontSize: 8,
        color: 'red',
    },
});

export default Spacer;
