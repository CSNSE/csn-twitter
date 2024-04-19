import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { useAuth } from '@/context/AuthContext'; // Ensure the path is correct

const Profile = () => {
    const { currentUser, loadingError } = useAuth();

    if (loadingError) {
        return <Text style={styles.errorText}>Error: {loadingError}</Text>;
    }

    if (!currentUser) {
        return <Text style={styles.infoText}>Loading user data...</Text>;
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={{ uri: currentUser.image || 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png' }} style={styles.profileImage} />
                <Text style={styles.username}>{currentUser.username}</Text>
            </View>
            <View style={styles.userInfo}>
                <Text style={styles.userDetailLabel}>Email:</Text>
                <Text style={styles.userDetail}>{currentUser.email}</Text>
            </View>
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
    errorText: {
        fontSize: 16,
        textAlign: 'center',
        color: 'red',
    },
    infoText: {
        fontSize: 16,
        textAlign: 'center',
        color: '#333',
    },
});

export default Profile;