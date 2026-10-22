import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../constants/Colors';

export default function SupportScreen() {
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (!subject || !message) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }
    Alert.alert('Sent', 'Your support request has been submitted. We will reply soon.');
    setSubject('');
    setMessage('');
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.quickLinks}>
        <TouchableOpacity style={styles.quickBtn} onPress={() => router.push('/support/faq')}>
          <Ionicons name="help-circle-outline" size={28} color={Colors.primary} />
          <Text style={styles.quickText}>FAQs</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.quickBtn}
          onPress={() => Alert.alert('Live Chat', 'Live chat / AI assistant coming soon.')}
        >
          <Ionicons name="chatbubbles-outline" size={28} color={Colors.primary} />
          <Text style={styles.quickText}>Live Chat</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionTitle}>Contact Support</Text>

      <Text style={styles.label}>Subject</Text>
      <TextInput
        style={styles.input}
        value={subject}
        onChangeText={setSubject}
        placeholder="e.g. Order issue"
        placeholderTextColor={Colors.textMuted}
      />

      <Text style={styles.label}>Message</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        value={message}
        onChangeText={setMessage}
        placeholder="Describe your issue..."
        placeholderTextColor={Colors.textMuted}
        multiline
      />

      <TouchableOpacity style={styles.btn} onPress={handleSend}>
        <Text style={styles.btnText}>Send Message</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  content: { padding: 20 },
  quickLinks: { flexDirection: 'row', gap: 12, marginBottom: 28 },
  quickBtn: {
    flex: 1,
    backgroundColor: Colors.surface,
    borderRadius: 14,
    padding: 20,
    alignItems: 'center',
    gap: 8,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  quickText: { color: Colors.text, fontSize: 14, fontWeight: '600' },
  sectionTitle: { color: Colors.text, fontSize: 18, fontWeight: 'bold', marginBottom: 16 },
  label: { color: Colors.textSecondary, fontSize: 13, marginBottom: 6, marginTop: 8 },
  input: {
    backgroundColor: Colors.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingHorizontal: 14,
    height: 50,
    color: Colors.text,
    fontSize: 15,
  },
  textArea: { height: 120, textAlignVertical: 'top', paddingTop: 14 },
  btn: {
    backgroundColor: Colors.primary,
    height: 52,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24,
  },
  btnText: { color: Colors.black, fontSize: 16, fontWeight: 'bold' },
});
