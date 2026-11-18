import { Stack } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

export default function ActivityFormScreen() {
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'Nowa czynność' }} />
      <Text>Formularz czynności</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
});
