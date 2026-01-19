/**
 * Dropdown Component
 * A customizable dropdown/select component
 */

import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, TextInput } from 'react-native';
import { DropdownProps, DropdownItem } from '../../../types';
import { COLORS } from '../../../tokens/colors';
import { SPACING, BORDER_RADIUS, SHADOW } from '../../../tokens/spacing';
import { FONT_SIZE, FONT_WEIGHT } from '../../../tokens/typography';
import Modal from '../../feedback/Modal';
import { ChevronDown, Search, Check } from 'lucide-react-native';

export function Dropdown<T = string>({
    data,
    value,
    onChange,
    placeholder = 'Select an option',
    label,
    disabled = false,
    searchable = false,
    containerStyle,
    dropdownStyle,
    itemStyle,
    selectedItemStyle,
    labelStyle,
}: DropdownProps<T>) {
    const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const selectedItem = data.find((item) => item.value === value);

    const filteredData = searchable && searchQuery
        ? data.filter((item) =>
            item.label.toLowerCase().includes(searchQuery.toLowerCase())
        )
        : data;

    const handleSelect = (item: DropdownItem<T>) => {
        onChange(item.value);
        setIsOpen(false);
        setSearchQuery('');
    };

    const renderItem = ({ item }: { item: DropdownItem<T> }) => {
        const isSelected = item.value === value;
        return (
            <TouchableOpacity
                onPress={() => handleSelect(item)}
                style={[
                    styles.item,
                    itemStyle,
                    isSelected && styles.selectedItem,
                    isSelected && selectedItemStyle,
                ]}
            >
                <Text
                    style={[
                        styles.itemText,
                        isSelected && styles.selectedItemText,
                    ]}
                >
                    {item.label}
                </Text>
                {isSelected && <Check size={20} color={COLORS.primaryContainer} />}
            </TouchableOpacity>
        );
    };

    return (
        <View style={[styles.container, containerStyle]}>
            {label && <Text style={[styles.label, labelStyle]}>{label}</Text>}

            <TouchableOpacity
                onPress={() => !disabled && setIsOpen(true)}
                disabled={disabled}
                style={[
                    styles.selector,
                    disabled && styles.selectorDisabled,
                    dropdownStyle,
                ]}
            >
                <Text
                    style={[
                        styles.selectorText,
                        !selectedItem && styles.placeholderText,
                        disabled && styles.disabledText,
                    ]}
                >
                    {selectedItem?.label || placeholder}
                </Text>
                <ChevronDown size={20} color={disabled ? COLORS.disabledText : COLORS.textSecondary} />
            </TouchableOpacity>

            <Modal
                visible={isOpen}
                onDismiss={() => {
                    setIsOpen(false);
                    setSearchQuery('');
                }}
                presentation="bottomSheet"
            >
                <View style={styles.modalContent}>
                    {label && <Text style={styles.modalTitle}>{label}</Text>}

                    {searchable && (
                        <View style={styles.searchContainer}>
                            <Search size={18} color={COLORS.textSecondary} />
                            <TextInput
                                style={styles.searchInput}
                                placeholder="Search..."
                                value={searchQuery}
                                onChangeText={setSearchQuery}
                                placeholderTextColor={COLORS.textSecondary}
                            />
                        </View>
                    )}

                    <FlatList
                        data={filteredData}
                        keyExtractor={(item, index) => `${item.value}-${index}`}
                        renderItem={renderItem}
                        style={styles.list}
                        showsVerticalScrollIndicator={false}
                    />
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        marginBottom: SPACING.md,
    },
    label: {
        fontSize: FONT_SIZE.sm,
        fontWeight: FONT_WEIGHT.medium,
        color: COLORS.textSecondary,
        marginBottom: SPACING.xs,
    },
    selector: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: SPACING.md,
        paddingVertical: SPACING.md,
        backgroundColor: COLORS.background,
        borderRadius: BORDER_RADIUS.md,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    selectorDisabled: {
        backgroundColor: COLORS.disabled,
        borderColor: COLORS.disabled,
    },
    selectorText: {
        fontSize: FONT_SIZE.md,
        color: COLORS.text,
        flex: 1,
    },
    placeholderText: {
        color: COLORS.textSecondary,
    },
    disabledText: {
        color: COLORS.disabledText,
    },
    modalContent: {
        maxHeight: 400,
    },
    modalTitle: {
        fontSize: FONT_SIZE.lg,
        fontWeight: FONT_WEIGHT.bold,
        color: COLORS.text,
        marginBottom: SPACING.md,
        textAlign: 'center',
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.backgroundGray,
        borderRadius: BORDER_RADIUS.md,
        paddingHorizontal: SPACING.md,
        marginBottom: SPACING.md,
    },
    searchInput: {
        flex: 1,
        paddingVertical: SPACING.sm,
        paddingHorizontal: SPACING.sm,
        fontSize: FONT_SIZE.md,
        color: COLORS.text,
    },
    list: {
        maxHeight: 300,
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: SPACING.md,
        paddingHorizontal: SPACING.md,
        borderRadius: BORDER_RADIUS.md,
    },
    selectedItem: {
        backgroundColor: COLORS.successBackground,
    },
    itemText: {
        fontSize: FONT_SIZE.md,
        color: COLORS.text,
        flex: 1,
    },
    selectedItemText: {
        color: COLORS.primaryContainer,
        fontWeight: FONT_WEIGHT.medium,
    },
});

export default Dropdown;
