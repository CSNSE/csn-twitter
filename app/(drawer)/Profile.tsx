import { View, Text, Image, StyleSheet } from 'react-native';
import React from 'react';

const Profile = () => {
  // Placeholder data - replace with actual data as needed
  const profileData = {
    imageUrl: 'https://via.placeholder.com/150', // Replace with actual image URL
    username: 'Username',
    email: 'user@example.com',
    bio: 'This is a short bio about the user. Edit this to add actual bio data.',
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: profileData.imageUrl }} style={styles.profileImage} />
      <Text style={styles.username}>{profileData.username}</Text>
      <Text style={styles.email}>{profileData.email}</Text>
      <Text style={styles.bio}>{profileData.bio}</Text>
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
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75, // Makes the image circular
    marginBottom: 20,
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  email: {
    fontSize: 18,
    marginBottom: 10,
  },
  bio: {
    fontSize: 16,
    textAlign: 'center',
  },
});

export default Profile;
