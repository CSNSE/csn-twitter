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
            // Handle error (e.g., show an error message)
            console.error(error);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={{ uri: currentUser.image || 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png' }} style={styles.profileImage} />
                <Text style={styles.username} onPress={() => setEditing(true)}>{currentUser.username}</Text>
            </View>
            <View style={styles.userInfo}>
                <Text style={styles.userDetailLabel}>Email:</Text>
                <Text style={styles.userDetail}>{currentUser.email}</Text>
            </View>

            {isEditing && (
                <Modal
                    visible={isEditing}
                    animationType="fade"
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
        backgroundColor: '#fff',
        padding: 20,
    },
    header: {
        alignItems: 'center',
        marginBottom: 20,
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 10,
    },
    username: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
    },
    userInfo: {
        paddingHorizontal: 20,
        paddingTop: 10,
    },
    userDetailLabel: {
        fontSize: 16,
        color: '#666',
        marginBottom: 5,
    },
    userDetail: {
        fontSize: 18,
        marginBottom: 10,
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Adds a semi-transparent overlay
    },
    modalContent: {
        width: '80%',
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
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