import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useAuth } from '@/context/AuthContext'; // Ensure the path is correct

const Profile = () => {
  const { currentUser } = useAuth();

  return (
    <View style={styles.container}>
      {currentUser ? (
        <Text style={styles.email}>Email: {currentUser.email}</Text>
      ) : (
        <Text style={styles.infoText}>User is not logged in</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  email: {
    fontSize: 18,
    marginBottom: 10,
  },
  infoText: {
    fontSize: 16,
    textAlign: 'center',
  },
});

export default Profile;
