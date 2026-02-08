import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import { http } from '@/src/api/http';

export type DevicePlatform = 'IOS' | 'ANDROID' | 'WEB';

function getProjectId(): string | undefined {
  // SDK 49+ recommended: EAS project id.
  // See: https://docs.expo.dev/push-notifications/push-notifications-setup/
  return (
    (Constants as any).easConfig?.projectId ||
    (Constants as any).expoConfig?.extra?.eas?.projectId ||
    (Constants as any).manifest2?.extra?.eas?.projectId
  );
}

function getPlatform(): DevicePlatform {
  if (Device.osName === 'iOS') return 'IOS';
  if (Device.osName === 'Android') return 'ANDROID';
  return 'WEB';
}

export async function ensurePushTokenRegistered(): Promise<{ ok: boolean; reason?: string }> {
  if (!Device.isDevice) {
    return { ok: false, reason: 'Must use a physical device for push notifications.' };
  }

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== 'granted') {
    return { ok: false, reason: 'Push permission not granted.' };
  }

  const projectId = getProjectId();
  if (!projectId) {
    return { ok: false, reason: 'Missing EAS projectId in app config.' };
  }

  const tokenRes = await Notifications.getExpoPushTokenAsync({ projectId });
  const token = tokenRes.data;

  await http.post('/public/fans/device-tokens', {
    token,
    platform: getPlatform(),
  });

  return { ok: true };
}
