import { StyleSheet, Text, TextInput, View, type TextInputProps } from 'react-native';
import { colors, fontSize, radius, spacing, TOUCH_TARGET } from '../constants/theme';

export function FieldLabel({ text }: { text: string }) {
  return <Text style={styles.label}>{text}</Text>;
}

export function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <Text style={styles.error} accessibilityLiveRegion="polite">
      {message}
    </Text>
  );
}

type FormFieldProps = {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  error?: string;
  multiline?: boolean;
  maxLength?: number;
  placeholder?: string;
  autoCapitalize?: TextInputProps['autoCapitalize'];
};

export function FormField({ label, error, multiline = false, ...inputProps }: FormFieldProps) {
  return (
    <View style={styles.container}>
      <FieldLabel text={label} />
      <TextInput
        accessibilityLabel={label}
        multiline={multiline}
        textAlignVertical={multiline ? 'top' : 'center'}
        placeholderTextColor={colors.textMuted}
        style={[styles.input, multiline && styles.multiline, error ? styles.inputError : null]}
        {...inputProps}
      />
      <FieldError message={error} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginBottom: spacing.lg },
  label: {
    fontSize: fontSize.sm,
    fontWeight: '600',
    color: colors.text,
    marginBottom: spacing.xs,
  },
  input: {
    minHeight: TOUCH_TARGET,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius,
    backgroundColor: colors.surface,
    fontSize: fontSize.md,
    color: colors.text,
  },
  multiline: { minHeight: 120 },
  inputError: { borderColor: colors.danger },
  error: { marginTop: spacing.xs, fontSize: fontSize.sm, color: colors.danger },
});
