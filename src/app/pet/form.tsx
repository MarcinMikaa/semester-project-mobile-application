import { Stack } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

export default function PetFormScreen() {
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'Zwierzę' }} />
      <Text>Formularz zwierzęcia</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
});
