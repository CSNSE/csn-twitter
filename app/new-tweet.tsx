import { Link, useRouter } from "expo-router";
import { useState } from "react";
import {
    View,
    StyleSheet,
    Text,
    Image,
    TextInput,
    Pressable,
    SafeAreaView,
    ActivityIndicator
} from "react-native";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTweetsApi } from "@/lib/api/tweets";
import { useAuth } from "@/context/AuthContext"; // Using the useAuth hook for consistency

export default function NewTweet() {
    const [text, setText] = useState('');
    const router = useRouter();
    const { currentUser } = useAuth(); // Now using the useAuth hook

    const { createTweet } = useTweetsApi();
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: (newTweet) => createTweet(newTweet),
        onSuccess: (data) => {
            queryClient.setQueriesData(['tweets'], (oldTweets) => [...oldTweets, data]);
        },
    });

    const onTweetPress = async () => {
        try {
            await mutation.mutateAsync({ content: text });
            setText('');
            router.back();
        } catch (e) {
            console.log("Error:", e instanceof Error ? e.message : "An unknown error occurred");
        }
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <View style={styles.container}>
                <View style={styles.buttonContainer}>
                    <Link href="../" style={{ fontSize: 18 }}>
                        Cancel
                    </Link>
                    {mutation.isLoading && <ActivityIndicator />}
                    <Pressable onPress={onTweetPress} style={styles.button}>
                        <Text style={styles.buttonText}>
                            Post
                        </Text>
                    </Pressable>
                </View>
                <View style={styles.inputContainer}>
                    <Image source={{ uri: currentUser?.image || 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png' }} style={styles.image} />
                    <TextInput 
                        value={text}
                        onChangeText={setText}
                        placeholder="What's happening?"
                        multiline
                        numberOfLines={5}
                        style={{ flex: 1 }}
                    />
                </View>
                {mutation.isError && <Text>Error: {mutation.error instanceof Error ? mutation.error.message : "An error occurred"}</Text>}
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        flex: 1,
    },
    buttonContainer: {
        flexDirection: 'row',
        marginVertical: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    button: {
        backgroundColor: '#024b8f',
        padding: 10,
        paddingHorizontal: 20,
        borderRadius: 50,
    },
    buttonText: {
        color: 'white',
        fontWeight: '600',
        fontSize: 16,
    },
    inputContainer: {
        flexDirection: 'row',
    },
    image: {
        width: 50,
        aspectRatio: 1,
        borderRadius: 50,
        marginRight: 10,
    },
});