import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, SafeAreaView } from 'react-native';
import { ArrowLeft } from 'lucide-react-native';
import { useTheme } from '@/context/ThemeContext';
import { router } from 'expo-router';

// Expanded specialties list
const specialtiesList = [
  { id: 1, name: 'Cardiology', icon: '❤️', description: 'Heart and cardiovascular system' },
  { id: 2, name: 'Pediatrics', icon: '👶', description: "Children's health and development" },
  { id: 3, name: 'Dermatology', icon: '🧬', description: 'Skin, hair, and nail conditions' },
  { id: 4, name: 'Neurology', icon: '🧠', description: 'Brain and nervous system' },
  { id: 5, name: 'Orthopedics', icon: '🦴', description: 'Bones, joints, and muscles' },
  { id: 6, name: 'Gynecology', icon: '👩‍⚕️', description: "Women's reproductive health" },
  { id: 7, name: 'Ophthalmology', icon: '👁️', description: 'Eye and vision care' },
  { id: 8, name: 'Urology', icon: '🚽', description: 'Urinary tract and male reproductive system' },
  { id: 9, name: 'Gastroenterology', icon: '🍽️', description: 'Digestive system and disorders' },
  { id: 10, name: 'Endocrinology', icon: '⚖️', description: 'Hormones and metabolic diseases' },
  { id: 11, name: 'Psychiatry', icon: '🧘', description: 'Mental health and emotional well-being' },
  { id: 12, name: 'Oncology', icon: '🔬', description: 'Cancer diagnosis and treatment' },
  { id: 13, name: 'Radiology', icon: '📷', description: 'Imaging and diagnostic procedures' },
  { id: 14, name: 'Dentistry', icon: '🦷', description: 'Oral health and dental care' },
  { id: 15, name: 'Allergy & Immunology', icon: '🤧', description: 'Allergies and immune system disorders' },
  { id: 16, name: 'Physical Therapy', icon: '🏋️', description: 'Rehabilitation and mobility improvement' },
  { id: 17, name: 'Nutrition', icon: '🥗', description: 'Diet and nutritional health' },
  { id: 18, name: 'ENT', icon: '👂', description: 'Ear, nose, and throat disorders' },
];

export default function AllSpecialtiesScreen() {
  const { colors } = useTheme();
  
  const goBack = () => {
    router.back();
  };
  
  const handleSpecialtyPress = (specialtyId: number) => {
    // Navigate to a filtered doctor list by specialty
    router.push(`/doctors?specialty=${specialtyId}`);
  };
  
  const renderSpecialtyItem = ({ item }: { item: typeof specialtiesList[0] }) => (
    <TouchableOpacity 
      style={[styles.specialtyCard, { backgroundColor: colors.cardBg }]}
      onPress={() => handleSpecialtyPress(item.id)}
    >
      <View style={styles.specialtyHeader}>
        <Text style={styles.specialtyIcon}>{item.icon}</Text>
        <Text style={[styles.specialtyName, { color: colors.text }]}>{item.name}</Text>
      </View>
      <Text style={[styles.specialtyDescription, { color: colors.textSecondary }]}>
        {item.description}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={goBack} style={styles.backButton}>
          <ArrowLeft color={colors.text} size={24} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Medical Specialties</Text>
        <View style={{ width: 24 }} />
      </View>
      
      <FlatList
        data={specialtiesList}
        renderItem={renderSpecialtyItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={styles.specialtyRow}
        contentContainerStyle={styles.specialtyList}
        showsVerticalScrollIndicator={false}
      />
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
  specialtyList: {
    paddingHorizontal: 16,
    paddingBottom: 30,
  },
  specialtyRow: {
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  specialtyCard: {
    width: '48%',
    borderRadius: 16,
    padding: 16,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    height: 150,
  },
  specialtyHeader: {
    alignItems: 'center',
    marginBottom: 12,
    width: '100%',
  },
  specialtyIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  specialtyName: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    textAlign: 'center',
  },
  specialtyDescription: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    textAlign: 'center',
    lineHeight: 18,
  },
});
