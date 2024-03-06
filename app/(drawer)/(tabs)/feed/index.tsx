import { StyleSheet, View, FlatList, Pressable, ActivityIndicator, Text } from 'react-native';
import Tweet from '@/components/tweet';
// import tweets from '@/assets/data/tweets';
import { Entypo } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { useEffect, useState } from 'react';
import { useTweetsApi } from '@/lib/api/tweets';
import { useQuery } from '@tanstack/react-query';

export default function FeedScreen() {
  const {listTweets} = useTweetsApi();

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
        renderItem={({item}) => <Tweet tweet={item} /> } />

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
