import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Calendar as CalendarIcon, Clock, VideoIcon, MessageSquare } from 'lucide-react-native';
import { useTheme } from '@/context/ThemeContext';
import { useAuth } from '@/context/AuthContext';
import { router } from 'expo-router';

// Mock appointments data
const appointmentsMock = [
  {
    id: '1',
    doctor: {
      name: 'Dr. Sarah Johnson',
      specialty: 'Cardiologist',
      image: 'https://images.pexels.com/photos/5452268/pexels-photo-5452268.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
    patient: {
      name: 'John Smith',
      image: 'https://images.pexels.com/photos/6551937/pexels-photo-6551937.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
    date: 'Today',
    time: '10:30 AM',
    type: 'Video Consultation',
    status: 'upcoming',
  },
  {
    id: '2',
    doctor: {
      name: 'Dr. Mark Wilson',
      specialty: 'Pediatrician',
      image: 'https://images.pexels.com/photos/4173239/pexels-photo-4173239.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
    patient: {
      name: 'Emma Parker',
      image: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
    date: 'Tomorrow',
    time: '2:00 PM',
    type: 'Chat Consultation',
    status: 'upcoming',
  },
  {
    id: '3',
    doctor: {
      name: 'Dr. Lisa Chen',
      specialty: 'Dermatologist',
      image: 'https://images.pexels.com/photos/5214958/pexels-photo-5214958.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
    patient: {
      name: 'Michael Brown',
      image: 'https://images.pexels.com/photos/3778680/pexels-photo-3778680.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
    date: '12 Jun 2023',
    time: '9:00 AM',
    type: 'Video Consultation',
    status: 'completed',
  },
  {
    id: '4',
    doctor: {
      name: 'Dr. James Lee',
      specialty: 'Orthopedic',
      image: 'https://images.pexels.com/photos/4225880/pexels-photo-4225880.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
    patient: {
      name: 'Sophia Miller',
      image: 'https://images.pexels.com/photos/1987301/pexels-photo-1987301.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
    date: '5 Jun 2023',
    time: '11:15 AM',
    type: 'Video Consultation',
    status: 'canceled',
  },
];

export default function AppointmentsScreen() {
  const { colors } = useTheme();
  const { userType } = useAuth();
  const [activeTab, setActiveTab] = useState('upcoming');

  const filteredAppointments = appointmentsMock.filter(
    appointment => appointment.status === activeTab
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Appointments</Text>
        <TouchableOpacity style={[styles.calendarButton, { backgroundColor: colors.cardBg }]}>
          <CalendarIcon color={colors.text} size={20} />
        </TouchableOpacity>
      </View>
      
      <View style={styles.tabsContainer}>
        <TouchableOpacity 
          style={[
            styles.tab, 
            activeTab === 'upcoming' && [styles.activeTab, { borderColor: colors.primary }]
          ]}
          onPress={() => setActiveTab('upcoming')}
        >
          <Text 
            style={[
              styles.tabText, 
              { color: activeTab === 'upcoming' ? colors.primary : colors.textSecondary }
            ]}
          >
            Upcoming
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[
            styles.tab, 
            activeTab === 'completed' && [styles.activeTab, { borderColor: colors.primary }]
          ]}
          onPress={() => setActiveTab('completed')}
        >
          <Text 
            style={[
              styles.tabText, 
              { color: activeTab === 'completed' ? colors.primary : colors.textSecondary }
            ]}
          >
            Completed
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[
            styles.tab, 
            activeTab === 'canceled' && [styles.activeTab, { borderColor: colors.primary }]
          ]}
          onPress={() => setActiveTab('canceled')}
        >
          <Text 
            style={[
              styles.tabText, 
              { color: activeTab === 'canceled' ? colors.primary : colors.textSecondary }
            ]}
          >
            Canceled
          </Text>
        </TouchableOpacity>
      </View>
      
      <ScrollView
        style={styles.appointmentsList}
        contentContainerStyle={styles.appointmentsListContent}
        showsVerticalScrollIndicator={false}
      >
        {filteredAppointments.length > 0 ? (
          filteredAppointments.map(appointment => (
            <View 
              key={appointment.id}
              style={[styles.appointmentCard, { backgroundColor: colors.cardBg }]}
            >
              <View style={styles.appointmentHeader}>
                <View style={styles.appointmentTimeContainer}>
                  <CalendarIcon size={14} color={colors.primary} />
                  <Text style={[styles.appointmentDate, { color: colors.text }]}>
                    {appointment.date}
                  </Text>
                </View>
                <View style={styles.appointmentTimeContainer}>
                  <Clock size={14} color={colors.primary} />
                  <Text style={[styles.appointmentTime, { color: colors.text }]}>
                    {appointment.time}
                  </Text>
                </View>
              </View>
              
              <View style={styles.appointmentBody}>
                <Image 
                  source={{ 
                    uri: userType === 'patient' 
                      ? appointment.doctor.image 
                      : appointment.patient.image 
                  }} 
                  style={styles.personImage} 
                />
                
                <View style={styles.appointmentInfo}>
                  <Text style={[styles.personName, { color: colors.text }]}>
                    {userType === 'patient' ? appointment.doctor.name : appointment.patient.name}
                  </Text>
                  
                  {userType === 'patient' && (
                    <Text style={[styles.specialty, { color: colors.textSecondary }]}>
                      {appointment.doctor.specialty}
                    </Text>
                  )}
                  
                  <View style={styles.appointmentType}>
                    {appointment.type === 'Video Consultation' ? (
                      <VideoIcon size={14} color={colors.primary} />
                    ) : (
                      <MessageSquare size={14} color={colors.primary} />
                    )}
                    <Text style={[styles.appointmentTypeText, { color: colors.textSecondary }]}>
                      {appointment.type}
                    </Text>
                  </View>
                </View>
                
                {activeTab === 'upcoming' && (
                  <View style={styles.actionButtons}>
                    <TouchableOpacity 
                      style={[styles.primaryButton, { backgroundColor: colors.primary }]}
                    >
                      <Text style={styles.primaryButtonText}>
                        {appointment.type === 'Video Consultation' ? 'Join' : 'Chat'}
                      </Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity 
                      style={[styles.secondaryButton, { borderColor: colors.border }]}
                      onPress={() => router.push(`/reschedule-appointment?id=${appointment.id}`)}
                    >
                      <Text style={[styles.secondaryButtonText, { color: colors.textSecondary }]}>
                        Reschedule
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
                
                {activeTab === 'completed' && (
                  <View style={styles.actionButtons}>
                    <TouchableOpacity 
                      style={[styles.primaryButton, { backgroundColor: colors.primary }]}
                    >
                      <Text style={styles.primaryButtonText}>
                        {userType === 'doctor' ? 'View Records' : 'View Prescription'}
                      </Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity 
                      style={[styles.secondaryButton, { borderColor: colors.border }]}
                    >
                      <Text style={[styles.secondaryButtonText, { color: colors.textSecondary }]}>
                        Book Again
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
                
                {activeTab === 'canceled' && (
                  <TouchableOpacity 
                    style={[styles.primaryButton, { backgroundColor: colors.primary }]}
                    onPress={() => router.push(`/reschedule-appointment?id=${appointment.id}`)}
                  >
                    <Text style={styles.primaryButtonText}>Reschedule</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          ))
        ) : (
          <View style={styles.emptyState}>
            <CalendarIcon size={48} color={colors.textSecondary} />
            <Text style={[styles.emptyStateTitle, { color: colors.text }]}>
              No {activeTab} appointments
            </Text>
            <Text style={[styles.emptyStateDescription, { color: colors.textSecondary }]}>
              {activeTab === 'upcoming'
                ? "You don't have any upcoming appointments."
                : activeTab === 'completed'
                ? "You don't have any completed appointments yet."
                : "You don't have any canceled appointments."}
            </Text>
            {activeTab === 'upcoming' && userType === 'patient' && (
              <TouchableOpacity 
                style={[styles.bookButton, { backgroundColor: colors.primary }]}
                onPress={() => router.push('/book-appointment')}
              >
                <Text style={styles.bookButtonText}>Book Appointment</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      </ScrollView>
      
      {userType === 'patient' && (
        <View style={styles.floatingButtonContainer}>
          <TouchableOpacity 
            style={[styles.floatingButton, { backgroundColor: colors.primary }]}
            onPress={() => router.push('/book-appointment')}
          >
            <Text style={styles.floatingButtonText}>+ Book Appointment</Text>
          </TouchableOpacity>
        </View>
      )}
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
  calendarButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginRight: 12,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomWidth: 2,
  },
  tabText: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
  },
  appointmentsList: {
    flex: 1,
  },
  appointmentsListContent: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  appointmentCard: {
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
  },
  appointmentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.05)',
  },
  appointmentTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  appointmentDate: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    marginLeft: 6,
  },
  appointmentTime: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    marginLeft: 6,
  },
  appointmentBody: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  personImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  appointmentInfo: {
    flex: 1,
    marginLeft: 16,
  },
  personName: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    marginBottom: 4,
  },
  specialty: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    marginBottom: 6,
  },
  appointmentType: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  appointmentTypeText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    marginLeft: 6,
  },
  actionButtons: {
    alignItems: 'center',
    gap: 8,
  },
  primaryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    minWidth: 100,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#fff',
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
  },
  secondaryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    minWidth: 100,
    alignItems: 'center',
  },
  secondaryButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  emptyStateTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    textAlign: 'center',
    marginBottom: 24,
  },
  bookButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 25,
  },
  bookButtonText: {
    color: '#fff',
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
  },
  floatingButtonContainer: {
    position: 'absolute',
    bottom: 24,
    width: '100%',
    alignItems: 'center',
  },
  floatingButton: {
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  floatingButtonText: {
    color: '#fff',
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
  },
});