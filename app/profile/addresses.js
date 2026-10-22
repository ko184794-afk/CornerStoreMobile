import { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../constants/Colors';

const INITIAL = [
  { id: '1', label: 'Home', address: '123 Mabini St, Quezon City', isDefault: true },
  { id: '2', label: 'Office', address: '456 Ayala Ave, Makati', isDefault: false },
];

export default function AddressesScreen() {
  const [addresses, setAddresses] = useState(INITIAL);

  const setDefault = (id) => {
    setAddresses((prev) =>
      prev.map((a) => ({ ...a, isDefault: a.id === id }))
    );
  };

  const remove = (id) => {
    Alert.alert('Remove Address', 'Are you sure?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Remove',
        style: 'destructive',
        onPress: () => setAddresses((prev) => prev.filter((a) => a.id !== id)),
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={addresses}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.cardTop}>
              <Text style={styles.label}>{item.label}</Text>
              {item.isDefault && (
                <View style={styles.defaultBadge}>
                  <Text style={styles.defaultText}>Default</Text>
                </View>
              )}
            </View>
            <Text style={styles.address}>{item.address}</Text>
            <View style={styles.actions}>
              {!item.isDefault && (
                <TouchableOpacity onPress={() => setDefault(item.id)}>
                  <Text style={styles.actionText}>Set as Default</Text>
                </TouchableOpacity>
              )}
              <TouchableOpacity onPress={() => remove(item.id)}>
                <Text style={[styles.actionText, { color: Colors.danger }]}>Remove</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
      <TouchableOpacity
        style={styles.addBtn}
        onPress={() => Alert.alert('Coming soon', 'Add address form')}
      >
        <Ionicons name="add" size={20} color={Colors.black} />
        <Text style={styles.addBtnText}>Add New Address</Text>
      </TouchableOpacity>
    </View>
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
  cardTop: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  label: { color: Colors.text, fontSize: 16, fontWeight: 'bold' },
  defaultBadge: {
    backgroundColor: Colors.primary + '33',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  defaultText: { color: Colors.primary, fontSize: 11, fontWeight: '600' },
  address: { color: Colors.textSecondary, fontSize: 14, marginTop: 6 },
  actions: { flexDirection: 'row', gap: 20, marginTop: 12 },
  actionText: { color: Colors.primary, fontSize: 13, fontWeight: '600' },
  addBtn: {
    flexDirection: 'row',
    backgroundColor: Colors.primary,
    margin: 16,
    height: 52,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  addBtnText: { color: Colors.black, fontSize: 16, fontWeight: 'bold' },
});
