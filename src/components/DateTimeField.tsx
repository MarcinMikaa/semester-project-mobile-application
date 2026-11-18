import DateTimePicker, { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, fontSize, radius, spacing, TOUCH_TARGET } from '../constants/theme';
import { formatDate, formatTime } from '../domain/dates';
import { FieldError, FieldLabel } from './FormField';

type DateTimeFieldProps = {
  label: string;
  value: Date;
  onChange: (date: Date) => void;
  minimumDate?: Date;
  maximumDate?: Date;
  error?: string;
};

export function DateTimeField({ label, value, onChange, minimumDate, maximumDate, error }: DateTimeFieldProps) {
  if (Platform.OS === 'android') {
    const open = (mode: 'date' | 'time') => {
      DateTimePickerAndroid.open({
        value,
        mode,
        is24Hour: true,
        minimumDate: mode === 'date' ? minimumDate : undefined,
        maximumDate: mode === 'date' ? maximumDate : undefined,
        onValueChange: (_event, date) => onChange(date),
      });
    };

    return (
      <View style={styles.container}>
        <FieldLabel text={label} />
        <View style={styles.row}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={`${label}: data ${formatDate(value)}. Zmień datę`}
            onPress={() => open('date')}
            style={[styles.button, error ? styles.buttonError : null]}>
            <Text style={styles.buttonText}>{formatDate(value)}</Text>
          </Pressable>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={`${label}: godzina ${formatTime(value)}. Zmień godzinę`}
            onPress={() => open('time')}
            style={[styles.button, error ? styles.buttonError : null]}>
            <Text style={styles.buttonText}>{formatTime(value)}</Text>
          </Pressable>
        </View>
        <FieldError message={error} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FieldLabel text={label} />
      <DateTimePicker
        value={value}
        mode="datetime"
        display="compact"
        locale="pl-PL"
        minimumDate={minimumDate}
        maximumDate={maximumDate}
        onValueChange={(_event, date) => onChange(date)}
        accessibilityLabel={label}
      />
      <FieldError message={error} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginBottom: spacing.lg },
  row: { flexDirection: 'row', gap: spacing.sm },
  button: {
    flex: 1,
    minHeight: TOUCH_TARGET,
    paddingHorizontal: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius,
    backgroundColor: colors.surface,
    justifyContent: 'center',
  },
  buttonError: { borderColor: colors.danger },
  buttonText: { fontSize: fontSize.md, color: colors.text },
});
