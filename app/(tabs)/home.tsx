import { View, Text, StyleSheet } from 'react-native';
import { theme } from '@/src/ui/theme';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>GRADA Fan App</Text>
      <Text style={styles.text}>Waiting for mockups — this is the base shell.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.bg,
    padding: theme.spacing.lg,
    justifyContent: 'center',
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
  title: { color: theme.colors.text, fontSize: 24, fontWeight: '700' },
  text: { color: theme.colors.muted },
});
