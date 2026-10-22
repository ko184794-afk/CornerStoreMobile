import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  Modal,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../constants/Colors';

const PRODUCTS = [
  { id: '1', name: 'Golden Dragon Figure', price: 2499, category: 'Action Figures', rating: 4.8 },
  { id: '2', name: 'Retro Robot MK-II', price: 1899, category: 'Action Figures', rating: 4.5 },
  { id: '3', name: 'Space Explorer Set', price: 3499, category: 'Sets', rating: 4.9 },
  { id: '4', name: 'Ninja Warrior', price: 1299, category: 'Action Figures', rating: 4.2 },
  { id: '5', name: 'Mech Guardian', price: 2199, category: 'Action Figures', rating: 4.6 },
  { id: '6', name: 'Crystal Phoenix', price: 2799, category: 'Limited', rating: 5.0 },
  { id: '7', name: 'Battle Tank', price: 1599, category: 'Vehicles', rating: 4.3 },
  { id: '8', name: 'Sky Raider Jet', price: 1999, category: 'Vehicles', rating: 4.4 },
];

const SORT_OPTIONS = ['Newest', 'Price: Low to High', 'Price: High to Low', 'Top Rated'];
const FILTER_OPTIONS = ['All', 'Action Figures', 'Vehicles', 'Sets', 'Limited'];

export default function ProductsScreen() {
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('Newest');
  const [filter, setFilter] = useState('All');
  const [showSort, setShowSort] = useState(false);
  const [showFilter, setShowFilter] = useState(false);

  let list = PRODUCTS.filter((p) => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === 'All' || p.category === filter;
    return matchSearch && matchFilter;
  });

  if (sort === 'Price: Low to High') list = [...list].sort((a, b) => a.price - b.price);
  if (sort === 'Price: High to Low') list = [...list].sort((a, b) => b.price - a.price);
  if (sort === 'Top Rated') list = [...list].sort((a, b) => b.rating - a.rating);

  return (
    <View style={styles.container}>
      {/* Search */}
      <View style={styles.searchRow}>
        <View style={styles.searchBox}>
          <Ionicons name="search" size={18} color={Colors.textMuted} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search products..."
            placeholderTextColor={Colors.textMuted}
            value={search}
            onChangeText={setSearch}
          />
        </View>
      </View>

      {/* Filter & Sort bar */}
      <View style={styles.bar}>
        <TouchableOpacity style={styles.barBtn} onPress={() => setShowFilter(true)}>
          <Ionicons name="filter" size={16} color={Colors.primary} />
          <Text style={styles.barText}>{filter}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.barBtn} onPress={() => setShowSort(true)}>
          <Ionicons name="swap-vertical" size={16} color={Colors.primary} />
          <Text style={styles.barText}>{sort}</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={list}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.list}
        columnWrapperStyle={styles.row}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => router.push(`/product/${item.id}`)}
          >
            <View style={styles.cardImage}>
              <Ionicons name="cube-outline" size={36} color={Colors.primary} />
            </View>
            <Text style={styles.cardName} numberOfLines={2}>{item.name}</Text>
            <View style={styles.ratingRow}>
              <Ionicons name="star" size={12} color={Colors.primary} />
              <Text style={styles.rating}>{item.rating}</Text>
            </View>
            <Text style={styles.cardPrice}>₱{item.price.toLocaleString()}</Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>No products found</Text>
        }
      />

      {/* Sort Modal */}
      <Modal visible={showSort} transparent animationType="fade">
        <TouchableOpacity style={styles.modalOverlay} onPress={() => setShowSort(false)}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Sort by</Text>
            {SORT_OPTIONS.map((opt) => (
              <TouchableOpacity
                key={opt}
                style={styles.modalItem}
                onPress={() => { setSort(opt); setShowSort(false); }}
              >
                <Text style={[styles.modalItemText, sort === opt && styles.active]}>
                  {opt}
                </Text>
                {sort === opt && <Ionicons name="checkmark" size={18} color={Colors.primary} />}
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>

      {/* Filter Modal */}
      <Modal visible={showFilter} transparent animationType="fade">
        <TouchableOpacity style={styles.modalOverlay} onPress={() => setShowFilter(false)}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Category</Text>
            {FILTER_OPTIONS.map((opt) => (
              <TouchableOpacity
                key={opt}
                style={styles.modalItem}
                onPress={() => { setFilter(opt); setShowFilter(false); }}
              >
                <Text style={[styles.modalItemText, filter === opt && styles.active]}>
                  {opt}
                </Text>
                {filter === opt && <Ionicons name="checkmark" size={18} color={Colors.primary} />}
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  searchRow: { paddingHorizontal: 16, paddingTop: 8, paddingBottom: 8 },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 44,
    gap: 8,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  searchInput: { flex: 1, color: Colors.text, fontSize: 15 },
  bar: { flexDirection: 'row', paddingHorizontal: 16, gap: 10, marginBottom: 8 },
  barBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: Colors.surface,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  barText: { color: Colors.text, fontSize: 13 },
  list: { padding: 16, paddingTop: 8 },
  row: { justifyContent: 'space-between' },
  card: {
    width: '48%',
    backgroundColor: Colors.surface,
    borderRadius: 14,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  cardImage: {
    height: 100,
    backgroundColor: Colors.surfaceLight,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  cardName: { color: Colors.text, fontSize: 13, fontWeight: '600', marginBottom: 4 },
  ratingRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginBottom: 4 },
  rating: { color: Colors.textSecondary, fontSize: 12 },
  cardPrice: { color: Colors.primary, fontSize: 15, fontWeight: 'bold' },
  empty: { color: Colors.textMuted, textAlign: 'center', marginTop: 40 },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'flex-end',
  },
  modalBox: {
    backgroundColor: Colors.surface,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    paddingBottom: 40,
  },
  modalTitle: { color: Colors.text, fontSize: 18, fontWeight: 'bold', marginBottom: 16 },
  modalItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  modalItemText: { color: Colors.text, fontSize: 15 },
  active: { color: Colors.primary, fontWeight: '600' },
});
