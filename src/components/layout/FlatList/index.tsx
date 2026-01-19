/**
 * FlatList Component
 * A wrapper around React Native FlatList with enhanced features
 */

import React from 'react';
import {
  FlatList as RNFlatList,
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { FlatListProps } from '../../../types';
import { COLORS, SPACING, FONT_SIZE, FONT_WEIGHT } from '../../../tokens';

export const FlatList = <T extends any>({
  data,
  renderItem,
  keyExtractor,
  emptyComponent,
  loadingComponent,
  loading = false,
  itemSeparator,
  onEndReached,
  onEndReachedThreshold = 0.5,
  showScrollIndicator = false,
  containerStyle,
  contentContainerStyle,
  nestedScrollEnabled = false,
}: FlatListProps<T>) => {
  const defaultKeyExtractor = (item: T, index: number) => {
    if (keyExtractor) {
      return keyExtractor(item, index);
    }
    return `item-${index}`;
  };

  const defaultEmptyComponent = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>No items to display</Text>
    </View>
  );

  const defaultLoadingComponent = () => (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color={COLORS.primaryContainer} />
      <Text style={styles.loadingText}>Loading...</Text>
    </View>
  );

  const renderItemWrapper = ({ item, index }: { item: T; index: number }) => {
    return renderItem(item, index);
  };

  const renderSeparator = () => {
    if (itemSeparator) {
      return <>{itemSeparator}</>;
    }
    return null;
  };

  if (loading) {
    return loadingComponent ? <>{loadingComponent}</> : defaultLoadingComponent();
  }

  return (
    <RNFlatList
      data={data}
      renderItem={renderItemWrapper}
      keyExtractor={defaultKeyExtractor}
      ListEmptyComponent={emptyComponent ? <>{emptyComponent}</> : defaultEmptyComponent}
      ItemSeparatorComponent={renderSeparator}
      onEndReached={onEndReached}
      onEndReachedThreshold={onEndReachedThreshold}
      showsVerticalScrollIndicator={showScrollIndicator}
      style={[styles.container, containerStyle]}
      contentContainerStyle={contentContainerStyle}
      nestedScrollEnabled={nestedScrollEnabled}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.xl,
  },
  emptyText: {
    fontSize: FONT_SIZE.md,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.xl,
  },
  loadingText: {
    fontSize: FONT_SIZE.md,
    color: COLORS.textSecondary,
    marginTop: SPACING.md,
  },
});

export default FlatList;
