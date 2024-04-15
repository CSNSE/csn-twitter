import { PropsWithChildren, createContext, useCallback, useContext, useEffect, useState } from "react";
import { API_URL } from "./config";
import { useAuth } from "@/context/AuthContext";

const TweetsApiContext = createContext({});

const TweetsApiContextProvider = ({children}: PropsWithChildren) => {
  const {authToken, removeAuthToken} = useAuth();

  console.log('Auth token inside api provider: ', authToken);

const listTweets = async () => {
  if (!authToken) {
    return;
  }
  
  const res = await fetch(`${API_URL}/tweet`, {
    headers: {
      Authorization: `Bearer ${authToken}`
    }
  });
  if (res.status == 401) {
    removeAuthToken();
    throw new Error('Not authorized. Please sign in');
  }
  if (res.status !== 200) {
    throw new Error('Error fetching tweets');
  }
  return await res.json();
};

const getTweet = async (id: string) => {
  if (!authToken) {
    return;
  }

  const res = await fetch(`${API_URL}/tweet/${id}`, {
    headers: {
      Authorization: `Bearer ${authToken}`
    }
  });
  if (res.status == 401) {
    throw new Error('Not authorized. Please sign in');
  }
  if (res.status !== 200) {
    throw new Error('Error fetching tweets');
  }
  return await res.json();
  };

const createTweet = async (data: { content: string}) => {
  if (!authToken) {
    return;
  }

    const res = await fetch(`${API_URL}/tweet`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${authToken}`,
        'Content-type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (res.status == 401) {
      throw new Error('Not authorized. Please sign in');
    }
    if (res.status !== 200) {
        console.log(res);
      throw new Error('Error creating tweet');
    }
    return await res.json();
    };

const deleteTweet = async (id: string) => {
  if (!authToken) {
    return;
  }

  // Fetch the tweet to verify the author
  const tweetRes = await fetch(`${API_URL}/tweet/${id}`, {
    headers: {
      Authorization: `Bearer ${authToken}`
    }
  });

  if (tweetRes.status !== 200) {
    throw new Error('Error fetching tweet details');
  }

  const tweet = await tweetRes.json();

  // Check if the authenticated user is the author of the tweet
  if (tweet.authorId !== authToken.userId) {
    throw new Error('You are not authorized to delete this tweet');
  }

  // If authorized, proceed with deletion
  const deleteRes = await fetch(`${API_URL}/tweet/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${authToken}`
    }
  });

  if (deleteRes.status !== 200) {
    throw new Error('Failed to delete tweet');
  }
};


  return (
  <TweetsApiContext.Provider 
    value={{
      listTweets,
      getTweet,
      createTweet,
      deleteTweet
    }}
  >
    {children}
  </TweetsApiContext.Provider>
  );
};

export default TweetsApiContextProvider;

export const useTweetsApi = () => useContext(TweetsApiContext);