import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../constants/Colors';

const ORDERS = [
  {
    id: 'ORD-1001',
    date: 'Oct 20, 2026',
    status: 'Shipped',
    total: 6447,
    items: 3,
  },
  {
    id: 'ORD-1000',
    date: 'Oct 15, 2026',
    status: 'Delivered',
    total: 2499,
    items: 1,
  },
  {
    id: 'ORD-0998',
    date: 'Oct 5, 2026',
    status: 'Processing',
    total: 1899,
    items: 1,
  },
];

const STATUS_COLOR = {
  Processing: '#f59e0b',
  Shipped: '#3b82f6',
  Delivered: Colors.success,
  Cancelled: Colors.danger,
};

export default function OrdersScreen() {
  return (
    <FlatList
      style={styles.container}
      contentContainerStyle={styles.list}
      data={ORDERS}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.card}
          onPress={() => router.push(`/orders/${item.id}`)}
        >
          <View style={styles.cardTop}>
            <Text style={styles.orderId}>{item.id}</Text>
            <View style={[styles.badge, { backgroundColor: STATUS_COLOR[item.status] + '22' }]}>
              <Text style={[styles.badgeText, { color: STATUS_COLOR[item.status] }]}>
                {item.status}
              </Text>
            </View>
          </View>
          <Text style={styles.date}>{item.date} · {item.items} item(s)</Text>
          <View style={styles.cardBottom}>
            <Text style={styles.total}>₱{item.total.toLocaleString()}</Text>
            <Ionicons name="chevron-forward" size={18} color={Colors.textMuted} />
          </View>
        </TouchableOpacity>
      )}
      ListEmptyComponent={
        <View style={styles.empty}>
          <Ionicons name="receipt-outline" size={48} color={Colors.textMuted} />
          <Text style={styles.emptyText}>No orders yet</Text>
        </View>
      }
    />
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  list: { padding: 16 },
  card: {
    backgroundColor: Colors.surface,
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  cardTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  orderId: { color: Colors.text, fontSize: 16, fontWeight: 'bold' },
  badge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
  badgeText: { fontSize: 12, fontWeight: '600' },
  date: { color: Colors.textSecondary, fontSize: 13, marginTop: 6 },
  cardBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
  },
  total: { color: Colors.primary, fontSize: 16, fontWeight: 'bold' },
  empty: { alignItems: 'center', marginTop: 60, gap: 12 },
  emptyText: { color: Colors.textMuted },
});
