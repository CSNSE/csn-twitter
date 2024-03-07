import { StyleSheet, View, FlatList, Pressable, ActivityIndicator, Text } from 'react-native';
import Tweet from '@/components/tweet';
// import tweets from '@/assets/data/tweets';
import { Entypo } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { useEffect, useState } from 'react';
import { useTweetsApi } from '@/lib/api/tweets';
import { useQuery } from '@tanstack/react-query';
import { RefreshControl } from 'react-native';
import React from 'react';
import { useQueryClient } from '@tanstack/react-query';

export default function FeedScreen() {
  const {listTweets} = useTweetsApi();

  const [refreshing, setRefreshing] = useState(false);
  const queryClient = useQueryClient();

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    await queryClient.invalidateQueries(['tweets']);
    setRefreshing(false);
  
    try {
      // Assuming listTweets is an async function that fetches the tweets
      await listTweets().then(data => {
        // Assuming 'data' contains the latest tweets
        // Update your state or cache here with the latest tweets
      });
    } catch (error) {
      console.error("Failed to refresh tweets:", error);
      // Handle error, e.g., show a toast message
    }
  
    setRefreshing(false);
  }, [listTweets]); // listTweets should be stable or wrapped in useCallback if defined within this component
  

  const { data, isLoading, error } = useQuery({
    queryKey: ['tweets'],
    queryFn: listTweets,
  });

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <Text>{error.message}</Text>
  }

  return (
    <View style={styles.page}>
      <FlatList 
        data={data} 
        renderItem={({item}) => <Tweet tweet={item} /> } 
        keyExtractor={item => item.id.toString()}
  // Add the RefreshControl component
  refreshControl={
    <RefreshControl
      refreshing={refreshing}
      onRefresh={onRefresh}
    />
  }
      />

      <Link href="/new-tweet" asChild>
        <Entypo 
          name="plus" 
          size={34} 
          color="white"
          style={styles.floatingButton}
        />
      </Link>
    </View>  
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: 'white',
  },
  floatingButton: {
    backgroundColor: '#024b8f',
    borderRadius: 29,
    padding: 12,

    position: 'absolute',
    right: 15,
    bottom: 15,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,

    overflow: 'hidden',
  },
});
