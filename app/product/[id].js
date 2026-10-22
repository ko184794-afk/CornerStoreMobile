import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../constants/Colors';

const PRODUCT = {
  id: '1',
  name: 'Golden Dragon Figure',
  price: 2499,
  category: 'Action Figures',
  rating: 4.8,
  reviews: 24,
  description:
    'Limited edition Golden Dragon collectible figure. Highly detailed with premium paint finish. Comes with display stand and certificate of authenticity.',
  stock: 12,
};

const REVIEWS = [
  { id: '1', user: 'Maria S.', rating: 5, comment: 'Amazing quality! Worth every peso.' },
  { id: '2', user: 'Pedro R.', rating: 4, comment: 'Great figure, packaging was excellent.' },
];

export default function ProductDetailsScreen() {
  const { id } = useLocalSearchParams();
  const [qty, setQty] = useState(1);
  const [inWishlist, setInWishlist] = useState(false);
  const [userRating, setUserRating] = useState(0);
  const [reviewText, setReviewText] = useState('');

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Image */}
      <View style={styles.imageBox}>
        <Ionicons name="cube-outline" size={80} color={Colors.primary} />
      </View>

      <View style={styles.content}>
        <View style={styles.topRow}>
          <Text style={styles.category}>{PRODUCT.category}</Text>
          <TouchableOpacity onPress={() => setInWishlist(!inWishlist)}>
            <Ionicons
              name={inWishlist ? 'heart' : 'heart-outline'}
              size={26}
              color={inWishlist ? Colors.danger : Colors.textMuted}
            />
          </TouchableOpacity>
        </View>

        <Text style={styles.name}>{PRODUCT.name}</Text>

        <View style={styles.ratingRow}>
          <Ionicons name="star" size={16} color={Colors.primary} />
          <Text style={styles.rating}>{PRODUCT.rating}</Text>
          <Text style={styles.reviewCount}>({PRODUCT.reviews} reviews)</Text>
        </View>

        <Text style={styles.price}>₱{PRODUCT.price.toLocaleString()}</Text>
        <Text style={styles.stock}>{PRODUCT.stock} in stock</Text>

        <Text style={styles.sectionLabel}>Description</Text>
        <Text style={styles.desc}>{PRODUCT.description}</Text>

        {/* Quantity */}
        <Text style={styles.sectionLabel}>Quantity</Text>
        <View style={styles.qtyRow}>
          <TouchableOpacity
            style={styles.qtyBtn}
            onPress={() => setQty(Math.max(1, qty - 1))}
          >
            <Ionicons name="remove" size={18} color={Colors.text} />
          </TouchableOpacity>
          <Text style={styles.qty}>{qty}</Text>
          <TouchableOpacity style={styles.qtyBtn} onPress={() => setQty(qty + 1)}>
            <Ionicons name="add" size={18} color={Colors.text} />
          </TouchableOpacity>
        </View>

        {/* Add to Cart */}
        <TouchableOpacity style={styles.addBtn}>
          <Ionicons name="cart" size={20} color={Colors.black} />
          <Text style={styles.addBtnText}>Add to Cart</Text>
        </TouchableOpacity>

        {/* Reviews */}
        <Text style={styles.sectionLabel}>Reviews & Ratings</Text>
        {REVIEWS.map((r) => (
          <View key={r.id} style={styles.reviewCard}>
            <View style={styles.reviewHeader}>
              <Text style={styles.reviewUser}>{r.user}</Text>
              <View style={styles.stars}>
                {[1, 2, 3, 4, 5].map((s) => (
                  <Ionicons
                    key={s}
                    name={s <= r.rating ? 'star' : 'star-outline'}
                    size={12}
                    color={Colors.primary}
                  />
                ))}
              </View>
            </View>
            <Text style={styles.reviewComment}>{r.comment}</Text>
          </View>
        ))}

        {/* Submit Review */}
        <Text style={styles.sectionLabel}>Write a Review</Text>
        <View style={styles.starsRow}>
          {[1, 2, 3, 4, 5].map((s) => (
            <TouchableOpacity key={s} onPress={() => setUserRating(s)}>
              <Ionicons
                name={s <= userRating ? 'star' : 'star-outline'}
                size={28}
                color={Colors.primary}
              />
            </TouchableOpacity>
          ))}
        </View>
        <TextInput
          style={styles.reviewInput}
          placeholder="Share your thoughts..."
          placeholderTextColor={Colors.textMuted}
          value={reviewText}
          onChangeText={setReviewText}
          multiline
        />
        <TouchableOpacity style={styles.submitBtn}>
          <Text style={styles.submitText}>Submit Review</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  imageBox: {
    height: 280,
    backgroundColor: Colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: { padding: 20 },
  topRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  category: { color: Colors.primary, fontSize: 13, fontWeight: '600' },
  name: { color: Colors.text, fontSize: 22, fontWeight: 'bold', marginTop: 6 },
  ratingRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 8 },
  rating: { color: Colors.text, fontSize: 14, fontWeight: '600' },
  reviewCount: { color: Colors.textMuted, fontSize: 13 },
  price: { color: Colors.primary, fontSize: 24, fontWeight: 'bold', marginTop: 12 },
  stock: { color: Colors.success, fontSize: 13, marginTop: 4 },
  sectionLabel: {
    color: Colors.text,
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 24,
    marginBottom: 10,
  },
  desc: { color: Colors.textSecondary, fontSize: 14, lineHeight: 22 },
  qtyRow: { flexDirection: 'row', alignItems: 'center', gap: 16 },
  qtyBtn: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: Colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  qty: { color: Colors.text, fontSize: 18, fontWeight: 'bold', minWidth: 24, textAlign: 'center' },
  addBtn: {
    flexDirection: 'row',
    backgroundColor: Colors.primary,
    height: 52,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 20,
  },
  addBtnText: { color: Colors.black, fontSize: 16, fontWeight: 'bold' },
  reviewCard: {
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  reviewHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  reviewUser: { color: Colors.text, fontWeight: '600' },
  stars: { flexDirection: 'row', gap: 2 },
  reviewComment: { color: Colors.textSecondary, fontSize: 13 },
  starsRow: { flexDirection: 'row', gap: 8, marginBottom: 12 },
  reviewInput: {
    backgroundColor: Colors.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: 14,
    color: Colors.text,
    minHeight: 80,
    textAlignVertical: 'top',
  },
  submitBtn: {
    backgroundColor: Colors.surfaceLight,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
    marginBottom: 32,
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  submitText: { color: Colors.primary, fontWeight: 'bold' },
});
