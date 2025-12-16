// src/screens/RepoDetailsScreen.js
import { Button, Linking, StyleSheet, Text, View } from 'react-native';

export default function RepoDetailsScreen({ route }) {
  const { repo } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.name}>{repo.full_name}</Text>
      <Text style={styles.description}>{repo.description}</Text>

      <Text style={styles.meta}>★ {repo.stargazers_count} stars</Text>
      <Text style={styles.meta}>Forks: {repo.forks_count}</Text>
      <Text style={styles.meta}>
        Last updated: {new Date(repo.updated_at).toLocaleString()}
      </Text>

      <View style={{ marginTop: 16 }}>
        <Button
          title="Open on GitHub"
          onPress={() => Linking.openURL(repo.html_url)}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  name: { fontSize: 20, fontWeight: '700', marginBottom: 8 },
  description: { fontSize: 14, marginBottom: 12 },
  meta: { fontSize: 12, color: '#555' },
});
