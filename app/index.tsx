import { Redirect } from 'expo-router';

export default function Index() {
  // TODO: after wiring auth token check, redirect accordingly.
  return <Redirect href="/(auth)/login" />;
}
