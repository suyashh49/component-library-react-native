# React Native Component Library

A comprehensive, reusable component library for React Native mobile applications. Built with Expo SDK 51 and react-native-paper.

## 📦 Components

### Basic Components
| Component | Description | Props |
|-----------|-------------|-------|
| `Button` | Multi-variant button (regular, outline, ghost) | `text`, `variant`, `size`, `loading`, `disabled`, `leftIcon`, `rightIcon`, `containerStyle`, `buttonStyle`, `textStyle` |
| `TextInput` | Input field with validation | `label`, `value`, `mode`, `isRequired`, `isError`, `errorMessage`, `containerStyle`, `inputStyle` |
| `Chip` | Selectable chip | `text`, `selected`, `mode`, `icon`, `chipStyle`, `textStyle` |
| `Divider` | Horizontal/vertical divider | `orientation`, `dashed`, `color`, `thickness` |
| `Spacer` | Layout spacing utility | `size`, `horizontal`, `debug` |
| `Avatar` | User avatar with initials fallback | `source`, `name`, `size`, `customSize`, `onPress` |

### Feedback Components
| Component | Description | Props |
|-----------|-------------|-------|
| `Loader` | Loading indicator | `visible`, `fullScreen`, `text`, `spinnerColor`, `spinnerSize` |
| `Snackbar` | Toast notification | `visible`, `message`, `type`, `duration`, `action`, `onDismiss` |
| `Modal` | Flexible modal | `visible`, `presentation`, `showHandle`, `backdropColor`, `modalStyle` |
| `ConfirmationDialog` | Confirmation popup | `title`, `message`, `confirmText`, `cancelText`, `confirmVariant`, `onConfirm`, `onCancel` |

### Form Components
| Component | Description | Props |
|-----------|-------------|-------|
| `Dropdown` | Searchable dropdown | `data`, `value`, `onChange`, `placeholder`, `label`, `searchable` |
| `Checkbox` | Checkbox with label | `checked`, `onChange`, `label`, `disabled`, `color` |
| `RadioGroup` | Radio button group | `options`, `value`, `onChange`, `orientation` |
| `SearchableInput` | Search input with clear | `value`, `onChangeText`, `placeholder`, `showClearButton` |

### Layout Components
| Component | Description | Props |
|-----------|-------------|-------|
| `Card` | Card container | `variant`, `padding`, `onPress`, `containerStyle` |
| `ListItem` | List item with icons | `title`, `subtitle`, `leftElement`, `rightElement`, `onPress` |

### Navigation Components
| Component | Description | Props |
|-----------|-------------|-------|
| `Header` | App header/navigation bar | `title`, `showBackButton`, `onBackPress`, `leftAction`, `rightAction` |

## 🚀 Quick Start

### 1. Clone/Copy the components
```bash
# Copy the src folder to your project
cp -r component_library_app/src your-project/src/ui-library
```

### 2. Install dependencies
```bash
npm install react-native-paper react-native-safe-area-context react-native-gesture-handler lucide-react-native
```

### 3. Import and use
```tsx
import { Button, TextInput, Card, Modal } from './src/ui-library';

const MyScreen = () => (
  <Card variant="elevated" padding="md">
    <TextInput label="Email" value={email} onChangeText={setEmail} />
    <Button text="Submit" onPress={handleSubmit} />
  </Card>
);
```

## 🎨 Design Tokens

### Colors
```tsx
import { COLORS } from './src/tokens';

// Primary colors
COLORS.primary       // #007AFF
COLORS.primaryContainer  // #1F2E8D

// Semantic colors
COLORS.success      // #52C41A
COLORS.error        // #B3261E
COLORS.warning      // #FFB500

// Text colors
COLORS.text         // #333333
COLORS.textSecondary // #666666
```

### Typography
```tsx
import { FONT_SIZE, FONT_WEIGHT, TEXT_STYLES } from './src/tokens';

FONT_SIZE.sm   // 12
FONT_SIZE.md   // 14
FONT_SIZE.lg   // 16

TEXT_STYLES.heading1  // Pre-defined heading style
TEXT_STYLES.body      // Pre-defined body style
```

### Spacing
```tsx
import { SPACING, BORDER_RADIUS } from './src/tokens';

SPACING.sm   // 8
SPACING.md   // 12
SPACING.lg   // 16

BORDER_RADIUS.md  // 8
BORDER_RADIUS.lg  // 12
```

## 📱 Run Demo App

```bash
cd component_library_app
npm install

# For Android (development)
npm run android

# For Android APK (release)
npx expo prebuild --platform android
cd android
./gradlew assembleRelease
```

## 🏗️ Project Structure

```
component_library_app/
├── App.tsx              # Demo app
├── src/
│   ├── index.ts         # Library entry point
│   ├── tokens/          # Design tokens
│   │   ├── colors.ts
│   │   ├── typography.ts
│   │   └── spacing.ts
│   ├── types/           # TypeScript interfaces
│   │   └── index.ts
│   └── components/
│       ├── basic/       # Button, TextInput, Chip...
│       ├── feedback/    # Loader, Snackbar, Modal...
│       ├── form/        # Dropdown, Checkbox, Radio...
│       ├── layout/      # Card, ListItem
│       └── navigation/  # Header
```

## 📋 Usage Examples

### Button with Icon
```tsx
<Button 
  text="Save" 
  variant="regular"
  leftIcon={<Save size={18} color="#fff" />}
  loading={isLoading}
  onPress={handleSave} 
/>
```

### TextInput with Validation
```tsx
<TextInput
  label="Email"
  value={email}
  onChangeText={setEmail}
  isRequired
  isError={!isValidEmail}
  errorMessage="Please enter a valid email"
/>
```

### Modal Bottom Sheet
```tsx
<Modal
  visible={showModal}
  presentation="bottomSheet"
  onDismiss={() => setShowModal(false)}
>
  <Text>Modal Content</Text>
</Modal>
```

### Dropdown with Search
```tsx
<Dropdown
  label="Country"
  data={countries}
  value={selectedCountry}
  onChange={setSelectedCountry}
  searchable
/>
```

## 🔧 Customization

All components accept style props for customization:

```tsx
<Button
  text="Custom Button"
  containerStyle={{ marginBottom: 20 }}
  buttonStyle={{ backgroundColor: '#FF6B6B' }}
  textStyle={{ fontSize: 18 }}
/>
```

## 📄 License

MIT
