import React, { useState } from 'react';
import { View, TextInput, StyleSheet, FlatList, Text } from 'react-native';

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search tweets or users..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      {/* Placeholder for search results */}
      <Text>Search results appear here...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  input: {
    height: 40,
    marginBottom: 20,
    borderWidth: 1,
    padding: 10,
  },
});

