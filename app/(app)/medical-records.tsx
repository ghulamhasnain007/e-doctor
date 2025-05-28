import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, FileText, Calendar, Download, User, Plus, Search, MoreVertical, Filter } from 'lucide-react-native';
import { useTheme } from '@/context/ThemeContext';
import { useAuth } from '@/context/AuthContext';
import { router } from 'expo-router';

// Define the MedicalRecord interface before using it
interface MedicalRecord {
    id: string;
    title: string;
    date: string;
    doctor: string;
    doctorSpecialty: string;
    doctorImage: string;
    type: 'lab' | 'imaging' | 'report' | 'prescription';
    fileSize: string;
    description: string;
}

// Mock data for medical records
const medicalRecordsMock: MedicalRecord[] = [
  {
    id: '1',
    title: 'Complete Blood Count (CBC)',
    date: '15 May 2023',
    doctor: 'Dr. Sarah Johnson',
    doctorSpecialty: 'Cardiologist',
    doctorImage: 'https://images.pexels.com/photos/5452268/pexels-photo-5452268.jpeg?auto=compress&cs=tinysrgb&w=600',
    type: 'lab',
    fileSize: '2.4 MB',
    description: 'Complete blood count to check overall health and detect disorders like anemia, infection, and leukemia.',
  },
  {
    id: '2',
    title: 'Chest X-Ray Report',
    date: '10 May 2023',
    doctor: 'Dr. Michael Chen',
    doctorSpecialty: 'Pulmonologist',
    doctorImage: 'https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=600',
    type: 'imaging',
    fileSize: '5.7 MB',
    description: 'Chest X-ray to examine the lungs, heart, and chest wall for abnormalities.',
  },
  {
    id: '3',
    title: 'Lipid Panel Results',
    date: '28 April 2023',
    doctor: 'Dr. Sarah Johnson',
    doctorSpecialty: 'Cardiologist',
    doctorImage: 'https://images.pexels.com/photos/5452268/pexels-photo-5452268.jpeg?auto=compress&cs=tinysrgb&w=600',
    type: 'lab',
    fileSize: '1.8 MB',
    description: 'Lipid panel to measure cholesterol levels and assess risk for cardiovascular disease.',
  },
  {
    id: '4',
    title: 'Annual Physical Examination',
    date: '15 April 2023',
    doctor: 'Dr. Emily Rodriguez',
    doctorSpecialty: 'Family Medicine',
    doctorImage: 'https://images.pexels.com/photos/5998465/pexels-photo-5998465.jpeg?auto=compress&cs=tinysrgb&w=600',
    type: 'report',
    fileSize: '3.2 MB',
    description: 'Comprehensive annual physical examination report including vitals, assessment, and recommendations.',
  },
  {
    id: '5',
    title: 'Prescription - Lisinopril',
    date: '15 April 2023',
    doctor: 'Dr. Sarah Johnson',
    doctorSpecialty: 'Cardiologist',
    doctorImage: 'https://images.pexels.com/photos/5452268/pexels-photo-5452268.jpeg?auto=compress&cs=tinysrgb&w=600',
    type: 'prescription',
    fileSize: '0.8 MB',
    description: 'Prescription for Lisinopril 10mg, once daily for blood pressure management.',
  },
];

// Mock data for prescriptions
const prescriptionsMock = [
  {
    id: '1',
    medication: 'Lisinopril 10mg',
    instructions: 'Take 1 tablet by mouth once daily',
    date: '15 April 2023',
    doctor: 'Dr. Sarah Johnson',
    doctorSpecialty: 'Cardiologist',
    doctorImage: 'https://images.pexels.com/photos/5452268/pexels-photo-5452268.jpeg?auto=compress&cs=tinysrgb&w=600',
    refills: 3,
    active: true,
  },
  {
    id: '2',
    medication: 'Atorvastatin 20mg',
    instructions: 'Take 1 tablet by mouth at bedtime',
    date: '15 April 2023',
    doctor: 'Dr. Sarah Johnson',
    doctorSpecialty: 'Cardiologist',
    doctorImage: 'https://images.pexels.com/photos/5452268/pexels-photo-5452268.jpeg?auto=compress&cs=tinysrgb&w=600',
    refills: 5,
    active: true,
  },
  {
    id: '3',
    medication: 'Amoxicillin 500mg',
    instructions: 'Take 1 capsule by mouth three times daily for 10 days',
    date: '2 March 2023',
    doctor: 'Dr. Emily Rodriguez',
    doctorSpecialty: 'Family Medicine',
    doctorImage: 'https://images.pexels.com/photos/5998465/pexels-photo-5998465.jpeg?auto=compress&cs=tinysrgb&w=600',
    refills: 0,
    active: false,
  },
];

export default function MedicalRecordsScreen() {
  const { colors } = useTheme();
  const { userType } = useAuth();
  
  const [activeTab, setActiveTab] = useState('records'); // records, prescriptions
  const [filter, setFilter] = useState('all'); // all, lab, imaging, report, prescription
  
  const filteredRecords = filter === 'all' 
    ? medicalRecordsMock 
    : medicalRecordsMock.filter(record => record.type === filter);
    
  const activePrescriptions = prescriptionsMock.filter(p => p.active);
  const pastPrescriptions = prescriptionsMock.filter(p => !p.active);

  const goBack = () => {
    router.back();
  };
  
interface MedicalRecord {
    id: string;
    title: string;
    date: string;
    doctor: string;
    doctorSpecialty: string;
    doctorImage: string;
    type: 'lab' | 'imaging' | 'report' | 'prescription';
    fileSize: string;
    description: string;
}

interface Prescription {
    id: string;
    medication: string;
    instructions: string;
    date: string;
    doctor: string;
    doctorSpecialty: string;
    doctorImage: string;
    refills: number;
    active: boolean;
}

const handleRecordPress = (record: MedicalRecord) => {
    // View record details
    alert('Viewing details for: ' + record.title);
};
  
  const renderRecordItem = ({ item }: { item: MedicalRecord }) => {
    return (
      <TouchableOpacity 
        style={[styles.recordCard, { backgroundColor: colors.cardBg }]}
        onPress={() => handleRecordPress(item)}
        activeOpacity={0.7}
      >
        <View style={styles.recordHeader}>
          <View style={[
            styles.recordTypeBadge, 
            { 
              backgroundColor: item.type === 'lab' ? colors.primary + '20' :
                item.type === 'imaging' ? colors.secondary + '20' :
                item.type === 'report' ? colors.warning + '20' :
                colors.success + '20'
            }
          ]}>
            <Text style={[
              styles.recordTypeText, 
              { 
                color: item.type === 'lab' ? colors.primary :
                  item.type === 'imaging' ? colors.secondary :
                  item.type === 'report' ? colors.warning :
                  colors.success
              }
            ]}>
              {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
            </Text>
          </View>
          
          <Text style={[styles.recordDate, { color: colors.textSecondary }]}>
            {item.date}
          </Text>
        </View>
        
        <Text style={[styles.recordTitle, { color: colors.text }]}>
          {item.title}
        </Text>
        
        <Text style={[styles.recordDescription, { color: colors.textSecondary }]}>
          {item.description}
        </Text>
        
        <View style={styles.recordFooter}>
          <View style={styles.doctorInfo}>
            <Image source={{ uri: item.doctorImage }} style={styles.doctorAvatar} />
            <View>
              <Text style={[styles.doctorName, { color: colors.text }]}>{item.doctor}</Text>
              <Text style={[styles.doctorSpecialty, { color: colors.textSecondary }]}>{item.doctorSpecialty}</Text>
            </View>
          </View>
          
          <View style={styles.recordActions}>
            <Text style={[styles.fileSize, { color: colors.textSecondary }]}>
              {item.fileSize}
            </Text>
            <TouchableOpacity style={styles.downloadButton}>
              <Download size={20} color={colors.primary} />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  
  const renderPrescriptionItem = ({
    item,
    isActive,
  }: { item: Prescription; isActive: boolean }) => {
    return (
      <View style={[styles.prescriptionCard, { backgroundColor: colors.cardBg }]}>
        <View style={styles.prescriptionHeader}>
          <Text style={[styles.medicationName, { color: colors.text }]}>
            {item.medication}
          </Text>
          
          {isActive && (
            <View style={[styles.activeTag, { backgroundColor: colors.success + '20' }]}>
              <Text style={[styles.activeTagText, { color: colors.success }]}>Active</Text>
            </View>
          )}
        </View>
        
        <Text style={[styles.prescriptionInstructions, { color: colors.textSecondary }]}>
          {item.instructions}
        </Text>
        
        <View style={styles.prescriptionMeta}>
          <View style={styles.prescriptionMetaItem}>
            <Calendar size={16} color={colors.primary} />
            <Text style={[styles.prescriptionMetaText, { color: colors.text }]}>
              {item.date}
            </Text>
          </View>
          
          {isActive && (
            <View style={styles.prescriptionMetaItem}>
              <FileText size={16} color={colors.primary} />
              <Text style={[styles.prescriptionMetaText, { color: colors.text }]}>
                {item.refills} refills left
              </Text>
            </View>
          )}
        </View>
        
        <View style={styles.prescriptionDoctor}>
          <Image source={{ uri: item.doctorImage }} style={styles.doctorAvatarSmall} />
          <Text style={[styles.prescriptionDoctorName, { color: colors.text }]}>
            Prescribed by {item.doctor}
          </Text>
        </View>
        
        {isActive && (
          <View style={styles.prescriptionActions}>
            <TouchableOpacity 
              style={[styles.refillButton, { backgroundColor: colors.primary }]}
            >
              <Text style={styles.refillButtonText}>Request Refill</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.moreButton}>
              <MoreVertical size={20} color={colors.textSecondary} />
            </TouchableOpacity>
          </View>
        )}
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
          {userType === 'doctor' ? 'Prescriptions & Records' : 'Medical Records'}
        </Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.tabContainer}>
        <TouchableOpacity 
          style={[
            styles.tabButton, 
            activeTab === 'records' && [styles.activeTab, { borderColor: colors.primary }]
          ]}
          onPress={() => setActiveTab('records')}
        >
          <Text style={[
            styles.tabText, 
            { color: activeTab === 'records' ? colors.primary : colors.textSecondary }
          ]}>
            Records
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[
            styles.tabButton, 
            activeTab === 'prescriptions' && [styles.activeTab, { borderColor: colors.primary }]
          ]}
          onPress={() => setActiveTab('prescriptions')}
        >
          <Text style={[
            styles.tabText, 
            { color: activeTab === 'prescriptions' ? colors.primary : colors.textSecondary }
          ]}>
            Prescriptions
          </Text>
        </TouchableOpacity>
      </View>

      {activeTab === 'records' && (
        <>
          <View style={styles.filterSection}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterScroll}>
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
                  All Records
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[
                  styles.filterButton, 
                  filter === 'lab' && { backgroundColor: colors.primary + '20' }
                ]}
                onPress={() => setFilter('lab')}
              >
                <Text style={[
                  styles.filterText, 
                  { color: filter === 'lab' ? colors.primary : colors.textSecondary }
                ]}>
                  Lab Results
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[
                  styles.filterButton, 
                  filter === 'imaging' && { backgroundColor: colors.primary + '20' }
                ]}
                onPress={() => setFilter('imaging')}
              >
                <Text style={[
                  styles.filterText, 
                  { color: filter === 'imaging' ? colors.primary : colors.textSecondary }
                ]}>
                  Imaging
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[
                  styles.filterButton, 
                  filter === 'report' && { backgroundColor: colors.primary + '20' }
                ]}
                onPress={() => setFilter('report')}
              >
                <Text style={[
                  styles.filterText, 
                  { color: filter === 'report' ? colors.primary : colors.textSecondary }
                ]}>
                  Reports
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[
                  styles.filterButton, 
                  filter === 'prescription' && { backgroundColor: colors.primary + '20' }
                ]}
                onPress={() => setFilter('prescription')}
              >
                <Text style={[
                  styles.filterText, 
                  { color: filter === 'prescription' ? colors.primary : colors.textSecondary }
                ]}>
                  Prescriptions
                </Text>
              </TouchableOpacity>
            </ScrollView>
            
            <TouchableOpacity style={[styles.searchButton, { backgroundColor: colors.cardBg }]}>
              <Search size={20} color={colors.text} />
            </TouchableOpacity>
          </View>
          
          <FlatList
            data={filteredRecords}
            renderItem={renderRecordItem}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.listContainer}
            showsVerticalScrollIndicator={false}
          />
          
          {userType === 'patient' && (
            <TouchableOpacity 
              style={[styles.uploadButton, { backgroundColor: colors.primary }]}
            >
              <Plus size={24} color="white" />
              <Text style={styles.uploadButtonText}>Upload Records</Text>
            </TouchableOpacity>
          )}
        </>
      )}

      {activeTab === 'prescriptions' && (
        <ScrollView style={styles.prescriptionContainer}>
          {activePrescriptions.length > 0 && (
            <View style={styles.prescriptionSection}>
              <Text style={[styles.prescriptionSectionTitle, { color: colors.text }]}>
                Active Prescriptions
              </Text>
              
              {activePrescriptions.map(prescription => (
                <View key={prescription.id}>
                  {renderPrescriptionItem({ item: prescription, isActive: true })}
                </View>
              ))}
            </View>
          )}
          
          {pastPrescriptions.length > 0 && (
            <View style={styles.prescriptionSection}>
              <Text style={[styles.prescriptionSectionTitle, { color: colors.text }]}>
                Past Prescriptions
              </Text>
              
              {pastPrescriptions.map(prescription => (
                <View key={prescription.id}>
                  {renderPrescriptionItem({ item: prescription, isActive: false })}
                </View>
              ))}
            </View>
          )}
          
          {userType === 'doctor' && (
            <TouchableOpacity 
              style={[styles.newPrescriptionButton, { backgroundColor: colors.primary }]}
            >
              <Plus size={20} color="white" />
              <Text style={styles.newPrescriptionText}>Write New Prescription</Text>
            </TouchableOpacity>
          )}
        </ScrollView>
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
    flexDirection: 'row',
    padding: 16,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomWidth: 2,
  },
  tabText: {
    fontSize: 16,
    fontWeight: '500',
  },
  filterSection: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  filterScroll: {
    paddingRight: 50,
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
  searchButton: {
    position: 'absolute',
    right: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  listContainer: {
    padding: 16,
    paddingTop: 0,
  },
  recordCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  recordHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  recordTypeBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  recordTypeText: {
    fontSize: 12,
    fontWeight: '500',
  },
  recordDate: {
    fontSize: 14,
  },
  recordTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  recordDescription: {
    fontSize: 14,
    marginBottom: 16,
    lineHeight: 20,
  },
  recordFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  doctorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  doctorAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 8,
  },
  doctorName: {
    fontSize: 14,
    fontWeight: '500',
  },
  doctorSpecialty: {
    fontSize: 12,
  },
  recordActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  fileSize: {
    fontSize: 12,
    marginRight: 8,
  },
  downloadButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(0,0,0,0.05)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  uploadButton: {
    position: 'absolute',
    right: 20,
    bottom: 20,
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
  uploadButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  prescriptionContainer: {
    flex: 1,
    padding: 16,
  },
  prescriptionSection: {
    marginBottom: 20,
  },
  prescriptionSectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  prescriptionCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  prescriptionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  medicationName: {
    fontSize: 18,
    fontWeight: '600',
    flex: 1,
  },
  activeTag: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  activeTagText: {
    fontSize: 12,
    fontWeight: '500',
  },
  prescriptionInstructions: {
    fontSize: 15,
    marginBottom: 16,
    lineHeight: 20,
  },
  prescriptionMeta: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  prescriptionMetaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  prescriptionMetaText: {
    fontSize: 14,
    marginLeft: 6,
  },
  prescriptionDoctor: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  doctorAvatarSmall: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginRight: 8,
  },
  prescriptionDoctorName: {
    fontSize: 14,
  },
  prescriptionActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  refillButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  refillButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  moreButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  newPrescriptionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 14,
    borderRadius: 12,
    marginVertical: 16,
  },
  newPrescriptionText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});
