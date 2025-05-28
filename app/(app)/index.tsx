import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Bell, Calendar, Search, ArrowRight, Plus, Clock, Star } from 'lucide-react-native';
import { router } from 'expo-router';
import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';

// Mock data - in a real app this would come from an API
const specialtiesMock = [
  { id: 1, name: 'Cardiology', icon: '❤️' },
  { id: 2, name: 'Pediatrics', icon: '👶' },
  { id: 3, name: 'Dermatology', icon: '🧬' },
  { id: 4, name: 'Neurology', icon: '🧠' },
  { id: 5, name: 'Orthopedics', icon: '🦴' },
  { id: 6, name: 'Gynecology', icon: '👩‍⚕️' },
];

const upcomingAppointmentMock = {
  doctor: {
    name: 'Dr. Sarah Johnson',
    specialty: 'Cardiologist',
    image: 'https://images.pexels.com/photos/5452268/pexels-photo-5452268.jpeg?auto=compress&cs=tinysrgb&w=600'
  },
  date: 'Today, 10:30 AM',
  type: 'Video Consultation',
};

const latestDoctorsMock = [
  {
    id: 1,
    name: 'Dr. Mark Wilson',
    specialty: 'Pediatrician',
    rating: 4.9,
    image: 'https://images.pexels.com/photos/4173239/pexels-photo-4173239.jpeg?auto=compress&cs=tinysrgb&w=600'
  },
  {
    id: 2,
    name: 'Dr. Emma Clark',
    specialty: 'Dermatologist',
    rating: 4.8,
    image: 'https://images.pexels.com/photos/5214958/pexels-photo-5214958.jpeg?auto=compress&cs=tinysrgb&w=600'
  },
  {
    id: 3,
    name: 'Dr. James Lee',
    specialty: 'Orthopedic',
    rating: 4.7,
    image: 'https://images.pexels.com/photos/4225880/pexels-photo-4225880.jpeg?auto=compress&cs=tinysrgb&w=600'
  },
];

export default function HomeScreen() {
  const { user, userType } = useAuth();
  const { colors } = useTheme();
  const [loading, setLoading] = useState(true);

  // Simulate data fetching
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <View style={[styles.loadingContainer, { backgroundColor: colors.background }]}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={[styles.greeting, { color: colors.textSecondary }]}>
            Good Morning
          </Text>
          <Text style={[styles.username, { color: colors.text }]}>
            {user?.name || 'User'}
          </Text>
        </View>
        <TouchableOpacity style={[styles.notificationButton, { backgroundColor: colors.cardBg }]}>
          <Bell color={colors.text} size={20} />
        </TouchableOpacity>
      </View>
      
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Search Bar */}
        <TouchableOpacity 
          style={[styles.searchBar, { backgroundColor: colors.cardBg }]}
          onPress={() => console.log('Search pressed')}
        >
          <Search color={colors.textSecondary} size={20} />
          <Text style={[styles.searchText, { color: colors.placeholder }]}>
            Search doctors, symptoms...
          </Text>
        </TouchableOpacity>
        
        {userType === 'patient' && (
          <>
            {/* Upcoming Appointment */}
            <View style={styles.sectionHeader}>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>Upcoming Appointment</Text>
              <TouchableOpacity onPress={() => router.push('/appointments')}>
                <Text style={[styles.sectionLink, { color: colors.primary }]}>See All</Text>
              </TouchableOpacity>
            </View>
            
            {upcomingAppointmentMock ? (
              <View style={[styles.appointmentCard, { backgroundColor: colors.primary + '10' }]}>
                <Image
                  source={{ uri: upcomingAppointmentMock.doctor.image }}
                  style={styles.doctorImage}
                />
                <View style={styles.appointmentInfo}>
                  <Text style={[styles.doctorName, { color: colors.text }]}>
                    {upcomingAppointmentMock.doctor.name}
                  </Text>
                  <Text style={[styles.doctorSpecialty, { color: colors.textSecondary }]}>
                    {upcomingAppointmentMock.doctor.specialty}
                  </Text>
                  <View style={styles.appointmentTimeContainer}>
                    <Clock size={14} color={colors.primary} />
                    <Text style={[styles.appointmentTime, { color: colors.primary }]}>
                      {upcomingAppointmentMock.date}
                    </Text>
                  </View>
                </View>
                <View style={styles.appointmentActions}>
                  <TouchableOpacity 
                    style={[styles.appointmentButton, { backgroundColor: colors.primary }]}
                    onPress={() => router.push('/chat?id=1')}
                  >
                    <Text style={styles.appointmentButtonText}>Join</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.appointmentReschedule}
                  onPress={() => router.push(`/reschedule-appointment?id=${encodeURIComponent(upcomingAppointmentMock.doctor.name)}`)}
                  >
                    <Text style={[styles.rescheduleText, { color: colors.textSecondary }]}>Reschedule</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              <TouchableOpacity 
                style={[styles.noAppointmentCard, { backgroundColor: colors.cardBg }]}
                // onPress={() => router.push('/book-appointment')}
              >
                <Plus color={colors.primary} size={24} />
                <Text style={[styles.noAppointmentText, { color: colors.text }]}>
                  Book your first appointment
                </Text>
              </TouchableOpacity>
            )}
            
            {/* Specialties */}
            <View style={styles.sectionHeader}>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>Specialties</Text>
              <TouchableOpacity onPress={() => router.push('/specialties')}>
                <Text style={[styles.sectionLink, { color: colors.primary }]}>See All</Text>
              </TouchableOpacity>
            </View>
            
            <ScrollView 
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.specialtiesContainer}
            >
              {specialtiesMock.map((specialty) => (
                <TouchableOpacity 
                  key={specialty.id}
                  style={[styles.specialtyCard, { backgroundColor: colors.cardBg }]}
                  onPress={() => router.push(`/doctors?specialty=${specialty.id}`)}
                >
                  <Text style={styles.specialtyIcon}>{specialty.icon}</Text>
                  <Text style={[styles.specialtyName, { color: colors.text }]}>{specialty.name}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
            
            {/* Top Doctors */}
            <View style={styles.sectionHeader}>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>Top Doctors</Text>
              <TouchableOpacity onPress={() => router.push('/doctors')}>
                <Text style={[styles.sectionLink, { color: colors.primary }]}>See All</Text>
              </TouchableOpacity>
            </View>
            
            {latestDoctorsMock.map((doctor) => (
              <TouchableOpacity 
                key={doctor.id}
                style={[styles.doctorCard, { backgroundColor: colors.cardBg }]}
                onPress={() => router.push(`/doctor-details?id=${doctor.id}`)}
              >
                <Image source={{ uri: doctor.image }} style={styles.doctorCardImage} />
                <View style={styles.doctorCardInfo}>
                  <Text style={[styles.doctorCardName, { color: colors.text }]}>{doctor.name}</Text>
                  <Text style={[styles.doctorCardSpecialty, { color: colors.textSecondary }]}>
                    {doctor.specialty}
                  </Text>
                  <View style={styles.ratingContainer}>
                    <Star size={14} color="#FFD700" fill="#FFD700" />
                    <Text style={[styles.ratingText, { color: colors.text }]}>{doctor.rating}</Text>
                  </View>
                </View>
                <ArrowRight color={colors.primary} size={20} />
              </TouchableOpacity>
            ))}
          </>
        )}
        
        {userType === 'doctor' && (
          <>
            {/* Doctor's Dashboard */}
            <View style={[styles.dashboardCard, { backgroundColor: colors.primary + '15' }]}>
              <View style={styles.dashboardHeader}>
                <Text style={[styles.dashboardTitle, { color: colors.text }]}>Today's Schedule</Text>
                <Calendar color={colors.primary} size={20} />
              </View>
              <View style={styles.dashboardStats}>
                <View style={styles.statItem}>
                  <Text style={[styles.statNumber, { color: colors.text }]}>8</Text>
                  <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Appointments</Text>
                </View>
                <View style={[styles.statDivider, { backgroundColor: colors.border }]} />
                <View style={styles.statItem}>
                  <Text style={[styles.statNumber, { color: colors.text }]}>4</Text>
                  <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Completed</Text>
                </View>
                <View style={[styles.statDivider, { backgroundColor: colors.border }]} />
                <View style={styles.statItem}>
                  <Text style={[styles.statNumber, { color: colors.text }]}>2</Text>
                  <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Upcoming</Text>
                </View>
              </View>
              <TouchableOpacity 
                style={[styles.viewScheduleButton, { backgroundColor: colors.primary }]}
                onPress={() => router.push('/appointments')}
              >
                <Text style={styles.viewScheduleText}>View Schedule</Text>
              </TouchableOpacity>
            </View>
            
            {/* Next Patient */}
            <View style={styles.sectionHeader}>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>Next Patient</Text>
            </View>
            
            <View style={[styles.appointmentCard, { backgroundColor: colors.cardBg }]}>
              <Image
                source={{ uri: 'https://images.pexels.com/photos/6551937/pexels-photo-6551937.jpeg?auto=compress&cs=tinysrgb&w=600' }}
                style={styles.doctorImage}
              />
              <View style={styles.appointmentInfo}>
                <Text style={[styles.doctorName, { color: colors.text }]}>
                  John Smith
                </Text>
                <Text style={[styles.doctorSpecialty, { color: colors.textSecondary }]}>
                  Regular Check-up
                </Text>
                <View style={styles.appointmentTimeContainer}>
                  <Clock size={14} color={colors.primary} />
                  <Text style={[styles.appointmentTime, { color: colors.primary }]}>
                    10:30 AM - 11:00 AM
                  </Text>
                </View>
              </View>
              <View style={styles.appointmentActions}>
                <TouchableOpacity 
                  style={[styles.appointmentButton, { backgroundColor: colors.primary }]}
                  // onPress={() => router.push('/consultation')}
                >
                  <Text style={styles.appointmentButtonText}>Start</Text>
                </TouchableOpacity>
              </View>
            </View>
            
            {/* Recent Patients */}
            <View style={styles.sectionHeader}>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>Recent Patients</Text>
              <TouchableOpacity>
                <Text style={[styles.sectionLink, { color: colors.primary }]}>See All</Text>
              </TouchableOpacity>
            </View>
            
            {[1, 2, 3].map((id) => (
              <TouchableOpacity 
                key={id}
                style={[styles.patientCard, { backgroundColor: colors.cardBg }]}
              >
                <Image 
                  source={{ uri: `https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=600` }} 
                  style={styles.patientImage} 
                />
                <View style={styles.patientInfo}>
                  <Text style={[styles.patientName, { color: colors.text }]}>Emily Parker</Text>
                  <Text style={[styles.patientDetails, { color: colors.textSecondary }]}>
                    Last visit: Yesterday
                  </Text>
                </View>
                <TouchableOpacity style={[styles.viewRecordsButton, { borderColor: colors.primary }]}>
                  <Text style={[styles.viewRecordsText, { color: colors.primary }]}>Records</Text>
                </TouchableOpacity>
              </TouchableOpacity>
            ))}
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  greeting: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
  },
  username: {
    fontSize: 20,
    fontFamily: 'Inter-SemiBold',
  },
  notificationButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    borderRadius: 25,
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  searchText: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
  },
  sectionLink: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
  },
  appointmentCard: {
    flexDirection: 'row',
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
    alignItems: 'center',
  },
  doctorImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  appointmentInfo: {
    flex: 1,
    marginLeft: 16,
  },
  doctorName: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    marginBottom: 4,
  },
  doctorSpecialty: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    marginBottom: 8,
  },
  appointmentTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  appointmentTime: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    marginLeft: 4,
  },
  appointmentActions: {
    alignItems: 'center',
  },
  appointmentButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 25,
    marginBottom: 4,
  },
  appointmentButtonText: {
    color: '#fff',
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
  },
  appointmentReschedule: {
    padding: 4,
  },
  rescheduleText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
  },
  noAppointmentCard: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    alignItems: 'center',
    justifyContent: 'center',
    height: 120,
  },
  noAppointmentText: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    marginTop: 12,
  },
  specialtiesContainer: {
    paddingBottom: 8,
    gap: 16,
    paddingRight: 20,
  },
  specialtyCard: {
    width: 100,
    height: 100,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  specialtyIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  specialtyName: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    textAlign: 'center',
  },
  doctorCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
  },
  doctorCardImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  doctorCardInfo: {
    flex: 1,
    marginLeft: 16,
  },
  doctorCardName: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    marginBottom: 4,
  },
  doctorCardSpecialty: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    marginLeft: 4,
  },
  // Doctor dashboard styles
  dashboardCard: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
  },
  dashboardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  dashboardTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
  },
  dashboardStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
  },
  statDivider: {
    width: 1,
    height: '100%',
  },
  viewScheduleButton: {
    height: 46,
    borderRadius: 23,
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewScheduleText: {
    color: '#fff',
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
  },
  patientCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
  },
  patientImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  patientInfo: {
    flex: 1,
    marginLeft: 16,
  },
  patientName: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    marginBottom: 4,
  },
  patientDetails: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
  },
  viewRecordsButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
  },
  viewRecordsText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
  },
});