import { Link, Tabs } from 'expo-router';
import { SymbolView } from 'expo-symbols';
import { StyleSheet } from 'react-native';
import { colors, fontSize, spacing } from '../../constants/theme';

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: colors.primary }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Czynności',
          tabBarIcon: ({ color, size }) => (
            <SymbolView name={{ ios: 'list.bullet', android: 'list', web: 'list' }} tintColor={color} size={size} />
          ),
          headerRight: () => (
            <Link href="/activity/form" style={styles.headerLink} accessibilityLabel="Dodaj czynność">
              Dodaj
            </Link>
          ),
        }}
      />
      <Tabs.Screen
        name="pets"
        options={{
          title: 'Zwierzęta',
          tabBarIcon: ({ color, size }) => (
            <SymbolView name={{ ios: 'pawprint', android: 'pets', web: 'pets' }} tintColor={color} size={size} />
          ),
          headerRight: () => (
            <Link href="/pet/form" style={styles.headerLink} accessibilityLabel="Dodaj zwierzę">
              Dodaj
            </Link>
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  headerLink: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    fontSize: fontSize.md,
    color: colors.primary,
  },
});
