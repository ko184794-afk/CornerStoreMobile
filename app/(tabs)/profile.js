import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../constants/Colors';

const MENU = [
  { icon: 'person-outline', label: 'Edit Profile', href: '/profile/edit' },
  { icon: 'lock-closed-outline', label: 'Change Password', href: '/profile/change-password' },
  { icon: 'location-outline', label: 'Delivery Addresses', href: '/profile/addresses' },
  { icon: 'receipt-outline', label: 'My Orders', href: '/orders/index' },
  { icon: 'heart-outline', label: 'Wishlist', href: '/wishlist/index' },
  { icon: 'help-circle-outline', label: 'Customer Support', href: '/support/index' },
  { icon: 'document-text-outline', label: 'FAQs', href: '/support/faq' },
];

export default function ProfileScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Ionicons name="person" size={40} color={Colors.primary} />
        </View>
        <Text style={styles.name}>Juan Dela Cruz</Text>
        <Text style={styles.email}>juan@example.com</Text>
      </View>

      <View style={styles.menu}>
        {MENU.map((item) => (
          <TouchableOpacity
            key={item.label}
            style={styles.menuItem}
            onPress={() => router.push(item.href)}
          >
            <View style={styles.menuLeft}>
              <Ionicons name={item.icon} size={22} color={Colors.primary} />
              <Text style={styles.menuLabel}>{item.label}</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color={Colors.textMuted} />
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity
        style={styles.logoutBtn}
        onPress={() => router.replace('/auth/login')}
      >
        <Ionicons name="log-out-outline" size={20} color={Colors.danger} />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header: { alignItems: 'center', paddingVertical: 28 },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: Colors.primary,
    marginBottom: 12,
  },
  name: { color: Colors.text, fontSize: 20, fontWeight: 'bold' },
  email: { color: Colors.textSecondary, fontSize: 14, marginTop: 4 },
  menu: { paddingHorizontal: 16, gap: 4 },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.surface,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  menuLeft: { flexDirection: 'row', alignItems: 'center', gap: 14 },
  menuLabel: { color: Colors.text, fontSize: 15 },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 32,
    marginBottom: 40,
    padding: 16,
  },
  logoutText: { color: Colors.danger, fontSize: 16, fontWeight: '600' },
});
