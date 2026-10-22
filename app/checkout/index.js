import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../constants/Colors';

const ADDRESSES = [
  { id: '1', label: 'Home', address: '123 Mabini St, Quezon City' },
  { id: '2', label: 'Office', address: '456 Ayala Ave, Makati' },
];

const PAYMENT_METHODS = [
  { id: 'cod', label: 'Cash on Delivery', icon: 'cash-outline' },
  { id: 'gcash', label: 'GCash', icon: 'phone-portrait-outline' },
  { id: 'card', label: 'Credit / Debit Card', icon: 'card-outline' },
];

export default function CheckoutScreen() {
  const [selectedAddress, setSelectedAddress] = useState('1');
  const [selectedPayment, setSelectedPayment] = useState('cod');

  const handlePlaceOrder = () => {
    Alert.alert('Order Placed!', 'Your order has been placed successfully.', [
      { text: 'View Orders', onPress: () => router.replace('/orders/index') },
    ]);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Shipping Address */}
      <Text style={styles.sectionTitle}>Shipping Address</Text>
      {ADDRESSES.map((addr) => (
        <TouchableOpacity
          key={addr.id}
          style={[styles.option, selectedAddress === addr.id && styles.optionActive]}
          onPress={() => setSelectedAddress(addr.id)}
        >
          <Ionicons
            name={selectedAddress === addr.id ? 'radio-button-on' : 'radio-button-off'}
            size={22}
            color={selectedAddress === addr.id ? Colors.primary : Colors.textMuted}
          />
          <View style={styles.optionInfo}>
            <Text style={styles.optionLabel}>{addr.label}</Text>
            <Text style={styles.optionSub}>{addr.address}</Text>
          </View>
        </TouchableOpacity>
      ))}

      {/* Payment Method */}
      <Text style={styles.sectionTitle}>Payment Method</Text>
      {PAYMENT_METHODS.map((pm) => (
        <TouchableOpacity
          key={pm.id}
          style={[styles.option, selectedPayment === pm.id && styles.optionActive]}
          onPress={() => setSelectedPayment(pm.id)}
        >
          <Ionicons
            name={selectedPayment === pm.id ? 'radio-button-on' : 'radio-button-off'}
            size={22}
            color={selectedPayment === pm.id ? Colors.primary : Colors.textMuted}
          />
          <Ionicons name={pm.icon} size={20} color={Colors.textSecondary} style={{ marginLeft: 4 }} />
          <Text style={styles.optionLabel}>{pm.label}</Text>
        </TouchableOpacity>
      ))}

      {/* Order Review */}
      <Text style={styles.sectionTitle}>Order Review</Text>
      <View style={styles.reviewBox}>
        <View style={styles.reviewRow}>
          <Text style={styles.reviewLabel}>Golden Dragon Figure × 1</Text>
          <Text style={styles.reviewValue}>₱2,499</Text>
        </View>
        <View style={styles.reviewRow}>
          <Text style={styles.reviewLabel}>Retro Robot MK-II × 2</Text>
          <Text style={styles.reviewValue}>₱3,798</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.reviewRow}>
          <Text style={styles.reviewLabel}>Subtotal</Text>
          <Text style={styles.reviewValue}>₱6,297</Text>
        </View>
        <View style={styles.reviewRow}>
          <Text style={styles.reviewLabel}>Shipping</Text>
          <Text style={styles.reviewValue}>₱150</Text>
        </View>
        <View style={styles.reviewRow}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalValue}>₱6,447</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.placeBtn} onPress={handlePlaceOrder}>
        <Text style={styles.placeBtnText}>Place Order</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  content: { padding: 20, paddingBottom: 40 },
  sectionTitle: {
    color: Colors.text,
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
    marginTop: 8,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: 14,
    marginBottom: 8,
    gap: 12,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  optionActive: { borderColor: Colors.primary },
  optionInfo: { flex: 1 },
  optionLabel: { color: Colors.text, fontSize: 15, fontWeight: '500' },
  optionSub: { color: Colors.textSecondary, fontSize: 13, marginTop: 2 },
  reviewBox: {
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  reviewRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  reviewLabel: { color: Colors.textSecondary, fontSize: 14 },
  reviewValue: { color: Colors.text, fontSize: 14 },
  divider: { height: 1, backgroundColor: Colors.border, marginVertical: 8 },
  totalLabel: { color: Colors.text, fontSize: 16, fontWeight: 'bold' },
  totalValue: { color: Colors.primary, fontSize: 18, fontWeight: 'bold' },
  placeBtn: {
    backgroundColor: Colors.primary,
    height: 52,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24,
  },
  placeBtnText: { color: Colors.black, fontSize: 16, fontWeight: 'bold' },
});
