/**
 * Switch Component
 * A toggle switch for boolean values
 */

import React from 'react';
import { View, Text, StyleSheet, Switch as RNSwitch } from 'react-native';
import { SwitchProps } from '../../../types';
import { COLORS, SPACING, FONT_SIZE, FONT_WEIGHT } from '../../../tokens';

export const Switch: React.FC<SwitchProps> = ({
  value,
  onValueChange,
  label,
  disabled = false,
  containerStyle,
  labelStyle,
  trackColorOff = COLORS.border,
  trackColorOn = COLORS.primaryContainer,
  thumbColor = COLORS.white,
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      {label && (
        <Text style={[styles.label, labelStyle, disabled && styles.disabledText]}>
          {label}
        </Text>
      )}
      <RNSwitch
        value={value}
        onValueChange={onValueChange}
        disabled={disabled}
        trackColor={{
          false: trackColorOff,
          true: trackColorOn,
        }}
        thumbColor={thumbColor}
        ios_backgroundColor={trackColorOff}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: SPACING.sm,
  },
  label: {
    fontSize: FONT_SIZE.md,
    fontWeight: FONT_WEIGHT.medium,
    color: COLORS.text,
    flex: 1,
    marginRight: SPACING.md,
  },
  disabledText: {
    color: COLORS.textDisabled,
  },
});

export default Switch;
