import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Calendar as CalendarIcon, Clock, ArrowLeft, CheckCircle2 } from 'lucide-react-native';
import { useTheme } from '@/context/ThemeContext';
import { router, useLocalSearchParams } from 'expo-router';
import { useModal } from '@/context/ModalContext';

// Mock time slots - could be fetched from API in a real app
const timeSlots = [
  { id: '1', time: '09:00 AM', available: true },
  { id: '2', time: '10:00 AM', available: true },
  { id: '3', time: '11:00 AM', available: false },
  { id: '4', time: '12:00 PM', available: true },
  { id: '5', time: '01:00 PM', available: false },
  { id: '6', time: '02:00 PM', available: true },
  { id: '7', time: '03:00 PM', available: true },
  { id: '8', time: '04:00 PM', available: true },
];

// Generate mock dates for the next 7 days
const today = new Date();
const dates = Array.from({ length: 7 }, (_, i) => {
  const date = new Date(today);
  date.setDate(today.getDate() + i);
  return {
    id: i.toString(),
    day: date.toLocaleDateString('en-US', { weekday: 'short' }),
    date: date.getDate(),
    month: date.toLocaleDateString('en-US', { month: 'short' }),
    available: Math.random() > 0.2, // Randomly set some dates as unavailable
  };
});

// Mock appointment detail - in a real app, this would be fetched from an API
const getAppointmentById = (id: string) => {
  return {
    id,
    doctor: {
      id: '1',
      name: 'Dr. Sarah Johnson',
      specialty: 'Cardiologist',
      image: 'https://images.pexels.com/photos/5452268/pexels-photo-5452268.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
    date: 'Today',
    time: '10:30 AM',
    type: 'Video Consultation'
  };
};

interface DateOption {
  id: string;
  day: string;
  date: number;
  month: string;
  available: boolean;
}

interface TimeSlot {
  id: string;
  time: string;
  available: boolean;
}

export default function RescheduleAppointmentScreen() {
  const { colors } = useTheme();
  const params = useLocalSearchParams();
  const appointmentId = params.id as string;
  const { showInfo } = useModal();
  
  const [appointment, setAppointment] = useState<any>(null);
  const [selectedDate, setSelectedDate] = useState<DateOption | null>(null);
  const [selectedTime, setSelectedTime] = useState<TimeSlot | null>(null);
  const [originalDate, setOriginalDate] = useState<string>('');
  const [originalTime, setOriginalTime] = useState<string>('');

  useEffect(() => {
    // In a real app, this would be an API call
    const appointmentData = getAppointmentById(appointmentId);
    setAppointment(appointmentData);
    setOriginalDate(appointmentData.date);
    setOriginalTime(appointmentData.time);
  }, [appointmentId]);

  const handleDateSelect = (date: DateOption) => {
    setSelectedDate(date);
  };

  const handleTimeSelect = (timeSlot: TimeSlot) => {
    setSelectedTime(timeSlot);
  };
  const handleReschedule = () => {
    // Here you would typically make an API call to reschedule the appointment
    
    // Show success message using our new modal component
    showInfo({
      title: 'Success',
      message: 'Appointment rescheduled successfully!',
      onClose: () => {
        // Navigate back to appointments screen after modal is closed
        router.push('/appointments');
      }
    });
  };

  const goBack = () => {
    router.back();
  };

  // Format the new date for display
  const getFormattedNewDate = () => {
    if (!selectedDate) return '';
    return `${selectedDate.day}, ${selectedDate.date} ${selectedDate.month}`;
  };

  if (!appointment) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
        <Text style={[styles.loadingText, { color: colors.text }]}>Loading...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={goBack} style={styles.backButton}>
          <ArrowLeft color={colors.text} size={24} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Reschedule Appointment</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.appointmentCard, { backgroundColor: colors.cardBg }]}>
          <Image source={{ uri: appointment.doctor.image }} style={styles.doctorImage} />
          <View>
            <Text style={[styles.doctorName, { color: colors.text }]}>
              {appointment.doctor.name}
            </Text>
            <Text style={[styles.doctorSpecialty, { color: colors.textSecondary }]}>
              {appointment.doctor.specialty}
            </Text>
            
            <View style={styles.appointmentDetails}>
              <View style={styles.appointmentDetail}>
                <CalendarIcon size={14} color={colors.primary} />
                <Text style={[styles.appointmentDetailText, { color: colors.text }]}>
                  {originalDate}
                </Text>
              </View>
              <View style={styles.appointmentDetail}>
                <Clock size={14} color={colors.primary} />
                <Text style={[styles.appointmentDetailText, { color: colors.text }]}>
                  {originalTime}
                </Text>
              </View>
            </View>
          </View>
        </View>

        <Text style={[styles.sectionTitle, { color: colors.text }]}>Select New Date</Text>
        
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.datesContainer}
          contentContainerStyle={styles.datesContent}
        >
          {dates.map(date => (
            <TouchableOpacity
              key={date.id}
              style={[
                styles.dateCard,
                selectedDate?.id === date.id && { borderColor: colors.primary },
                { backgroundColor: colors.cardBg }
              ]}
              onPress={() => handleDateSelect(date)}
              disabled={!date.available}
            >
              <Text
                style={[
                  styles.dateDay,
                  { color: selectedDate?.id === date.id ? colors.primary : colors.text }
                ]}
              >
                {date.day}
              </Text>
              <Text
                style={[
                  styles.dateNumber,
                  { color: selectedDate?.id === date.id ? colors.primary : colors.text }
                ]}
              >
                {date.date}
              </Text>
              <Text
                style={[
                  styles.dateMonth,
                  { color: selectedDate?.id === date.id ? colors.primary : colors.textSecondary }
                ]}
              >
                {date.month}
              </Text>
              {!date.available && (
                <View style={styles.unavailableOverlay}>
                  <Text style={styles.unavailableOverlayText}>Unavailable</Text>
                </View>
              )}
            </TouchableOpacity>
          ))}
        </ScrollView>

        <Text style={[styles.sectionTitle, { color: colors.text }]}>Select New Time</Text>
        
        <View style={styles.timeGrid}>
          {timeSlots.map(slot => (
            <TouchableOpacity
              key={slot.id}
              style={[
                styles.timeCard,
                selectedTime?.id === slot.id && { borderColor: colors.primary },
                { backgroundColor: colors.cardBg }
              ]}
              onPress={() => handleTimeSelect(slot)}
              disabled={!slot.available}
            >
              <Text
                style={[
                  styles.timeText,
                  { color: selectedTime?.id === slot.id ? colors.primary : colors.text }
                ]}
              >
                {slot.time}
              </Text>
              {!slot.available && (
                <View style={[styles.unavailableTimeOverlay, { backgroundColor: colors.cardBg }]}>
                  <Text style={{ color: colors.error, fontSize: 12 }}>Booked</Text>
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>

        {selectedDate && selectedTime && (
          <View style={[styles.summaryCard, { backgroundColor: colors.cardBg }]}>
            <Text style={[styles.summaryTitle, { color: colors.text }]}>Reschedule Summary</Text>
            
            <View style={styles.summaryRow}>
              <View style={styles.summaryItem}>
                <Text style={[styles.summaryLabel, { color: colors.textSecondary }]}>From</Text>
                <Text style={[styles.summaryValue, { color: colors.text }]}>
                  {originalDate}, {originalTime}
                </Text>
              </View>
              
              <View style={styles.summaryItem}>
                <Text style={[styles.summaryLabel, { color: colors.textSecondary }]}>To</Text>
                <Text style={[styles.summaryValue, { color: colors.primary }]}>
                  {getFormattedNewDate()}, {selectedTime.time}
                </Text>
              </View>
            </View>
          </View>
        )}

        <TouchableOpacity
          style={[
            styles.rescheduleButton,
            { backgroundColor: colors.primary },
            (!selectedDate || !selectedTime) && { opacity: 0.5 }
          ]}
          onPress={handleReschedule}
          disabled={!selectedDate || !selectedTime}
        >
          <Text style={styles.rescheduleButtonText}>Confirm Reschedule</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
    fontFamily: 'Inter-Regular',
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
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  appointmentCard: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: 16,
    marginBottom: 24,
    alignItems: 'center',
  },
  doctorImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 16,
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
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    marginBottom: 16,
  },
  datesContainer: {
    marginBottom: 24,
  },
  datesContent: {
    paddingRight: 20,
  },
  dateCard: {
    width: 70,
    height: 90,
    borderRadius: 12,
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
    position: 'relative',
    overflow: 'hidden',
  },
  dateDay: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    marginBottom: 4,
  },
  dateNumber: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    marginBottom: 2,
  },
  dateMonth: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
  },
  unavailableOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  unavailableOverlayText: {
    color: '#fff',
    fontSize: 10,
    fontFamily: 'Inter-Medium',
  },
  timeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  timeCard: {
    width: '23%',
    height: 40,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 2,
    borderColor: 'transparent',
    position: 'relative',
    overflow: 'hidden',
  },
  timeText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
  },
  unavailableTimeOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  summaryCard: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
  },
  summaryTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    marginBottom: 16,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  summaryItem: {
    flex: 1,
  },
  summaryLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    marginBottom: 4,
  },
  summaryValue: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
  },
  rescheduleButton: {
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 16,
  },
  rescheduleButtonText: {
    color: '#fff',
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
  },
});
