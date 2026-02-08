import { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ensurePushTokenRegistered } from '@/src/notifications/push';
import { theme } from '@/src/ui/theme';

export default function HomeScreen() {
  const [pushStatus, setPushStatus] = useState<string | null>(null);

  useEffect(() => {
    // MVP wiring: attempt registration on app entry.
    // This will only succeed when logged in + projectId configured.
    ensurePushTokenRegistered()
      .then((r) => setPushStatus(r.ok ? 'Push enabled' : `Push not enabled: ${r.reason}`))
      .catch((e: any) => setPushStatus(`Push not enabled: ${e?.message ?? 'unknown error'}`));
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>GRADA Fan App</Text>
      <Text style={styles.text}>Waiting for mockups — this is the base shell.</Text>
      {pushStatus ? <Text style={styles.text}>{pushStatus}</Text> : null}
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
