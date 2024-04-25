import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, FlatList } from 'react-native';
import { debounce } from 'lodash';
import { useAuth } from '@/context/AuthContext';
import Tweet from '@/components/tweet'; // Correct path to your Tweet component
import { API_URL } from '@/lib/api/config';

export default function SearchScreen() {
    const [searchQuery, setSearchQuery] = useState('');
    const [results, setResults] = useState([]);
    const { authToken } = useAuth();

    const fetchSearchResults = async (query) => {
        try {
            const response = await fetch(`${API_URL}/tweet/search/${query}`, {
                headers: {
                    'Authorization': `Bearer ${authToken}`
                }
            });
            const data = await response.json();
            if (response.ok) {
                setResults(data);
            } else {
                console.error('Failed to fetch:', data); // Log or handle errors
            }
        } catch (error) {
            console.error('Network error:', error); // Log network errors
        }
    };

    const debouncedSearch = debounce(fetchSearchResults, 300);

    useEffect(() => {
        if (searchQuery.length > 0) {
            debouncedSearch(searchQuery);
        } else {
            setResults([]); // Clear results when query is empty
        }

        return () => debouncedSearch.cancel();
    }, [searchQuery, authToken]);

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Search tweets or users..."
                value={searchQuery}
                onChangeText={setSearchQuery}
            />
            <FlatList
                data={results}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => <Tweet tweet={item} isIndividualView={false} />}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    input: {
        height: 40,
        marginBottom: 20,
        borderWidth: 1,
        padding: 10,
    },
});