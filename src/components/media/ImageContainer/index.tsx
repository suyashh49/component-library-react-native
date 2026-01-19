/**
 * ImageContainer Component
 * A container for displaying images with various styles and options
 */

import React from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { ImagePlus, X } from 'lucide-react-native';
import { ImageContainerProps } from '../../../types';
import { COLORS, SPACING, FONT_SIZE, FONT_WEIGHT } from '../../../tokens';

export const ImageContainer: React.FC<ImageContainerProps> = ({
  source,
  variant = 'rectangle',
  size = 'md',
  width,
  height,
  placeholderIcon,
  placeholderText = 'No Image',
  onPress,
  showDeleteButton = false,
  onDelete,
  containerStyle,
  imageStyle,
  borderRadius = 8,
}) => {
  const getSizeStyles = () => {
    if (width && height) {
      return { width, height };
    }

    const sizes = {
      sm: { width: 80, height: 80 },
      md: { width: 120, height: 120 },
      lg: { width: 180, height: 180 },
      xl: { width: 240, height: 240 },
    };

    return sizes[size];
  };

  const getVariantStyles = () => {
    const sizeStyles = getSizeStyles();
    
    switch (variant) {
      case 'square':
        return {
          ...sizeStyles,
          borderRadius: borderRadius,
        };
      case 'circle':
        return {
          width: sizeStyles.width,
          height: sizeStyles.width,
          borderRadius: sizeStyles.width / 2,
        };
      case 'rectangle':
      default:
        return {
          width: sizeStyles.width,
          height: sizeStyles.height * 0.75,
          borderRadius: borderRadius,
        };
    }
  };

  const variantStyles = getVariantStyles();
  const hasImage = source && (typeof source === 'string' ? source.length > 0 : true);

  const renderContent = () => {
    if (hasImage) {
      const imageSource = typeof source === 'string' ? { uri: source } : source;
      return (
        <Image
          source={imageSource}
          style={[styles.image, variantStyles, imageStyle]}
          resizeMode="cover"
        />
      );
    }

    return (
      <View style={[styles.placeholder, variantStyles]}>
        {placeholderIcon || <ImagePlus size={32} color={COLORS.textSecondary} />}
        {placeholderText && (
          <Text style={styles.placeholderText}>{placeholderText}</Text>
        )}
      </View>
    );
  };

  const content = (
    <View style={[styles.container, containerStyle]}>
      {renderContent()}
      {showDeleteButton && hasImage && onDelete && (
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={onDelete}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <View style={styles.deleteButtonBackground}>
            <X size={16} color={COLORS.white} />
          </View>
        </TouchableOpacity>
      )}
    </View>
  );

  if (onPress) {
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
    position: 'relative',
  },
  image: {
    backgroundColor: COLORS.backgroundSecondary,
  },
  placeholder: {
    backgroundColor: COLORS.backgroundSecondary,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: COLORS.border,
    borderStyle: 'dashed',
  },
  placeholderText: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.textSecondary,
    marginTop: SPACING.xs,
    textAlign: 'center',
  },
  deleteButton: {
    position: 'absolute',
    top: -8,
    right: -8,
    zIndex: 10,
  },
  deleteButtonBackground: {
    backgroundColor: COLORS.error,
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: COLORS.white,
  },
});

export default ImageContainer;
