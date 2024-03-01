import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useAuth } from '@/context/AuthContext';

const SettingsScreen = () => {
  const { removeAuthToken } = useAuth();
  const handleLogout = async () => {
    await removeAuthToken();
    // Navigate to the login screen or perform other cleanup actions as necessary
  };
  return (
    <View style={styles.container}>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SettingsScreen;
