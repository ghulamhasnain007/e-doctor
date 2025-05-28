import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search, Plus } from 'lucide-react-native';
import { useTheme } from '@/context/ThemeContext';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'expo-router';

// Mock conversations data
const conversationsMock = [
  {
    id: '1',
    person: {
      name: 'Dr. Sarah Johnson',
      role: 'Cardiologist',
      image: 'https://images.pexels.com/photos/5452268/pexels-photo-5452268.jpeg?auto=compress&cs=tinysrgb&w=600',
      isOnline: true,
    },
    lastMessage: {
      text: 'Your prescription is ready',
      time: '10:30 AM',
      unread: 2,
    },
  },
  {
    id: '2',
    person: {
      name: 'John Smith',
      role: 'Patient',
      image: 'https://images.pexels.com/photos/6551937/pexels-photo-6551937.jpeg?auto=compress&cs=tinysrgb&w=600',
      isOnline: false,
    },
    lastMessage: {
      text: 'Thank you, doctor!',
      time: 'Yesterday',
      unread: 0,
    },
  },
  {
    id: '3',
    person: {
      name: 'Dr. Mark Wilson',
      role: 'Pediatrician',
      image: 'https://images.pexels.com/photos/4173239/pexels-photo-4173239.jpeg?auto=compress&cs=tinysrgb&w=600',
      isOnline: true,
    },
    lastMessage: {
      text: 'How are you feeling today?',
      time: 'Yesterday',
      unread: 1,
    },
  },
  {
    id: '4',
    person: {
      name: 'Emma Parker',
      role: 'Patient',
      image: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=600',
      isOnline: false,
    },
    lastMessage: {
      text: 'I have a question about my medication',
      time: 'Jun 10',
      unread: 0,
    },
  },
  {
    id: '5',
    person: {
      name: 'Dr. Lisa Chen',
      role: 'Dermatologist',
      image: 'https://images.pexels.com/photos/5214958/pexels-photo-5214958.jpeg?auto=compress&cs=tinysrgb&w=600',
      isOnline: false,
    },
    lastMessage: {
      text: 'Please send me a photo of the affected area',
      time: 'Jun 8',
      unread: 0,
    },
  },
  {
    id: '6',
    person: {
      name: 'Michael Brown',
      role: 'Patient',
      image: 'https://images.pexels.com/photos/3778680/pexels-photo-3778680.jpeg?auto=compress&cs=tinysrgb&w=600',
      isOnline: true,
    },
    lastMessage: {
      text: 'Is it normal to have these symptoms?',
      time: 'Jun 5',
      unread: 0,
    },
  },
];
export default function MessagesScreen() {
  const { colors } = useTheme();
  const { userType } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();
  
  // Filter conversations based on user type
  const filteredConversations = conversationsMock.filter(convo => {
    // Show different conversations based on user type
    if (userType === 'patient' && convo.person.role.includes('Dr.')) {
      return true;
    }
    if (userType === 'doctor' && !convo.person.role.includes('Dr.')) {
      return true;
    }
    return false;
  }).filter(convo => {
    // Apply search filter
    if (searchQuery) {
      return convo.person.name.toLowerCase().includes(searchQuery.toLowerCase());
    }
    return true;
  });

  const renderConversationItem = ({ item }: { item: typeof conversationsMock[0] }) => (
    <TouchableOpacity 
      style={[styles.conversationItem, { borderBottomColor: colors.border }]}
      onPress={() => router.push(`/chat?id=${item.id}`)}
    >
      <View style={styles.avatarContainer}>
        <Image source={{ uri: item.person.image }} style={styles.avatar} />
        {item.person.isOnline && (
          <View style={[styles.onlineIndicator, { backgroundColor: colors.success }]} />
        )}
      </View>
      
      <View style={styles.conversationInfo}>
        <View style={styles.conversationHeader}>
          <Text style={[styles.personName, { color: colors.text }]}>{item.person.name}</Text>
          <Text style={[styles.messageTime, { color: colors.textSecondary }]}>
            {item.lastMessage.time}
          </Text>
        </View>
        
        <View style={styles.messagePreviewContainer}>
          <Text 
            style={[
              styles.messagePreview, 
              { 
                color: item.lastMessage.unread > 0 ? colors.text : colors.textSecondary,
                fontFamily: item.lastMessage.unread > 0 ? 'Inter-SemiBold' : 'Inter-Regular',
              }
            ]}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {item.lastMessage.text}
          </Text>
          
          {item.lastMessage.unread > 0 && (
            <View style={[styles.unreadBadge, { backgroundColor: colors.primary }]}>
              <Text style={styles.unreadText}>{item.lastMessage.unread}</Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Messages</Text>
        <TouchableOpacity 
          style={[styles.newMessageButton, { backgroundColor: colors.cardBg }]}
          onPress={() => router.push('/new-message')}
        >
          <Plus color={colors.text} size={20} />
        </TouchableOpacity>
      </View>
      
      <View style={[styles.searchContainer, { backgroundColor: colors.cardBg }]}>
        <Search color={colors.textSecondary} size={20} />
        <TextInput
          style={[styles.searchInput, { color: colors.text }]}
          placeholder="Search messages"
          placeholderTextColor={colors.placeholder}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>
      
      {filteredConversations.length > 0 ? (
        <FlatList
          data={filteredConversations}
          keyExtractor={item => item.id}
          renderItem={renderConversationItem}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={[styles.emptyTitle, { color: colors.text }]}>No messages yet</Text>
          <Text style={[styles.emptyDescription, { color: colors.textSecondary }]}>
            {searchQuery
              ? "No messages match your search"
              : userType === 'patient'
              ? "You haven't messaged any doctors yet"
              : "You haven't messaged any patients yet"}
          </Text>
          <TouchableOpacity 
            style={[styles.startChatButton, { backgroundColor: colors.primary }]}
          >
            <Text style={styles.startChatText}>
              {userType === 'patient' ? 'Message a Doctor' : 'Send a Message'}
            </Text>
          </TouchableOpacity>
        </View>
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
  headerTitle: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
  },
  newMessageButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 16,
    paddingHorizontal: 16,
    height: 48,
    borderRadius: 24,
  },
  searchInput: {
    flex: 1,
    height: '100%',
    marginLeft: 12,
    fontFamily: 'Inter-Regular',
    fontSize: 16,
  },
  listContent: {
    paddingHorizontal: 20,
  },
  conversationItem: {
    flexDirection: 'row',
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  avatarContainer: {
    position: 'relative',
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
  },
  onlineIndicator: {
    width: 14,
    height: 14,
    borderRadius: 7,
    position: 'absolute',
    bottom: 0,
    right: 0,
    borderWidth: 2,
    borderColor: '#fff',
  },
  conversationInfo: {
    flex: 1,
    marginLeft: 16,
    justifyContent: 'center',
  },
  conversationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  personName: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
  },
  messageTime: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
  },
  messagePreviewContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  messagePreview: {
    fontSize: 14,
    flex: 1,
  },
  unreadBadge: {
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  unreadText: {
    color: '#fff',
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
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
  },
  emptyDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    textAlign: 'center',
    marginBottom: 24,
  },
  startChatButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 25,
  },
  startChatText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#fff',
  },
});