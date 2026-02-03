/**
 * MultiSelectDropdown Component
 * A dropdown with multi-select and autocomplete functionality
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  FlatList,
  TextInput,
} from 'react-native';
import { ChevronDown, X, Check, Search } from 'lucide-react-native';
import { MultiSelectDropdownProps } from '../../../types';
import { COLORS, SPACING, FONT_SIZE, FONT_WEIGHT } from '../../../tokens';

export const MultiSelectDropdown = <T extends string | number>({
  data,
  value = [],
  onChange,
  placeholder = 'Select items',
  label,
  disabled = false,
  searchable = true,
  maxSelections,
  containerStyle,
  dropdownStyle,
  itemStyle,
  selectedItemStyle,
  labelStyle,
  selectAll = true,
  clearAll = true,
}: MultiSelectDropdownProps<T>) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredData = searchable
    ? data.filter(item =>
      item.label.toLowerCase().includes(searchQuery.toLowerCase())
    )
    : data;

  const isSelected = (itemValue: T) => value.includes(itemValue);

  const handleSelect = (itemValue: T) => {
    if (isSelected(itemValue)) {
      onChange(value.filter(v => v !== itemValue));
    } else {
      if (maxSelections && value.length >= maxSelections) {
        return;
      }
      onChange([...value, itemValue]);
    }
  };

  const handleRemove = (itemValue: T) => {
    onChange(value.filter(v => v !== itemValue));
  };

  const handleSelectAll = () => {
    const newValues = [...value];
    filteredData.forEach(item => {
      if (!newValues.includes(item.value)) {
        if (!maxSelections || newValues.length < maxSelections) {
          newValues.push(item.value);
        }
      }
    });

    onChange(newValues);
  };

  const handleClearAll = () => {
    onChange([]);
  };

  const getSelectedLabels = () => {
    return data
      .filter(item => value.includes(item.value))
      .map(item => item.label);
  };

  const selectedLabels = getSelectedLabels();

  return (
    <View style={[styles.container, containerStyle]}>
      {label && <Text style={[styles.label, labelStyle]}>{label}</Text>}

      <TouchableOpacity
        style={[
          styles.dropdown,
          disabled && styles.dropdownDisabled,
          dropdownStyle,
        ]}
        onPress={() => !disabled && setIsOpen(true)}
        disabled={disabled}
      >
        <View style={styles.selectedContainer}>
          {selectedLabels.length === 0 ? (
            <Text style={styles.placeholder}>{placeholder}</Text>
          ) : (
            <View style={styles.chipsContainer}>
              {selectedLabels.map((label, index) => (
                <View key={index} style={styles.chip}>
                  <Text style={styles.chipText} numberOfLines={1}>
                    {label}
                  </Text>
                  {!disabled && (
                    <TouchableOpacity
                      onPress={() => {
                        const itemValue = data.find(item => item.label === label)?.value;
                        if (itemValue) handleRemove(itemValue);
                      }}
                      hitSlop={{ top: 5, bottom: 5, left: 5, right: 5 }}
                    >
                      <X size={14} color={COLORS.white} />
                    </TouchableOpacity>
                  )}
                </View>
              ))}
            </View>
          )}
        </View>
        <ChevronDown
          size={20}
          color={disabled ? COLORS.textDisabled : COLORS.textSecondary}
        />
      </TouchableOpacity>

      <Modal
        visible={isOpen}
        transparent
        animationType="fade"
        onRequestClose={() => setIsOpen(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setIsOpen(false)}
        >
          <View
            style={styles.modalContent}
            onStartShouldSetResponder={() => true}
          >
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>{label || 'Select Items'}</Text>
              <TouchableOpacity onPress={() => setIsOpen(false)}>
                <X size={24} color={COLORS.text} />
              </TouchableOpacity>
            </View>

            {searchable && (
              <View style={styles.searchContainer}>
                <Search size={20} color={COLORS.textSecondary} />
                <TextInput
                  style={styles.searchInput}
                  placeholder="Search..."
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                  placeholderTextColor={COLORS.textSecondary}
                />
                {searchQuery.length > 0 && (
                  <TouchableOpacity onPress={() => setSearchQuery('')}>
                    <X size={20} color={COLORS.textSecondary} />
                  </TouchableOpacity>
                )}
              </View>
            )}

            {(selectAll || clearAll) && (
              <View style={styles.actionsContainer}>
                {selectAll && (
                  <TouchableOpacity
                    onPress={handleSelectAll}
                    style={styles.actionButton}
                  >
                    <Text style={styles.actionText}>Select All</Text>
                  </TouchableOpacity>
                )}
                {clearAll && (
                  <TouchableOpacity
                    onPress={handleClearAll}
                    style={styles.actionButton}
                  >
                    <Text style={styles.actionText}>Clear All</Text>
                  </TouchableOpacity>
                )}
              </View>
            )}



            <FlatList
              data={filteredData}
              keyExtractor={(item, index) => `${item.value}-${index}`}
              renderItem={({ item }) => {
                const selected = isSelected(item.value);
                return (
                  <TouchableOpacity
                    style={[
                      styles.item,
                      selected && styles.selectedItem,
                      itemStyle,
                      selected && selectedItemStyle,
                    ]}
                    onPress={() => handleSelect(item.value)}
                  >
                    <View style={styles.checkbox}>
                      {selected && <Check size={16} color={COLORS.primary} />}
                    </View>
                    <Text
                      style={[
                        styles.itemText,
                        selected && styles.selectedItemText,
                      ]}
                    >
                      {item.label}
                    </Text>
                  </TouchableOpacity>
                );
              }}
              ListEmptyComponent={
                <Text style={styles.emptyText}>No items found</Text>
              }
            />



            <TouchableOpacity
              style={styles.doneButton}
              onPress={() => setIsOpen(false)}
            >
              <Text style={styles.doneButtonText}>
                Done ({value.length} selected)
              </Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
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
  dropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    padding: SPACING.sm,
    minHeight: 48,
  },
  dropdownDisabled: {
    backgroundColor: COLORS.backgroundSecondary,
  },
  selectedContainer: {
    flex: 1,
    marginRight: SPACING.sm,
  },
  placeholder: {
    fontSize: FONT_SIZE.md,
    color: COLORS.textSecondary,
  },
  chipsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.xs,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primaryContainer,
    borderRadius: 16,
    paddingVertical: 4,
    paddingHorizontal: 10,
    gap: 4,
  },
  chipText: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.white,
    maxWidth: 100,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    width: '90%',
    maxHeight: '80%',
    overflow: 'hidden',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: SPACING.lg,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  modalTitle: {
    fontSize: FONT_SIZE.lg,
    fontWeight: FONT_WEIGHT.bold,
    color: COLORS.text,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.backgroundSecondary,
    borderRadius: 8,
    padding: SPACING.sm,
    margin: SPACING.md,
    gap: SPACING.sm,
    marginBottom: 0,
  },
  searchInput: {
    flex: 1,
    fontSize: FONT_SIZE.md,
    color: COLORS.text,
    padding: 0,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  selectedItem: {
    backgroundColor: COLORS.backgroundSecondary,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: COLORS.border,
    borderRadius: 4,
    marginRight: SPACING.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemText: {
    fontSize: FONT_SIZE.md,
    color: COLORS.text,
    flex: 1,
  },
  selectedItemText: {
    fontWeight: FONT_WEIGHT.medium,
  },
  emptyText: {
    fontSize: FONT_SIZE.md,
    color: COLORS.textSecondary,
    textAlign: 'center',
    padding: SPACING.xl,
  },
  doneButton: {
    backgroundColor: COLORS.primaryContainer,
    padding: SPACING.md,
    margin: SPACING.md,
    borderRadius: 8,
    alignItems: 'center',
  },
  doneButtonText: {
    fontSize: FONT_SIZE.md,
    fontWeight: FONT_WEIGHT.bold,
    color: COLORS.white,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: SPACING.md,
    gap: SPACING.sm,
    // backgroundColor: '#ea1010ff',
  },
  actionButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    backgroundColor: COLORS.backgroundSecondary,
    // backgroundColor: '#eadc10ff',
  },
  actionText: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.primary,
    fontWeight: FONT_WEIGHT.medium,
    // backgroundColor: '#10ea55ff',
  },
});

export default MultiSelectDropdown;
