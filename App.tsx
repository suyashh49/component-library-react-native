/**
 * Component Library Demo App
 * 
 * This app showcases all the components available in the library.
 * Use this as a reference for how to use each component.
 */

import React, { useState } from 'react';
import { ScrollView, View, Text, StyleSheet, StatusBar, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { PaperProvider } from 'react-native-paper';
import { User, Mail, Bell, Settings, Heart } from 'lucide-react-native';

// Import all components
import {
  Button,
  OutlineButton,
  GhostButton,
  TextInput,
  Chip,
  Divider,
  Spacer,
  Avatar,
  Loader,
  Modal,
  ConfirmationDialog,
  Dropdown,
  Checkbox,
  RadioGroup,
  SearchableInput,
  Card,
  ListItem,
  Header,
  Alert,
  DatePicker,
  Switch,
  MultiSelectDropdown,
  FlatList,
  ImageContainer,
  ImageUpload,
  CentralizedSnackbar,
} from './src/components';

// Import design tokens
import { COLORS, SPACING, FONT_SIZE, FONT_WEIGHT } from './src/tokens';

// Import context and hooks
import { SnackbarProvider, useSnackbar, SNACKBAR_PRIORITY } from './src';

// AppContent component that uses the snackbar hook
function AppContent() {
  const { showSnackbar } = useSnackbar();

  // State for interactive demos
  const [textValue, setTextValue] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [emailValue, setEmailValue] = useState('');
  const [phoneValue, setPhoneValue] = useState('');
  const [usernameValue, setUsernameValue] = useState('');
  const [selectedChip, setSelectedChip] = useState(false);
  const [dropdownValue, setDropdownValue] = useState<string>();
  const [checkboxChecked, setCheckboxChecked] = useState(false);
  const [radioValue, setRadioValue] = useState<string>();
  const [showModal, setShowModal] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [showAlert, setShowAlert] = useState(true);
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [switchValue, setSwitchValue] = useState(false);
  const [multiSelectValues, setMultiSelectValues] = useState<string[]>([]);
  const [imageUri, setImageUri] = useState<string>('');

  const dropdownOptions = [
    { label: 'Option 1', value: 'opt1' },
    { label: 'Option 2', value: 'opt2' },
    { label: 'Option 3', value: 'opt3' },
  ];

  const radioOptions = [
    { label: 'Small', value: 'small' },
    { label: 'Medium', value: 'medium' },
    { label: 'Large', value: 'large' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />

      <Header
        title="Component Library"
        showBackButton={true}
        onBackPress={() => { showSnackbar('Back Button clicked successfully!', SNACKBAR_PRIORITY.INFO) }}
        rightAction={<Settings size={24} color={COLORS.text} />}
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >

        <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
          {/* Section: Buttons */}
          <Text style={styles.sectionTitle}>Buttons</Text>
          <Card variant="outlined" padding="md">
            <Button
              text="Regular Button"
              onPress={() => showSnackbar('Regular Button clicked successfully!', SNACKBAR_PRIORITY.INFO)}
            />
            <Spacer size={12} />
            <OutlineButton text="Outline Button" onPress={() => showSnackbar('Outline Button clicked successfully!', SNACKBAR_PRIORITY.INFO)} />
            <Spacer size={12} />
            <GhostButton text="Ghost Button" onPress={() => showSnackbar('Ghost Button clicked successfully!', SNACKBAR_PRIORITY.INFO)} />
            <Spacer size={12} />
            <Button
              text="With Icon Disabled Button"
              disabled={true}
              leftIcon={<Heart size={18} color={COLORS.white} />}
            //onPress={() => showSnackbar('With Icon Button clicked successfully!', SNACKBAR_PRIORITY.INFO)}
            />
          </Card>

          <Spacer size={24} />

          {/* Section: Text Inputs */}
          <Text style={styles.sectionTitle}>Text Inputs</Text>
          <Card variant="outlined" padding="md">
            <TextInput
              label="Email Address (with Regex Validation)"
              placeholder="Enter your email"
              value={emailValue}
              onChangeText={setEmailValue}
              validationRegex={/^[^\s@]+@[^\s@]+\.[^\s@]+$/}
              validationErrorMessage="Please enter a valid email address"
              validateOnChange={true}
            />
            <TextInput
              label="Required Field"
              placeholder="This field is required"
              isRequired={true}
              value={textValue}
              onChangeText={setTextValue}
            />
            <TextInput
              label="Error State"
              placeholder="Invalid input"
              isError={true}
              errorMessage="Please enter a valid value"
              value="Invalid"
              onChangeText={() => { }}
            />
            <TextInput
              label="Password"
              placeholder="Enter password"
              secureTextEntry={true}
              value={textValue}
              onChangeText={setTextValue}
            />
          </Card>

          <Spacer size={24} debug={true} />

          {/* Section: Search */}
          <Text style={styles.sectionTitle}>Search Input</Text>
          <Card variant="outlined" padding="md">
            <SearchableInput
              value={searchValue}
              onChangeText={setSearchValue}
              placeholder="Search components..."
            />
          </Card>

          <Spacer size={24} />

          {/* Section: Chips */}
          <Text style={styles.sectionTitle}>Chips</Text>
          <Card variant="outlined" padding="md">
            <View style={styles.chipRow}>
              <Chip
                text="Selectable Chip"
                selected={selectedChip}
                onPress={() => { setSelectedChip(!selectedChip); showSnackbar('Selectable Chip clicked successfully!', SNACKBAR_PRIORITY.SUCCESS) }}
              />
              <Chip text="Normal Chip" onPress={() => { showSnackbar('Normal Chip clicked successfully!', SNACKBAR_PRIORITY.INFO) }} />
              <Chip text="Disabled" disabled />
            </View>
          </Card>

          <Spacer size={24} />

          {/* Section: Form Controls */}
          <Text style={styles.sectionTitle}>Form Controls</Text>
          <Card variant="outlined" padding="md">
            <Dropdown
              label="Select Option"
              data={dropdownOptions}
              value={dropdownValue}
              onChange={setDropdownValue}
              placeholder="Choose an option"
              searchable
            />
            <Spacer size={16} />
            <Checkbox
              label="I agree to the terms and conditions"
              checked={checkboxChecked}
              onChange={setCheckboxChecked}
            />
            <Spacer size={16} />
            <Text style={styles.label}>Size Selection:</Text>
            <RadioGroup
              options={radioOptions}
              value={radioValue}
              onChange={setRadioValue}
            />
          </Card>

          <Spacer size={24} />

          {/* Section: Avatars */}
          <Text style={styles.sectionTitle}>Avatars</Text>
          <Card variant="outlined" padding="md">
            <View style={styles.avatarRow}>
              <Avatar name="John Doe" size="xs" />
              <Avatar name="Jane Smith" size="sm" />
              <Avatar name="Bob Wilson" size="md" />
              <Avatar name="Alice Brown" size="lg" />
            </View>
          </Card>

          <Spacer size={24} />

          {/* Section: Card Variants */}
          <Text style={styles.sectionTitle}>Card Variants</Text>
          <Card variant="elevated" padding="md">
            <Text style={styles.cardTitle}>Elevated Card</Text>
            <Text style={styles.cardText}>This card has a shadow effect.</Text>
          </Card>
          <Spacer size={12} />
          <Card variant="outlined" padding="md">
            <Text style={styles.cardTitle}>Outlined Card</Text>
            <Text style={styles.cardText}>This card has a border.</Text>
          </Card>
          <Spacer size={12} />
          <Card variant="filled" padding="md">
            <Text style={styles.cardTitle}>Filled Card</Text>
            <Text style={styles.cardText}>This card has a filled background.</Text>
          </Card>

          <Spacer size={24} />

          {/* Section: List Items */}
          <Text style={styles.sectionTitle}>List Items</Text>
          <ListItem
            title="Profile Settings"
            subtitle="Manage your account"
            leftElement={<User size={24} color={COLORS.primaryContainer} />}
            onPress={() => { }}
            itemSeparator={true}
          />
          <ListItem
            title="Notifications"
            subtitle="Configure alerts"
            leftElement={<Bell size={24} color={COLORS.primaryContainer} />}
            onPress={() => { }}
            itemSeparator={true}
          />
          <ListItem
            title="Messages"
            leftElement={<Mail size={24} color={COLORS.primaryContainer} />}
            onPress={() => { }}
            itemSeparator={true}
          />




          <Spacer size={24} />

          {/* Section: Snackbar Notifications */}
          <Text style={styles.sectionTitle}>Snackbar Notifications</Text>
          <Card variant="outlined" padding="md">
            <OutlineButton
              size="sm"
              text="Success Snackbar"
              onPress={() => showSnackbar('Operation completed successfully!', SNACKBAR_PRIORITY.SUCCESS)}
            />
            <Spacer size={12} />
            <OutlineButton
              size="sm"
              text="Error Snackbar"
              onPress={() => showSnackbar('Something went wrong!', SNACKBAR_PRIORITY.ERROR)}
            />
            <Spacer size={12} />
            <OutlineButton
              size="sm"
              text="Warning Snackbar"
              onPress={() => showSnackbar('Please check your input!', SNACKBAR_PRIORITY.WARNING)}
            />
            <Spacer size={12} />
            <OutlineButton
              size="sm"
              text="Info Snackbar"
              onPress={() => showSnackbar('Here is some information for you.', SNACKBAR_PRIORITY.INFO)}
            />
          </Card>

          <Spacer size={24} />

          {/* Section: Modals & Dialogs */}
          <Text style={styles.sectionTitle}>Modals & Dialogs</Text>
          <Card variant="outlined" padding="md">
            <Button
              text="Show Modal"
              size="sm"
              onPress={() => setShowModal(true)}
            />
            <Spacer size={12} />
            <GhostButton
              text="Show Confirmation"
              onPress={() => setShowConfirmation(true)}
            />
            <Spacer size={12} />
            <GhostButton
              text="Show Loader"
              onPress={() => {
                setShowLoader(true);
                setTimeout(() => setShowLoader(false), 2000);
              }}
            />
          </Card>

          <Spacer size={24} />

          {/* Section: Divider */}
          <Text style={styles.sectionTitle}>Dividers</Text>
          <Card variant="outlined" padding="md">
            <Text style={styles.label}>Solid Divider:</Text>
            <Spacer size={8} />
            <Divider />
            <Spacer size={16} />
            <Text style={styles.label}>Dashed Divider:</Text>
            <Spacer size={8} />
            <Divider dashed />
          </Card>

          <Spacer size={24} />

          {/* Section: Alert */}
          <Text style={styles.sectionTitle}>Alerts</Text>
          <Card variant="outlined" padding="md">
            <Alert
              title="Success"
              variant="success"
              message="Your changes have been saved successfully!"
              visible={showAlert}
              onDismiss={() => setShowAlert(false)}
            />
            <Spacer size={12} />
            <Alert
              variant="error"
              title="Error"
              visible={showAlert}
              message="Something went wrong. Please try again."
              onDismiss={() => setShowAlert(false)}
            />
            <Spacer size={12} />
            <Alert
              variant="warning"
              message="Your session will expire in 5 minutes."
              visible={showAlert}
              onDismiss={() => setShowAlert(false)}
            />
            <Spacer size={12} />
            <Alert
              variant="info"
              title="Info"
              message="New features are now available!"
            />
          </Card>

          <Spacer size={24} />

          {/* Section: DatePicker */}
          <Text style={styles.sectionTitle}>Date & Time Picker</Text>
          <Card variant="outlined" padding="md">
            <DatePicker
              label="Select Date"
              value={selectedDate}
              onChange={setSelectedDate}
              mode="date"
              placeholder="Choose a date"
            />
            <Spacer size={12} />
            <DatePicker
              label="Select Time"
              value={selectedDate}
              onChange={setSelectedDate}
              mode="time"
              placeholder="Choose a time"
            />
          </Card>

          <Spacer size={24} />

          {/* Section: Switch */}
          <Text style={styles.sectionTitle}>Switch</Text>
          <Card variant="outlined" padding="md">
            <Switch
              label="Enable notifications"
              value={switchValue}
              onValueChange={setSwitchValue}
            />
            <Spacer size={12} />
            <Switch
              label="Airplane mode"
              value={false}
              onValueChange={() => { }}
              disabled
            />
          </Card>

          <Spacer size={24} />

          {/* Section: Multi-Select Dropdown */}
          <Text style={styles.sectionTitle}>Multi-Select Dropdown</Text>
          <Card variant="outlined" padding="md">
            <MultiSelectDropdown
              label="Select Multiple Items"
              data={[
                { label: 'React', value: 'react' },
                { label: 'React Native', value: 'react-native' },
                { label: 'TypeScript', value: 'typescript' },
                { label: 'JavaScript', value: 'javascript' },
                { label: 'Node.js', value: 'nodejs' },
              ]}
              value={multiSelectValues}
              onChange={setMultiSelectValues}
              placeholder="Select technologies"
              searchable
            />
          </Card>

          <Spacer size={24} />

          {/* Section: Image Components */}
          <Text style={styles.sectionTitle}>Image Components</Text>
          <Card variant="outlined" padding="md">
            <Text style={styles.label}>Image Container:</Text>
            <Spacer size={12} />
            <View style={styles.avatarRow}>
              <ImageContainer
                variant="square"
                size="sm"
                placeholderText="Square"
              />
              <ImageContainer
                variant="circle"
                size="sm"
                placeholderText="Circle"
              />
              <ImageContainer
                variant="rectangle"
                size="sm"
                placeholderText="Rectangle"
              />
            </View>
            <Spacer size={16} />
            <Text style={styles.label}>Image Upload:</Text>
            <ImageUpload
              label="Upload Profile Picture"
              onImageSelected={setImageUri}
              value={imageUri}
            />
          </Card>

          <Spacer size={24} />

          {/* Section: FlatList */}
          <Text style={styles.sectionTitle}>FlatList</Text>
          <Card variant="outlined" padding="md">
            <View style={{ height: 200 }}>
              <FlatList
                data={['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6']}
                renderItem={(item, index) => (
                  <View style={{ padding: 12 }}>
                    <Text>{item}</Text>
                  </View>
                )}
                itemSeparator={<Divider />}
                nestedScrollEnabled={true}
              />
            </View>
          </Card>

          <Spacer size={48} />
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Modal */}
      <Modal
        visible={showModal}
        onDismiss={() => setShowModal(false)}
        presentation="bottomSheet"
      >
        <Text style={styles.modalTitle}>Bottom Sheet Modal</Text>
        <Text style={styles.modalText}>
          This is a bottom sheet modal. You can add any content here.
        </Text>
        <Spacer size={16} />
        <Button
          text="Close Modal"
          textColor='white'
          onPress={() => setShowModal(false)}
          size="sm" />
      </Modal>

      {/* Confirmation Dialog */}
      <ConfirmationDialog
        visible={showConfirmation}
        title="Confirm Action"
        message="Are you sure you want to proceed with this action? This cannot be undone."
        confirmText="Yes, Proceed"
        cancelText="Cancel"
        onConfirm={() => {
          setShowConfirmation(false);
          showSnackbar('Action confirmed successfully!', SNACKBAR_PRIORITY.SUCCESS);
        }}
        onCancel={() => setShowConfirmation(false)}
      />

      {/* Centralized Snackbar */}
      <CentralizedSnackbar />

      {/* Loader */}
      {showLoader && <Loader text="Loading..." />}
    </SafeAreaView>
  );
}

// Main App component with providers
export default function App() {
  return (
    <SafeAreaProvider>
      <SnackbarProvider>
        <PaperProvider>
          <AppContent />
        </PaperProvider>
      </SnackbarProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: SPACING.lg,
  },
  sectionTitle: {
    fontSize: FONT_SIZE.xl,
    fontWeight: FONT_WEIGHT.bold,
    color: COLORS.text,
    marginBottom: SPACING.md,
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.sm,
  },
  avatarRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
  },
  label: {
    fontSize: FONT_SIZE.sm,
    fontWeight: FONT_WEIGHT.medium,
    color: COLORS.textSecondary,
    marginBottom: SPACING.xs,
  },
  cardTitle: {
    fontSize: FONT_SIZE.lg,
    fontWeight: FONT_WEIGHT.bold,
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  cardText: {
    fontSize: FONT_SIZE.md,
    color: COLORS.textSecondary,
  },
  modalTitle: {
    fontSize: FONT_SIZE.xl,
    fontWeight: FONT_WEIGHT.bold,
    color: COLORS.text,
    textAlign: 'center',
    marginBottom: SPACING.md,
  },
  modalText: {
    fontSize: FONT_SIZE.md,
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
  },
});
