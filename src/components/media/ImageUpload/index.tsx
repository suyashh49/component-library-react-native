/**
 * ImageUpload Component
 * Allows users to upload images from camera or gallery
 * Note: Requires expo-image-picker package
 */

//IMPLEMENTED

import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Platform,
} from 'react-native';
import { Camera, Image as ImageIcon } from 'lucide-react-native';
import { ImageUploadProps } from '../../../types';
import { COLORS, SPACING, FONT_SIZE, FONT_WEIGHT } from '../../../tokens';
import ImageContainer from '../ImageContainer';
import * as ImagePicker from 'expo-image-picker';

export const ImageUpload: React.FC<ImageUploadProps> = ({
  onImageSelected,
  value,
  label,
  allowCamera = true,
  allowGallery = true,
  maxSize = 5 * 1024 * 1024, // 5MB default
  quality = 0.8,
  disabled = false,
  containerStyle,
  buttonStyle,
  labelStyle,
}) => {
  const [loading, setLoading] = useState(false);

  const checkPermissions = async (type: 'camera' | 'gallery') => {
    return true;
  };

  const handleCameraPress = async () => {
    if (disabled || !allowCamera) return;

    const hasPermission = await checkPermissions('camera');
    if (!hasPermission) return;

    setLoading(true);
    try {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: quality,
      });
      
      if (!result.canceled && result.assets[0]) {
        onImageSelected(result.assets[0].uri);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to open camera');
    } finally {
      setLoading(false);
    }
  };

  const handleGalleryPress = async () => {
    if (disabled || !allowGallery) return;

    const hasPermission = await checkPermissions('gallery');
    if (!hasPermission) return;

    setLoading(true);
    try {
    
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: quality,
      });
      
      if (!result.canceled && result.assets[0]) {
        onImageSelected(result.assets[0].uri);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to open gallery');
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = () => {
    Alert.alert(
      'Remove Image',
      'Are you sure you want to remove this image?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Remove', style: 'destructive', onPress: () => onImageSelected('') },
      ]
    );
  };

  const showOptions = () => {
    const options: any[] = [];
    
    if (allowCamera) {
      options.push({
        text: 'Take Photo',
        onPress: handleCameraPress,
      });
    }
    
    if (allowGallery) {
      options.push({
        text: 'Choose from Gallery',
        onPress: handleGalleryPress,
      });
    }
    
    options.push({
      text: 'Cancel',
      style: 'cancel',
    });

    Alert.alert('Select Image', 'Choose an option', options);
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {label && (
        <Text style={[styles.label, labelStyle]}>{label}</Text>
      )}

      {value ? (
        <ImageContainer
          source={value}
          variant="rectangle"
          size="lg"
          onPress={disabled ? undefined : showOptions}
          showDeleteButton={!disabled}
          onDelete={handleRemove}
        />
      ) : (
        <View style={styles.buttonsContainer}>
          {allowCamera && (
            <TouchableOpacity
              style={[styles.button, buttonStyle, disabled && styles.buttonDisabled]}
              onPress={handleCameraPress}
              disabled={disabled || loading}
            >
              <Camera size={24} color={disabled ? COLORS.textDisabled : COLORS.primaryContainer} />
              <Text style={[styles.buttonText, disabled && styles.buttonTextDisabled]}>
                Take Photo
              </Text>
            </TouchableOpacity>
          )}

          {allowGallery && (
            <TouchableOpacity
              style={[styles.button, buttonStyle, disabled && styles.buttonDisabled]}
              onPress={handleGalleryPress}
              disabled={disabled || loading}
            >
              <ImageIcon size={24} color={disabled ? COLORS.textDisabled : COLORS.primaryContainer} />
              <Text style={[styles.buttonText, disabled && styles.buttonTextDisabled]}>
                Choose from Gallery
              </Text>
            </TouchableOpacity>
          )}
        </View>
      )}

      <Text style={styles.helpText}>
        Maximum file size: {(maxSize / (1024 * 1024)).toFixed(0)}MB
      </Text>
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
    marginBottom: SPACING.sm,
  },
  buttonsContainer: {
    flexDirection: 'row',
    gap: SPACING.md,
    flexWrap: 'wrap',
  },
  button: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: SPACING.sm,
    backgroundColor: COLORS.backgroundSecondary,
    borderWidth: 2,
    borderColor: COLORS.border,
    borderStyle: 'dashed',
    borderRadius: 8,
    padding: SPACING.lg,
    minWidth: 150,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    fontSize: FONT_SIZE.md,
    fontWeight: FONT_WEIGHT.medium,
    color: COLORS.text,
  },
  buttonTextDisabled: {
    color: COLORS.textDisabled,
  },
  helpText: {
    fontSize: FONT_SIZE.xs,
    color: COLORS.textSecondary,
    marginTop: SPACING.sm,
  },
});

export default ImageUpload;
