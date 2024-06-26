import { View, Text, Image, StyleSheet, Pressable, Alert, Modal, Button } from 'react-native';
import { TweetType } from '../types';
import { Entypo } from '@expo/vector-icons';
import IconButton from './IconButton';
import { Link } from 'expo-router';
import moment from 'moment';
import { useState } from 'react';
import { useTweetsApi } from '@/lib/api/tweets';
import { useAuth } from '@/context/AuthContext';

type TweetProps = {
  tweet: TweetType;
  isIndividualView?: boolean;
}

const Tweet = ({ tweet, isIndividualView }: TweetProps) => {
  const [modalVisible, setModalVisible] = useState(false);
  const timeFromNow = moment(tweet.createdAt).fromNow();
  const { deleteTweet } = useTweetsApi();
  const { authToken } = useAuth();

  const handleDelete = () => {
    Alert.alert(
      "Confirm Delete",
      "Are you sure you want to delete this post?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        { 
          text: "Delete", 
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteTweet(tweet.id, authToken);
              setModalVisible(false); // Close the modal after deleting
            } catch (error) {
              console.error("Failed to delete tweet:", error);
            }
          }
        }
      ],
      { cancelable: false }
    );
  };

  return (
    <Link href={`/feed/tweet/${tweet.id}`} asChild>
      <Pressable style={styles.container}>
        <Image source={{ uri: tweet.user.image || 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png' }} style={styles.userImage} />
        
        <View style={styles.mainContainer}>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.name}>{tweet.user.name}</Text>
            <Text style={styles.username}>@{tweet.user.username} · {timeFromNow}</Text>
            <Pressable onPress={() => setModalVisible(true)} style={{ marginLeft: 'auto' }}>
              <Entypo name="dots-three-horizontal" size={16} color="gray" />
            </Pressable>
          </View>

          <Text style={styles.content}>{tweet.content}</Text>

          {tweet.image && <Image source={{ uri: tweet.image }} style={styles.image} />}

          <View style={styles.footer}>
            <IconButton icon="comment" text={tweet.numberOfComments} />
            <IconButton icon="retweet" text={tweet.numberOfRetweets} />
            <IconButton 
              icon="heart" 
              text={tweet.numberOfLikes}
              onPress={() => console.log('Like tweet')} // Implement like functionality as needed
            />
            <IconButton icon="chart" text={tweet.impressions || 0} />
            <IconButton icon="share-apple" />
          </View>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Button
                  title="Delete"
                  onPress={handleDelete}
                />
                <Button
                  title="Cancel"
                  onPress={() => setModalVisible(false)}
                />
              </View>
            </View>
          </Modal>
        </View>
      </Pressable>
    </Link>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: 'lightgray',
    backgroundColor: 'white',
  },
  userImage: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  mainContainer: {
    marginLeft: 10,
    flex: 1,
  },
  name: {
    fontWeight: '600',
  },
  username: {
    color: 'gray',
    marginLeft: 5,
  },
  content: {
    lineHeight: 20,
    marginTop: 5,
  },
  image: {
    width: '100%',
    aspectRatio: 16 / 9,
    marginVertical: 10,
    borderRadius: 15,
  },
  footer: {
    flexDirection: 'row',
    marginVertical: 5,
    justifyContent: 'space-between',
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

export default Tweet;
