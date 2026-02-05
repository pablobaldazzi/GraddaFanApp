import { View, Text, Pressable, StyleSheet } from 'react-native';
import { theme } from '@/src/ui/theme';

export default function FanIdScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Fan ID</Text>
      <Text style={styles.text}>In-app ID card + (later) add to Apple Wallet / Google Wallet.</Text>

      <Pressable style={styles.button} onPress={() => {}}>
        <Text style={styles.buttonText}>Add to Wallet (mock)</Text>
      </Pressable>

      <Text style={styles.note}>
        Implementation note: wallet passes will likely require an EAS build + native module/config plugin.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.bg,
    padding: theme.spacing.lg,
    justifyContent: 'center',
    gap: theme.spacing.sm,
  },
  title: { color: theme.colors.text, fontSize: 24, fontWeight: '700' },
  text: { color: theme.colors.muted },
  button: {
    backgroundColor: theme.colors.primary,
    padding: theme.spacing.md,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: theme.spacing.sm,
  },
  buttonText: { color: theme.colors.text, fontSize: 16, fontWeight: '600' },
  note: { color: theme.colors.muted, marginTop: theme.spacing.lg, fontSize: 12 },
});
