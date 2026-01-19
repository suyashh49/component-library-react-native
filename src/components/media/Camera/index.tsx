//Camera Component for taking photos

import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Alert,
} from 'react-native';
import { Camera as CameraIcon, RotateCw, Zap, ZapOff, RefreshCw } from 'lucide-react-native';
import { CameraProps } from '../../../types';
import { COLORS, SPACING, FONT_SIZE, FONT_WEIGHT } from '../../../tokens';
import Button from '../../basic/Button';

export const Camera: React.FC<CameraProps> = ({
  onPhotoTaken,
  cameraType = 'back',
  flashMode = 'off',
  buttonText = 'Submit Photo',
  photoNotTakenText = 'Position your camera to take a photo',
  photoTakenText = 'Photo captured! Review and submit',
  containerStyle,
}) => {
  const [currentType, setCurrentType] = useState<'front' | 'back'>(cameraType);
  const [currentFlash, setCurrentFlash] = useState(flashMode);
  const [photoTaken, setPhotoTaken] = useState(false);
  const [photoUri, setPhotoUri] = useState<string>('');

  // Show info about required package
  React.useEffect(() => {
    Alert.alert(
      'Camera Component',
      'This component requires expo-camera package to be installed:\n\nnpx expo install expo-camera\n\nPlease install it to use camera functionality.',
      [{ text: 'OK' }]
    );
  }, []);

  const toggleCameraType = () => {
    setCurrentType(current => (current === 'back' ? 'front' : 'back'));
  };

  const toggleFlash = () => {
    setCurrentFlash(current => {
      if (current === 'off') return 'on';
      if (current === 'on') return 'auto';
      return 'off';
    });
  };

  const takePicture = async () => {
    // Placeholder for expo-camera implementation
    // const photo = await cameraRef.current?.takePictureAsync({
    //   quality: 0.8,
    //   base64: false,
    // });
    // if (photo) {
    //   setPhotoUri(photo.uri);
    //   setPhotoTaken(true);
    // }
    
    Alert.alert('Camera', 'Camera capture would happen here with expo-camera');
  };

  const retakePicture = () => {
    setPhotoTaken(false);
    setPhotoUri('');
  };

  const handleSubmit = () => {
    if (photoUri) {
      onPhotoTaken(photoUri);
    }
  };

  const getFlashIcon = () => {
    if (currentFlash === 'off') {
      return <ZapOff size={24} color={COLORS.white} />;
    }
    return <Zap size={24} color={COLORS.white} />;
  };

  return (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.cameraContainer}>
        {photoTaken && photoUri ? (
          <ImageBackground
            source={{ uri: photoUri }}
            style={styles.previewImage}
            resizeMode="cover"
          />
        ) : (
          <View style={styles.cameraPlaceholder}>
            <CameraIcon size={64} color={COLORS.white} />
            <Text style={styles.placeholderText}>
              Camera view will appear here
            </Text>
            <Text style={styles.placeholderSubtext}>
              Install expo-camera to enable
            </Text>
          </View>
        )}
      </View>

      <View style={styles.bottomContainer}>
        <Text style={styles.instructionText}>
          {photoTaken ? photoTakenText : photoNotTakenText}
        </Text>

        {!photoTaken ? (
          <View style={styles.controlsContainer}>
            <TouchableOpacity
              style={styles.controlButton}
              onPress={toggleFlash}
            >
              {getFlashIcon()}
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.captureButton}
              onPress={takePicture}
            >
              <View style={styles.captureButtonInner} />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.controlButton}
              onPress={toggleCameraType}
            >
              <RotateCw size={24} color={COLORS.white} />
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.actionContainer}>
            <TouchableOpacity
              style={styles.retakeButton}
              onPress={retakePicture}
            >
              <RefreshCw size={24} color={COLORS.white} />
              <Text style={styles.retakeText}>Retake</Text>
            </TouchableOpacity>

            <Button
              text={buttonText}
              onPress={handleSubmit}
              containerStyle={styles.submitButton}
            />
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.text,
  },
  cameraContainer: {
    flex: 1,
    overflow: 'hidden',
  },
  cameraPlaceholder: {
    flex: 1,
    backgroundColor: COLORS.textSecondary,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.xl,
  },
  placeholderText: {
    fontSize: FONT_SIZE.lg,
    color: COLORS.white,
    textAlign: 'center',
    marginTop: SPACING.lg,
  },
  placeholderSubtext: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.white,
    textAlign: 'center',
    marginTop: SPACING.sm,
    opacity: 0.7,
  },
  previewImage: {
    flex: 1,
    width: '100%',
  },
  bottomContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: SPACING.lg,
  },
  instructionText: {
    fontSize: FONT_SIZE.md,
    color: COLORS.white,
    textAlign: 'center',
    marginBottom: SPACING.lg,
  },
  controlsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
  },
  controlButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  captureButtonInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.white,
  },
  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: SPACING.md,
  },
  retakeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
    padding: SPACING.md,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  retakeText: {
    fontSize: FONT_SIZE.md,
    color: COLORS.white,
    fontWeight: FONT_WEIGHT.medium,
  },
  submitButton: {
    flex: 1,
  },
});

export default Camera;
