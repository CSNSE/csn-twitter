import React from 'react';
import { StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';

export default function TabTwoScreen() {
  return (
    <View style={styles.container}>
      <WebView
        source={{ uri: 'https://communityschoolnaples.myschoolapp.com/app/student#studentmyday/assignment-center' }} // Replace with your school website URL
        style={styles.webview}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webview: {
    flex: 1,
  },
});

