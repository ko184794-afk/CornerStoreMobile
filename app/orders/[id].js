import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../constants/Colors';

const TRACKING = [
  { label: 'Order Placed', date: 'Oct 20, 10:30 AM', done: true },
  { label: 'Processing', date: 'Oct 20, 2:00 PM', done: true },
  { label: 'Shipped', date: 'Oct 21, 9:00 AM', done: true },
  { label: 'Out for Delivery', date: '', done: false },
  { label: 'Delivered', date: '', done: false },
];

export default function OrderDetailsScreen() {
  const { id } = useLocalSearchParams();

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.orderId}>{id}</Text>
      <Text style={styles.status}>Status: Shipped</Text>

      {/* Tracking */}
      <Text style={styles.sectionTitle}>Order Tracking</Text>
      {TRACKING.map((step, i) => (
        <View key={i} style={styles.trackRow}>
          <View style={styles.trackLeft}>
            <View style={[styles.dot, step.done && styles.dotDone]}>
              {step.done && <Ionicons name="checkmark" size={12} color={Colors.black} />}
            </View>
            {i < TRACKING.length - 1 && (
              <View style={[styles.line, step.done && styles.lineDone]} />
            )}
          </View>
          <View style={styles.trackInfo}>
            <Text style={[styles.trackLabel, step.done && styles.trackLabelDone]}>
              {step.label}
            </Text>
            {step.date ? <Text style={styles.trackDate}>{step.date}</Text> : null}
          </View>
        </View>
      ))}

      {/* Items */}
      <Text style={styles.sectionTitle}>Items</Text>
      <View style={styles.itemCard}>
        <Text style={styles.itemName}>Golden Dragon Figure × 1</Text>
        <Text style={styles.itemPrice}>₱2,499</Text>
      </View>
      <View style={styles.itemCard}>
        <Text style={styles.itemName}>Retro Robot MK-II × 2</Text>
        <Text style={styles.itemPrice}>₱3,798</Text>
      </View>

      <View style={styles.totalBox}>
        <Text style={styles.totalLabel}>Total</Text>
        <Text style={styles.totalValue}>₱6,447</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  content: { padding: 20 },
  orderId: { color: Colors.text, fontSize: 20, fontWeight: 'bold' },
  status: { color: Colors.primary, fontSize: 14, marginTop: 4, marginBottom: 24 },
  sectionTitle: { color: Colors.text, fontSize: 16, fontWeight: 'bold', marginBottom: 14, marginTop: 8 },
  trackRow: { flexDirection: 'row', minHeight: 50 },
  trackLeft: { alignItems: 'center', width: 28 },
  dot: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: Colors.surfaceLight,
    borderWidth: 2,
    borderColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dotDone: { backgroundColor: Colors.primary, borderColor: Colors.primary },
  line: { width: 2, flex: 1, backgroundColor: Colors.border },
  lineDone: { backgroundColor: Colors.primary },
  trackInfo: { flex: 1, paddingLeft: 12, paddingBottom: 16 },
  trackLabel: { color: Colors.textMuted, fontSize: 14 },
  trackLabelDone: { color: Colors.text, fontWeight: '600' },
  trackDate: { color: Colors.textSecondary, fontSize: 12, marginTop: 2 },
  itemCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: Colors.surface,
    padding: 14,
    borderRadius: 10,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  itemName: { color: Colors.text, fontSize: 14 },
  itemPrice: { color: Colors.primary, fontWeight: '600' },
  totalBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  totalLabel: { color: Colors.text, fontSize: 16, fontWeight: 'bold' },
  totalValue: { color: Colors.primary, fontSize: 18, fontWeight: 'bold' },
});
