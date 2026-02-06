export type FanNotificationType =
  | 'MATCH_REMINDER'
  | 'PROMO'
  | 'NEW_BENEFIT'
  | 'NEW_MATCH'
  | 'GENERAL';

export type FanNotification = {
  id: string;
  clubId: string;
  fanId: string;
  type: FanNotificationType;
  title: string;
  body: string;
  data?: unknown;
  createdAt: string;
  readAt: string | null;
};

export type FanNotificationsListResponse = {
  items: FanNotification[];
  unreadCount: number;
};
