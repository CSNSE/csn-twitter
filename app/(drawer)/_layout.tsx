import { withLayoutContext } from "expo-router";
import { DrawerContentScrollView, DrawerItemList, createDrawerNavigator } from "@react-navigation/drawer";
import { ActivityIndicator, Text } from "react-native";
import { useAuth } from "@/context/AuthContext";

//logout button (i didnt put it as its own component, i put it inside the drawer for testing)
import React from 'react';
import { Button, View } from 'react-native';

const LogoutButton = () => {
  const { removeAuthToken } = useAuth();

  const handleLogout = async () => {
    await removeAuthToken();
    // Add any additional logout logic if needed
  };

  return (
    <View style={{ margin: 20 }}>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
};


const DrawerNavigator = createDrawerNavigator().Navigator;

const Drawer = withLayoutContext(DrawerNavigator);

export const unstable_settings = {
    // Ensure that reloading on `/modal` keeps a back button present.
    initialRouteName: '(tabs)', 
  };

function CustomDrawerContent(props) {
    return (
        <DrawerContentScrollView {...props}>
          <Text style={{ alignSelf: 'center', fontSize: 20 }}>put profile display here</Text>
          <DrawerItemList {...props} />
          <LogoutButton />
        </DrawerContentScrollView>
    );
}

export default function DrawerLayout() {
  const {authToken} = useAuth();

  if (!authToken) {
    return <ActivityIndicator />;
  }

    return <Drawer drawerContent={(props) => <CustomDrawerContent {...props} />}>
        <Drawer.Screen 
          name='(tabs)' 
          options={{ headerShown: false, title: 'Home' }} 
        />
        <Drawer.Screen 
          name='bookmarks' 
          options={{ title: 'Bookmarks' }} 
        />
        <Drawer.Screen 
          name='profile' 
          options={{ title: 'Profile Settings' }} 
        />
    </Drawer>
}
