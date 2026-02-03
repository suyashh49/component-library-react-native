/**
 * Shared TypeScript Types for Component Library
 */

import { ViewStyle, TextStyle, ImageSourcePropType, StyleProp } from 'react-native';
import { ButtonProps as PaperButtonProps, TextInputProps as PaperTextInputProps } from 'react-native-paper';

// ============================================
// Button Types
// ============================================

export type ButtonVariant = 'regular' | 'outline' | 'ghost' | 'text';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends Omit<PaperButtonProps, 'children'> {
    /** Button text */
    text?: string;
    /** Callback when button is pressed */
    onPress?: () => void;
    /** Button variant style */
    variant?: ButtonVariant;
    /** Button size */
    size?: ButtonSize;
    /** Whether button is disabled */
    disabled?: boolean;
    /** Whether button is in loading state */
    loading?: boolean;
    /** Icon on the left side */
    leftIcon?: React.ReactNode;
    /** Icon on the right side */
    rightIcon?: React.ReactNode;
    /** Custom container style */
    containerStyle?: StyleProp<ViewStyle>;
    /** Custom button style */
    buttonStyle?: StyleProp<ViewStyle>;
    /** Custom text style */
    textStyle?: StyleProp<TextStyle>;
    /** Whether to render the component */
    shouldRender?: boolean;
    /** Children elements */
    children?: React.ReactNode;
}

export interface SwipableButtonProps {
    /** Button text */
    text: string;
    /** Icon renderer function */
    icon: () => React.ReactNode;
    /** Callback on successful swipe */
    onSwipeSuccess: () => void;
    /** Callback on failed swipe */
    onSwipeFail?: () => void;
    /** Rail border color */
    railBorderColor?: string;
    /** Rail background color */
    railBackgroundColor?: string;
    /** Whether button is disabled */
    disabled?: boolean;
    /** Custom title styles */
    titleStyles?: StyleProp<TextStyle>;
    /** Custom thumb icon styles */
    thumbIconStyles?: StyleProp<ViewStyle>;
    /** Disabled rail background color */
    disabledRailBackgroundColor?: string;
}

// ============================================
// TextInput Types
// ============================================

export interface TextInputProps extends Omit<PaperTextInputProps, 'mode'> {
    /** Input label */
    label?: string;
    /** Current value */
    value?: string;
    /** Placeholder text */
    placeholder?: string;
    /** Callback when text changes */
    onChangeText?: (text: string) => void;
    /** Input mode */
    mode?: 'flat' | 'outlined';
    /** Whether field is required */
    isRequired?: boolean;
    /** Whether field has error */
    isError?: boolean;
    /** Error message to display */
    errorMessage?: string;
    /** Whether input is disabled */
    disabled?: boolean;
    /** Whether to mask text (for passwords) */
    secureTextEntry?: boolean;
    /** Whether input is multiline */
    multiline?: boolean;
    /** Maximum character length */
    maxLength?: number;
    /** Custom container style */
    containerStyle?: StyleProp<ViewStyle>;
    /** Custom input style */
    inputStyle?: StyleProp<ViewStyle>;
    /** Custom label style */
    labelStyle?: StyleProp<TextStyle>;
    /** Custom error text style */
    errorStyle?: StyleProp<TextStyle>;
    /** Background color */
    backgroundColor?: string;
    /** Text color */
    textColor?: string;
    /** Regular expression pattern for validation */
    validationRegex?: RegExp;
    /** Error message to show when regex validation fails */
    validationErrorMessage?: string;
    /** Whether to validate on every keystroke (default: false, validates onBlur) */
    validateOnChange?: boolean;
    /** Whether to render the component */
    shouldRender?: boolean;
    /** Whether to enable keyboard avoiding */
    keyboardAvoidingEnabled?: boolean;
    /** Keyboard vertical offset */
    keyboardVerticalOffset?: number;
}

// ============================================
// Chip Types
// ============================================

export type ChipMode = 'flat' | 'outlined';

export interface ChipProps {
    /** Chip text */
    text: string;
    /** Whether chip is selected */
    selected?: boolean;
    /** Callback when chip is pressed */
    onPress?: () => void;
    /** Chip mode */
    mode?: ChipMode;
    /** Icon to display */
    icon?: React.ReactNode;
    /** Whether chip is disabled */
    disabled?: boolean;
    /** Custom container style */
    containerStyle?: StyleProp<ViewStyle>;
    /** Custom chip style */
    chipStyle?: StyleProp<ViewStyle>;
    /** Custom text style */
    textStyle?: StyleProp<TextStyle>;
    /** Custom selected chip style */
    selectedChipStyle?: StyleProp<ViewStyle>;
    /** Custom selected text style */
    selectedTextStyle?: StyleProp<TextStyle>;
    /** Whether to render the component */
    shouldRender?: boolean;
}

// ============================================
// Divider Types
// ============================================

export interface DividerProps {
    /** Orientation of divider */
    orientation?: 'horizontal' | 'vertical';
    /** Whether to use dashed style */
    dashed?: boolean;
    /** Custom color */
    color?: string;
    /** Divider thickness */
    thickness?: number;
    /** Custom style */
    style?: StyleProp<ViewStyle>;
}

// ============================================
// Spacer Types
// ============================================

export interface SpacerProps {
    /** Size in pixels */
    size?: number;
    /** Whether spacer is horizontal */
    horizontal?: boolean;
    /** Whether to show debug borders */
    debug?: boolean;
}

// ============================================
// Avatar Types
// ============================================

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface AvatarProps {
    /** Image source */
    source?: ImageSourcePropType;
    /** Name for initials fallback */
    name?: string;
    /** Avatar size */
    size?: AvatarSize;
    /** Custom size in pixels */
    customSize?: number;
    /** Custom container style */
    containerStyle?: StyleProp<ViewStyle>;
    /** Custom image style */
    imageStyle?: StyleProp<ViewStyle>;
    /** Custom text style for initials */
    textStyle?: StyleProp<TextStyle>;
    /** Callback when avatar is pressed */
    onPress?: () => void;
    /** Whether avatar is active */
    active?: boolean;
}

// ============================================
// Loader Types
// ============================================

export interface LoaderProps {
    /** Whether loader is visible */
    visible?: boolean;
    /** Whether to show as fullscreen overlay */
    fullScreen?: boolean;
    /** Loading text */
    text?: string;
    /** Background color */
    backgroundColor?: string;
    /** Spinner color */
    spinnerColor?: string;
    /** Spinner size */
    spinnerSize?: 'small' | 'large';
    /** Custom text style */
    textStyle?: StyleProp<TextStyle>;
    /** Custom overlay style */
    overlayStyle?: StyleProp<ViewStyle>;
}

// ============================================
// Snackbar Types
// ============================================

export type SnackbarType = 'success' | 'error' | 'warning' | 'info';

export interface SnackbarProps {
    /** Whether snackbar is visible */
    visible: boolean;
    /** Message to display */
    message: string;
    /** Snackbar type for styling */
    type?: SnackbarType;
    /** Duration in ms (0 for infinite) */
    duration?: number;
    /** Callback when dismissed */
    onDismiss?: () => void;
    /** Action button configuration */
    action?: {
        label: string;
        onPress: () => void;
    };
    /** Custom container style */
    containerStyle?: StyleProp<ViewStyle>;
    /** Custom text style */
    textStyle?: StyleProp<TextStyle>;
}

// ============================================
// Modal Types
// ============================================

export type ModalPresentation = 'bottomSheet' | 'centered' | 'fullScreen';

export interface ModalProps {
    /** Whether modal is visible */
    visible: boolean;
    /** Callback when dismissed */
    onDismiss?: () => void;
    /** Presentation style */
    presentation?: ModalPresentation;
    /** Modal children */
    children: React.ReactNode;
    /** Whether to show drag handle (for bottom sheet) */
    showHandle?: boolean;
    /** Backdrop color */
    backdropColor?: string;
    /** Custom modal style */
    modalStyle?: StyleProp<ViewStyle>;
    /** Animation type */
    animationType?: 'slide' | 'fade' | 'none';
    /** Test ID */
    testID?: string;
}

// ============================================
// Confirmation Dialog Types
// ============================================

export interface ConfirmationDialogProps {
    /** Whether dialog is visible */
    visible: boolean;
    /** Dialog title */
    title: string;
    /** Dialog message */
    message: string;
    /** Callback when confirmed */
    onConfirm: () => void;
    /** Callback when cancelled */
    onCancel: () => void;
    /** Confirm button text */
    confirmText?: string;
    /** Cancel button text */
    cancelText?: string;
    /** Confirm button variant */
    confirmVariant?: 'danger' | 'primary';
    /** Custom container style */
    containerStyle?: StyleProp<ViewStyle>;
    /** Custom title style */
    titleStyle?: StyleProp<TextStyle>;
    /** Custom message style */
    messageStyle?: StyleProp<TextStyle>;
    /** Test ID */
    testID?: string;
}

// ============================================
// Dropdown Types
// ============================================

export interface DropdownItem<T = string> {
    label: string;
    value: T;
}

export interface DropdownProps<T = string> {
    /** Dropdown options */
    data: DropdownItem<T>[];
    /** Current value */
    value?: T;
    /** Callback when value changes */
    onChange: (value: T) => void;
    /** Placeholder text */
    placeholder?: string;
    /** Label text */
    label?: string;
    /** Whether dropdown is disabled */
    disabled?: boolean;
    /** Whether to enable search */
    searchable?: boolean;
    /** Custom container style */
    containerStyle?: StyleProp<ViewStyle>;
    /** Custom dropdown style */
    dropdownStyle?: StyleProp<ViewStyle>;
    /** Custom item style */
    itemStyle?: StyleProp<ViewStyle>;
    /** Custom selected item style */
    selectedItemStyle?: StyleProp<ViewStyle>;
    /** Custom label style */
    labelStyle?: StyleProp<TextStyle>;
}

// ============================================
// Checkbox Types
// ============================================

export interface CheckboxProps {
    /** Whether checkbox is checked */
    checked: boolean;
    /** Callback when value changes */
    onChange: (checked: boolean) => void;
    /** Label text */
    label?: string;
    /** Whether checkbox is disabled */
    disabled?: boolean;
    /** Custom container style */
    containerStyle?: StyleProp<ViewStyle>;
    /** Custom checkbox style */
    checkboxStyle?: StyleProp<ViewStyle>;
    /** Custom label style */
    labelStyle?: StyleProp<TextStyle>;
    /** Checkbox color */
    color?: string;
}

// ============================================
// RadioGroup Types
// ============================================

export interface RadioOption<T = string> {
    label: string;
    value: T;
}

export interface RadioGroupProps<T = string> {
    /** Radio options */
    options: RadioOption<T>[];
    /** Current value */
    value?: T;
    /** Callback when value changes */
    onChange: (value: T) => void;
    /** Layout orientation */
    orientation?: 'horizontal' | 'vertical';
    /** Whether radio group is disabled */
    disabled?: boolean;
    /** Custom container style */
    containerStyle?: StyleProp<ViewStyle>;
    /** Custom option style */
    optionStyle?: StyleProp<ViewStyle>;
    /** Custom label style */
    labelStyle?: StyleProp<TextStyle>;
    /** Radio color */
    color?: string;
}

// ============================================
// Card Types
// ============================================

export type CardVariant = 'elevated' | 'outlined' | 'filled';
export type CardPadding = 'none' | 'sm' | 'md' | 'lg';

export interface CardProps {
    /** Card children */
    children: React.ReactNode;
    /** Card variant */
    variant?: CardVariant;
    /** Card padding */
    padding?: CardPadding;
    /** Callback when card is pressed */
    onPress?: () => void;
    /** Custom container style */
    containerStyle?: StyleProp<ViewStyle>;
    /** Custom content style */
    contentStyle?: StyleProp<ViewStyle>;
}

// ============================================
// ListItem Types
// ============================================

export interface ListItemProps {
    /** Item title */
    title: string;
    /** Item subtitle */
    subtitle?: string;
    /** Left icon/element */
    leftElement?: React.ReactNode;
    /** Right icon/element */
    rightElement?: React.ReactNode;
    /** Callback when item is pressed */
    onPress?: () => void;
    /** Whether item is disabled */
    disabled?: boolean;
    /** Custom container style */
    containerStyle?: StyleProp<ViewStyle>;
    /** Custom title style */
    titleStyle?: StyleProp<TextStyle>;
    /** Custom subtitle style */
    subtitleStyle?: StyleProp<TextStyle>;
    /** show item separator */
    itemSeparator?: boolean;

}

// ============================================
// Header Types
// ============================================

export interface HeaderProps {
    /** Header title */
    title?: string;
    /** Left action element */
    leftAction?: React.ReactNode;
    /** Right action element */
    rightAction?: React.ReactNode;
    /** Callback for back button */
    onBackPress?: () => void;
    /** Whether to show back button */
    showBackButton?: boolean;
    /** Custom container style */
    containerStyle?: StyleProp<ViewStyle>;
    /** Custom title style */
    titleStyle?: StyleProp<TextStyle>;
    /** Background color */
    backgroundColor?: string;
}

// ============================================
// Tag Types
// ============================================

export interface TagProps {
    /** Tag icon */
    icon?: React.ReactNode;
    /** Tag icon path (image source) */
    iconPath?: ImageSourcePropType;
    /** Tag title */
    title?: string;
    /** Tag subtitle */
    subtitle?: string;
    /** Custom tag style */
    tagStyle?: StyleProp<ViewStyle>;
    /** Custom title style */
    titleStyle?: StyleProp<TextStyle>;
    /** Custom subtitle style */
    subtitleStyle?: StyleProp<TextStyle>;
}

// ============================================
// SearchableInput Types
// ============================================

export interface SearchableInputProps {
    /** Current search value */
    value: string;
    /** Callback when value changes */
    onChangeText: (text: string) => void;
    /** Placeholder text */
    placeholder?: string;
    /** Callback when search is submitted */
    onSubmit?: () => void;
    /** Callback when clear button is pressed */
    onClear?: () => void;
    /** Whether input is disabled */
    disabled?: boolean;
    /** Custom container style */
    containerStyle?: StyleProp<ViewStyle>;
    /** Custom input style */
    inputStyle?: StyleProp<ViewStyle>;
    /** Left icon */
    leftIcon?: React.ReactNode;
    /** Whether to show clear button */
    showClearButton?: boolean;
}

// ============================================
// DatePicker Types
// ============================================

export type DatePickerMode = 'date' | 'time' | 'datetime';

export interface DatePickerProps {
    /** Current date value */
    value?: Date;
    /** Callback when date changes */
    onChange: (date: Date) => void;
    /** Picker mode */
    mode?: DatePickerMode;
    /** Label text */
    label?: string;
    /** Placeholder text */
    placeholder?: string;
    /** Minimum date */
    minimumDate?: Date;
    /** Maximum date */
    maximumDate?: Date;
    /** Whether picker is disabled */
    disabled?: boolean;
    /** Whether field is required */
    isRequired?: boolean;
    /** Whether field has error */
    isError?: boolean;
    /** Error message to display */
    errorMessage?: string;
    /** Date format string */
    dateFormat?: string;
    /** Custom container style */
    containerStyle?: StyleProp<ViewStyle>;
    /** Custom input style */
    inputStyle?: StyleProp<ViewStyle>;
    /** Custom label style */
    labelStyle?: StyleProp<TextStyle>;
}

// ============================================
// Alert Types
// ============================================

export type AlertVariant = 'success' | 'error' | 'warning' | 'info';

export interface AlertProps {
    /** Alert title */
    title?: string;
    /** Alert message */
    message: string;
    /** Alert variant */
    variant?: AlertVariant;
    /** Whether alert is visible */
    visible?: boolean;
    /** Callback when dismissed */
    onDismiss?: () => void;
    /** Whether to show close button */
    showCloseButton?: boolean;
    /** Left icon */
    icon?: React.ReactNode;
    /** Custom container style */
    containerStyle?: StyleProp<ViewStyle>;
    /** Custom title style */
    titleStyle?: StyleProp<TextStyle>;
    /** Custom message style */
    messageStyle?: StyleProp<TextStyle>;
}

// ============================================
// Switch Types
// ============================================

export interface SwitchProps {
    /** Whether switch is on */
    value: boolean;
    /** Callback when value changes */
    onValueChange: (value: boolean) => void;
    /** Label text */
    label?: string;
    /** Whether switch is disabled */
    disabled?: boolean;
    /** Custom container style */
    containerStyle?: StyleProp<ViewStyle>;
    /** Custom label style */
    labelStyle?: StyleProp<TextStyle>;
    /** Track color when off */
    trackColorOff?: string;
    /** Track color when on */
    trackColorOn?: string;
    /** Thumb color */
    thumbColor?: string;
}

// ============================================
// MultiSelect Dropdown Types
// ============================================

export interface MultiSelectDropdownProps<T = string> {
    /** Dropdown options */
    data: DropdownItem<T>[];
    /** Current selected values */
    value?: T[];
    /** Callback when values change */
    onChange: (values: T[]) => void;
    /** Placeholder text */
    placeholder?: string;
    /** Label text */
    label?: string;
    /** Whether dropdown is disabled */
    disabled?: boolean;
    /** Whether to enable search */
    searchable?: boolean;
    /** Maximum selections allowed */
    maxSelections?: number;
    /** Custom container style */
    containerStyle?: StyleProp<ViewStyle>;
    /** Custom dropdown style */
    dropdownStyle?: StyleProp<ViewStyle>;
    /** Custom item style */
    itemStyle?: StyleProp<ViewStyle>;
    /** Custom selected item style */
    selectedItemStyle?: StyleProp<ViewStyle>;
    /** Custom label style */
    labelStyle?: StyleProp<TextStyle>;
    /** Select all option */
    selectAll?: boolean;
    /** Clear all option */
    clearAll?: boolean;

}

// ============================================
// Tooltip Types
// ============================================

export type TooltipPosition = 'top' | 'bottom' | 'left' | 'right';

export interface TooltipProps {
    /** Tooltip content */
    content: string | React.ReactNode;
    /** Tooltip position */
    position?: TooltipPosition;
    /** Child element to wrap */
    children: React.ReactNode;
    /** Whether tooltip is visible */
    visible?: boolean;
    /** Background color */
    backgroundColor?: string;
    /** Text color */
    textColor?: string;
    /** Custom tooltip style */
    tooltipStyle?: StyleProp<ViewStyle>;
    /** Custom text style */
    textStyle?: StyleProp<TextStyle>;
}

// ============================================
// Camera Types
// ============================================

export type CameraType = 'front' | 'back';
export type CameraFlashMode = 'on' | 'off' | 'auto';

export interface CameraProps {
    /** Callback when photo is taken */
    onPhotoTaken: (uri: string) => void;
    /** Camera type */
    cameraType?: CameraType;
    /** Flash mode */
    flashMode?: CameraFlashMode;
    /** Button text */
    buttonText?: string;
    /** Text when photo not taken */
    photoNotTakenText?: string;
    /** Text when photo taken */
    photoTakenText?: string;
    /** Custom container style */
    containerStyle?: StyleProp<ViewStyle>;
}

// ============================================
// BarcodeScanner Types
// ============================================

export interface BarcodeScanResult {
    type: string;
    data: string;
}

export interface BarcodeScannerProps {
    /** Callback when barcode is scanned */
    onBarcodeScanned: (result: BarcodeScanResult) => void;
    /** Button text */
    buttonText?: string;
    /** Instruction text */
    instructionText?: string;
    /** Custom container style */
    containerStyle?: StyleProp<ViewStyle>;
}

// ============================================
// FlatList Types
// ============================================

export interface FlatListProps<T = any> {
    /** Data array */
    data: T[];
    /** Render item function */
    renderItem: (item: T, index: number) => React.ReactNode;
    /** Key extractor */
    keyExtractor?: (item: T, index: number) => string;
    /** Empty state component */
    emptyComponent?: React.ReactNode;
    /** Loading state component */
    loadingComponent?: React.ReactNode;
    /** Whether data is loading */
    loading?: boolean;
    /** Item separator component */
    itemSeparator?: React.ReactNode;
    /** Callback when end is reached */
    onEndReached?: () => void;
    /** End reached threshold */
    onEndReachedThreshold?: number;
    /** Whether to show scroll indicator */
    showScrollIndicator?: boolean;
    /** Custom container style */
    containerStyle?: StyleProp<ViewStyle>;
    /** Custom content container style */
    contentContainerStyle?: StyleProp<ViewStyle>;
    /** Enable nested scrolling (for FlatList inside ScrollView) */
    nestedScrollEnabled?: boolean;
}

// ============================================
// ImageUpload Types
// ============================================

export interface ImageUploadProps {
    /** Callback when image is selected */
    onImageSelected: (uri: string) => void;
    /** Current image URI */
    value?: string;
    /** Label text */
    label?: string;
    /** Whether to allow camera */
    allowCamera?: boolean;
    /** Whether to allow gallery */
    allowGallery?: boolean;
    /** Maximum image size in bytes */
    maxSize?: number;
    /** Image quality (0-1) */
    quality?: number;
    /** Whether upload is disabled */
    disabled?: boolean;
    /** Custom container style */
    containerStyle?: StyleProp<ViewStyle>;
    /** Custom button style */
    buttonStyle?: StyleProp<ViewStyle>;
    /** Custom label style */
    labelStyle?: StyleProp<TextStyle>;
}

// ============================================
// ImageContainer Types
// ============================================

export type ImageContainerVariant = 'square' | 'rectangle' | 'circle';
export type ImageContainerSize = 'sm' | 'md' | 'lg' | 'xl';

export interface ImageContainerProps {
    /** Image source URI */
    source?: string | ImageSourcePropType;
    /** Container variant */
    variant?: ImageContainerVariant;
    /** Container size */
    size?: ImageContainerSize;
    /** Custom width */
    width?: number;
    /** Custom height */
    height?: number;
    /** Placeholder icon */
    placeholderIcon?: React.ReactNode;
    /** Placeholder text */
    placeholderText?: string;
    /** Callback when pressed */
    onPress?: () => void;
    /** Whether to show delete button */
    showDeleteButton?: boolean;
    /** Callback when delete is pressed */
    onDelete?: () => void;
    /** Custom container style */
    containerStyle?: StyleProp<ViewStyle>;
    /** Custom image style */
    imageStyle?: StyleProp<ViewStyle>;
    /** Border radius */
    borderRadius?: number;
}
