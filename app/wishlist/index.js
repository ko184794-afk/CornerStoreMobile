import { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../constants/Colors';

const INITIAL = [
  { id: '1', name: 'Golden Dragon Figure', price: 2499 },
  { id: '6', name: 'Crystal Phoenix', price: 2799 },
  { id: '3', name: 'Space Explorer Set', price: 3499 },
];

export default function WishlistScreen() {
  const [items, setItems] = useState(INITIAL);

  const remove = (id) => setItems((prev) => prev.filter((i) => i.id !== id));

  const moveToCart = (id) => {
    remove(id);
    // TODO: actually add to cart
  };

  if (items.length === 0) {
    return (
      <View style={styles.empty}>
        <Ionicons name="heart-outline" size={64} color={Colors.textMuted} />
        <Text style={styles.emptyText}>Wishlist is empty</Text>
        <TouchableOpacity style={styles.btn} onPress={() => router.push('/(tabs)/products')}>
          <Text style={styles.btnText}>Browse Products</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <FlatList
      style={styles.container}
      contentContainerStyle={styles.list}
      data={items}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={styles.card}>
          <TouchableOpacity
            style={styles.cardImage}
            onPress={() => router.push(`/product/${item.id}`)}
          >
            <Ionicons name="cube-outline" size={32} color={Colors.primary} />
          </TouchableOpacity>
          <View style={styles.info}>
            <Text style={styles.name} numberOfLines={2}>{item.name}</Text>
            <Text style={styles.price}>₱{item.price.toLocaleString()}</Text>
            <View style={styles.actions}>
              <TouchableOpacity style={styles.moveBtn} onPress={() => moveToCart(item.id)}>
                <Text style={styles.moveText}>Move to Cart</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => remove(item.id)}>
                <Ionicons name="trash-outline" size={20} color={Colors.danger} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  list: { padding: 16 },
  empty: {
    flex: 1,
    backgroundColor: Colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  emptyText: { color: Colors.textSecondary },
  card: {
    flexDirection: 'row',
    backgroundColor: Colors.surface,
    borderRadius: 14,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    gap: 12,
  },
  cardImage: {
    width: 80,
    height: 80,
    backgroundColor: Colors.surfaceLight,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  info: { flex: 1 },
  name: { color: Colors.text, fontSize: 14, fontWeight: '600' },
  price: { color: Colors.primary, fontSize: 15, fontWeight: 'bold', marginTop: 4 },
  actions: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 10 },
  moveBtn: {
    backgroundColor: Colors.primary + '22',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  moveText: { color: Colors.primary, fontSize: 13, fontWeight: '600' },
  btn: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 24,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: { color: Colors.black, fontWeight: 'bold' },
});
