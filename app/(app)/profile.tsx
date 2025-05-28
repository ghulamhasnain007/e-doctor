import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { 
  User, 
  Calendar, 
  FileText, 
  MessageSquare, 
  Settings, 
  Bell, 
  Shield, 
  LogOut,
  ChevronRight,
  Star,
  Award
} from 'lucide-react-native';
import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';
import { router } from 'expo-router';

// Mock data for the profile
const doctorProfileMock = {
  name: 'Dr. Sarah Johnson',
  specialty: 'Cardiologist',
  experience: '10+ years',
  rating: 4.9,
  totalPatients: 1200,
  totalReviews: 350,
  image: 'https://images.pexels.com/photos/5452268/pexels-photo-5452268.jpeg?auto=compress&cs=tinysrgb&w=600',
};

const patientProfileMock = {
  name: 'John Smith',
  email: 'john.smith@example.com',
  age: 35,
  bloodGroup: 'O+',
  image: 'https://images.pexels.com/photos/6551937/pexels-photo-6551937.jpeg?auto=compress&cs=tinysrgb&w=600',
};

export default function ProfileScreen() {
  const { userType, logout } = useAuth();
  const { colors } = useTheme();

  const profileData = userType === 'doctor' ? doctorProfileMock : patientProfileMock;

  const handleLogout = async () => {
    await logout();
    router.replace('/welcome');
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={[styles.headerTitle, { color: colors.text }]}>Profile</Text>
          <TouchableOpacity 
            style={[styles.settingsButton, { backgroundColor: colors.cardBg }]}
            onPress={() => router.push('/settings')}
          >
            <Settings color={colors.text} size={20} />
          </TouchableOpacity>
        </View>
        
        <View style={[styles.profileCard, { backgroundColor: colors.cardBg }]}>
          <View style={styles.profileHeader}>
            <Image source={{ uri: profileData.image }} style={styles.profileImage} />
            <View style={styles.profileInfo}>
              <Text style={[styles.profileName, { color: colors.text }]}>
                {profileData.name}
              </Text>
              
              {userType === 'doctor' ? (
                <>
                  <Text style={[styles.profileSpecialty, { color: colors.textSecondary }]}>
                    {doctorProfileMock.specialty}
                  </Text>
                  <View style={styles.ratingContainer}>
                    <Star size={16} color="#FFD700" fill="#FFD700" />
                    <Text style={[styles.ratingText, { color: colors.text }]}>
                      {doctorProfileMock.rating} (350+ reviews)
                    </Text>
                  </View>
                </>
              ) : (
                <Text style={[styles.profileEmail, { color: colors.textSecondary }]}>
                  {patientProfileMock.email}
                </Text>
              )}
            </View>
          </View>
          
          {userType === 'doctor' && (
            <View style={styles.statsContainer}>
              <View style={styles.statItem}>
                <Text style={[styles.statValue, { color: colors.text }]}>
                  {doctorProfileMock.experience}
                </Text>
                <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
                  Experience
                </Text>
              </View>
              
              <View style={[styles.statDivider, { backgroundColor: colors.border }]} />
              
              <View style={styles.statItem}>
                <Text style={[styles.statValue, { color: colors.text }]}>
                  {doctorProfileMock.totalPatients.toLocaleString()}
                </Text>
                <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
                  Patients
                </Text>
              </View>
              
              <View style={[styles.statDivider, { backgroundColor: colors.border }]} />
              
              <View style={styles.statItem}>
                <Text style={[styles.statValue, { color: colors.text }]}>
                  {doctorProfileMock.totalReviews}+
                </Text>
                <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
                  Reviews
                </Text>
              </View>
            </View>
          )}
          
          {userType === 'patient' && (
            <View style={styles.patientInfoContainer}>
              <View style={[styles.infoItem, { borderColor: colors.border }]}>
                <Text style={[styles.infoLabel, { color: colors.textSecondary }]}>Age</Text>
                <Text style={[styles.infoValue, { color: colors.text }]}>
                  {patientProfileMock.age} years
                </Text>
              </View>
              
              <View style={[styles.infoItem, { borderColor: colors.border }]}>
                <Text style={[styles.infoLabel, { color: colors.textSecondary }]}>Blood Group</Text>
                <Text style={[styles.infoValue, { color: colors.text }]}>
                  {patientProfileMock.bloodGroup}
                </Text>
              </View>
            </View>
          )}
          
          <TouchableOpacity 
            style={[styles.editProfileButton, { borderColor: colors.primary }]}
            onPress={() => router.push('/edit-profile')}
          >
            <Text style={[styles.editProfileText, { color: colors.primary }]}>
              Edit Profile
            </Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.menuSection}>
          <Text style={[styles.menuSectionTitle, { color: colors.text }]}>
            {userType === 'doctor' ? 'Doctor Menu' : 'Patient Menu'}
          </Text>
          
          <View style={[styles.menuCard, { backgroundColor: colors.cardBg }]}>
            <TouchableOpacity 
              style={styles.menuItem}
              onPress={() => router.push('/personal-details')}
            >
              <View style={[styles.menuIconContainer, { backgroundColor: colors.primary + '15' }]}>
                <User size={20} color={colors.primary} />
              </View>
              <Text style={[styles.menuItemText, { color: colors.text }]}>
                {userType === 'doctor' ? 'My Patients' : 'Personal Details'}
              </Text>
              <ChevronRight size={20} color={colors.textSecondary} />
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.menuItem}
              onPress={() => router.push('/schedule')}
            >
              <View style={[styles.menuIconContainer, { backgroundColor: colors.primary + '15' }]}>
                <Calendar size={20} color={colors.primary} />
              </View>
              <Text style={[styles.menuItemText, { color: colors.text }]}>
                {userType === 'doctor' ? 'Schedule & Timings' : 'My Appointments'}
              </Text>
              <ChevronRight size={20} color={colors.textSecondary} />
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.menuItem}
              onPress={() => router.push('/medical-records')}
            >
              <View style={[styles.menuIconContainer, { backgroundColor: colors.primary + '15' }]}>
                <FileText size={20} color={colors.primary} />
              </View>
              <Text style={[styles.menuItemText, { color: colors.text }]}>
                {userType === 'doctor' ? 'Prescriptions & Records' : 'Medical Records'}
              </Text>
              <ChevronRight size={20} color={colors.textSecondary} />
            </TouchableOpacity>
            
            {userType === 'doctor' && (
              <TouchableOpacity 
                style={styles.menuItem}
                onPress={() => router.push('/qualifications')}
              >
                <View style={[styles.menuIconContainer, { backgroundColor: colors.primary + '15' }]}>
                  <Award size={20} color={colors.primary} />
                </View>
                <Text style={[styles.menuItemText, { color: colors.text }]}>
                  Qualifications & Experience
                </Text>
                <ChevronRight size={20} color={colors.textSecondary} />
              </TouchableOpacity>
            )}
            
            <TouchableOpacity 
              style={styles.menuItem}
              onPress={() => router.push('/reviews')}
            >
              <View style={[styles.menuIconContainer, { backgroundColor: colors.primary + '15' }]}>
                <MessageSquare size={20} color={colors.primary} />
              </View>
              <Text style={[styles.menuItemText, { color: colors.text }]}>
                {userType === 'doctor' ? 'Reviews & Ratings' : 'Feedback & Ratings'}
              </Text>
              <ChevronRight size={20} color={colors.textSecondary} />
            </TouchableOpacity>
          </View>
        </View>
        
        <View style={styles.menuSection}>
          <Text style={[styles.menuSectionTitle, { color: colors.text }]}>Settings</Text>
          
          <View style={[styles.menuCard, { backgroundColor: colors.cardBg }]}>
            <TouchableOpacity 
              style={styles.menuItem}
              onPress={() => router.push('/notifications')}
            >
              <View style={[styles.menuIconContainer, { backgroundColor: colors.warning + '15' }]}>
                <Bell size={20} color={colors.warning} />
              </View>
              <Text style={[styles.menuItemText, { color: colors.text }]}>
                Notifications
              </Text>
              <ChevronRight size={20} color={colors.textSecondary} />
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.menuItem}
              onPress={() => router.push('/privacy-security')}
            >
              <View style={[styles.menuIconContainer, { backgroundColor: colors.secondary + '15' }]}>
                <Shield size={20} color={colors.secondary} />
              </View>
              <Text style={[styles.menuItemText, { color: colors.text }]}>
                Privacy & Security
              </Text>
              <ChevronRight size={20} color={colors.textSecondary} />
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.menuItem}
              onPress={handleLogout}
            >
              <View style={[styles.menuIconContainer, { backgroundColor: colors.error + '15' }]}>
                <LogOut size={20} color={colors.error} />
              </View>
              <Text style={[styles.menuItemText, { color: colors.error }]}>
                Logout
              </Text>
              <ChevronRight size={20} color={colors.textSecondary} />
            </TouchableOpacity>
          </View>
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
  headerTitle: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
  },
  settingsButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileCard: {
    marginHorizontal: 20,
    borderRadius: 16,
    padding: 20,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  profileInfo: {
    marginLeft: 16,
    flex: 1,
  },
  profileName: {
    fontSize: 20,
    fontFamily: 'Inter-SemiBold',
    marginBottom: 4,
  },
  profileSpecialty: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    marginLeft: 4,
    fontSize: 14,
    fontFamily: 'Inter-Medium',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    paddingVertical: 16,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
  },
  statDivider: {
    width: 1,
    height: '100%',
  },
  patientInfoContainer: {
    marginTop: 20,
  },
  infoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  infoLabel: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
  },
  infoValue: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
  },
  editProfileButton: {
    marginTop: 20,
    borderWidth: 1,
    borderRadius: 25,
    paddingVertical: 12,
    alignItems: 'center',
  },
  editProfileText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
  },
  menuSection: {
    marginTop: 24,
    paddingHorizontal: 20,
  },
  menuSectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    marginBottom: 16,
  },
  menuCard: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  menuIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  menuItemText: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Inter-Medium',
  },
});