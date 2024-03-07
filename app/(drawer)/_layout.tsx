import { withLayoutContext } from "expo-router";
import { DrawerContentScrollView, DrawerItemList, createDrawerNavigator } from "@react-navigation/drawer";
import { ActivityIndicator, Text } from "react-native";
import { useAuth } from "@/context/AuthContext";

//logout button (i didnt put it as its own component, i put it inside the drawer for testing)
import React from 'react';
import { Button, View } from 'react-native';


const DrawerNavigator = createDrawerNavigator().Navigator;

const Drawer = withLayoutContext(DrawerNavigator);

export const unstable_settings = {
    // Ensure that reloading on `/modal` keeps a back button present.
    initialRouteName: '(tabs)', 
  };

function CustomDrawerContent(props) {
    return (
        <DrawerContentScrollView {...props}>
          <Text style={{ alignSelf: 'center', fontSize: 20 }}>put profile preview here</Text>
          <DrawerItemList {...props} />
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
          name='Profile' 
          options={{ title: 'Profile' }} 
        />
    </Drawer>
}
