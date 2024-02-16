import { Text } from 'react-native';
import Tweet from '@/components/tweet';
import tweets from '@/assets/data/tweets';
import { useGlobalSearchParams } from 'expo-router';

export default function TweetScreen() {
    const { id, filter } = useGlobalSearchParams();
    console.warn(id);

    const tweet = tweets.find(t => t.id == id);

    if (!tweet) {
        return <Text>Tweet {id} not found!</Text>
    }

    return <Tweet tweet={tweet} />
}