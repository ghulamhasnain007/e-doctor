import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, User, Stethoscope } from 'lucide-react-native';
import { useTheme } from '@/context/ThemeContext';

export default function UserTypeScreen() {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <ArrowLeft color={colors.text} size={24} />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: colors.text }]}>
            Choose Account Type
          </Text>
          <View style={{ width: 24 }} />
        </View>

        <View style={styles.content}>
          <Text style={[styles.description, { color: colors.textSecondary }]}>
            Select the type of account you want to create
          </Text>

          <View style={styles.optionsContainer}>
            <TouchableOpacity
              style={[styles.optionCard, { backgroundColor: colors.cardBg }]}
              onPress={() => router.push('/patient-register')}
            >
              <LinearGradient
                colors={[colors.primary, colors.primaryLight]}
                style={styles.iconContainer}
              >
                <User color="#fff" size={28} />
              </LinearGradient>
              <Text style={[styles.optionTitle, { color: colors.text }]}>Patient</Text>
              <Text style={[styles.optionDescription, { color: colors.textSecondary }]}>
                Book appointments and consult with doctors
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.optionCard, { backgroundColor: colors.cardBg }]}
              onPress={() => router.push('/doctor-register')}
            >
              <LinearGradient
                colors={[colors.secondary, colors.secondaryLight]}
                style={styles.iconContainer}
              >
                <Stethoscope color="#fff" size={28} />
              </LinearGradient>
              <Text style={[styles.optionTitle, { color: colors.text }]}>Doctor</Text>
              <Text style={[styles.optionDescription, { color: colors.textSecondary }]}>
                Provide consultations and medical advice
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    height: 60,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 20,
  },
  description: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    marginBottom: 40,
    textAlign: 'center',
  },
  optionsContainer: {
    gap: 20,
  },
  optionCard: {
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  optionTitle: {
    fontSize: 20,
    fontFamily: 'Inter-SemiBold',
    marginBottom: 8,
  },
  optionDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    lineHeight: 20,
  },
});