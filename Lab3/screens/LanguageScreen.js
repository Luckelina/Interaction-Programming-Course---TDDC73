// src/screens/LanguageScreen.js
import { useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

const LANGUAGES = ['JavaScript', 'Kotlin', 'Swift', 'Python'];
const RANGES = [
  { label: 'Last week', days: 7 },
  { label: 'Last month', days: 30 },
  { label: 'Last year', days: 365 },
];

//navigation -> navigation is a property to any function that is registered as a Stack.screen in index.js
//When a screen becomes active, React Navigation constructs a navigation propert specific to that screen, containing:
//navigation.navigate()
//navigation.goBack()
//navigation.push()
//navigation.setOptions()
//and others...
export default function LanguageScreen({ navigation }) {
  const [selectedLanguage, setSelectedLanguage] = useState(LANGUAGES[0]);
  const [selectedRange, setSelectedRange] = useState(RANGES[0]);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Choose language</Text>
      <View style={styles.row}>
        {LANGUAGES.map(lang => (
          <Button
            key={lang}
            title={lang}
            onPress={() => setSelectedLanguage(lang)}
            color={lang === selectedLanguage ? '#6200ee' : undefined}
          />
        ))}
      </View>

      <Text style={styles.heading}>Time interval</Text>
      <View style={styles.row}>
        {RANGES.map(range => (
          <Button
            key={range.label}
            title={range.label}
            onPress={() => setSelectedRange(range)}
            color={
              range.label === selectedRange.label ? '#6200ee' : undefined
            }
          />
        ))}
      </View>

      <View style={{ marginTop: 32 }}>
        <Button
          title="Show popular repositories"
          onPress={() =>
            navigation.navigate('Repos', {
              language: selectedLanguage,
              daysBack: selectedRange.days,
            })
          }
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    gap: 16,
    justifyContent: 'center',
  },
  heading: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
});
