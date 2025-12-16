// src/screens/RepoListScreen.js
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { fetchPopularRepos } from '../api/github';

export default function RepoListScreen({ route, navigation }) {
  const { language, daysBack } = route.params; //Variable that contains the params of the stack.screen during routing
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  //Runs after initial render
  useEffect(() => {
    navigation.setOptions({
      title: `${language} – popular repos`,
    });

    async function load() {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchPopularRepos(language, daysBack);
        setRepos(data);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [language, daysBack, navigation]);
  //These trigger variables might not be needed but are good programming standards
  //If language and daysBack where able to change in this screen, then they are needed here.
  //“This effect depends on these values — if they ever change, re-run.”

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text>Loading repositories…</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>Failed to load: {error}</Text>
      </View>
    );
  }

  //Flatlist -> component from React that is effective at rendering large lists
  //Only renders what is visible, better perofrmance than ScrollView.
  //data is the array to render
  //renderItem is a function that describes how to render each item
  return (
    <FlatList
      data={repos}
      keyExtractor={item => item.id.toString()}
      renderItem={({ item }) => (
        //ToubableOpacity is a pressable row item
        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate('RepoDetails', { repo: item })}
        >
          <Text style={styles.name}>{item.full_name}</Text>
          <Text style={styles.description} numberOfLines={2}>
            {item.description}
          </Text>
          <Text style={styles.meta}>
            ★ {item.stargazers_count} • Updated:{' '}
            {new Date(item.updated_at).toLocaleDateString()}
          </Text>
        </TouchableOpacity>
      )}
      ListEmptyComponent={
        <Text>No repositories found for this query.</Text>
      }
    />
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  error: {
    color: 'red',
  },
  card: {
    padding: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  name: {
    fontWeight: '600',
    fontSize: 16,
  },
  description: {
    marginTop: 4,
    color: '#555',
  },
  meta: {
    marginTop: 4,
    fontSize: 12,
    color: '#777',
  },
});
