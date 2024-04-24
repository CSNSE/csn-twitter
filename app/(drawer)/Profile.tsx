import React, { useState } from 'react';
import { View, Text, Image, Modal, TextInput, Button, StyleSheet } from 'react-native';
import { useAuth } from '@/context/AuthContext';

const Profile = () => {
    const { currentUser, updateUsername } = useAuth();
    const [isEditing, setEditing] = useState(false);
    const [newUsername, setNewUsername] = useState(currentUser.username);

    const handleSave = async () => {
        try {
            await updateUsername(newUsername);
            setEditing(false);
        } catch (error) {
            console.error(error); // Handle error (e.g., show an error message)
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.profileCard}>
                <Image source={{ uri: currentUser.image || 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png' }} style={styles.profileImage} />
                <Text style={styles.username} onPress={() => setEditing(true)}>{currentUser.username}</Text>
                <Text style={styles.name}>{currentUser.name}</Text>
                <Text style={styles.email}>{currentUser.email}</Text>
            </View>

            {isEditing && (
                <Modal
                    visible={isEditing}
                    animationType="slide"
                    transparent={true}
                    onRequestClose={() => setEditing(false)}
                >
                    <View style={styles.modalOverlay}>
                        <View style={styles.modalContent}>
                            <TextInput
                                value={newUsername}
                                onChangeText={setNewUsername}
                                style={styles.input}
                                autoFocus={true}
                            />
                            <View style={styles.buttonContainer}>
                                <Button title="Save" onPress={handleSave} color="#007AFF" />
                                <Button title="Cancel" onPress={() => setEditing(false)} color="#666" />
                            </View>
                        </View>
                    </View>
                </Modal>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EBF0F0',
        alignItems: 'center',
        justifyContent: 'center',
    },
    profileCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 32,
        padding: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    profileImage: {
        width: 130,
        height: 130,
        borderRadius: 65,
        marginBottom: 10,
    },
    username: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 4,
    },
    name: {
        fontSize: 20,
        fontWeight: 'normal',
        color: '#666',
        marginBottom: 2,
    },
    email: {
        fontSize: 16,
        color: '#333',
        marginBottom: 10,
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '80%',
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    input: {
        width: '100%',
        padding: 10,
        marginBottom: 10,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 10,
    },
});

export default Profile;