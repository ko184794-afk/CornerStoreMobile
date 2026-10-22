import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  FlatList,
  Dimensions,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../constants/Colors';

const { width } = Dimensions.get('window');

const CATEGORIES = [
  { id: '1', name: 'Action Figures', icon: 'person' },
  { id: '2', name: 'Vehicles', icon: 'car' },
  { id: '3', name: 'Sets', icon: 'cube' },
  { id: '4', name: 'Limited', icon: 'star' },
];

const FEATURED = [
  { id: '1', name: 'Golden Dragon Figure', price: 2499, badge: 'Featured' },
  { id: '2', name: 'Retro Robot MK-II', price: 1899, badge: 'Hot' },
  { id: '3', name: 'Space Explorer Set', price: 3499, badge: 'New' },
];

const RECOMMENDED = [
  { id: '4', name: 'Ninja Warrior', price: 1299 },
  { id: '5', name: 'Mech Guardian', price: 2199 },
  { id: '6', name: 'Crystal Phoenix', price: 2799 },
  { id: '7', name: 'Battle Tank', price: 1599 },
];

function ProductCard({ item, wide = false }) {
  return (
    <TouchableOpacity
      style={[styles.card, wide && styles.cardWide]}
      onPress={() => router.push(`/product/${item.id}`)}
    >
      <View style={styles.cardImage}>
        <Ionicons name="cube-outline" size={40} color={Colors.primary} />
        {item.badge && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{item.badge}</Text>
          </View>
        )}
      </View>
      <Text style={styles.cardName} numberOfLines={2}>{item.name}</Text>
      <Text style={styles.cardPrice}>₱{item.price.toLocaleString()}</Text>
    </TouchableOpacity>
  );
}

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Hello, Collector</Text>
          <Text style={styles.headerTitle}>Cornerstone Toys</Text>
        </View>
        <TouchableOpacity onPress={() => router.push('/wishlist/index')}>
          <Ionicons name="heart-outline" size={26} color={Colors.primary} />
        </TouchableOpacity>
      </View>

      {/* Search */}
      <TouchableOpacity
        style={styles.searchBox}
        onPress={() => router.push('/(tabs)/products')}
      >
        <Ionicons name="search" size={20} color={Colors.textMuted} />
        <Text style={styles.searchPlaceholder}>Search collectibles...</Text>
      </TouchableOpacity>

      {/* Categories */}
      <Text style={styles.sectionTitle}>Categories</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.catScroll}>
        {CATEGORIES.map((cat) => (
          <TouchableOpacity key={cat.id} style={styles.catItem}>
            <View style={styles.catIcon}>
              <Ionicons name={cat.icon} size={24} color={Colors.primary} />
            </View>
            <Text style={styles.catName}>{cat.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Featured / Promotions */}
      <View style={styles.sectionRow}>
        <Text style={styles.sectionTitle}>Featured</Text>
        <TouchableOpacity onPress={() => router.push('/(tabs)/products')}>
          <Text style={styles.seeAll}>See all</Text>
        </TouchableOpacity>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.featuredScroll}>
        {FEATURED.map((item) => (
          <ProductCard key={item.id} item={item} wide />
        ))}
      </ScrollView>

      {/* Recommended */}
      <View style={styles.sectionRow}>
        <Text style={styles.sectionTitle}>Recommended</Text>
      </View>
      <View style={styles.grid}>
        {RECOMMENDED.map((item) => (
          <ProductCard key={item.id} item={item} />
        ))}
      </View>

      <View style={{ height: 24 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 12,
  },
  greeting: { color: Colors.textSecondary, fontSize: 13 },
  headerTitle: { color: Colors.primary, fontSize: 22, fontWeight: 'bold' },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    marginHorizontal: 20,
    borderRadius: 12,
    paddingHorizontal: 14,
    height: 48,
    gap: 10,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: 20,
  },
  searchPlaceholder: { color: Colors.textMuted, fontSize: 15 },
  sectionTitle: {
    color: Colors.text,
    fontSize: 18,
    fontWeight: 'bold',
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  sectionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: 20,
    marginTop: 8,
  },
  seeAll: { color: Colors.primary, fontSize: 14 },
  catScroll: { paddingLeft: 20, marginBottom: 16 },
  catItem: { alignItems: 'center', marginRight: 20 },
  catIcon: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: Colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  catName: { color: Colors.textSecondary, fontSize: 12, marginTop: 6 },
  featuredScroll: { paddingLeft: 20, paddingRight: 8 },
  card: {
    width: (width - 52) / 2,
    backgroundColor: Colors.surface,
    borderRadius: 14,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  cardWide: { width: 160, marginRight: 12 },
  cardImage: {
    height: 100,
    backgroundColor: Colors.surfaceLight,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  badge: {
    position: 'absolute',
    top: 6,
    left: 6,
    backgroundColor: Colors.primary,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  badgeText: { color: Colors.black, fontSize: 10, fontWeight: 'bold' },
  cardName: { color: Colors.text, fontSize: 13, fontWeight: '600', marginBottom: 4 },
  cardPrice: { color: Colors.primary, fontSize: 15, fontWeight: 'bold' },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
  },
});
