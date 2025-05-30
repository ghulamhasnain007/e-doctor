import { Stack } from 'expo-router';

export default function AuthLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="welcome" options={{ headerShown: false }} />
      <Stack.Screen name="login" options={{ title: 'Login' }} />
      <Stack.Screen name="user-type" options={{ title: 'Select User Type' }} />
      <Stack.Screen name="patient-register" options={{ title: 'Patient Registration' }} />
      <Stack.Screen name="doctor-register" options={{ title: 'Doctor Registration' }} />
      {/* <Stack.Screen name="test-button" options={{ title: 'Button Test' }} /> */}
    </Stack>
  );
}