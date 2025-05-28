import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Search, Star, Filter } from 'lucide-react-native';
import { useTheme } from '@/context/ThemeContext';
import { router, useLocalSearchParams } from 'expo-router';

// Extended doctors list
const doctorsList = [
  {
    id: '1',
    name: 'Dr. Sarah Johnson',
    specialty: 'Cardiologist',
    specialtyId: 1,
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
    specialtyId: 2,
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
    specialtyId: 3,
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
    specialtyId: 5,
    image: 'https://images.pexels.com/photos/4225880/pexels-photo-4225880.jpeg?auto=compress&cs=tinysrgb&w=600',
    rating: 4.5,
    experience: '15 years',
    price: '$150',
    available: true,
  },
  {
    id: '5',
    name: 'Dr. Emily Wilson',
    specialty: 'Neurologist',
    specialtyId: 4,
    image: 'https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=600',
    rating: 4.6,
    experience: '7 years',
    price: '$130',
    available: true,
  },
  {
    id: '6',
    name: 'Dr. Michael Rodriguez',
    specialty: 'Ophthalmologist',
    specialtyId: 7,
    image: 'https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=600',
    rating: 4.3,
    experience: '9 years',
    price: '$110',
    available: true,
  },
  {
    id: '7',
    name: 'Dr. Jennifer Kim',
    specialty: 'Gynecologist',
    specialtyId: 6,
    image: 'https://images.pexels.com/photos/5407213/pexels-photo-5407213.jpeg?auto=compress&cs=tinysrgb&w=600',
    rating: 4.9,
    experience: '14 years',
    price: '$140',
    available: true,
  },
  {
    id: '8',
    name: 'Dr. Robert Chen',
    specialty: 'Psychiatrist',
    specialtyId: 11,
    image: 'https://images.pexels.com/photos/5407206/pexels-photo-5407206.jpeg?auto=compress&cs=tinysrgb&w=600',
    rating: 4.7,
    experience: '11 years',
    price: '$160',
    available: false,
  },
];

export default function DoctorsScreen() {
  const { colors } = useTheme();
  const params = useLocalSearchParams();
  const specialtyId = params.specialty ? parseInt(params.specialty as string) : null;
  
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredDoctors, setFilteredDoctors] = useState(doctorsList);
  const [filterAvailable, setFilterAvailable] = useState(false);
  
  useEffect(() => {
    let result = doctorsList;
    
    // Filter by specialty if provided
    if (specialtyId) {
      result = result.filter(doctor => doctor.specialtyId === specialtyId);
    }
    
    // Apply search filter
    if (searchQuery) {
      result = result.filter(doctor => 
        doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Filter by availability
    if (filterAvailable) {
      result = result.filter(doctor => doctor.available);
    }
    
    setFilteredDoctors(result);
  }, [searchQuery, specialtyId, filterAvailable]);
  
  const goBack = () => {
    router.back();
  };
  
  const viewDoctorDetails = (doctorId: string) => {
    router.push(`/doctor-details?id=${doctorId}`);
  };
  
  const toggleAvailabilityFilter = () => {
    setFilterAvailable(!filterAvailable);
  };

  const renderDoctorItem = ({ item }: { item: typeof doctorsList[0] }) => (
    <TouchableOpacity 
      style={[styles.doctorCard, { backgroundColor: colors.cardBg }]}
      onPress={() => viewDoctorDetails(item.id)}
    >
      <Image source={{ uri: item.image }} style={styles.doctorImage} />
      <View style={styles.doctorInfo}>
        <Text style={[styles.doctorName, { color: colors.text }]}>{item.name}</Text>
        <Text style={[styles.doctorSpecialty, { color: colors.textSecondary }]}>{item.specialty}</Text>
        
        <View style={styles.doctorStats}>
          <View style={styles.ratingContainer}>
            <Star size={14} color="#FFD700" fill="#FFD700" />
            <Text style={[styles.ratingText, { color: colors.text }]}>{item.rating}</Text>
          </View>
          
          <Text style={[styles.doctorExperience, { color: colors.textSecondary }]}>
            {item.experience}
          </Text>
          
          <Text style={[styles.doctorPrice, { color: colors.primary }]}>
            {item.price}
          </Text>
        </View>
      </View>
      
      {item.available ? (
        <View style={[styles.availabilityBadge, { backgroundColor: colors.success + '20' }]}>
          <Text style={[styles.availabilityText, { color: colors.success }]}>Available</Text>
        </View>
      ) : (
        <View style={[styles.availabilityBadge, { backgroundColor: colors.error + '20' }]}>
          <Text style={[styles.availabilityText, { color: colors.error }]}>Unavailable</Text>
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={goBack} style={styles.backButton}>
          <ArrowLeft color={colors.text} size={24} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]}>
          {specialtyId ? filteredDoctors[0]?.specialty || 'Doctors' : 'All Doctors'}
        </Text>
        <View style={{ width: 24 }} />
      </View>
      
      <View style={styles.searchFilterContainer}>
        <View style={[styles.searchContainer, { backgroundColor: colors.cardBg }]}>
          <Search size={20} color={colors.textSecondary} />
          <TextInput
            style={[styles.searchInput, { color: colors.text }]}
            placeholder="Search doctors by name or specialty"
            placeholderTextColor={colors.textSecondary}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        
        <TouchableOpacity 
          style={[
            styles.filterButton, 
            { 
              backgroundColor: filterAvailable ? colors.primary : colors.cardBg,
            }
          ]}
          onPress={toggleAvailabilityFilter}
        >
          <Filter size={20} color={filterAvailable ? '#fff' : colors.textSecondary} />
        </TouchableOpacity>
      </View>
      
      {filteredDoctors.length > 0 ? (
        <FlatList
          data={filteredDoctors}
          renderItem={renderDoctorItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.doctorsList}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={[styles.emptyTitle, { color: colors.text }]}>No doctors found</Text>
          <Text style={[styles.emptyDescription, { color: colors.textSecondary }]}>
            Try adjusting your search or filters
          </Text>
        </View>
      )}
      
      <TouchableOpacity
        style={[styles.bookButton, { backgroundColor: colors.primary }]}
        onPress={() => router.push('/book-appointment')}
      >
        <Text style={styles.bookButtonText}>Book Appointment</Text>
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
  searchFilterContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontFamily: 'Inter-Regular',
  },
  filterButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  doctorsList: {
    paddingHorizontal: 20,
    paddingBottom: 80,
  },
  doctorCard: {
    flexDirection: 'row',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    position: 'relative',
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
  doctorStats: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
  },
  ratingText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    marginLeft: 4,
  },
  doctorExperience: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    marginRight: 12,
  },
  doctorPrice: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
  },
  availabilityBadge: {
    position: 'absolute',
    top: 16,
    right: 16,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  availabilityText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    marginBottom: 8,
    textAlign: 'center',
  },
  emptyDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    textAlign: 'center',
    lineHeight: 20,
  },
  bookButton: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bookButtonText: {
    color: '#fff',
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
  },
});
