import { View, Text, TextInput, Pressable, StyleSheet, Alert } from 'react-native';
import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import { login, register } from '@/lib/api/auth';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');

  const [isCreatingAccount, setIsCreatingAccount] = useState(false)
  const router = useRouter();

  const onSignIn = async () => {
    try {
      const response = await login({ email });
      // Assuming the login function navigates to the verification code page or handles it internally
      router.push({ pathname: '/authenticate', params: { email } });
    } catch (e: unknown) {
      if (e instanceof Error) {
        Alert.alert('Error', e.message);
      } else {
        Alert.alert('Error', 'An unknown error occurred');
      }
    }    
  };

  const onCreateAccount = async () => {
    try {
      const response = await register({ email, username, name });
      const result = await response.json();  // Ensure to parse the JSON response to access potential messages or data
  
      if (response.ok) {
        router.push({ pathname: '/authenticate', params: { email } });  // Navigate on successful account creation
      } else {
        // Check if there's a specific message from the server in case of failure
        throw new Error(result.message || 'Failed to create account');  
      }
    } catch (e: unknown) {
      if (e instanceof Error) {
        Alert.alert('Error', e.message);
      } else {
        Alert.alert('Error', 'An unknown error occurred');
      }
    }
  };  

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{isCreatingAccount ? 'Create Account' : 'Sign in'}</Text>
      
      {isCreatingAccount && (
      <TextInput
        placeholder="Name"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      )}
      
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />

      {isCreatingAccount && (
        <TextInput
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
          style={styles.input}
        />
      )}

      <Pressable style={styles.button} onPress={isCreatingAccount ? onCreateAccount : onSignIn}>
        <Text style={styles.buttonText}>{isCreatingAccount ? 'Create Account' : 'Sign in'}</Text>
      </Pressable>

      <Pressable onPress={() => setIsCreatingAccount(!isCreatingAccount)} style={{ marginTop: 20 }}>
  <Text>
    {isCreatingAccount ? 'Already have an account? ' : 'Don’t have an account? '}
    <Text style={{color: '#024b8f' }}> {/* Adjust the color and fontWeight as needed */}
      {isCreatingAccount ? 'Sign in' : 'Create one'}
    </Text>
  </Text>
</Pressable>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    justifyContent: 'center',
    padding: 24,
  },
  label: {
    fontSize: 24,
    marginVertical: 5,
    color: '#024b8f',
  },
  input: {
    borderColor: 'gray',
    borderWidth: StyleSheet.hairlineWidth,
    padding: 10,
    fontSize: 20,
    marginVertical: 5,
    borderRadius: 10,
  },
  button: {
    backgroundColor: '#024b8f',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginVertical: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default SignIn;
