import { Redirect } from 'expo-router';

// Start at Login screen (change to '/(tabs)' if you want to skip auth for testing)
export default function Index() {
  return <Redirect href="/auth/login" />;
}
