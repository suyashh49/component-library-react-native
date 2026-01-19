/**
 * Alert Component
 * Displays contextual feedback messages
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { AlertCircle, CheckCircle, Info, AlertTriangle, X } from 'lucide-react-native';
import { AlertProps } from '../../../types';
import { COLORS, SPACING, FONT_SIZE, FONT_WEIGHT } from '../../../tokens';

export const Alert: React.FC<AlertProps> = ({
  title,
  message,
  variant = 'info',
  visible = true,
  onDismiss,
  showCloseButton = true,
  icon,
  containerStyle,
  titleStyle,
  messageStyle,
}) => {
  if (!visible) return null;

  const getVariantStyles = () => {
    switch (variant) {
      case 'success':
        return {
          backgroundColor: '#d4edda',
          borderColor: '#c3e6cb',
          iconColor: '#155724',
          textColor: '#155724',
        };
      case 'error':
        return {
          backgroundColor: '#f8d7da',
          borderColor: '#f5c6cb',
          iconColor: '#721c24',
          textColor: '#721c24',
        };
      case 'warning':
        return {
          backgroundColor: '#fff3cd',
          borderColor: '#ffeaa7',
          iconColor: '#856404',
          textColor: '#856404',
        };
      case 'info':
      default:
        return {
          backgroundColor: '#d1ecf1',
          borderColor: '#bee5eb',
          iconColor: '#0c5460',
          textColor: '#0c5460',
        };
    }
  };

  const getDefaultIcon = () => {
    const variantStyles = getVariantStyles();
    const iconSize = 20;
    
    switch (variant) {
      case 'success':
        return <CheckCircle size={iconSize} color={variantStyles.iconColor} />;
      case 'error':
        return <AlertCircle size={iconSize} color={variantStyles.iconColor} />;
      case 'warning':
        return <AlertTriangle size={iconSize} color={variantStyles.iconColor} />;
      case 'info':
      default:
        return <Info size={iconSize} color={variantStyles.iconColor} />;
    }
  };

  const variantStyles = getVariantStyles();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: variantStyles.backgroundColor,
          borderColor: variantStyles.borderColor,
        },
        containerStyle,
      ]}
    >
      <View style={styles.iconContainer}>
        {icon || getDefaultIcon()}
      </View>
      
      <View style={styles.contentContainer}>
        {title && (
          <Text
            style={[
              styles.title,
              { color: variantStyles.textColor },
              titleStyle,
            ]}
          >
            {title}
          </Text>
        )}
        <Text
          style={[
            styles.message,
            { color: variantStyles.textColor },
            title && styles.messageWithTitle,
            messageStyle,
          ]}
        >
          {message}
        </Text>
      </View>

      {showCloseButton && onDismiss && (
        <TouchableOpacity
          style={styles.closeButton}
          onPress={onDismiss}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <X size={18} color={variantStyles.iconColor} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 8,
    padding: SPACING.md,
    marginVertical: SPACING.xs,
  },
  iconContainer: {
    marginRight: SPACING.sm,
    paddingTop: 2,
  },
  contentContainer: {
    flex: 1,
  },
  title: {
    fontSize: FONT_SIZE.md,
    fontWeight: FONT_WEIGHT.bold,
    marginBottom: SPACING.xs,
  },
  message: {
    fontSize: FONT_SIZE.sm,
    fontWeight: FONT_WEIGHT.regular,
    lineHeight: 20,
  },
  messageWithTitle: {
    marginTop: SPACING.xs,
  },
  closeButton: {
    padding: SPACING.xs,
    marginLeft: SPACING.sm,
  },
});

export default Alert;
