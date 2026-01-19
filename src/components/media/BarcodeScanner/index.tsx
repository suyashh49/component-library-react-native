/**
 * BarcodeScanner Component
 * A component for scanning barcodes and QR codes
 * Note: Requires expo-camera and expo-barcode-scanner packages
 */

//YET TO BE IMPLEMENTED

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { Scan, CheckCircle } from 'lucide-react-native';
import { BarcodeScannerProps } from '../../../types';
import { COLORS, SPACING, FONT_SIZE, FONT_WEIGHT } from '../../../tokens';
import Button from '../../basic/Button';

export const BarcodeScanner: React.FC<BarcodeScannerProps> = ({
  onBarcodeScanned,
  buttonText = 'Use Scanned Code',
  instructionText = 'Position the barcode within the frame',
  containerStyle,
}) => {
  const [scanned, setScanned] = useState(false);
  const [scannedData, setScannedData] = useState<{ type: string; data: string } | null>(null);

  // Show info about required package
  React.useEffect(() => {
    Alert.alert(
      'Barcode Scanner',
      'This component requires expo-camera and expo-barcode-scanner packages:\n\nnpx expo install expo-camera expo-barcode-scanner\n\nPlease install them to use barcode scanning functionality.',
      [{ text: 'OK' }]
    );
  }, []);

  const handleBarCodeScanned = ({ type, data }: { type: string; data: string }) => {
    setScanned(true);
    setScannedData({ type, data });
    
    
    onBarcodeScanned({ type, data });
  };

  const handleRescan = () => {
    setScanned(false);
    setScannedData(null);
  };

  const handleConfirm = () => {
    if (scannedData) {
      onBarcodeScanned(scannedData);
    }
  };

  // Simulate scanning for demo purposes
  const simulateScan = () => {
    handleBarCodeScanned({
      type: 'QR_CODE',
      data: '1234567890',
    });
  };

  return (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.scannerContainer}>
        {scanned ? (
          <View style={styles.resultContainer}>
            <CheckCircle size={64} color={COLORS.success} />
            <Text style={styles.resultTitle}>Barcode Scanned!</Text>
            <View style={styles.resultDetails}>
              <Text style={styles.resultLabel}>Type:</Text>
              <Text style={styles.resultValue}>{scannedData?.type}</Text>
            </View>
            <View style={styles.resultDetails}>
              <Text style={styles.resultLabel}>Data:</Text>
              <Text style={styles.resultValue}>{scannedData?.data}</Text>
            </View>
          </View>
        ) : (
          <View style={styles.scannerPlaceholder}>
            <View style={styles.scanFrame}>
              <View style={[styles.corner, styles.cornerTopLeft]} />
              <View style={[styles.corner, styles.cornerTopRight]} />
              <View style={[styles.corner, styles.cornerBottomLeft]} />
              <View style={[styles.corner, styles.cornerBottomRight]} />
              
              <Scan size={64} color={COLORS.white} />
            </View>
            
            <Text style={styles.placeholderText}>
              Camera scanner will appear here
            </Text>
            <Text style={styles.placeholderSubtext}>
              Install expo-camera & expo-barcode-scanner
            </Text>
            
            {/* Demo button - remove in production */}
            <TouchableOpacity
              style={styles.demoButton}
              onPress={simulateScan}
            >
              <Text style={styles.demoButtonText}>Simulate Scan (Demo)</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      <View style={styles.bottomContainer}>
        <Text style={styles.instructionText}>
          {scanned ? 'Barcode detected and processed' : instructionText}
        </Text>

        {scanned ? (
          <View style={styles.actionContainer}>
            <TouchableOpacity
              style={styles.rescanButton}
              onPress={handleRescan}
            >
              <Text style={styles.rescanText}>Scan Again</Text>
            </TouchableOpacity>

            <Button
              text={buttonText}
              onPress={handleConfirm}
              containerStyle={styles.confirmButton}
            />
          </View>
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.text,
  },
  scannerContainer: {
    flex: 1,
    overflow: 'hidden',
  },
  scannerPlaceholder: {
    flex: 1,
    backgroundColor: COLORS.textSecondary,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.xl,
  },
  scanFrame: {
    width: 250,
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  corner: {
    position: 'absolute',
    width: 40,
    height: 40,
    borderColor: COLORS.white,
  },
  cornerTopLeft: {
    top: 0,
    left: 0,
    borderTopWidth: 4,
    borderLeftWidth: 4,
  },
  cornerTopRight: {
    top: 0,
    right: 0,
    borderTopWidth: 4,
    borderRightWidth: 4,
  },
  cornerBottomLeft: {
    bottom: 0,
    left: 0,
    borderBottomWidth: 4,
    borderLeftWidth: 4,
  },
  cornerBottomRight: {
    bottom: 0,
    right: 0,
    borderBottomWidth: 4,
    borderRightWidth: 4,
  },
  placeholderText: {
    fontSize: FONT_SIZE.lg,
    color: COLORS.white,
    textAlign: 'center',
    marginTop: SPACING.xl,
  },
  placeholderSubtext: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.white,
    textAlign: 'center',
    marginTop: SPACING.sm,
    opacity: 0.7,
  },
  demoButton: {
    marginTop: SPACING.xl,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.lg,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 8,
  },
  demoButtonText: {
    fontSize: FONT_SIZE.md,
    color: COLORS.white,
    fontWeight: FONT_WEIGHT.medium,
  },
  resultContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.backgroundSecondary,
    padding: SPACING.xl,
  },
  resultTitle: {
    fontSize: FONT_SIZE.xl,
    fontWeight: FONT_WEIGHT.bold,
    color: COLORS.success,
    marginTop: SPACING.lg,
    marginBottom: SPACING.xl,
  },
  resultDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: SPACING.sm,
    width: '100%',
    maxWidth: 300,
  },
  resultLabel: {
    fontSize: FONT_SIZE.md,
    fontWeight: FONT_WEIGHT.bold,
    color: COLORS.text,
    width: 80,
  },
  resultValue: {
    fontSize: FONT_SIZE.md,
    color: COLORS.text,
    flex: 1,
  },
  bottomContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: SPACING.lg,
  },
  instructionText: {
    fontSize: FONT_SIZE.md,
    color: COLORS.white,
    textAlign: 'center',
    marginBottom: SPACING.md,
  },
  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: SPACING.md,
  },
  rescanButton: {
    padding: SPACING.md,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderWidth: 1,
    borderColor: COLORS.white,
  },
  rescanText: {
    fontSize: FONT_SIZE.md,
    color: COLORS.white,
    fontWeight: FONT_WEIGHT.medium,
  },
  confirmButton: {
    flex: 1,
  },
});

export default BarcodeScanner;
