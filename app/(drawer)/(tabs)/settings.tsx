import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useAuth } from '@/context/AuthContext';
import { Ionicons } from '@expo/vector-icons';

const SettingsScreen = () => {
  const { removeAuthToken } = useAuth();

  const handleLogout = () => {
    Alert.alert(
      "Confirm Logout",
      "Are you sure you want to logout?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Logout",
          style: 'destructive',
          onPress: async () => {
            await removeAuthToken();
            // Navigate to the login screen or perform other cleanup actions as necessary
          }
        }
      ],
      { cancelable: false }
    );
  };

  const navigateToProfileSettings = () => {
    console.log('Navigate to profile settings');
    // Insert navigation logic here
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.settingItem} onPress={navigateToProfileSettings}>
        <Ionicons name="person-circle" size={24} color="black" />
        <Text style={styles.text}>Profile Settings</Text>
        <Ionicons name="chevron-forward" size={24} color="black" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.settingItem} onPress={handleLogout}>
        <Ionicons name="log-out-outline" size={24} color="black" />
        <Text style={styles.text}>Logout</Text>
        <Ionicons name="chevron-forward" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white', // Set the background to white for consistency
    padding: 20,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: 'white', // Ensure each item also has a white background
    paddingHorizontal: 10,
  },
  text: {
    fontSize: 16,
    marginLeft: 10,
    flex: 1,
  },
});

export default SettingsScreen;
