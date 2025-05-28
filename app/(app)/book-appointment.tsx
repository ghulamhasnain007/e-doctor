import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Calendar as CalendarIcon, Clock, ArrowLeft, Search, CheckCircle2, Info } from 'lucide-react-native';
import { useTheme } from '@/context/ThemeContext';
import { router } from 'expo-router';

// Mock doctors data
const doctorsMock = [
  {
    id: '1',
    name: 'Dr. Sarah Johnson',
    specialty: 'Cardiologist',
    image: 'https://images.pexels.com/photos/5452268/pexels-photo-5452268.jpeg?auto=compress&cs=tinysrgb&w=600',
    rating: 4.9,
    experience: '8 years',
    price: '$100',
    available: true,
  },
  {
    id: '2',
    name: 'Dr. Mark Wilson',
    specialty: 'Pediatrician',
    image: 'https://images.pexels.com/photos/4173239/pexels-photo-4173239.jpeg?auto=compress&cs=tinysrgb&w=600',
    rating: 4.7,
    experience: '12 years',
    price: '$90',
    available: true,
  },
  {
    id: '3',
    name: 'Dr. Lisa Chen',
    specialty: 'Dermatologist',
    image: 'https://images.pexels.com/photos/5214958/pexels-photo-5214958.jpeg?auto=compress&cs=tinysrgb&w=600',
    rating: 4.8,
    experience: '10 years',
    price: '$120',
    available: false,
  },
  {
    id: '4',
    name: 'Dr. James Lee',
    specialty: 'Orthopedic',
    image: 'https://images.pexels.com/photos/4225880/pexels-photo-4225880.jpeg?auto=compress&cs=tinysrgb&w=600',
    rating: 4.5,
    experience: '15 years',
    price: '$150',
    available: true,
  },
];

// Mock time slots
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

// Mock dates
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

export default function BookAppointmentScreen() {
  const { colors } = useTheme();
  const [step, setStep] = useState(1);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [selectedDate, setSelectedDate] = useState<DateOption | null>(null);
  const [selectedTime, setSelectedTime] = useState<TimeSlot | null>(null);
  const [selectedType, setSelectedType] = useState('video'); // 'video' or 'chat'
  const [searchQuery, setSearchQuery] = useState('');

  const filteredDoctors = searchQuery 
    ? doctorsMock.filter(doctor => 
        doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : doctorsMock;

interface Doctor {
    id: string;
    name: string;
    specialty: string;
    image: string;
    rating: number;
    experience: string;
    price: string;
    available: boolean;
}

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

const handleDoctorSelect = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    setStep(2);
};

const handleDateSelect = (date: DateOption) => {
    setSelectedDate(date);
};

const handleTimeSelect = (timeSlot: TimeSlot) => {
    setSelectedTime(timeSlot);
};

interface AppointmentTypeSelectHandler {
    (type: 'video' | 'chat'): void;
}

const handleAppointmentTypeSelect: AppointmentTypeSelectHandler = (type) => {
    setSelectedType(type);
};

  const handleBooking = () => {
    // Here you would typically make an API call to book the appointment
    // For now, we'll just navigate back to the appointments screen
    router.push('/appointments');
  };

  const goBack = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      router.back();
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={goBack} style={styles.backButton}>
          <ArrowLeft color={colors.text} size={24} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]}>
          {step === 1 ? 'Select Doctor' : step === 2 ? 'Select Date & Time' : 'Confirm Booking'}
        </Text>
        <View style={{ width: 24 }} />
      </View>

      {step === 1 && (
        <>
          <View style={[styles.searchContainer, { backgroundColor: colors.cardBg }]}>
            <Search size={20} color={colors.textSecondary} />
            <TextInput
              style={[styles.searchInput, { color: colors.text }]}
              placeholder="Search for doctors or specialties"
              placeholderTextColor={colors.textSecondary}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>

          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.scrollViewContent}
            showsVerticalScrollIndicator={false}
          >
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Available Doctors</Text>
            
            {filteredDoctors.map(doctor => (
              <TouchableOpacity
                key={doctor.id}
                style={[styles.doctorCard, { backgroundColor: colors.cardBg }]}
                onPress={() => handleDoctorSelect(doctor)}
                disabled={!doctor.available}
              >
                <Image source={{ uri: doctor.image }} style={styles.doctorImage} />
                  <View style={styles.doctorInfo}>
                  <Text style={[styles.doctorName, { color: colors.text }]}>{doctor.name}</Text>
                  <Text style={[styles.doctorSpecialty, { color: colors.textSecondary }]}>
                    {doctor.specialty}
                  </Text>
                  
                  <View style={styles.doctorDetails}>
                    <Text style={[styles.doctorDetail, { color: colors.textSecondary }]}>
                      ⭐ {doctor.rating}
                    </Text>
                    <Text style={[styles.doctorDetail, { color: colors.textSecondary }]}>
                      {doctor.experience}
                    </Text>
                    <Text style={[styles.doctorDetail, { color: colors.primary }]}>
                      {doctor.price}
                    </Text>
                    <TouchableOpacity 
                      onPress={() => router.push(`/doctor-details?id=${doctor.id}`)}
                      style={{ marginLeft: 'auto' }}
                    >
                      <Info size={16} color={colors.primary} />
                    </TouchableOpacity>
                  </View>
                </View>
                
                {doctor.available ? (
                  <TouchableOpacity
                    style={[styles.selectButton, { backgroundColor: colors.primary }]}
                    onPress={() => handleDoctorSelect(doctor)}
                  >
                    <Text style={styles.selectButtonText}>Select</Text>
                  </TouchableOpacity>
                ) : (
                  <Text style={[styles.unavailableText, { color: colors.error }]}>
                    Unavailable
                  </Text>
                )}
              </TouchableOpacity>
            ))}
          </ScrollView>
        </>
      )}

      {step === 2 && (
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollViewContent}
          showsVerticalScrollIndicator={false}
        >
          {selectedDoctor && (
            <View style={[styles.selectedDoctorCard, { backgroundColor: colors.cardBg }]}>
              <Image source={{ uri: selectedDoctor.image }} style={styles.selectedDoctorImage} />
              <View>
                <Text style={[styles.selectedDoctorName, { color: colors.text }]}>
                  {selectedDoctor.name}
                </Text>
                <Text style={[styles.selectedDoctorSpecialty, { color: colors.textSecondary }]}>
                  {selectedDoctor.specialty}
                </Text>
              </View>
            </View>
          )}

          <Text style={[styles.sectionTitle, { color: colors.text }]}>Select Date</Text>
          
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

          <Text style={[styles.sectionTitle, { color: colors.text }]}>Select Time</Text>
          
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

          <Text style={[styles.sectionTitle, { color: colors.text }]}>Appointment Type</Text>
          
          <View style={styles.typeContainer}>
            <TouchableOpacity
              style={[
                styles.typeCard,
                selectedType === 'video' && { borderColor: colors.primary },
                { backgroundColor: colors.cardBg }
              ]}
              onPress={() => handleAppointmentTypeSelect('video')}
            >
              <View style={[styles.typeIconContainer, { backgroundColor: colors.primary + '20' }]}>
                <Image 
                  source={{ uri: 'https://cdn-icons-png.flaticon.com/512/2175/2175429.png' }} 
                  style={styles.typeIcon} 
                />
              </View>
              <Text style={[styles.typeText, { color: colors.text }]}>Video Consultation</Text>
              {selectedType === 'video' && (
                <CheckCircle2 color={colors.primary} size={20} style={styles.checkIcon} />
              )}
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[
                styles.typeCard,
                selectedType === 'chat' && { borderColor: colors.primary },
                { backgroundColor: colors.cardBg }
              ]}
              onPress={() => handleAppointmentTypeSelect('chat')}
            >
              <View style={[styles.typeIconContainer, { backgroundColor: colors.primary + '20' }]}>
                <Image 
                  source={{ uri: 'https://cdn-icons-png.flaticon.com/512/724/724715.png' }} 
                  style={styles.typeIcon} 
                />
              </View>
              <Text style={[styles.typeText, { color: colors.text }]}>Chat Consultation</Text>
              {selectedType === 'chat' && (
                <CheckCircle2 color={colors.primary} size={20} style={styles.checkIcon} />
              )}
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={[
              styles.continueButton,
              { backgroundColor: colors.primary },
              (!selectedDate || !selectedTime) && { opacity: 0.5 }
            ]}
            onPress={() => setStep(3)}
            disabled={!selectedDate || !selectedTime}
          >
            <Text style={styles.continueButtonText}>Continue</Text>
          </TouchableOpacity>
        </ScrollView>
      )}

      {step === 3 && (
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollViewContent}
          showsVerticalScrollIndicator={false}
        >
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Appointment Summary</Text>
          
          <View style={[styles.summaryCard, { backgroundColor: colors.cardBg }]}>
            <View style={styles.summaryRow}>
              <Text style={[styles.summaryLabel, { color: colors.textSecondary }]}>Doctor</Text>
              <Text style={[styles.summaryValue, { color: colors.text }]}>
                {selectedDoctor?.name}
              </Text>
            </View>
            
            <View style={styles.summaryRow}>
              <Text style={[styles.summaryLabel, { color: colors.textSecondary }]}>Specialty</Text>
              <Text style={[styles.summaryValue, { color: colors.text }]}>
                {selectedDoctor?.specialty}
              </Text>
            </View>
            
            <View style={styles.summaryRow}>
              <Text style={[styles.summaryLabel, { color: colors.textSecondary }]}>Date</Text>
              <Text style={[styles.summaryValue, { color: colors.text }]}>
                {selectedDate ? `${selectedDate.day}, ${selectedDate.date} ${selectedDate.month}` : ''}
              </Text>
            </View>
            
            <View style={styles.summaryRow}>
              <Text style={[styles.summaryLabel, { color: colors.textSecondary }]}>Time</Text>
              <Text style={[styles.summaryValue, { color: colors.text }]}>
                {selectedTime?.time}
              </Text>
            </View>
            
            <View style={styles.summaryRow}>
              <Text style={[styles.summaryLabel, { color: colors.textSecondary }]}>
                Appointment Type
              </Text>
              <Text style={[styles.summaryValue, { color: colors.text }]}>
                {selectedType === 'video' ? 'Video Consultation' : 'Chat Consultation'}
              </Text>
            </View>
            
            <View style={styles.summaryRow}>
              <Text style={[styles.summaryLabel, { color: colors.textSecondary }]}>Fee</Text>
              <Text style={[styles.summaryValue, { color: colors.primary, fontFamily: 'Inter-Bold' }]}>
                {selectedDoctor?.price}
              </Text>
            </View>
          </View>

          <Text style={[styles.sectionTitle, { color: colors.text }]}>Payment Method</Text>
          
          <View style={[styles.paymentCard, { backgroundColor: colors.cardBg }]}>
            <View style={styles.paymentRow}>
              <View style={styles.paymentMethod}>
                <Image
                  source={{ uri: 'https://cdn-icons-png.flaticon.com/512/196/196578.png' }}
                  style={styles.paymentIcon}
                />
                <Text style={[styles.paymentText, { color: colors.text }]}>Credit Card</Text>
              </View>
              <CheckCircle2 color={colors.primary} size={20} />
            </View>
          </View>

          <TouchableOpacity
            style={[styles.bookButton, { backgroundColor: colors.primary }]}
            onPress={handleBooking}
          >
            <Text style={styles.bookButtonText}>Confirm & Pay</Text>
          </TouchableOpacity>
        </ScrollView>
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginHorizontal: 20,
    marginBottom: 16,
    height: 50,
    borderRadius: 25,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontFamily: 'Inter-Regular',
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    marginTop: 24,
    marginBottom: 16,
  },
  doctorCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    marginBottom: 16,
  },
  doctorImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  doctorInfo: {
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
  doctorDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  doctorDetail: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    marginRight: 12,
  },
  selectButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 80,
  },
  selectButtonText: {
    color: '#fff',
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
  },
  unavailableText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
  },
  selectedDoctorCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    marginBottom: 16,
  },
  selectedDoctorImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 16,
  },
  selectedDoctorName: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    marginBottom: 4,
  },
  selectedDoctorSpecialty: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
  },
  datesContainer: {
    marginBottom: 16,
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
  typeContainer: {
    marginBottom: 24,
  },
  typeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  typeIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  typeIcon: {
    width: 24,
    height: 24,
  },
  typeText: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    flex: 1,
  },
  checkIcon: {
    marginLeft: 8,
  },
  continueButton: {
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 16,
  },
  continueButtonText: {
    color: '#fff',
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
  },
  summaryCard: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  summaryLabel: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
  },
  summaryValue: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
  },
  paymentCard: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 32,
  },
  paymentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  paymentMethod: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  paymentIcon: {
    width: 32,
    height: 32,
    marginRight: 12,
  },
  paymentText: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
  },
  bookButton: {
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: 'center',
  },
  bookButtonText: {
    color: '#fff',
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
  },
});
