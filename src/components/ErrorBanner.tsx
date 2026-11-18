import { StyleSheet, Text } from 'react-native';
import { colors, fontSize, radius, spacing } from '../constants/theme';

export function ErrorBanner({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <Text style={styles.banner} accessibilityRole="alert">
      {message}
    </Text>
  );
}

const styles = StyleSheet.create({
  banner: {
    marginBottom: spacing.lg,
    padding: spacing.md,
    borderRadius: radius,
    backgroundColor: colors.dangerBackground,
    color: colors.danger,
    fontSize: fontSize.md,
  },
});
