import { Pressable, StyleSheet, Text, View } from 'react-native';

type EmptyStateProps = {
  message: string;
  actionLabel?: string;
  onAction?: () => void;
};

export function EmptyState({ message, actionLabel, onAction }: EmptyStateProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.message}>{message}</Text>
      {actionLabel && onAction ? (
        <Pressable
          accessibilityRole="button"
          onPress={onAction}
          style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}>
          <Text style={styles.buttonLabel}>{actionLabel}</Text>
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 },
  message: { fontSize: 16, color: '#444', textAlign: 'center', marginBottom: 16 },
  button: {
    minHeight: 48,
    paddingHorizontal: 20,
    borderRadius: 8,
    justifyContent: 'center',
    backgroundColor: '#1f6feb',
  },
  buttonPressed: { opacity: 0.8 },
  buttonLabel: { color: '#fff', fontSize: 16, fontWeight: '600' },
});
