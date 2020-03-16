import * as React from 'react';
import {StyleSheet, ScrollView} from 'react-native';
import CodeEditor, {themes, parsers} from './editor';

const parser = parsers.python();

export default function App() {
  const [code, setCode] = React.useState();

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <CodeEditor
        code={code}
        parser={parser}
        theme={themes.Monokai}
        onChangeCode={setCode}
        autofocus
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    alignItems: 'stretch',
  },
});
