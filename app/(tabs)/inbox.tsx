import { useCallback, useEffect, useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { listNotifications, markNotificationRead } from '@/src/notifications/notificationsApi';
import type { FanNotification } from '@/src/notifications/types';
import { theme } from '@/src/ui/theme';

function formatDate(iso: string) {
  const d = new Date(iso);
  // Keep it simple for MVP.
  return d.toLocaleString();
}

export default function InboxScreen() {
  const [items, setItems] = useState<FanNotification[]>([]);
  const [unreadCount, setUnreadCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await listNotifications({ take: 50 });
      setItems(data.items);
      setUnreadCount(data.unreadCount);
    } catch (e: any) {
      setError(e?.message ?? 'Failed to load notifications');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const onPressItem = useCallback(
    async (n: FanNotification) => {
      if (n.readAt) return;
      try {
        const updated = await markNotificationRead(n.id);
        setItems((prev) => prev.map((x) => (x.id === updated.id ? { ...x, readAt: updated.readAt } : x)));
        setUnreadCount((c) => Math.max(0, c - 1));
      } catch {
        // ignore for now; we'll re-sync on next refresh
      }
    },
    []
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Inbox</Text>
        <Text style={styles.subtitle}>{unreadCount} unread</Text>
      </View>

      {error ? <Text style={styles.error}>{error}</Text> : null}
      {loading ? <Text style={styles.loading}>Loading…</Text> : null}

      <FlatList
        data={items}
        keyExtractor={(n) => n.id}
        contentContainerStyle={items.length === 0 ? styles.emptyContainer : undefined}
        renderItem={({ item }) => {
          const unread = !item.readAt;
          return (
            <Pressable onPress={() => onPressItem(item)} style={[styles.card, unread && styles.cardUnread]}>
              <View style={styles.row}>
                <Text style={[styles.cardTitle, unread && styles.cardTitleUnread]}>{item.title}</Text>
                {unread ? <View accessibilityLabel="unread-dot" style={styles.dot} /> : null}
              </View>
              <Text style={styles.cardBody} numberOfLines={2}>
                {item.body}
              </Text>
              <Text style={styles.cardMeta}>{formatDate(item.createdAt)}</Text>
            </Pressable>
          );
        }}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyTitle}>No notifications yet</Text>
            <Text style={styles.emptyBody}>Promos, match reminders, and benefits will show up here.</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.bg, paddingTop: theme.spacing.lg },
  header: {
    paddingHorizontal: theme.spacing.lg,
    paddingBottom: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  title: { color: theme.colors.text, fontSize: 24, fontWeight: '700' },
  subtitle: { color: theme.colors.muted, marginTop: theme.spacing.xs },
  error: { color: theme.colors.danger, padding: theme.spacing.lg },
  loading: { color: theme.colors.muted, paddingHorizontal: theme.spacing.lg, paddingVertical: theme.spacing.md },

  card: {
    marginHorizontal: theme.spacing.lg,
    marginTop: theme.spacing.md,
    padding: theme.spacing.md,
    borderRadius: theme.radius.md,
    backgroundColor: theme.colors.card,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  cardUnread: {
    borderColor: theme.colors.primary,
  },
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: theme.spacing.sm },
  cardTitle: { color: theme.colors.text, fontSize: 16, fontWeight: '600', flex: 1 },
  cardTitleUnread: { color: theme.colors.primary },
  cardBody: { color: theme.colors.muted, marginTop: theme.spacing.xs },
  cardMeta: { color: theme.colors.muted, marginTop: theme.spacing.sm, fontSize: 12 },
  dot: { width: 10, height: 10, borderRadius: 10, backgroundColor: theme.colors.primary },

  emptyContainer: { flexGrow: 1 },
  empty: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: theme.spacing.lg },
  emptyTitle: { color: theme.colors.text, fontSize: 18, fontWeight: '600' },
  emptyBody: { color: theme.colors.muted, marginTop: theme.spacing.xs, textAlign: 'center' },
});
