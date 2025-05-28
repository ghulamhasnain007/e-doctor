import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Search, User } from 'lucide-react-native';
import { useTheme } from '@/context/ThemeContext';
import { useAuth } from '@/context/AuthContext';
import { router } from 'expo-router';

// Mock contacts data - in a real app, this would come from an API
const contactsMock = [
  {
    id: '1',
    name: 'Dr. Sarah Johnson',
    role: 'Cardiologist',
    image: 'https://images.pexels.com/photos/5452268/pexels-photo-5452268.jpeg?auto=compress&cs=tinysrgb&w=600',
    lastContactDate: new Date(new Date().getTime() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '2',
    name: 'Dr. Mark Wilson',
    role: 'Pediatrician',
    image: 'https://images.pexels.com/photos/4173239/pexels-photo-4173239.jpeg?auto=compress&cs=tinysrgb&w=600',
    lastContactDate: new Date(new Date().getTime() - 5 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '3',
    name: 'Dr. Lisa Chen',
    role: 'Dermatologist',
    image: 'https://images.pexels.com/photos/5214958/pexels-photo-5214958.jpeg?auto=compress&cs=tinysrgb&w=600',
    lastContactDate: new Date(new Date().getTime() - 10 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '4',
    name: 'Dr. James Lee',
    role: 'Orthopedic',
    image: 'https://images.pexels.com/photos/4225880/pexels-photo-4225880.jpeg?auto=compress&cs=tinysrgb&w=600',
    lastContactDate: new Date(new Date().getTime() - 15 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '5',
    name: 'Dr. Michael Rodriguez',
    role: 'Neurologist',
    image: 'https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=600',
    lastContactDate: null,
  },
  {
    id: '6',
    name: 'Dr. Emily Wilson',
    role: 'Ophthalmologist',
    image: 'https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=600',
    lastContactDate: null,
  },
  {
    id: '7',
    name: 'Dr. Robert Chen',
    role: 'Psychiatrist',
    image: 'https://images.pexels.com/photos/5407206/pexels-photo-5407206.jpeg?auto=compress&cs=tinysrgb&w=600',
    lastContactDate: null,
  },
  {
    id: '8',
    name: 'Dr. Amanda Brown',
    role: 'Allergist',
    image: 'https://images.pexels.com/photos/5407213/pexels-photo-5407213.jpeg?auto=compress&cs=tinysrgb&w=600',
    lastContactDate: null,
  },
];

// Patient mock data
const patientsMock = [
  {
    id: '1',
    name: 'John Smith',
    role: 'Patient',
    image: 'https://images.pexels.com/photos/6551937/pexels-photo-6551937.jpeg?auto=compress&cs=tinysrgb&w=600',
    lastContactDate: new Date(new Date().getTime() - 1 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '2',
    name: 'Emma Parker',
    role: 'Patient',
    image: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=600',
    lastContactDate: new Date(new Date().getTime() - 3 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '3',
    name: 'Michael Brown',
    role: 'Patient',
    image: 'https://images.pexels.com/photos/3778680/pexels-photo-3778680.jpeg?auto=compress&cs=tinysrgb&w=600',
    lastContactDate: new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '4',
    name: 'Sophia Miller',
    role: 'Patient',
    image: 'https://images.pexels.com/photos/1987301/pexels-photo-1987301.jpeg?auto=compress&cs=tinysrgb&w=600',
    lastContactDate: null,
  },
  {
    id: '5',
    name: 'James Wilson',
    role: 'Patient',
    image: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=600',
    lastContactDate: null,
  },
  {
    id: '6',
    name: 'Olivia Davis',
    role: 'Patient',
    image: 'https://images.pexels.com/photos/1382731/pexels-photo-1382731.jpeg?auto=compress&cs=tinysrgb&w=600',
    lastContactDate: null,
  },
];

export default function NewMessageScreen() {
  const { colors } = useTheme();
  const { userType } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [contacts, setContacts] = useState<any[]>([]);
  
  useEffect(() => {
    // Set contacts based on user type
    if (userType === 'patient') {
      setContacts(contactsMock);
    } else {
      setContacts(patientsMock);
    }
  }, [userType]);
  
  const filteredContacts = contacts.filter(contact => {
    if (searchQuery) {
      return (
        contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        contact.role.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    return true;
  });
  
  const recentContacts = filteredContacts.filter(contact => contact.lastContactDate !== null);
  const otherContacts = filteredContacts.filter(contact => contact.lastContactDate === null);
  
  // Sort recent contacts by most recent
  recentContacts.sort((a, b) => {
    return new Date(b.lastContactDate).getTime() - new Date(a.lastContactDate).getTime();
  });
  
  const goBack = () => {
    router.back();
  };
  
  const startConversation = (contactId: string) => {
    // In a real app, you would create a new conversation or get an existing one
    // For now, we'll just navigate to the chat screen
    router.push(`/chat?id=${contactId}`);
  };
  
  const renderContactItem = ({ item }: { item: any }) => (
    <TouchableOpacity 
      style={[styles.contactItem, { borderBottomColor: colors.border }]}
      onPress={() => startConversation(item.id)}
    >
      {item.image ? (
        <Image source={{ uri: item.image }} style={styles.contactAvatar} />
      ) : (
        <View style={[styles.contactAvatarFallback, { backgroundColor: colors.primary + '20' }]}>
          <User color={colors.primary} size={20} />
        </View>
      )}
      
      <View style={styles.contactInfo}>
        <Text style={[styles.contactName, { color: colors.text }]}>{item.name}</Text>
        <Text style={[styles.contactRole, { color: colors.textSecondary }]}>{item.role}</Text>
      </View>
    </TouchableOpacity>
  );
  
  const renderSectionHeader = (title: string) => (
    <Text style={[styles.sectionHeader, { color: colors.textSecondary }]}>{title}</Text>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={goBack} style={styles.backButton}>
          <ArrowLeft color={colors.text} size={24} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]}>New Message</Text>
        <View style={{ width: 24 }} />
      </View>
      
      <View style={[styles.searchContainer, { backgroundColor: colors.cardBg }]}>
        <Search color={colors.textSecondary} size={20} />
        <TextInput
          style={[styles.searchInput, { color: colors.text }]}
          placeholder={`Search ${userType === 'patient' ? 'doctors' : 'patients'}`}
          placeholderTextColor={colors.textSecondary}
          value={searchQuery}
          onChangeText={setSearchQuery}
          autoFocus
        />
      </View>
      
      <View style={styles.contactsContainer}>
        {recentContacts.length > 0 && (
          <>
            {renderSectionHeader('Recent')}
            <FlatList
              data={recentContacts}
              keyExtractor={item => item.id}
              renderItem={renderContactItem}
              scrollEnabled={false}
            />
          </>
        )}
        
        {otherContacts.length > 0 && (
          <>
            {renderSectionHeader(userType === 'patient' ? 'All Doctors' : 'All Patients')}
            <FlatList
              data={otherContacts}
              keyExtractor={item => item.id}
              renderItem={renderContactItem}
              scrollEnabled={false}
            />
          </>
        )}
        
        {filteredContacts.length === 0 && (
          <View style={styles.emptyContainer}>
            <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
              No {userType === 'patient' ? 'doctors' : 'patients'} found
            </Text>
          </View>
        )}
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
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: 'Inter-SemiBold',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    paddingHorizontal: 12,
    height: 50,
    borderRadius: 25,
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
  },
  contactsContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  sectionHeader: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    marginTop: 16,
    marginBottom: 8,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  contactAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  contactAvatarFallback: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contactInfo: {
    marginLeft: 16,
  },
  contactName: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    marginBottom: 4,
  },
  contactRole: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  emptyText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
  },
});
