import { http } from '@/src/api/http';
import type { FanNotificationsListResponse, FanNotification } from './types';

export async function listNotifications(params?: { take?: number; cursor?: string }) {
  const res = await http.get<FanNotificationsListResponse>('/public/fans/notifications', {
    params,
  });
  return res.data;
}

export async function markNotificationRead(id: string) {
  const res = await http.patch<FanNotification>(`/public/fans/notifications/${id}/read`);
  return res.data;
}
