import { View, Text, StyleSheet } from 'react-native';
import { theme } from '@/src/ui/theme';

export default function MerchScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Merch</Text>
      <Text style={styles.text}>No payments for now — we will mock product browsing.</Text>
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
});
