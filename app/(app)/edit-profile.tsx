import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, ScrollView, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Camera, Mail, Phone, MapPin, Calendar, Droplet, AlertCircle } from 'lucide-react-native';
import { useTheme } from '@/context/ThemeContext';
import { useAuth } from '@/context/AuthContext';
import { router } from 'expo-router';
import { useModal } from '@/context/ModalContext';

export default function EditProfileScreen() {
  const { colors } = useTheme();
  const { userType, user } = useAuth();
  const { showInfo } = useModal();
  
  // Patient form state
  const [patientForm, setPatientForm] = useState({
    firstName: 'John',
    lastName: 'Smith',
    email: 'john.smith@example.com',
    phone: '+1 (555) 123-4567',
    dateOfBirth: '15 May 1988',
    bloodGroup: 'O+',
    address: '123 Main Street, New York, NY 10001',
    emergencyContact: '+1 (555) 987-6543',
    allergies: 'Penicillin',
    chronicConditions: 'None',
    notificationsEnabled: true
  });
  
  // Doctor form state
  const [doctorForm, setDoctorForm] = useState({
    firstName: 'Sarah',
    lastName: 'Johnson',
    email: 'dr.sarah@example.com',
    phone: '+1 (555) 234-5678',
    specialty: 'Cardiologist',
    experience: '10+ years',
    address: '456 Medical Plaza, New York, NY 10022',
    bio: 'Board-certified cardiologist with over 10 years of experience in treating cardiovascular diseases, heart conditions, and preventive cardiology.',
    notificationsEnabled: true
  });
  
  const goBack = () => {
    router.back();
  };
  
  const handleSaveChanges = () => {
    // In a real app, this would update the user profile
    // via an API call or other state management
    // alert('Profile updated successfully!');
    showInfo({
      title: 'Profile Updated',
      message: 'Your profile has been updated successfully.',
      buttonText: 'OK',
    });
    router.back();
  };
  
interface PatientForm {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    dateOfBirth: string;
    bloodGroup: string;
    address: string;
    emergencyContact: string;
    allergies: string;
    chronicConditions: string;
    notificationsEnabled: boolean;
}

interface DoctorForm {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    specialty: string;
    experience: string;
    address: string;
    bio: string;
    notificationsEnabled: boolean;
}

const updatePatientForm = (key: keyof PatientForm, value: PatientForm[keyof PatientForm]) => {
    setPatientForm(prev => ({ ...prev, [key]: value }));
};
  
const updateDoctorForm = (key: keyof DoctorForm, value: DoctorForm[keyof DoctorForm]) => {
    setDoctorForm(prev => ({ ...prev, [key]: value }));
};
  
  const renderPatientForm = () => (
    <>
      <View style={styles.formSection}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Personal Information</Text>
        
        <View style={styles.formRow}>
          <View style={styles.formColumn}>
            <Text style={[styles.inputLabel, { color: colors.textSecondary }]}>First Name</Text>
            <TextInput
              style={[styles.input, { backgroundColor: colors.cardBg, color: colors.text }]}
              value={patientForm.firstName}
              onChangeText={(value) => updatePatientForm('firstName', value)}
              placeholderTextColor={colors.textSecondary}
            />
          </View>
          <View style={styles.formColumn}>
            <Text style={[styles.inputLabel, { color: colors.textSecondary }]}>Last Name</Text>
            <TextInput
              style={[styles.input, { backgroundColor: colors.cardBg, color: colors.text }]}
              value={patientForm.lastName}
              onChangeText={(value) => updatePatientForm('lastName', value)}
              placeholderTextColor={colors.textSecondary}
            />
          </View>
        </View>
        
        <View style={styles.inputGroup}>
          <Text style={[styles.inputLabel, { color: colors.textSecondary }]}>Email</Text>
          <View style={[styles.inputWithIcon, { backgroundColor: colors.cardBg }]}>
            <Mail size={20} color={colors.primary} />
            <TextInput
              style={[styles.iconInput, { color: colors.text }]}
              value={patientForm.email}
              onChangeText={(value) => updatePatientForm('email', value)}
              keyboardType="email-address"
              placeholderTextColor={colors.textSecondary}
            />
          </View>
        </View>
        
        <View style={styles.inputGroup}>
          <Text style={[styles.inputLabel, { color: colors.textSecondary }]}>Phone Number</Text>
          <View style={[styles.inputWithIcon, { backgroundColor: colors.cardBg }]}>
            <Phone size={20} color={colors.primary} />
            <TextInput
              style={[styles.iconInput, { color: colors.text }]}
              value={patientForm.phone}
              onChangeText={(value) => updatePatientForm('phone', value)}
              keyboardType="phone-pad"
              placeholderTextColor={colors.textSecondary}
            />
          </View>
        </View>
        
        <View style={styles.inputGroup}>
          <Text style={[styles.inputLabel, { color: colors.textSecondary }]}>Date of Birth</Text>
          <View style={[styles.inputWithIcon, { backgroundColor: colors.cardBg }]}>
            <Calendar size={20} color={colors.primary} />
            <TextInput
              style={[styles.iconInput, { color: colors.text }]}
              value={patientForm.dateOfBirth}
              onChangeText={(value) => updatePatientForm('dateOfBirth', value)}
              placeholderTextColor={colors.textSecondary}
            />
          </View>
        </View>
        
        <View style={styles.inputGroup}>
          <Text style={[styles.inputLabel, { color: colors.textSecondary }]}>Blood Group</Text>
          <View style={[styles.inputWithIcon, { backgroundColor: colors.cardBg }]}>
            <Droplet size={20} color={colors.primary} />
            <TextInput
              style={[styles.iconInput, { color: colors.text }]}
              value={patientForm.bloodGroup}
              onChangeText={(value) => updatePatientForm('bloodGroup', value)}
              placeholderTextColor={colors.textSecondary}
            />
          </View>
        </View>
      </View>
      
      <View style={styles.formSection}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Address</Text>
        <View style={styles.inputGroup}>
          <Text style={[styles.inputLabel, { color: colors.textSecondary }]}>Your Address</Text>
          <View style={[styles.inputWithIcon, { backgroundColor: colors.cardBg }]}>
            <MapPin size={20} color={colors.primary} />
            <TextInput
              style={[styles.iconInput, { color: colors.text }]}
              value={patientForm.address}
              onChangeText={(value) => updatePatientForm('address', value)}
              placeholderTextColor={colors.textSecondary}
              multiline
            />
          </View>
        </View>
      </View>
      
      <View style={styles.formSection}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Medical Information</Text>
        
        <View style={styles.inputGroup}>
          <Text style={[styles.inputLabel, { color: colors.textSecondary }]}>Emergency Contact</Text>
          <View style={[styles.inputWithIcon, { backgroundColor: colors.cardBg }]}>
            <Phone size={20} color={colors.primary} />
            <TextInput
              style={[styles.iconInput, { color: colors.text }]}
              value={patientForm.emergencyContact}
              onChangeText={(value) => updatePatientForm('emergencyContact', value)}
              keyboardType="phone-pad"
              placeholderTextColor={colors.textSecondary}
            />
          </View>
        </View>
        
        <View style={styles.inputGroup}>
          <Text style={[styles.inputLabel, { color: colors.textSecondary }]}>Allergies</Text>
          <View style={[styles.inputWithIcon, { backgroundColor: colors.cardBg }]}>
            <AlertCircle size={20} color={colors.primary} />
            <TextInput
              style={[styles.iconInput, { color: colors.text }]}
              value={patientForm.allergies}
              onChangeText={(value) => updatePatientForm('allergies', value)}
              placeholderTextColor={colors.textSecondary}
            />
          </View>
        </View>
        
        <View style={styles.inputGroup}>
          <Text style={[styles.inputLabel, { color: colors.textSecondary }]}>Chronic Conditions</Text>
          <View style={[styles.inputWithIcon, { backgroundColor: colors.cardBg }]}>
            <AlertCircle size={20} color={colors.primary} />
            <TextInput
              style={[styles.iconInput, { color: colors.text }]}
              value={patientForm.chronicConditions}
              onChangeText={(value) => updatePatientForm('chronicConditions', value)}
              placeholderTextColor={colors.textSecondary}
            />
          </View>
        </View>
      </View>
      
      <View style={styles.formSection}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Preferences</Text>
        <View style={[styles.switchItem, { backgroundColor: colors.cardBg }]}>
          <Text style={[styles.switchLabel, { color: colors.text }]}>Enable Notifications</Text>
          <Switch
            value={patientForm.notificationsEnabled}
            onValueChange={(value) => updatePatientForm('notificationsEnabled', value)}
            trackColor={{ false: colors.border, true: colors.primary }}
            thumbColor="#fff"
          />
        </View>
      </View>
    </>
  );
  
  const renderDoctorForm = () => (
    <>
      <View style={styles.formSection}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Personal Information</Text>
        
        <View style={styles.formRow}>
          <View style={styles.formColumn}>
            <Text style={[styles.inputLabel, { color: colors.textSecondary }]}>First Name</Text>
            <TextInput
              style={[styles.input, { backgroundColor: colors.cardBg, color: colors.text }]}
              value={doctorForm.firstName}
              onChangeText={(value) => updateDoctorForm('firstName', value)}
              placeholderTextColor={colors.textSecondary}
            />
          </View>
          <View style={styles.formColumn}>
            <Text style={[styles.inputLabel, { color: colors.textSecondary }]}>Last Name</Text>
            <TextInput
              style={[styles.input, { backgroundColor: colors.cardBg, color: colors.text }]}
              value={doctorForm.lastName}
              onChangeText={(value) => updateDoctorForm('lastName', value)}
              placeholderTextColor={colors.textSecondary}
            />
          </View>
        </View>
        
        <View style={styles.inputGroup}>
          <Text style={[styles.inputLabel, { color: colors.textSecondary }]}>Email</Text>
          <View style={[styles.inputWithIcon, { backgroundColor: colors.cardBg }]}>
            <Mail size={20} color={colors.primary} />
            <TextInput
              style={[styles.iconInput, { color: colors.text }]}
              value={doctorForm.email}
              onChangeText={(value) => updateDoctorForm('email', value)}
              keyboardType="email-address"
              placeholderTextColor={colors.textSecondary}
            />
          </View>
        </View>
        
        <View style={styles.inputGroup}>
          <Text style={[styles.inputLabel, { color: colors.textSecondary }]}>Phone Number</Text>
          <View style={[styles.inputWithIcon, { backgroundColor: colors.cardBg }]}>
            <Phone size={20} color={colors.primary} />
            <TextInput
              style={[styles.iconInput, { color: colors.text }]}
              value={doctorForm.phone}
              onChangeText={(value) => updateDoctorForm('phone', value)}
              keyboardType="phone-pad"
              placeholderTextColor={colors.textSecondary}
            />
          </View>
        </View>
        
        <View style={styles.inputGroup}>
          <Text style={[styles.inputLabel, { color: colors.textSecondary }]}>Specialty</Text>
          <TextInput
            style={[styles.input, { backgroundColor: colors.cardBg, color: colors.text }]}
            value={doctorForm.specialty}
            onChangeText={(value) => updateDoctorForm('specialty', value)}
            placeholderTextColor={colors.textSecondary}
          />
        </View>
        
        <View style={styles.inputGroup}>
          <Text style={[styles.inputLabel, { color: colors.textSecondary }]}>Experience</Text>
          <TextInput
            style={[styles.input, { backgroundColor: colors.cardBg, color: colors.text }]}
            value={doctorForm.experience}
            onChangeText={(value) => updateDoctorForm('experience', value)}
            placeholderTextColor={colors.textSecondary}
          />
        </View>
      </View>
      
      <View style={styles.formSection}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Professional Details</Text>
        
        <View style={styles.inputGroup}>
          <Text style={[styles.inputLabel, { color: colors.textSecondary }]}>Office Address</Text>
          <View style={[styles.inputWithIcon, { backgroundColor: colors.cardBg }]}>
            <MapPin size={20} color={colors.primary} />
            <TextInput
              style={[styles.iconInput, { color: colors.text }]}
              value={doctorForm.address}
              onChangeText={(value) => updateDoctorForm('address', value)}
              placeholderTextColor={colors.textSecondary}
              multiline
            />
          </View>
        </View>
        
        <View style={styles.inputGroup}>
          <Text style={[styles.inputLabel, { color: colors.textSecondary }]}>Professional Bio</Text>
          <TextInput
            style={[
              styles.textArea, 
              { backgroundColor: colors.cardBg, color: colors.text, borderColor: colors.border }
            ]}
            value={doctorForm.bio}
            onChangeText={(value) => updateDoctorForm('bio', value)}
            placeholderTextColor={colors.textSecondary}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />
        </View>
      </View>
      
      <View style={styles.formSection}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Preferences</Text>
        <View style={[styles.switchItem, { backgroundColor: colors.cardBg }]}>
          <Text style={[styles.switchLabel, { color: colors.text }]}>Enable Notifications</Text>
          <Switch
            value={doctorForm.notificationsEnabled}
            onValueChange={(value) => updateDoctorForm('notificationsEnabled', value)}
            trackColor={{ false: colors.border, true: colors.primary }}
            thumbColor="#fff"
          />
        </View>
      </View>
    </>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={goBack} style={styles.backButton}>
          <ArrowLeft color={colors.text} size={24} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Edit Profile</Text>
        <View style={{ width: 24 }} />
      </View>
      
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.profileImageSection}>
          <Image 
            source={{ 
              uri: userType === 'doctor' 
                ? 'https://images.pexels.com/photos/5452268/pexels-photo-5452268.jpeg?auto=compress&cs=tinysrgb&w=600'
                : 'https://images.pexels.com/photos/6551937/pexels-photo-6551937.jpeg?auto=compress&cs=tinysrgb&w=600'
            }} 
            style={styles.profileImage}
          />
          <TouchableOpacity style={[styles.cameraButton, { backgroundColor: colors.primary }]}>
            <Camera size={20} color="#fff" />
          </TouchableOpacity>
        </View>
        
        {userType === 'patient' ? renderPatientForm() : renderDoctorForm()}
        
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={[styles.saveButton, { backgroundColor: colors.primary }]}
            onPress={handleSaveChanges}
          >
            <Text style={styles.saveButtonText}>Save Changes</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
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
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
  },
  scrollContent: {
    paddingBottom: 30,
  },
  profileImageSection: {
    alignItems: 'center',
    marginVertical: 20,
    position: 'relative',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  cameraButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    right: '38%',
  },
  formSection: {
    marginHorizontal: 20,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    marginBottom: 16,
  },
  formRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  formColumn: {
    width: '48%',
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    marginBottom: 8,
  },
  input: {
    height: 50,
    borderRadius: 10,
    paddingHorizontal: 16,
    fontFamily: 'Inter-Regular',
    fontSize: 16,
  },
  inputWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    borderRadius: 10,
    paddingHorizontal: 16,
  },
  iconInput: {
    flex: 1,
    marginLeft: 10,
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    height: 50,
  },
  textArea: {
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    borderWidth: 1,
    minHeight: 100,
  },
  switchItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 10,
  },
  switchLabel: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
  },
  buttonContainer: {
    marginHorizontal: 20,
    marginTop: 8,
  },
  saveButton: {
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
  },
});
