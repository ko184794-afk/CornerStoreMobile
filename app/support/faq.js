import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../constants/Colors';

const FAQS = [
  {
    q: 'How long does shipping take?',
    a: 'Standard shipping takes 3–5 business days within Metro Manila, and 5–10 days for provincial areas.',
  },
  {
    q: 'Can I cancel my order?',
    a: 'Yes, you can cancel an order within 1 hour of placing it, as long as it has not been processed yet.',
  },
  {
    q: 'What payment methods do you accept?',
    a: 'We accept Cash on Delivery, GCash, and major credit/debit cards.',
  },
  {
    q: 'How do I track my order?',
    a: 'Go to Profile → My Orders and tap on any order to see the full tracking timeline.',
  },
  {
    q: 'What is your return policy?',
    a: 'Items can be returned within 7 days of delivery if they are unused and in original packaging.',
  },
];

export default function FAQScreen() {
  const [open, setOpen] = useState(null);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {FAQS.map((faq, i) => (
        <TouchableOpacity
          key={i}
          style={styles.card}
          onPress={() => setOpen(open === i ? null : i)}
          activeOpacity={0.7}
        >
          <View style={styles.qRow}>
            <Text style={styles.q}>{faq.q}</Text>
            <Ionicons
              name={open === i ? 'chevron-up' : 'chevron-down'}
              size={18}
              color={Colors.primary}
            />
          </View>
          {open === i && <Text style={styles.a}>{faq.a}</Text>}
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  content: { padding: 16 },
  card: {
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: 16,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  qRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  q: { color: Colors.text, fontSize: 15, fontWeight: '600', flex: 1, paddingRight: 8 },
  a: { color: Colors.textSecondary, fontSize: 14, marginTop: 12, lineHeight: 20 },
});
