import { View, Text, StyleSheet, Image } from 'react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@/context/ThemeContext';
import AppButton from '@/components/AppButton';

export default function WelcomeScreen() {
  const { colors } = useTheme();

  const navigateToLogin = () => {
    console.log("Login button pressed");
    // Add a slight delay to improve reliability
    setTimeout(() => {
      router.push('/login');
    }, 100);
  };

  const navigateToRegister = () => {
    console.log("Register button pressed");
    // Add a slight delay to improve reliability
    setTimeout(() => {
      router.push('/user-type');
    }, 100);
  };

  // const navigateToTest = () => {
  //   console.log("Test button pressed");
  //   // Navigate to the test screen
  //   setTimeout(() => {
  //     router.push('/test-button');
  //   }, 100);
  // };

  return (
    <LinearGradient
      colors={[colors.primary, colors.primaryDark]}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.logoContainer}>
          <Image 
            source={{ uri: 'https://images.pexels.com/photos/6941883/pexels-photo-6941883.jpeg?auto=compress&cs=tinysrgb&w=600' }} 
            style={styles.logoBackground}
          />
          <View style={styles.logoOverlay}>
            <Text style={styles.logoText}>E-Doctor</Text>
            <Text style={styles.tagline}>Healthcare at your fingertips</Text>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <AppButton
            title="Login"
            backgroundColor={colors.white}
            textColor={colors.primary}
            onPress={navigateToLogin}
            style={{
              width: '100%',
              height: 56,
              borderRadius: 28,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.1,
              shadowRadius: 6,
              elevation: 2,
            }}
          />
          
          <AppButton
            title="Register"
            backgroundColor="transparent"
            textColor={colors.white}
            onPress={() => setTimeout(() => router.push('/user-type'), 100)}
            style={{
              width: '100%',
              height: 56,
              borderRadius: 28,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.1,
              shadowRadius: 6,
              elevation: 2,
            }}
            outlined
            borderColor={colors.white}
          />
          
          {/* Test button - added for debugging */}
          {/* <AppButton
            title="Test Buttons"
            backgroundColor={colors.white}
            textColor="red"
            onPress={() => setTimeout(() => router.push('/test-button'), 100)}
            style={{
              width: '100%',
              height: 56,
              borderRadius: 28,
              marginTop: 10,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.1,
              shadowRadius: 6,
              elevation: 2,
            }}
          /> */}
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 80,
  },
  logoBackground: {
    width: 200,
    height: 200,
    borderRadius: 100,
  },
  logoOverlay: {
    position: 'absolute',
    top: 220,
    alignItems: 'center',
  },
  logoText: {
    fontSize: 40,
    fontFamily: 'Inter-Bold',
    color: '#fff',
    marginBottom: 8,
  },
  tagline: {
    fontSize: 18,
    fontFamily: 'Inter-Regular',
    color: '#fff',
    opacity: 0.9,
  },
  buttonContainer: {
    width: '100%',
    gap: 16,
  },
  button: {
    width: '100%',
    height: 56,
    borderRadius: 28,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 2,
  },
  outlineButton: {
    borderWidth: 2,
    borderColor: '#fff',
  },
});