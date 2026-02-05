import { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { fanLoginWithEmailPassword } from '@/src/auth/authApi';
import { setAuthToken } from '@/src/auth/token';
import { theme } from '@/src/ui/theme';
import { fetchClubBySlug } from '@/src/api/publicApi';
import { clubConfig } from '@/src/config/club';

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onLogin() {
    setLoading(true);
    setError(null);
    try {
      const club = await fetchClubBySlug(clubConfig.slug);
      const { accessToken } = await fanLoginWithEmailPassword({ clubId: club.id, email, password });
      await setAuthToken(accessToken);
      router.replace('/(tabs)/home');
    } catch (e: any) {
      setError(e?.message ?? 'Login failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>GRADA Fan</Text>
      <Text style={styles.subtitle}>Sign in with your store account</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor={theme.colors.muted}
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor={theme.colors.muted}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <Pressable style={styles.button} onPress={onLogin} disabled={loading}>
        <Text style={styles.buttonText}>{loading ? 'Signing in…' : 'Sign in'}</Text>
      </Pressable>

      <Text style={styles.note}>Backend: /public/fans/login-password (club: {clubConfig.slug})</Text>
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
  title: { color: theme.colors.text, fontSize: 32, fontWeight: '700' },
  subtitle: { color: theme.colors.muted, marginBottom: theme.spacing.md },
  input: {
    backgroundColor: theme.colors.card,
    color: theme.colors.text,
    padding: theme.spacing.md,
    borderRadius: 12,
  },
  button: {
    backgroundColor: theme.colors.primary,
    padding: theme.spacing.md,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: theme.spacing.sm,
  },
  buttonText: { color: theme.colors.text, fontSize: 16, fontWeight: '600' },
  error: { color: theme.colors.danger },
  note: { color: theme.colors.muted, marginTop: theme.spacing.lg, fontSize: 12 },
});
