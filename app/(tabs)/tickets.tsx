import { View, Text, StyleSheet } from 'react-native';
import { theme } from '@/src/ui/theme';

export default function TicketsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tickets</Text>
      <Text style={styles.text}>Will show owned tickets + QR codes.</Text>
      <Text style={styles.text}>Emails will continue to be sent by the existing store flow.</Text>
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
