import * as React from 'react';
import {StyleSheet, Text, TextInput} from 'react-native';
import defaultText from './defaultText';

const ThemeContext = React.createContext();
const now = Date.now;

export default function CodeEditor({
  code = defaultText,
  theme,
  parser,
  onChangeCode,
  ...props
}) {
  const startTime = now();
  const doc = React.useMemo(() => parser.init(), [parser]);
  const lines = parser.parse(doc, code);
  console.log(doc.parsed[0]);

  const middleTime = now();
  const res = (
    <ThemeContext.Provider value={theme}>
      <TextInput
        multiline
        autoCapitalize="none"
        autoCompleteType="off"
        autoCorrect={false}
        onChangeText={onChangeCode}
        style={[styles.editor, theme.editor]}
        {...props}>
        {lines.map(renderLine)}
      </TextInput>
    </ThemeContext.Provider>
  );

  const endTime = now();
  console.log(
    `${middleTime - startTime}ms (parse) + ${endTime -
      middleTime}ms (render) = ${endTime - startTime}ms`,
  );
  return res;
}

const renderLine = line => <Line line={line} key={line.uuid} />;

const Line = React.memo(function Line({line}) {
  return <Text>{line.tokens.map(renderToken)}</Text>;
});

const renderToken = (token, index) => <Token token={token} key={index} />;

function Token({token}) {
  const theme = React.useContext(ThemeContext);
  const styles = React.useMemo(() => getStyles(theme, token.tags), [
    theme,
    token.tags,
  ]);

  return <Text style={styles}>{token.text}</Text>;
}

function getStyles(theme, tags) {
  return [theme.token, ...tags.map(tag => theme[tag])];
}

const styles = StyleSheet.create({
  editor: {
    textAlignVertical: 'top',
  },
});
