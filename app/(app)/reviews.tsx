import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Star, MessageCircle, ThumbsUp, ThumbsDown, Filter, Clock } from 'lucide-react-native';
import { useTheme } from '@/context/ThemeContext';
import { useAuth } from '@/context/AuthContext';
import { router } from 'expo-router';

// Mock data for doctor's reviews
const reviewsMock = [
  {
    id: '1',
    patientName: 'John Smith',
    patientImage: 'https://images.pexels.com/photos/6551937/pexels-photo-6551937.jpeg?auto=compress&cs=tinysrgb&w=600',
    rating: 5,
    comment: 'Dr. Johnson is an excellent cardiologist. She took the time to explain everything clearly and answered all my questions. Her diagnosis was spot on and the treatment has significantly improved my condition. Highly recommend!',
    date: '10 June 2023',
    doctorResponse: "Thank you for your kind words, John! I'm glad to hear that you're feeling better. Don't hesitate to reach out if you have any further questions.",
    isRecommended: true,
  },
  {
    id: '2',
    patientName: 'Emma Williams',
    patientImage: 'https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=600',
    rating: 4,
    comment: "Very professional and knowledgeable. The only reason I'm not giving 5 stars is because the wait time was a bit long. Otherwise, the consultation was thorough and helpful.",
    date: '5 June 2023',
    doctorResponse: '',
    isRecommended: true,
  },
  {
    id: '3',
    patientName: 'Robert Davis',
    patientImage: 'https://images.pexels.com/photos/8460257/pexels-photo-8460257.jpeg?auto=compress&cs=tinysrgb&w=600',
    rating: 5,
    comment: "Dr. Johnson has been my cardiologist for over 2 years now. She's always attentive, caring, and up-to-date with the latest treatments. I feel very comfortable under her care.",
    date: '28 May 2023',
    doctorResponse: "I appreciate your continued trust, Robert. It's been a pleasure being your cardiologist.",
    isRecommended: true,
  },
  {
    id: '4',
    patientName: 'Sarah Martinez',
    patientImage: 'https://images.pexels.com/photos/7959658/pexels-photo-7959658.jpeg?auto=compress&cs=tinysrgb&w=600',
    rating: 3,
    comment: 'The doctor is very knowledgeable, but her office can be difficult to reach for appointment changes and the staff seemed overwhelmed. The actual medical care was good though.',
    date: '15 May 2023',
    doctorResponse: "Thank you for your feedback, Sarah. I apologize for the difficulties you experienced with scheduling. We're working on improving our office processes to provide better service.",
    isRecommended: true,
  },
  {
    id: '5',
    patientName: 'Michael Brown',
    patientImage: 'https://images.pexels.com/photos/8460370/pexels-photo-8460370.jpeg?auto=compress&cs=tinysrgb&w=600',
    rating: 5,
    comment: 'Excellent care! Dr. Johnson is thorough, patient, and genuinely cares about her patients. The virtual consultation was convenient and just as effective as an in-person visit.',
    date: '10 May 2023',
    doctorResponse: '',
    isRecommended: true,
  },
];

// Mock data for patient's reviews of doctors
const patientReviewsMock = [
  {
    id: '1',
    doctorName: 'Dr. Sarah Johnson',
    doctorSpecialty: 'Cardiologist',
    doctorImage: 'https://images.pexels.com/photos/5452268/pexels-photo-5452268.jpeg?auto=compress&cs=tinysrgb&w=600',
    rating: 5,
    comment: 'Dr. Johnson is an excellent cardiologist. She took the time to explain everything clearly and answered all my questions. Her diagnosis was spot on and the treatment has significantly improved my condition. Highly recommend!',
    date: '10 June 2023',
    doctorResponse: "Thank you for your kind words, John! I'm glad to hear that you're feeling better. Don't hesitate to reach out if you have any further questions.",
    isRecommended: true,
  },
  {
    id: '2',
    doctorName: 'Dr. Michael Chen',
    doctorSpecialty: 'Dermatologist',
    doctorImage: 'https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=600',
    rating: 4,
    comment: 'Dr. Chen was very thorough in examining my skin condition. He prescribed a treatment that worked well but took a bit longer than expected. The follow-up care was excellent.',
    date: '25 May 2023',
    doctorResponse: '',
    isRecommended: true,
  },
  {
    id: '3',
    doctorName: 'Dr. Emily Rodriguez',
    doctorSpecialty: 'Pediatrician',
    doctorImage: 'https://images.pexels.com/photos/5998465/pexels-photo-5998465.jpeg?auto=compress&cs=tinysrgb&w=600',
    rating: 5,
    comment: "Dr. Rodriguez is amazing with children! My son usually hates doctor visits, but she made him feel so comfortable. She's knowledgeable, patient, and great at explaining things to both kids and parents.",
    date: '18 April 2023',
    doctorResponse: "Thank you for your kind review! It's always a pleasure to see your son, and I'm happy to hear he feels comfortable during his visits.",
    isRecommended: true,
  },
];

export default function ReviewsScreen() {
  const { colors } = useTheme();
  const { userType } = useAuth();
  
  const [filter, setFilter] = useState('all'); // all, positive (4-5), neutral (3), negative (1-2)
  
  const reviews = userType === 'doctor' ? reviewsMock : patientReviewsMock;
  
  const filteredReviews = (() => {
    if (filter === 'all') return reviews;
    if (filter === 'positive') return reviews.filter(r => r.rating >= 4);
    if (filter === 'neutral') return reviews.filter(r => r.rating === 3);
    if (filter === 'negative') return reviews.filter(r => r.rating <= 2);
    return reviews;
  })();
  
  // Calculate average rating
  const averageRating = reviews.reduce((acc, curr) => acc + curr.rating, 0) / reviews.length;
  
  // Calculate rating distribution
  const ratingDistribution = {
    5: reviews.filter(r => r.rating === 5).length,
    4: reviews.filter(r => r.rating === 4).length,
    3: reviews.filter(r => r.rating === 3).length,
    2: reviews.filter(r => r.rating === 2).length,
    1: reviews.filter(r => r.rating === 1).length,
  };

  const goBack = () => {
    router.back();
  };
  
interface DoctorReview {
    id: string;
    patientName: string;
    patientImage: string;
    rating: number;
    comment: string;
    date: string;
    doctorResponse: string;
    isRecommended: boolean;
}

interface PatientReview {
    id: string;
    doctorName: string;
    doctorSpecialty: string;
    doctorImage: string;
    rating: number;
    comment: string;
    date: string;
    doctorResponse: string;
    isRecommended: boolean;
}

const handleResponse = (reviewId: string) => {
    // In a real app, this would open a response form
    alert('Responding to review #' + reviewId);
};
  
  const handleWriteReview = () => {
    // In a real app, this would navigate to a review form
    alert('Navigate to write a review form');
  };
  
interface RenderStarsProps {
    rating: number;
}

const renderStars = (rating: RenderStarsProps['rating']): JSX.Element => {
    return (
        <View style={styles.starsContainer}>
            {[1, 2, 3, 4, 5].map((star: number) => (
                <Star 
                    key={star} 
                    size={16} 
                    fill={star <= rating ? colors.warning : 'transparent'}
                    color={star <= rating ? colors.warning : colors.textSecondary}
                />
            ))}
        </View>
    );
};
  
  const renderDoctorReviewItem = ({ item }: { item: DoctorReview }) => {
    return (
      <View style={[styles.reviewCard, { backgroundColor: colors.cardBg }]}>
        <View style={styles.reviewHeader}>
          <View style={styles.reviewerInfo}>
            <Image source={{ uri: item.patientImage }} style={styles.reviewerAvatar} />
            <View>
              <Text style={[styles.reviewerName, { color: colors.text }]}>
                {item.patientName}
              </Text>
              <View style={styles.ratingDateContainer}>
                {renderStars(item.rating)}
                <Text style={[styles.reviewDate, { color: colors.textSecondary }]}>
                  {item.date}
                </Text>
              </View>
            </View>
          </View>
          
          <View style={[
            styles.recommendationBadge, 
            { 
              backgroundColor: item.isRecommended ? colors.success + '20' : colors.error + '20',
            }
          ]}>
            {item.isRecommended ? (
              <ThumbsUp size={14} color={colors.success} />
            ) : (
              <ThumbsDown size={14} color={colors.error} />
            )}
            <Text style={[
              styles.recommendationText, 
              { 
                color: item.isRecommended ? colors.success : colors.error,
              }
            ]}>
              {item.isRecommended ? 'Recommends' : 'Doesn\'t Recommend'}
            </Text>
          </View>
        </View>
        
        <Text style={[styles.reviewComment, { color: colors.text }]}>
          {item.comment}
        </Text>
        
        {item.doctorResponse ? (
          <View style={[styles.responseContainer, { backgroundColor: colors.background }]}>
            <Text style={[styles.responseLabel, { color: colors.primary }]}>
              Your Response:
            </Text>
            <Text style={[styles.responseText, { color: colors.text }]}>
              {item.doctorResponse}
            </Text>
          </View>
        ) : (
          <TouchableOpacity 
            style={[styles.respondButton, { borderColor: colors.primary }]}
            onPress={() => handleResponse(item.id)}
          >
            <MessageCircle size={16} color={colors.primary} />
            <Text style={[styles.respondButtonText, { color: colors.primary }]}>
              Respond to Review
            </Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };
  
  const renderPatientReviewItem = ({ item }: { item: PatientReview }) => {
    return (
      <View style={[styles.reviewCard, { backgroundColor: colors.cardBg }]}>
        <View style={styles.reviewHeader}>
          <View style={styles.reviewerInfo}>
            <Image source={{ uri: item.doctorImage }} style={styles.reviewerAvatar} />
            <View>
              <Text style={[styles.reviewerName, { color: colors.text }]}>
                {item.doctorName}
              </Text>
              <Text style={[styles.doctorSpecialty, { color: colors.textSecondary }]}>
                {item.doctorSpecialty}
              </Text>
              <View style={styles.ratingDateContainer}>
                {renderStars(item.rating)}
                <Text style={[styles.reviewDate, { color: colors.textSecondary }]}>
                  {item.date}
                </Text>
              </View>
            </View>
          </View>
          
          <View style={[
            styles.recommendationBadge, 
            { 
              backgroundColor: item.isRecommended ? colors.success + '20' : colors.error + '20',
            }
          ]}>
            {item.isRecommended ? (
              <ThumbsUp size={14} color={colors.success} />
            ) : (
              <ThumbsDown size={14} color={colors.error} />
            )}
            <Text style={[
              styles.recommendationText, 
              { 
                color: item.isRecommended ? colors.success : colors.error,
              }
            ]}>
              {item.isRecommended ? 'You Recommend' : 'You Don\'t Recommend'}
            </Text>
          </View>
        </View>
        
        <Text style={[styles.reviewComment, { color: colors.text }]}>
          {item.comment}
        </Text>
        
        {item.doctorResponse && (
          <View style={[styles.responseContainer, { backgroundColor: colors.background }]}>
            <Text style={[styles.responseLabel, { color: colors.primary }]}>
              Doctor's Response:
            </Text>
            <Text style={[styles.responseText, { color: colors.text }]}>
              {item.doctorResponse}
            </Text>
          </View>
        )}
        
        <View style={styles.reviewActions}>
          <TouchableOpacity 
            style={[styles.editReviewButton, { borderColor: colors.primary }]}
          >
            <Text style={[styles.editReviewText, { color: colors.primary }]}>
              Edit Review
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.deleteReviewButton}>
            <Text style={[styles.deleteReviewText, { color: colors.error }]}>
              Delete
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <View style={[styles.header, { backgroundColor: colors.cardBg }]}>
        <TouchableOpacity onPress={goBack} style={styles.backButton}>
          <ArrowLeft size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]}>
          {userType === 'doctor' ? 'Reviews & Ratings' : 'My Reviews'}
        </Text>
        <View style={{ width: 24 }} />
      </View>

      {userType === 'doctor' && (
        <View style={[styles.ratingSummary, { backgroundColor: colors.cardBg }]}>
          <View style={styles.ratingOverview}>
            <View style={styles.averageRatingContainer}>
              <Text style={[styles.averageRating, { color: colors.text }]}>
                {averageRating.toFixed(1)}
              </Text>
              <View style={styles.averageStars}>
                {renderStars(Math.round(averageRating))}
                <Text style={[styles.totalReviews, { color: colors.textSecondary }]}>
                  ({reviews.length} reviews)
                </Text>
              </View>
            </View>
            
            <View style={styles.ratingBreakdown}>
              {[5, 4, 3, 2, 1].map((rating) => {
                const key = rating as 1 | 2 | 3 | 4 | 5;
                return (
                  <View key={key} style={styles.ratingBar}>
                    <Text style={[styles.ratingNumber, { color: colors.textSecondary }]}>
                      {key}
                    </Text>
                    <View style={styles.barContainer}>
                      <View 
                        style={[
                          styles.barFill, 
                          { 
                            backgroundColor: colors.primary,
                            width: `${(ratingDistribution[key] / reviews.length) * 100}%` 
                          }
                        ]}
                      />
                    </View>
                    <Text style={[styles.ratingCount, { color: colors.textSecondary }]}>
                      {ratingDistribution[key]}
                    </Text>
                  </View>
                );
              })}
            </View>
          </View>
        </View>
      )}

      <View style={styles.filterSection}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <TouchableOpacity 
            style={[
              styles.filterButton, 
              filter === 'all' && { backgroundColor: colors.primary + '20' }
            ]}
            onPress={() => setFilter('all')}
          >
            <Text style={[
              styles.filterText, 
              { color: filter === 'all' ? colors.primary : colors.textSecondary }
            ]}>
              All Reviews
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[
              styles.filterButton, 
              filter === 'positive' && { backgroundColor: colors.primary + '20' }
            ]}
            onPress={() => setFilter('positive')}
          >
            <Text style={[
              styles.filterText, 
              { color: filter === 'positive' ? colors.primary : colors.textSecondary }
            ]}>
              Positive (4-5)
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[
              styles.filterButton, 
              filter === 'neutral' && { backgroundColor: colors.primary + '20' }
            ]}
            onPress={() => setFilter('neutral')}
          >
            <Text style={[
              styles.filterText, 
              { color: filter === 'neutral' ? colors.primary : colors.textSecondary }
            ]}>
              Neutral (3)
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[
              styles.filterButton, 
              filter === 'negative' && { backgroundColor: colors.primary + '20' }
            ]}
            onPress={() => setFilter('negative')}
          >
            <Text style={[
              styles.filterText, 
              { color: filter === 'negative' ? colors.primary : colors.textSecondary }
            ]}>
              Negative (1-2)
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      {userType === 'doctor' ? (
        <FlatList
          data={filteredReviews as DoctorReview[]}
          renderItem={renderDoctorReviewItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <MessageCircle size={60} color={colors.textSecondary} style={styles.emptyIcon} />
              <Text style={[styles.emptyText, { color: colors.text }]}>
                No reviews found
              </Text>
              <Text style={[styles.emptySubtext, { color: colors.textSecondary }]}>
                {filter !== 'all' ? 'Try changing your filter' : 'Reviews will appear here'}
              </Text>
            </View>
          }
        />
      ) : (
        <FlatList
          data={filteredReviews as PatientReview[]}
          renderItem={renderPatientReviewItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <MessageCircle size={60} color={colors.textSecondary} style={styles.emptyIcon} />
              <Text style={[styles.emptyText, { color: colors.text }]}>
                No reviews found
              </Text>
              <Text style={[styles.emptySubtext, { color: colors.textSecondary }]}>
                {filter !== 'all' ? 'Try changing your filter' : 'Reviews will appear here'}
              </Text>
            </View>
          }
        />
      )}
      
      {userType === 'patient' && (
        <TouchableOpacity 
          style={[styles.writeReviewButton, { backgroundColor: colors.primary }]}
          onPress={handleWriteReview}
        >
          <Star size={20} color="white" />
          <Text style={styles.writeReviewText}>
            Write a Review
          </Text>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
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
  ratingSummary: {
    margin: 16,
    borderRadius: 12,
    padding: 16,
  },
  ratingOverview: {
    flexDirection: 'row',
  },
  averageRatingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight: 16,
    borderRightWidth: 1,
    borderRightColor: 'rgba(0,0,0,0.1)',
    marginRight: 16,
  },
  averageRating: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  averageStars: {
    alignItems: 'center',
  },
  totalReviews: {
    fontSize: 12,
    marginTop: 4,
  },
  ratingBreakdown: {
    flex: 1,
    justifyContent: 'center',
  },
  ratingBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  ratingNumber: {
    fontSize: 12,
    width: 15,
    textAlign: 'center',
  },
  barContainer: {
    flex: 1,
    height: 8,
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 4,
    marginHorizontal: 8,
  },
  barFill: {
    height: 8,
    borderRadius: 4,
  },
  ratingCount: {
    fontSize: 12,
    width: 20,
    textAlign: 'right',
  },
  filterSection: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
  },
  filterText: {
    fontSize: 14,
    fontWeight: '500',
  },
  listContainer: {
    padding: 16,
    paddingTop: 0,
  },
  reviewCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  reviewerInfo: {
    flexDirection: 'row',
  },
  reviewerAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  reviewerName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  doctorSpecialty: {
    fontSize: 14,
    marginBottom: 2,
  },
  ratingDateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  starsContainer: {
    flexDirection: 'row',
    marginRight: 8,
  },
  reviewDate: {
    fontSize: 12,
  },
  recommendationBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    height: 24,
  },
  recommendationText: {
    fontSize: 12,
    fontWeight: '500',
    marginLeft: 4,
  },
  reviewComment: {
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 16,
  },
  responseContainer: {
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  responseLabel: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  responseText: {
    fontSize: 14,
    lineHeight: 20,
  },
  respondButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  respondButtonText: {
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 6,
  },
  reviewActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  editReviewButton: {
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  editReviewText: {
    fontSize: 14,
    fontWeight: '500',
  },
  deleteReviewButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  deleteReviewText: {
    fontSize: 14,
    fontWeight: '500',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  emptyIcon: {
    marginBottom: 16,
    opacity: 0.5,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    textAlign: 'center',
  },
  writeReviewButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  writeReviewText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});
