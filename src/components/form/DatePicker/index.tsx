/**
 * DatePicker Component
 * A date and time picker with customizable format
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Calendar } from 'lucide-react-native';
import { DatePickerProps } from '../../../types';
import { COLORS, SPACING, FONT_SIZE, FONT_WEIGHT } from '../../../tokens';

export const DatePicker: React.FC<DatePickerProps> = ({
  value,
  onChange,
  mode = 'date',
  label,
  placeholder = 'Select date',
  minimumDate,
  maximumDate,
  disabled = false,
  isRequired = false,
  isError = false,
  errorMessage,
  dateFormat = 'MMM DD, YYYY',
  containerStyle,
  inputStyle,
  labelStyle,
}) => {
  const [show, setShow] = useState(false);

  const formatDate = (date: Date): string => {
    if (!date) return '';
    
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    if (mode === 'time') {
      return `${formattedHours}:${formattedMinutes} ${ampm}`;
    } else if (mode === 'datetime') {
      return `${month} ${day}, ${year} ${formattedHours}:${formattedMinutes} ${ampm}`;
    } else {
      return `${month} ${day}, ${year}`;
    }
  };

  const handleChange = (event: any, selectedDate?: Date) => {
    if (Platform.OS === 'android') {
      setShow(false);
    }
    
    if (selectedDate && event.type !== 'dismissed') {
      onChange(selectedDate);
    }
  };

  const handlePress = () => {
    if (!disabled) {
      setShow(true);
    }
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {label && (
        <Text style={[styles.label, labelStyle]}>
          {label}
          {isRequired && <Text style={styles.required}> *</Text>}
        </Text>
      )}
      
      <TouchableOpacity
        style={[
          styles.input,
          disabled && styles.inputDisabled,
          isError && styles.inputError,
          inputStyle,
        ]}
        onPress={handlePress}
        disabled={disabled}
      >
        <Text
          style={[
            styles.inputText,
            !value && styles.placeholder,
            disabled && styles.inputTextDisabled,
          ]}
        >
          {value ? formatDate(value) : placeholder}
        </Text>
        <Calendar
          size={20}
          color={disabled ? COLORS.textDisabled : COLORS.textSecondary}
        />
      </TouchableOpacity>

      {isError && errorMessage && (
        <Text style={styles.errorText}>{errorMessage}</Text>
      )}

      {show && (
        <DateTimePicker
          value={value || new Date()}
          mode={mode}
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={handleChange}
          minimumDate={minimumDate}
          maximumDate={maximumDate}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: SPACING.md,
  },
  label: {
    fontSize: FONT_SIZE.sm,
    fontWeight: FONT_WEIGHT.medium,
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  required: {
    color: COLORS.error,
  },
  input: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    padding: SPACING.md,
    minHeight: 48,
  },
  inputDisabled: {
    backgroundColor: COLORS.backgroundSecondary,
    borderColor: COLORS.border,
  },
  inputError: {
    borderColor: COLORS.error,
  },
  inputText: {
    fontSize: FONT_SIZE.md,
    color: COLORS.text,
    flex: 1,
  },
  inputTextDisabled: {
    color: COLORS.textDisabled,
  },
  placeholder: {
    color: COLORS.textSecondary,
  },
  errorText: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.error,
    marginTop: SPACING.xs,
  },
});

export default DatePicker;
