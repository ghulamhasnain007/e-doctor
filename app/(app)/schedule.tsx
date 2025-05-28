import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Calendar, Clock, ArrowLeft, ChevronRight } from 'lucide-react-native';
import { useTheme } from '@/context/ThemeContext';
import { router } from 'expo-router';

// Define the interfaces with proper type narrowing
interface PatientAppointment {
  id: string;
  date: string;
  time: string;
  type: string;
  status: 'upcoming' | 'completed' | 'cancelled';
  doctorName: string;
  doctorSpecialty: string;
  doctorImage: string;
  patientName?: never; // To ensure type narrowing works
  patientImage?: never; // To ensure type narrowing works
}

interface DoctorSchedule {
  id: string;
  date: string;
  time: string;
  type: string;
  status: 'upcoming' | 'completed' | 'cancelled';
  patientName: string;
  patientImage: string;
  doctorName?: never; // To ensure type narrowing works
  doctorSpecialty?: never; // To ensure type narrowing works
  doctorImage?: never; // To ensure type narrowing works
}

// Union type for appointments
type Appointment = PatientAppointment | DoctorSchedule;

// Type guards for proper type checking
const isDoctorSchedule = (appointment: Appointment): appointment is DoctorSchedule => {
  return 'patientName' in appointment;
};

const isPatientAppointment = (appointment: Appointment): appointment is PatientAppointment => {
  return 'doctorName' in appointment;
};

// Define daily schedule interface
interface DailySchedule {
  start: string;
  end: string;
  slots: number;
}

// Define weekly schedule interface
interface WeeklySchedule {
  monday: DailySchedule;
  tuesday: DailySchedule;
  wednesday: DailySchedule;
  thursday: DailySchedule;
  friday: DailySchedule;
  saturday: DailySchedule;
  sunday: DailySchedule;
}

// Mock weekly schedule data
const weeklyScheduleMock: WeeklySchedule = {
  monday: { start: '9:00 AM', end: '5:00 PM', slots: 8 },
  tuesday: { start: '9:00 AM', end: '5:00 PM', slots: 6 },
  wednesday: { start: '10:00 AM', end: '6:00 PM', slots: 7 },
  thursday: { start: '9:00 AM', end: '5:00 PM', slots: 8 },
  friday: { start: '9:00 AM', end: '3:00 PM', slots: 5 },
  saturday: { start: '10:00 AM', end: '1:00 PM', slots: 3 },
  sunday: { start: '', end: '', slots: 0 },
};

// Mock appointments data
const mockAppointments: Appointment[] = [
  {
    id: '1',
    date: 'Today',
    time: '10:30 AM',
    type: 'Video Consultation',
    status: 'upcoming',
    doctorName: 'Dr. Sarah Johnson',
    doctorSpecialty: 'Cardiologist',
    doctorImage: 'https://images.pexels.com/photos/5452268/pexels-photo-5452268.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: '2',
    date: 'Tomorrow',
    time: '2:00 PM',
    type: 'In-Person Visit',
    status: 'upcoming',
    doctorName: 'Dr. Michael Chen',
    doctorSpecialty: 'Neurologist',
    doctorImage: 'https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: '3',
    date: '23 May, 2023',
    time: '9:15 AM',
    type: 'Video Consultation',
    status: 'upcoming',
    patientName: 'John Smith',
    patientImage: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: '4',
    date: '24 May, 2023',
    time: '11:30 AM',
    type: 'In-Person Visit',
    status: 'upcoming',
    patientName: 'Emily Johnson',
    patientImage: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
];

export default function ScheduleScreen() {
  const { colors } = useTheme();
  const [filter, setFilter] = useState<'all' | 'upcoming' | 'completed' | 'cancelled'>('all');
  
  // Create a goBack function using useCallback
  const goBack = useCallback(() => {
    router.back();
  }, []);

  // Filter appointments based on selected filter
  const filteredAppointments = filter === 'all' 
    ? mockAppointments 
    : mockAppointments.filter(appointment => appointment.status === filter);

  // Handle appointment actions like cancelling, rescheduling, etc.
  const handleAppointmentAction = (appointmentId: string, action: 'cancel' | 'reschedule' | 'view') => {
    switch (action) {
      case 'cancel':
        // Handle cancellation logic
        console.log(`Cancelling appointment ${appointmentId}`);
        break;
      case 'reschedule':
        // Navigate to reschedule screen
        router.push({pathname: '/(app)/reschedule-appointment', params: {id: appointmentId}});
        break;
      case 'view':
        // Navigate to appointment details
        router.push({pathname: '/(app)/appointments', params: {id: appointmentId}});
        break;
      default:
        break;
    }
  };

  // Render each appointment item
  const renderAppointmentItem = ({ item }: { item: Appointment }) => {
    return (
      <TouchableOpacity
        style={[styles.appointmentCard, { backgroundColor: colors.cardBg }]}
        onPress={() => handleAppointmentAction(item.id, 'view')}
      >
        <Image 
          style={styles.appointmentImage} 
          source={{ 
            uri: isDoctorSchedule(item) 
              ? item.patientImage 
              : isPatientAppointment(item) 
                ? item.doctorImage 
                : '' 
          }} 
        />
        
        <View style={styles.appointmentInfo}>
          <Text style={[styles.appointmentName, { color: colors.text }]}>
            {isDoctorSchedule(item) 
              ? item.patientName 
              : isPatientAppointment(item) 
                ? item.doctorName 
                : ''}
          </Text>
          
          {isPatientAppointment(item) && (
            <Text style={[styles.appointmentSpecialty, { color: colors.textSecondary }]}>
              {item.doctorSpecialty}
            </Text>
          )}
          
          <View style={styles.appointmentDetails}>
            <View style={styles.appointmentDetail}>
              <Calendar size={14} color={colors.primary} />
              <Text style={[styles.appointmentDetailText, { color: colors.text }]}>
                {item.date}
              </Text>
            </View>
            <View style={styles.appointmentDetail}>
              <Clock size={14} color={colors.primary} />
              <Text style={[styles.appointmentDetailText, { color: colors.text }]}>
                {item.time}
              </Text>
            </View>
          </View>
        </View>
        
        <TouchableOpacity
          style={[
            styles.appointmentAction,
            item.status === 'upcoming' 
              ? { backgroundColor: colors.primaryLight } 
              : styles.disabledAction
          ]}
          onPress={() => handleAppointmentAction(item.id, 'reschedule')}
          disabled={item.status !== 'upcoming'}
        >
          <Text 
            style={[
              styles.appointmentActionText, 
              { color: item.status === 'upcoming' ? colors.primary : colors.textSecondary }
            ]}
          >
            Reschedule
          </Text>
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={goBack} style={styles.backButton}>
          <ArrowLeft color={colors.text} size={24} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Schedule</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.filterContainer}>
        {(['all', 'upcoming', 'completed', 'cancelled'] as const).map((filterOption) => (
          <TouchableOpacity
            key={filterOption}
            style={[
              styles.filterButton,
              filter === filterOption && { backgroundColor: colors.primaryLight },
            ]}
            onPress={() => setFilter(filterOption)}
          >
            <Text
              style={[
                styles.filterText,
                { color: filter === filterOption ? colors.primary : colors.textSecondary },
              ]}
            >
              {filterOption.charAt(0).toUpperCase() + filterOption.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={filteredAppointments}
        keyExtractor={(item) => item.id}
        renderItem={renderAppointmentItem}
        contentContainerStyle={styles.appointmentsList}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
              No appointments found
            </Text>
          </View>
        )}
      />

      <TouchableOpacity
        style={[styles.weeklyScheduleButton, { backgroundColor: colors.cardBg }]}
        onPress={() => router.push('/(app)/appointments')}
      >
        <View>
          <Text style={[styles.weeklyScheduleTitle, { color: colors.text }]}>
            View Weekly Schedule
          </Text>
          <Text style={[styles.weeklyScheduleSubtitle, { color: colors.textSecondary }]}>
            Check your availability and slots
          </Text>
        </View>
        <ChevronRight size={20} color={colors.primary} />
      </TouchableOpacity>
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
  filterContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  filterButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    marginRight: 8,
  },
  filterText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
  },
  appointmentsList: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  appointmentCard: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: 16,
    marginBottom: 16,
    alignItems: 'center',
  },
  appointmentImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  appointmentInfo: {
    flex: 1,
  },
  appointmentName: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    marginBottom: 4,
  },
  appointmentSpecialty: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    marginBottom: 8,
  },
  appointmentDetails: {
    flexDirection: 'row',
  },
  appointmentDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  appointmentDetailText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    marginLeft: 4,
  },
  appointmentAction: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  appointmentActionText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
  },
  disabledAction: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
  },
  weeklyScheduleButton: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 16,
  },
  weeklyScheduleTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    marginBottom: 4,
  },
  weeklyScheduleSubtitle: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
  },
});