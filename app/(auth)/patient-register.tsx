import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView, Image } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Mail, Lock, User, Eye, EyeOff, Camera, CheckCircle } from 'lucide-react-native';
import * as ImagePicker from 'expo-image-picker';
import { useTheme } from '@/context/ThemeContext';
import { useAuth } from '@/context/AuthContext';

export default function PatientRegisterScreen() {
  const { colors } = useTheme();
  const { register } = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [medicalReport, setMedicalReport] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [error, setError] = useState('');

  const pickImage = async (isProfile: boolean) => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      if (isProfile) {
        setProfileImage(result.assets[0].uri);
      } else {
        setMedicalReport(result.assets[0].uri);
      }
    }
  };

  const handleNext = () => {
    if (!name || !email || !password) {
      setError('Please fill in all required fields');
      return;
    }
    setError('');
    setCurrentStep(2);
  };

  const handleRegister = async () => {
    try {
      await register({
        name,
        email,
        password,
        profileImage,
        medicalReport,
        userType: 'patient'
      });
      // Navigation will be handled by AuthContext
    } catch (err) {
      setError('Registration failed. Please try again.');
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => currentStep === 1 ? router.back() : setCurrentStep(1)}
          >
            <ArrowLeft color={colors.text} size={24} />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: colors.text }]}>
            {currentStep === 1 ? 'Create Account' : 'Personal Details'}
          </Text>
          <View style={{ width: 24 }} />
        </View>
        
        <View style={styles.progressContainer}>
          <View style={[styles.progressBar, { backgroundColor: colors.border }]}>
            <View 
              style={[
                styles.progressFill, 
                { 
                  backgroundColor: colors.primary,
                  width: currentStep === 1 ? '50%' : '100%' 
                }
              ]} 
            />
          </View>
          <View style={styles.stepsContainer}>
            <View style={styles.stepItem}>
              <View style={[styles.stepCircle, { backgroundColor: colors.primary }]}>
                <CheckCircle color="#fff" size={16} />
              </View>
              <Text style={[styles.stepText, { color: colors.text }]}>Account</Text>
            </View>
            <View style={styles.stepItem}>
              <View 
                style={[
                  styles.stepCircle, 
                  { 
                    backgroundColor: currentStep === 2 ? colors.primary : colors.border
                  }
                ]}
              >
                {currentStep === 2 ? (
                  <CheckCircle color="#fff" size={16} />
                ) : (
                  <Text style={styles.stepNumber}>2</Text>
                )}
              </View>
              <Text 
                style={[
                  styles.stepText, 
                  { 
                    color: currentStep === 2 ? colors.text : colors.textSecondary
                  }
                ]}
              >
                Details
              </Text>
            </View>
          </View>
        </View>
        
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {error ? (
            <View style={[styles.errorContainer, { backgroundColor: colors.error + '20' }]}>
              <Text style={[styles.errorText, { color: colors.error }]}>{error}</Text>
            </View>
          ) : null}
          
          {currentStep === 1 ? (
            // Step 1: Basic Info
            <View style={styles.form}>
              <View style={styles.inputGroup}>
                <Text style={[styles.inputLabel, { color: colors.textSecondary }]}>Full Name</Text>
                <View style={[styles.inputContainer, { backgroundColor: colors.inputBg, borderColor: colors.border }]}>
                  <User color={colors.textSecondary} size={20} />
                  <TextInput
                    style={[styles.input, { color: colors.text }]}
                    placeholder="Enter your full name"
                    placeholderTextColor={colors.placeholder}
                    value={name}
                    onChangeText={setName}
                  />
                </View>
              </View>
              
              <View style={styles.inputGroup}>
                <Text style={[styles.inputLabel, { color: colors.textSecondary }]}>Email</Text>
                <View style={[styles.inputContainer, { backgroundColor: colors.inputBg, borderColor: colors.border }]}>
                  <Mail color={colors.textSecondary} size={20} />
                  <TextInput
                    style={[styles.input, { color: colors.text }]}
                    placeholder="Enter your email"
                    placeholderTextColor={colors.placeholder}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    value={email}
                    onChangeText={setEmail}
                  />
                </View>
              </View>
              
              <View style={styles.inputGroup}>
                <Text style={[styles.inputLabel, { color: colors.textSecondary }]}>Password</Text>
                <View style={[styles.inputContainer, { backgroundColor: colors.inputBg, borderColor: colors.border }]}>
                  <Lock color={colors.textSecondary} size={20} />
                  <TextInput
                    style={[styles.input, { color: colors.text }]}
                    placeholder="Create a password"
                    placeholderTextColor={colors.placeholder}
                    secureTextEntry={!passwordVisible}
                    value={password}
                    onChangeText={setPassword}
                  />
                  <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
                    {passwordVisible ? (
                      <EyeOff color={colors.textSecondary} size={20} />
                    ) : (
                      <Eye color={colors.textSecondary} size={20} />
                    )}
                  </TouchableOpacity>
                </View>
                <Text style={[styles.passwordHint, { color: colors.textSecondary }]}>
                  Password must be at least 8 characters
                </Text>
              </View>
              
              <TouchableOpacity
                style={[styles.button, { backgroundColor: colors.primary }]}
                onPress={handleNext}
              >
                <Text style={styles.buttonText}>Continue</Text>
              </TouchableOpacity>
            </View>
          ) : (
            // Step 2: Additional Info
            <View style={styles.form}>
              <View style={styles.uploadSection}>
                <Text style={[styles.sectionTitle, { color: colors.text }]}>Profile Photo</Text>
                <TouchableOpacity 
                  style={[styles.uploadContainer, { borderColor: colors.border }]} 
                  onPress={() => pickImage(true)}
                >
                  {profileImage ? (
                    <Image source={{ uri: profileImage }} style={styles.uploadedImage} />
                  ) : (
                    <>
                      <Camera color={colors.primary} size={24} />
                      <Text style={[styles.uploadText, { color: colors.textSecondary }]}>
                        Upload a profile photo
                      </Text>
                    </>
                  )}
                </TouchableOpacity>
              </View>
              
              <View style={styles.uploadSection}>
                <Text style={[styles.sectionTitle, { color: colors.text }]}>Medical Report (Optional)</Text>
                <TouchableOpacity 
                  style={[styles.uploadContainer, { borderColor: colors.border }]} 
                  onPress={() => pickImage(false)}
                >
                  {medicalReport ? (
                    <View style={styles.fileUploaded}>
                      <CheckCircle color={colors.success} size={24} />
                      <Text style={[styles.fileUploadedText, { color: colors.text }]}>
                        Medical report uploaded
                      </Text>
                    </View>
                  ) : (
                    <>
                      <Camera color={colors.primary} size={24} />
                      <Text style={[styles.uploadText, { color: colors.textSecondary }]}>
                        Upload medical report
                      </Text>
                    </>
                  )}
                </TouchableOpacity>
                <Text style={[styles.uploadHint, { color: colors.textSecondary }]}>
                  This helps doctors provide better care
                </Text>
              </View>
              
              <TouchableOpacity
                style={[styles.button, { backgroundColor: colors.primary }]}
                onPress={handleRegister}
              >
                <Text style={styles.buttonText}>Create Account</Text>
              </TouchableOpacity>
            </View>
          )}
          
          <View style={styles.loginContainer}>
            <Text style={[styles.loginText, { color: colors.textSecondary }]}>
              Already have an account?
            </Text>
            <TouchableOpacity onPress={() => router.push('/login')}>
              <Text style={[styles.loginLink, { color: colors.primary }]}>
                Login
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
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
  progressContainer: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  progressBar: {
    height: 4,
    borderRadius: 2,
    marginBottom: 12,
  },
  progressFill: {
    height: '100%',
    borderRadius: 2,
  },
  stepsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  stepItem: {
    alignItems: 'center',
    gap: 4,
  },
  stepCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepNumber: {
    color: '#fff',
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
  },
  stepText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  errorContainer: {
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  errorText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
  },
  form: {
    gap: 20,
  },
  inputGroup: {
    gap: 8,
  },
  inputLabel: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 56,
    borderRadius: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
  },
  input: {
    flex: 1,
    height: '100%',
    paddingHorizontal: 12,
    fontFamily: 'Inter-Regular',
    fontSize: 16,
  },
  passwordHint: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    marginTop: 4,
  },
  button: {
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
  buttonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#fff',
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 4,
    marginTop: 24,
    marginBottom: 40,
  },
  loginText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
  },
  loginLink: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
  },
  uploadSection: {
    gap: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
  },
  uploadContainer: {
    height: 100,
    borderRadius: 12,
    borderWidth: 1,
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
  },
  uploadText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    marginTop: 8,
  },
  uploadHint: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
  },
  uploadedImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  fileUploaded: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  fileUploadedText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
  },
});