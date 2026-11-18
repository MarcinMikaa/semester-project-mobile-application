import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, fontSize, spacing, TOUCH_TARGET } from '../constants/theme';
import { FieldError, FieldLabel } from './FormField';

export type ChoiceOption<T extends string> = {
  value: T;
  label: string;
};

type ChoiceChipsProps<T extends string> = {
  label: string;
  options: ChoiceOption<T>[];
  selected: T | null;
  onSelect: (value: T) => void;
  error?: string;
};

export function ChoiceChips<T extends string>({ label, options, selected, onSelect, error }: ChoiceChipsProps<T>) {
  return (
    <View style={styles.container}>
      <FieldLabel text={label} />
      <View style={styles.chips} accessibilityRole="radiogroup" accessibilityLabel={label}>
        {options.map((option) => {
          const isSelected = option.value === selected;
          return (
            <Pressable
              key={option.value}
              accessibilityRole="radio"
              accessibilityState={{ checked: isSelected }}
              accessibilityLabel={option.label}
              onPress={() => onSelect(option.value)}
              style={({ pressed }) => [styles.chip, isSelected && styles.chipSelected, pressed && styles.chipPressed]}>
              <Text style={[styles.chipLabel, isSelected && styles.chipLabelSelected]}>{option.label}</Text>
            </Pressable>
          );
        })}
      </View>
      <FieldError message={error} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginBottom: spacing.lg },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  chip: {
    minHeight: TOUCH_TARGET,
    paddingHorizontal: spacing.lg,
    borderRadius: TOUCH_TARGET / 2,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    justifyContent: 'center',
  },
  chipSelected: { borderColor: colors.primary, backgroundColor: colors.primary },
  chipPressed: { opacity: 0.85 },
  chipLabel: { fontSize: fontSize.md, color: colors.text },
  chipLabelSelected: { color: colors.onPrimary, fontWeight: '600' },
});
