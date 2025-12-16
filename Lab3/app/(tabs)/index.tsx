// App.js
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';

import LanguageScreen from '../../screens/LanguageScreen';
import RepoDetailsScreen from '../../screens/RepoDetailsScreen';
import RepoListScreen from '../../screens/RepoListScreen';

const Stack = createNativeStackNavigator();


//Navigation stack need screens to be in order
//Languages = root screen, no back button
//Repos is called and stacked after Languages, allowing user to go back one step with the back button
export default function App() {
  return (

      <Stack.Navigator>
        <Stack.Screen name="Languages" component={LanguageScreen} />
        <Stack.Screen name="Repos" component={RepoListScreen} />
        <Stack.Screen name="RepoDetails" component={RepoDetailsScreen} />
      </Stack.Navigator>

  );
}