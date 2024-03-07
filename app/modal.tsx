import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet, ScrollView } from 'react-native';

import { Text, View } from '@/components/Themed';

export default function IntroductionModal() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Welcome to CSN Twitter!</Text>
      
      <Text style={styles.paragraph}>
        Discover what’s happening in the world right now. Join conversations, share your thoughts, and connect with others on our platform.
      </Text>

      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />

      <Text style={styles.sectionTitle}>Features</Text>
      <Text style={styles.bulletPoint}>• Follow your interests and get updates from your favorite accounts</Text>
      <Text style={styles.bulletPoint}>• Tweet, Retweet, Reply to tweets, Share, and Like</Text>
      <Text style={styles.bulletPoint}>• Explore news, entertainment, and more on your personalized feed</Text>

      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />

      <Text style={styles.paragraph}>
        Get started by signing in or creating a new account today. Navigate through the app using the drawer menu to explore different sections.
      </Text>

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 5,
  },
  paragraph: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'justify',
  },
  bulletPoint: {
    fontSize: 16,
    marginBottom: 5,
  },
  separator: {
    marginVertical: 20,
    height: 1,
    width: '100%',
  },
});

// testing # commits
