import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Mail, Phone, MapPin, Calendar, Droplet, AlertCircle, User, Shield, Award } from 'lucide-react-native';
import { useTheme } from '@/context/ThemeContext';
import { useAuth } from '@/context/AuthContext';
import { router } from 'expo-router';

// Mock data for the profile
const doctorProfileMock = {
  name: 'Dr. Sarah Johnson',
  firstName: 'Sarah',
  lastName: 'Johnson',
  email: 'dr.sarah@example.com',
  phone: '+1 (555) 234-5678',
  specialty: 'Cardiologist',
  experience: '10+ years',
  address: '456 Medical Plaza, New York, NY 10022',
  bio: 'Board-certified cardiologist with over 10 years of experience in treating cardiovascular diseases, heart conditions, and preventive cardiology.',
  education: [
    { degree: 'MD', institution: 'Harvard Medical School', year: '2008' },
    { degree: 'Residency in Internal Medicine', institution: 'Massachusetts General Hospital', year: '2011' },
    { degree: 'Fellowship in Cardiology', institution: 'Johns Hopkins Hospital', year: '2014' }
  ],
  image: 'https://images.pexels.com/photos/5452268/pexels-photo-5452268.jpeg?auto=compress&cs=tinysrgb&w=600',
};

const patientProfileMock = {
  name: 'John Smith',
  firstName: 'John',
  lastName: 'Smith',
  email: 'john.smith@example.com',
  phone: '+1 (555) 123-4567',
  dateOfBirth: '15 May 1988',
  bloodGroup: 'O+',
  address: '123 Main Street, New York, NY 10001',
  emergencyContact: '+1 (555) 987-6543',
  emergencyContactName: 'Jane Smith (Spouse)',
  allergies: 'Penicillin',
  chronicConditions: 'None',
  insuranceProvider: 'BlueCross BlueShield',
  insuranceNumber: 'BCB123456789',
  image: 'https://images.pexels.com/photos/6551937/pexels-photo-6551937.jpeg?auto=compress&cs=tinysrgb&w=600',
};

export default function PersonalDetailsScreen() {
  const { colors } = useTheme();
  const { userType } = useAuth();
  
  const profileData = userType === 'doctor' ? doctorProfileMock : patientProfileMock;

  const goBack = () => {
    router.back();
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <View style={[styles.header, { backgroundColor: colors.cardBg }]}>
        <TouchableOpacity onPress={goBack} style={styles.backButton}>
          <ArrowLeft size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]}>
          {userType === 'doctor' ? 'Doctor Profile' : 'Personal Details'}
        </Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.container}>
        <View style={[styles.profileSection, { backgroundColor: colors.cardBg }]}>
          <Image source={{ uri: profileData.image }} style={styles.profileImage} />
          <Text style={[styles.profileName, { color: colors.text }]}>
            {profileData.name}
          </Text>
          {userType === 'doctor' && (
            <Text style={[styles.profileSpecialty, { color: colors.textSecondary }]}>
              {(profileData as typeof doctorProfileMock).specialty} • {(profileData as typeof doctorProfileMock).experience}
            </Text>
          )}
        </View>

        <View style={[styles.infoCard, { backgroundColor: colors.cardBg }]}>
          <View style={styles.sectionHeader}>
            <User size={20} color={colors.primary} />
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              Basic Information
            </Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={[styles.infoLabel, { color: colors.textSecondary }]}>Full Name</Text>
            <Text style={[styles.infoValue, { color: colors.text }]}>
              {profileData.firstName} {profileData.lastName}
            </Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={[styles.infoLabel, { color: colors.textSecondary }]}>Email</Text>
            <View style={styles.infoIconContainer}>
              <Mail size={16} color={colors.primary} style={styles.infoIcon} />
              <Text style={[styles.infoValue, { color: colors.text }]}>
                {profileData.email}
              </Text>
            </View>
          </View>

          <View style={styles.infoRow}>
            <Text style={[styles.infoLabel, { color: colors.textSecondary }]}>Phone</Text>
            <View style={styles.infoIconContainer}>
              <Phone size={16} color={colors.primary} style={styles.infoIcon} />
              <Text style={[styles.infoValue, { color: colors.text }]}>
                {profileData.phone}
              </Text>
            </View>
          </View>

          <View style={styles.infoRow}>
            <Text style={[styles.infoLabel, { color: colors.textSecondary }]}>Address</Text>
            <View style={styles.infoIconContainer}>
              <MapPin size={16} color={colors.primary} style={styles.infoIcon} />
              <Text style={[styles.infoValue, { color: colors.text }]}>
                {profileData.address}
              </Text>
            </View>
          </View>

          {userType === 'patient' && (
            <>
              <View style={styles.infoRow}>
                <Text style={[styles.infoLabel, { color: colors.textSecondary }]}>Date of Birth</Text>
                <View style={styles.infoIconContainer}>
                  <Calendar size={16} color={colors.primary} style={styles.infoIcon} />
                  <Text style={[styles.infoValue, { color: colors.text }]}>
                    {patientProfileMock.dateOfBirth}
                  </Text>
                </View>
              </View>

              <View style={styles.infoRow}>
                <Text style={[styles.infoLabel, { color: colors.textSecondary }]}>Blood Group</Text>
                <View style={styles.infoIconContainer}>
                  <Droplet size={16} color={colors.primary} style={styles.infoIcon} />
                  <Text style={[styles.infoValue, { color: colors.text }]}>
                    {patientProfileMock.bloodGroup}
                  </Text>
                </View>
              </View>
            </>
          )}
        </View>

        {userType === 'patient' && (
          <View style={[styles.infoCard, { backgroundColor: colors.cardBg }]}>
            <View style={styles.sectionHeader}>
              <AlertCircle size={20} color={colors.primary} />
              <Text style={[styles.sectionTitle, { color: colors.text }]}>
                Medical Information
              </Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={[styles.infoLabel, { color: colors.textSecondary }]}>Emergency Contact</Text>
              <Text style={[styles.infoValue, { color: colors.text }]}>
                {patientProfileMock.emergencyContactName}
              </Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={[styles.infoLabel, { color: colors.textSecondary }]}>Emergency Number</Text>
              <View style={styles.infoIconContainer}>
                <Phone size={16} color={colors.primary} style={styles.infoIcon} />
                <Text style={[styles.infoValue, { color: colors.text }]}>
                  {patientProfileMock.emergencyContact}
                </Text>
              </View>
            </View>

            <View style={styles.infoRow}>
              <Text style={[styles.infoLabel, { color: colors.textSecondary }]}>Allergies</Text>
              <Text style={[styles.infoValue, { color: colors.text }]}>
                {patientProfileMock.allergies}
              </Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={[styles.infoLabel, { color: colors.textSecondary }]}>Chronic Conditions</Text>
              <Text style={[styles.infoValue, { color: colors.text }]}>
                {patientProfileMock.chronicConditions}
              </Text>
            </View>
          </View>
        )}

        {userType === 'patient' && (
          <View style={[styles.infoCard, { backgroundColor: colors.cardBg }]}>
            <View style={styles.sectionHeader}>
              <Shield size={20} color={colors.primary} />
              <Text style={[styles.sectionTitle, { color: colors.text }]}>
                Insurance Information
              </Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={[styles.infoLabel, { color: colors.textSecondary }]}>Insurance Provider</Text>
              <Text style={[styles.infoValue, { color: colors.text }]}>
                {patientProfileMock.insuranceProvider}
              </Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={[styles.infoLabel, { color: colors.textSecondary }]}>Policy Number</Text>
              <Text style={[styles.infoValue, { color: colors.text }]}>
                {patientProfileMock.insuranceNumber}
              </Text>
            </View>
          </View>
        )}

        {userType === 'doctor' && (
          <View style={[styles.infoCard, { backgroundColor: colors.cardBg }]}>
            <View style={styles.sectionHeader}>
              <Award size={20} color={colors.primary} />
              <Text style={[styles.sectionTitle, { color: colors.text }]}>
                Professional Summary
              </Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={[styles.infoLabel, { color: colors.textSecondary }]}>Specialty</Text>
              <Text style={[styles.infoValue, { color: colors.text }]}>
                {doctorProfileMock.specialty}
              </Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={[styles.infoLabel, { color: colors.textSecondary }]}>Experience</Text>
              <Text style={[styles.infoValue, { color: colors.text }]}>
                {doctorProfileMock.experience}
              </Text>
            </View>

            <View style={styles.bioSection}>
              <Text style={[styles.infoLabel, { color: colors.textSecondary }]}>Biography</Text>
              <Text style={[styles.bioText, { color: colors.text }]}>
                {doctorProfileMock.bio}
              </Text>
            </View>
          </View>
        )}

        <TouchableOpacity 
          style={[styles.editButton, { backgroundColor: colors.primary }]}
          onPress={() => router.push('/edit-profile')}
        >
          <Text style={styles.editButtonText}>Edit Information</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileSection: {
    alignItems: 'center',
    padding: 20,
    borderRadius: 12,
    marginBottom: 16,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  profileSpecialty: {
    fontSize: 16,
    marginBottom: 8,
  },
  infoCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 8,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)',
  },
  infoLabel: {
    fontSize: 15,
    flex: 1,
  },
  infoValue: {
    fontSize: 15,
    fontWeight: '500',
    flex: 2,
    textAlign: 'right',
  },
  infoIconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 2,
    justifyContent: 'flex-end',
  },
  infoIcon: {
    marginRight: 8,
  },
  bioSection: {
    paddingVertical: 12,
  },
  bioText: {
    fontSize: 15,
    lineHeight: 22,
    marginTop: 8,
  },
  editButton: {
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 30,
  },
  editButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});
