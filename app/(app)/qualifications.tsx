import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Award, BookOpen, Calendar, Briefcase, Star, Plus, Edit, Trash } from 'lucide-react-native';
import { useTheme } from '@/context/ThemeContext';
import { useAuth } from '@/context/AuthContext';
import { router } from 'expo-router';

// Mock data for doctor's qualifications
const educationMock = [
  {
    id: '1',
    degree: 'MD in Medicine',
    institution: 'Harvard Medical School',
    location: 'Boston, MA',
    startYear: '2004',
    endYear: '2008',
    description: 'Specialized in cardiovascular medicine with honors.',
  },
  {
    id: '2',
    degree: 'Residency in Internal Medicine',
    institution: 'Massachusetts General Hospital',
    location: 'Boston, MA',
    startYear: '2008',
    endYear: '2011',
    description: 'Completed a 3-year residency program with focus on cardiology and internal medicine.',
  },
  {
    id: '3',
    degree: 'Fellowship in Cardiology',
    institution: 'Johns Hopkins Hospital',
    location: 'Baltimore, MD',
    startYear: '2011',
    endYear: '2014',
    description: 'Advanced training in cardiovascular diseases, cardiac imaging, and interventional cardiology.',
  },
];

const experienceMock = [
  {
    id: '1',
    title: 'Senior Cardiologist',
    institution: 'New York-Presbyterian Hospital',
    location: 'New York, NY',
    startYear: '2018',
    endYear: 'Present',
    description: 'Providing comprehensive cardiac care, conducting diagnostic procedures, and managing a team of junior cardiologists.',
  },
  {
    id: '2',
    title: 'Cardiologist',
    institution: 'Mount Sinai Hospital',
    location: 'New York, NY',
    startYear: '2014',
    endYear: '2018',
    description: 'Specialized in non-invasive cardiac imaging and preventive cardiology.',
  },
];

const certificationsMock = [
  {
    id: '1',
    title: 'Board Certification in Cardiovascular Disease',
    issuedBy: 'American Board of Internal Medicine',
    year: '2014',
    expiryYear: '2024',
  },
  {
    id: '2',
    title: 'Advanced Cardiac Life Support (ACLS)',
    issuedBy: 'American Heart Association',
    year: '2021',
    expiryYear: '2023',
  },
  {
    id: '3',
    title: 'Certified in Cardiac CT Angiography',
    issuedBy: 'Society of Cardiovascular Computed Tomography',
    year: '2016',
    expiryYear: '2026',
  },
];

const awardsMock = [
  {
    id: '1',
    title: 'Excellence in Cardiovascular Research',
    issuedBy: 'American Heart Association',
    year: '2017',
    description: 'Recognized for groundbreaking research in preventive cardiology.',
  },
  {
    id: '2',
    title: 'Top Cardiologist Award',
    issuedBy: 'New York Medical Society',
    year: '2020',
    description: 'Named among the top cardiologists in New York based on patient outcomes and satisfaction.',
  },
];

export default function QualificationsScreen() {
  const { colors } = useTheme();
  const { userType } = useAuth();
  
  const [activeTab, setActiveTab] = useState('education'); // education, experience, certifications, awards
  
  const goBack = () => {
    router.back();
  };
  
  const renderEducationItem = ({ item }: { item: typeof educationMock[number] }) => {
    return (
      <View style={[styles.qualificationCard, { backgroundColor: colors.cardBg }]}>
        <View style={styles.cardHeader}>
          <View style={styles.degreeContainer}>
            <Text style={[styles.degree, { color: colors.text }]}>
              {item.degree}
            </Text>
            <Text style={[styles.yearRange, { color: colors.textSecondary }]}>
              {item.startYear} - {item.endYear}
            </Text>
          </View>
          
          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.actionButton}>
              <Edit size={18} color={colors.textSecondary} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Trash size={18} color={colors.error} />
            </TouchableOpacity>
          </View>
        </View>
        
        <View style={styles.institutionContainer}>
          <BookOpen size={16} color={colors.primary} style={styles.icon} />
          <Text style={[styles.institution, { color: colors.text }]}>
            {item.institution}
          </Text>
        </View>
        
        <View style={styles.locationContainer}>
          <ArrowLeft size={16} color={colors.textSecondary} style={[styles.icon, { transform: [{ rotate: '45deg' }] }]} />
          <Text style={[styles.location, { color: colors.textSecondary }]}>
            {item.location}
          </Text>
        </View>
        
        {item.description && (
          <Text style={[styles.description, { color: colors.text }]}>
            {item.description}
          </Text>
        )}
      </View>
    );
  };
  
  const renderExperienceItem = ({ item }: { item: typeof experienceMock[number] }) => {
    return (
      <View style={[styles.qualificationCard, { backgroundColor: colors.cardBg }]}>
        <View style={styles.cardHeader}>
          <View style={styles.degreeContainer}>
            <Text style={[styles.degree, { color: colors.text }]}>
              {item.title}
            </Text>
            <Text style={[styles.yearRange, { color: colors.textSecondary }]}>
              {item.startYear} - {item.endYear}
            </Text>
          </View>
          
          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.actionButton}>
              <Edit size={18} color={colors.textSecondary} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Trash size={18} color={colors.error} />
            </TouchableOpacity>
          </View>
        </View>
        
        <View style={styles.institutionContainer}>
          <Briefcase size={16} color={colors.primary} style={styles.icon} />
          <Text style={[styles.institution, { color: colors.text }]}>
            {item.institution}
          </Text>
        </View>
        
        <View style={styles.locationContainer}>
          <ArrowLeft size={16} color={colors.textSecondary} style={[styles.icon, { transform: [{ rotate: '45deg' }] }]} />
          <Text style={[styles.location, { color: colors.textSecondary }]}>
            {item.location}
          </Text>
        </View>
        
        {item.description && (
          <Text style={[styles.description, { color: colors.text }]}>
            {item.description}
          </Text>
        )}
      </View>
    );
  };
  
  const renderCertificationItem = ({ item }: { item: typeof certificationsMock[number] }) => {
    return (
      <View style={[styles.qualificationCard, { backgroundColor: colors.cardBg }]}>
        <View style={styles.cardHeader}>
          <View style={styles.degreeContainer}>
            <Text style={[styles.degree, { color: colors.text }]}>
              {item.title}
            </Text>
          </View>
          
          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.actionButton}>
              <Edit size={18} color={colors.textSecondary} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Trash size={18} color={colors.error} />
            </TouchableOpacity>
          </View>
        </View>
        
        <View style={styles.institutionContainer}>
          <Award size={16} color={colors.primary} style={styles.icon} />
          <Text style={[styles.institution, { color: colors.text }]}>
            {item.issuedBy}
          </Text>
        </View>
        
        <View style={styles.yearsContainer}>
          <Calendar size={16} color={colors.secondary} style={styles.icon} />
          <Text style={[styles.validPeriod, { color: colors.secondary }]}>
            Valid: {item.year} - {item.expiryYear}
          </Text>
        </View>
      </View>
    );
  };
  
  const renderAwardItem = ({ item }: { item: typeof awardsMock[number] }) => {
    return (
      <View style={[styles.qualificationCard, { backgroundColor: colors.cardBg }]}>
        <View style={styles.cardHeader}>
          <View style={styles.degreeContainer}>
            <Text style={[styles.degree, { color: colors.text }]}>
              {item.title}
            </Text>
          </View>
          
          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.actionButton}>
              <Edit size={18} color={colors.textSecondary} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Trash size={18} color={colors.error} />
            </TouchableOpacity>
          </View>
        </View>
        
        <View style={styles.institutionContainer}>
          <Star size={16} color={colors.warning} style={styles.icon} />
          <Text style={[styles.institution, { color: colors.text }]}>
            {item.issuedBy}, {item.year}
          </Text>
        </View>
        
        {item.description && (
          <Text style={[styles.description, { color: colors.text }]}>
            {item.description}
          </Text>
        )}
      </View>
    );
  };
  
  // Make sure only doctors can access this screen
  if (userType !== 'doctor') {
    router.replace('/profile');
    return null;
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <View style={[styles.header, { backgroundColor: colors.cardBg }]}>
        <TouchableOpacity onPress={goBack} style={styles.backButton}>
          <ArrowLeft size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]}>
          Qualifications & Experience
        </Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.tabContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <TouchableOpacity 
            style={[
              styles.tabButton, 
              activeTab === 'education' && [styles.activeTab, { borderColor: colors.primary }]
            ]}
            onPress={() => setActiveTab('education')}
          >
            <BookOpen size={18} color={activeTab === 'education' ? colors.primary : colors.textSecondary} />
            <Text style={[
              styles.tabText, 
              { color: activeTab === 'education' ? colors.primary : colors.textSecondary }
            ]}>
              Education
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[
              styles.tabButton, 
              activeTab === 'experience' && [styles.activeTab, { borderColor: colors.primary }]
            ]}
            onPress={() => setActiveTab('experience')}
          >
            <Briefcase size={18} color={activeTab === 'experience' ? colors.primary : colors.textSecondary} />
            <Text style={[
              styles.tabText, 
              { color: activeTab === 'experience' ? colors.primary : colors.textSecondary }
            ]}>
              Experience
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[
              styles.tabButton, 
              activeTab === 'certifications' && [styles.activeTab, { borderColor: colors.primary }]
            ]}
            onPress={() => setActiveTab('certifications')}
          >
            <Award size={18} color={activeTab === 'certifications' ? colors.primary : colors.textSecondary} />
            <Text style={[
              styles.tabText, 
              { color: activeTab === 'certifications' ? colors.primary : colors.textSecondary }
            ]}>
              Certifications
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[
              styles.tabButton, 
              activeTab === 'awards' && [styles.activeTab, { borderColor: colors.primary }]
            ]}
            onPress={() => setActiveTab('awards')}
          >
            <Star size={18} color={activeTab === 'awards' ? colors.primary : colors.textSecondary} />
            <Text style={[
              styles.tabText, 
              { color: activeTab === 'awards' ? colors.primary : colors.textSecondary }
            ]}>
              Awards
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      {activeTab === 'education' && (
        <FlatList
          data={educationMock}
          renderItem={renderEducationItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={
            <TouchableOpacity 
              style={[styles.addButton, { borderColor: colors.primary }]}
            >
              <Plus size={20} color={colors.primary} />
              <Text style={[styles.addButtonText, { color: colors.primary }]}>
                Add Education
              </Text>
            </TouchableOpacity>
          }
        />
      )}

      {activeTab === 'experience' && (
        <FlatList
          data={experienceMock}
          renderItem={renderExperienceItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={
            <TouchableOpacity 
              style={[styles.addButton, { borderColor: colors.primary }]}
            >
              <Plus size={20} color={colors.primary} />
              <Text style={[styles.addButtonText, { color: colors.primary }]}>
                Add Experience
              </Text>
            </TouchableOpacity>
          }
        />
      )}

      {activeTab === 'certifications' && (
        <FlatList
          data={certificationsMock}
          renderItem={renderCertificationItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={
            <TouchableOpacity 
              style={[styles.addButton, { borderColor: colors.primary }]}
            >
              <Plus size={20} color={colors.primary} />
              <Text style={[styles.addButtonText, { color: colors.primary }]}>
                Add Certification
              </Text>
            </TouchableOpacity>
          }
        />
      )}

      {activeTab === 'awards' && (
        <FlatList
          data={awardsMock}
          renderItem={renderAwardItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={
            <TouchableOpacity 
              style={[styles.addButton, { borderColor: colors.primary }]}
            >
              <Plus size={20} color={colors.primary} />
              <Text style={[styles.addButtonText, { color: colors.primary }]}>
                Add Award
              </Text>
            </TouchableOpacity>
          }
        />
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
  tabContainer: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)',
  },
  tabButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
    marginHorizontal: 4,
  },
  activeTab: {
    borderBottomWidth: 2,
  },
  tabText: {
    fontSize: 15,
    fontWeight: '500',
    marginLeft: 6,
  },
  listContainer: {
    padding: 16,
  },
  qualificationCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  degreeContainer: {
    flex: 1,
  },
  degree: {
    fontSize: 17,
    fontWeight: '600',
    marginBottom: 4,
  },
  yearRange: {
    fontSize: 14,
  },
  actionButtons: {
    flexDirection: 'row',
  },
  actionButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 4,
  },
  institutionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  icon: {
    marginRight: 8,
  },
  institution: {
    fontSize: 15,
    fontWeight: '500',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  location: {
    fontSize: 14,
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
  },
  yearsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  validPeriod: {
    fontSize: 14,
    fontWeight: '500',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 12,
    padding: 14,
    marginBottom: 30,
  },
  addButtonText: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});
