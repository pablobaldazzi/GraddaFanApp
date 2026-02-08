import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react-native';
import InboxScreen from '@/app/(tabs)/inbox';

jest.mock('@/src/notifications/notificationsApi', () => ({
  listNotifications: jest.fn(),
  markNotificationRead: jest.fn(),
}));

const api = require('@/src/notifications/notificationsApi');

describe('InboxScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders empty state', async () => {
    api.listNotifications.mockResolvedValue({ items: [], unreadCount: 0 });

    const { getByText } = render(<InboxScreen />);

    await waitFor(() => {
      expect(getByText('No notifications yet')).toBeTruthy();
    });
  });

  it('loads notifications and shows unread count', async () => {
    api.listNotifications.mockResolvedValue({
      unreadCount: 1,
      items: [
        {
          id: 'n1',
          clubId: 'c1',
          fanId: 'f1',
          type: 'PROMO',
          title: 'Promo!',
          body: '50% off',
          data: null,
          createdAt: new Date('2024-01-01').toISOString(),
          readAt: null,
        },
      ],
    });

    const { getByText } = render(<InboxScreen />);

    await waitFor(() => {
      expect(getByText('1 unread')).toBeTruthy();
      expect(getByText('Promo!')).toBeTruthy();
      expect(getByText('50% off')).toBeTruthy();
    });
  });

  it('marks notification as read on press', async () => {
    api.listNotifications.mockResolvedValue({
      unreadCount: 1,
      items: [
        {
          id: 'n1',
          clubId: 'c1',
          fanId: 'f1',
          type: 'PROMO',
          title: 'Promo!',
          body: '50% off',
          data: null,
          createdAt: new Date('2024-01-01').toISOString(),
          readAt: null,
        },
      ],
    });

    api.markNotificationRead.mockResolvedValue({
      id: 'n1',
      clubId: 'c1',
      fanId: 'f1',
      type: 'PROMO',
      title: 'Promo!',
      body: '50% off',
      data: null,
      createdAt: new Date('2024-01-01').toISOString(),
      readAt: new Date('2024-01-02').toISOString(),
    });

    const { getByText, queryAllByLabelText } = render(<InboxScreen />);

    await waitFor(() => expect(getByText('Promo!')).toBeTruthy());

    // unread dot exists
    expect(queryAllByLabelText('unread-dot').length).toBe(1);

    fireEvent.press(getByText('Promo!'));

    await waitFor(() => {
      expect(api.markNotificationRead).toHaveBeenCalledWith('n1');
      expect(getByText('0 unread')).toBeTruthy();
    });

    // unread dot removed
    expect(queryAllByLabelText('unread-dot').length).toBe(0);
  });
});
