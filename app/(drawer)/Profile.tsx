import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Modal, TextInput, Button } from 'react-native';
import { useAuth } from '@/context/AuthContext';

const Profile = () => {
  const [profileData, setProfileData] = React.useState({
    imageUrl: 'https://via.placeholder.com/150',
    username: 'Username',
    email: 'user@example.com',
    bio: 'This is a short bio about the user. Edit this to add actual bio data.',
  });

  const [isEditing, setIsEditing] = React.useState({ field: '', value: false });
  const [tempValue, setTempValue] = React.useState('');

  const handleEdit = (field: string) => {
    setIsEditing({ field, value: true });
    setTempValue(profileData[field]);
  };

  const handleClose = () => {
    setIsEditing({ field: '', value: false });
    setTempValue('');
  };

  const handleSave = () => {
    setProfileData({ ...profileData, [isEditing.field]: tempValue });
    handleClose();
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: profileData.imageUrl }} style={styles.profileImage} />
      <View style={styles.infoContainer}>
        <Text style={styles.username}>{profileData.username}</Text>
        <TouchableOpacity onPress={() => handleEdit('username')}>
          <Text style={styles.editIcon}>✏️</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.email}>{profileData.email}</Text>
      <View style={styles.infoContainer}>
        <Text style={styles.bio}>{profileData.bio}</Text>
        <TouchableOpacity onPress={() => handleEdit('bio')}>
          <Text style={styles.editIcon}>✏️</Text>
        </TouchableOpacity>
      </View>

      {/* Modal for Editing */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isEditing.value}
        onRequestClose={handleClose}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TextInput
              style={styles.modalText}
              onChangeText={setTempValue}
              value={tempValue}
            />
            <Button title="Save" onPress={handleSave} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  // Existing styles...
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  editIcon: {
    marginLeft: 10,
    fontSize: 20,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
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

export default Profile