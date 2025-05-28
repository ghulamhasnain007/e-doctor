import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Star, ArrowLeft, Calendar, Clock, MessageCircle, Phone, Video } from 'lucide-react-native';
import { useTheme } from '@/context/ThemeContext';
import { useLocalSearchParams, router } from 'expo-router';

// This would normally come from an API based on the doctor ID
// For demo purposes we're using mock data
const doctorDetails = {
  id: '1',
  name: 'Dr. Sarah Johnson',
  specialty: 'Cardiologist',
  image: 'https://images.pexels.com/photos/5452268/pexels-photo-5452268.jpeg?auto=compress&cs=tinysrgb&w=600',
  rating: 4.9,
  reviews: 120,
  experience: '8 years',
  patients: '1200+',
  price: '$100',
  bio: 'Dr. Sarah Johnson is a board-certified cardiologist with 8 years of experience in treating various heart conditions. She specializes in preventive cardiology and heart failure management.',
  education: [
    {
      id: '1',
      degree: 'MD in Cardiology',
      university: 'Johns Hopkins University',
      year: '2012-2016'
    },
    {
      id: '2',
      degree: 'Residency in Internal Medicine',
      university: 'Mayo Clinic',
      year: '2016-2019'
    }
  ],
  availability: {
    days: 'Monday - Friday',
    hours: '9:00 AM - 5:00 PM'
  }
};

// Mock reviews
const reviews = [
  {
    id: '1',
    name: 'John Smith',
    rating: 5,
    date: '2 weeks ago',
    comment: 'Dr. Johnson was very thorough and took the time to explain everything to me. Highly recommend!'
  },
  {
    id: '2',
    name: 'Sarah Thompson',
    rating: 4,
    date: '1 month ago',
    comment: 'Great doctor, very knowledgeable and professional.'
  }
];

export default function DoctorDetailsScreen() {
  const { colors } = useTheme();
  const { id } = useLocalSearchParams();
  
  // In a real app, you would fetch the doctor details based on the ID
  // const doctor = fetchDoctorById(id);
  const doctor = doctorDetails; // Using mock data for now
  
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft color={colors.text} size={24} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Doctor Profile</Text>
        <View style={{ width: 24 }} />
      </View>
      
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.profileHeader}>
          <Image source={{ uri: doctor.image }} style={styles.doctorImage} />
          
          <View style={styles.doctorBasicInfo}>
            <Text style={[styles.doctorName, { color: colors.text }]}>{doctor.name}</Text>
            <Text style={[styles.doctorSpecialty, { color: colors.textSecondary }]}>
              {doctor.specialty}
            </Text>
            
            <View style={styles.ratingContainer}>
              <Star size={16} color="#FFD700" fill="#FFD700" />
              <Text style={[styles.ratingText, { color: colors.text }]}>
                {doctor.rating} ({doctor.reviews} reviews)
              </Text>
            </View>
          </View>
        </View>
        
        <View style={styles.statsContainer}>
          <View style={[styles.statCard, { backgroundColor: colors.cardBg }]}>
            <Text style={[styles.statValue, { color: colors.primary }]}>{doctor.experience}</Text>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Experience</Text>
          </View>
          
          <View style={[styles.statCard, { backgroundColor: colors.cardBg }]}>
            <Text style={[styles.statValue, { color: colors.primary }]}>{doctor.patients}</Text>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Patients</Text>
          </View>
          
          <View style={[styles.statCard, { backgroundColor: colors.cardBg }]}>
            <Text style={[styles.statValue, { color: colors.primary }]}>{doctor.price}</Text>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Per Session</Text>
          </View>
        </View>
        
        <View style={[styles.sectionCard, { backgroundColor: colors.cardBg }]}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>About Doctor</Text>
          <Text style={[styles.bioText, { color: colors.textSecondary }]}>{doctor.bio}</Text>
        </View>
        
        <View style={[styles.sectionCard, { backgroundColor: colors.cardBg }]}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Education</Text>
          {doctor.education.map(edu => (
            <View key={edu.id} style={styles.educationItem}>
              <View style={styles.degreeMarker} />
              <View style={styles.educationInfo}>
                <Text style={[styles.degreeName, { color: colors.text }]}>{edu.degree}</Text>
                <Text style={[styles.universityName, { color: colors.textSecondary }]}>
                  {edu.university}
                </Text>
                <Text style={[styles.yearText, { color: colors.textSecondary }]}>{edu.year}</Text>
              </View>
            </View>
          ))}
        </View>
        
        <View style={[styles.sectionCard, { backgroundColor: colors.cardBg }]}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Availability</Text>
          <View style={styles.availabilityInfo}>
            <View style={styles.availabilityItem}>
              <Calendar size={16} color={colors.primary} />
              <Text style={[styles.availabilityText, { color: colors.textSecondary }]}>
                {doctor.availability.days}
              </Text>
            </View>
            <View style={styles.availabilityItem}>
              <Clock size={16} color={colors.primary} />
              <Text style={[styles.availabilityText, { color: colors.textSecondary }]}>
                {doctor.availability.hours}
              </Text>
            </View>
          </View>
        </View>
        
        <View style={[styles.sectionCard, { backgroundColor: colors.cardBg }]}>
          <View style={styles.reviewsHeader}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Patient Reviews</Text>
            <TouchableOpacity>
              <Text style={[styles.viewAllText, { color: colors.primary }]}>View All</Text>
            </TouchableOpacity>
          </View>
          
          {reviews.map(review => (
            <View key={review.id} style={styles.reviewItem}>
              <View style={styles.reviewHeader}>
                <Text style={[styles.reviewerName, { color: colors.text }]}>{review.name}</Text>
                <View style={styles.reviewRating}>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star 
                      key={i}
                      size={14}
                      color={i < review.rating ? "#FFD700" : colors.border}
                      fill={i < review.rating ? "#FFD700" : "none"}
                    />
                  ))}
                </View>
              </View>
              <Text style={[styles.reviewDate, { color: colors.textSecondary }]}>{review.date}</Text>
              <Text style={[styles.reviewComment, { color: colors.textSecondary }]}>
                {review.comment}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
      
      <View style={[styles.footer, { backgroundColor: colors.background }]}>
        <View style={styles.contactOptions}>
          <TouchableOpacity style={[styles.contactButton, { backgroundColor: colors.primary + '20' }]}>
            <MessageCircle size={24} color={colors.primary} />
          </TouchableOpacity>
          
          <TouchableOpacity style={[styles.contactButton, { backgroundColor: colors.primary + '20' }]}>
            <Phone size={24} color={colors.primary} />
          </TouchableOpacity>
          
          <TouchableOpacity style={[styles.contactButton, { backgroundColor: colors.primary + '20' }]}>
            <Video size={24} color={colors.primary} />
          </TouchableOpacity>
        </View>
        
        <TouchableOpacity
          style={[styles.bookButton, { backgroundColor: colors.primary }]}
          onPress={() => router.push('/book-appointment')}
        >
          <Text style={styles.bookButtonText}>Book Appointment</Text>
        </TouchableOpacity>
      </View>
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
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  doctorImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginRight: 16,
  },
  doctorBasicInfo: {
    flex: 1,
  },
  doctorName: {
    fontSize: 22,
    fontFamily: 'Inter-Bold',
    marginBottom: 4,
  },
  doctorSpecialty: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    marginLeft: 6,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  statCard: {
    width: '31%',
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
  },
  sectionCard: {
    padding: 16,
    borderRadius: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    marginBottom: 12,
  },
  bioText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    lineHeight: 22,
  },
  educationItem: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  degreeMarker: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#4CAF50',
    marginTop: 4,
    marginRight: 12,
  },
  educationInfo: {
    flex: 1,
  },
  degreeName: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    marginBottom: 4,
  },
  universityName: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    marginBottom: 2,
  },
  yearText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
  },
  availabilityInfo: {
    gap: 12,
  },
  availabilityItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  availabilityText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    marginLeft: 8,
  },
  reviewsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  viewAllText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
  },
  reviewItem: {
    marginBottom: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0, 0, 0, 0.05)',
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  reviewerName: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
  },
  reviewRating: {
    flexDirection: 'row',
  },
  reviewDate: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    marginBottom: 8,
  },
  reviewComment: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    lineHeight: 20,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0, 0, 0, 0.05)',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  contactOptions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  contactButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bookButton: {
    flex: 1,
    marginLeft: 16,
    paddingVertical: 14,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bookButtonText: {
    color: '#fff',
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
  },
});
