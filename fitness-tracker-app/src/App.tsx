import React from 'react';
import { Provider, View, defaultTheme } from '@adobe/react-spectrum';
import { ExerciseLogger } from './components/ExerciseLogger';

function App() {
  return (
    <Provider theme={defaultTheme}>
      <View padding="size-200">
        <ExerciseLogger></ExerciseLogger>
      </View>
    </Provider>
  );
}

export default App;