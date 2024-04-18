import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
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
            <Text style={styles.email}>Email: {currentUser.email}</Text>
            <Text style={styles.username}>Username: {currentUser.username}</Text>
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
    username: {
        fontSize: 18,
        marginBottom: 10,
    },
    infoText: {
        fontSize: 16,
        textAlign: 'center',
    },
    errorText: {
        fontSize: 16,
        textAlign: 'center',
        color: 'red',
    },
});

export default Profile;