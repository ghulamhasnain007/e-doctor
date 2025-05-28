import React, { useState, useRef, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  TextInput, 
  Image, 
  KeyboardAvoidingView, 
  Platform,
  Keyboard,
  FlatList
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, MoreVertical, Paperclip, Send, Image as ImageIcon, Mic, Camera } from 'lucide-react-native';
import { useTheme } from '@/context/ThemeContext';
import { useAuth } from '@/context/AuthContext';
import { router, useLocalSearchParams } from 'expo-router';

// Mock messages data - in a real app, this would come from an API
const mockMessages = {
  '1': [
    {
      id: '1',
      senderId: 'doctor1',
      text: 'Hello! How can I help you today?',
      timestamp: new Date(new Date().getTime() - 24 * 60 * 60 * 1000).toISOString(),
      read: true,
    },
    {
      id: '2',
      senderId: 'patient1',
      text: 'Hi Dr. Johnson, I\'ve been experiencing chest pain for the last few days.',
      timestamp: new Date(new Date().getTime() - 23 * 60 * 60 * 1000).toISOString(),
      read: true,
    },
    {
      id: '3',
      senderId: 'doctor1',
      text: 'I\'m sorry to hear that. Can you describe the pain? Is it sharp or dull?',
      timestamp: new Date(new Date().getTime() - 22 * 60 * 60 * 1000).toISOString(),
      read: true,
    },
    {
      id: '4',
      senderId: 'patient1',
      text: 'It\'s a sharp pain, especially when I take deep breaths.',
      timestamp: new Date(new Date().getTime() - 21 * 60 * 60 * 1000).toISOString(),
      read: true,
    },
    {
      id: '5',
      senderId: 'doctor1',
      text: 'I see. Have you noticed any other symptoms like shortness of breath, fever, or cough?',
      timestamp: new Date(new Date().getTime() - 20 * 60 * 60 * 1000).toISOString(),
      read: true,
    },
    {
      id: '6',
      senderId: 'patient1',
      text: 'Yes, I\'ve been feeling a bit short of breath, especially when climbing stairs.',
      timestamp: new Date(new Date().getTime() - 19 * 60 * 60 * 1000).toISOString(),
      read: true,
    },
    {
      id: '7',
      senderId: 'doctor1',
      text: 'I think we should schedule an appointment to examine you. Would tomorrow at 10:30 AM work for you?',
      timestamp: new Date(new Date().getTime() - 18 * 60 * 60 * 1000).toISOString(),
      read: true,
    },
    {
      id: '8',
      senderId: 'patient1',
      text: 'Yes, that works for me. Thank you!',
      timestamp: new Date(new Date().getTime() - 17 * 60 * 60 * 1000).toISOString(),
      read: true,
    },
    {
      id: '9',
      senderId: 'doctor1',
      text: 'Great! In the meantime, try to rest and avoid strenuous activities. Take shallow breaths if deep breathing hurts. If the pain becomes severe, please go to the emergency room immediately.',
      timestamp: new Date(new Date().getTime() - 16 * 60 * 60 * 1000).toISOString(),
      read: true,
    },
    {
      id: '10',
      senderId: 'patient1',
      text: 'I understand. Thank you for the advice.',
      timestamp: new Date(new Date().getTime() - 15 * 60 * 60 * 1000).toISOString(),
      read: true,
    },
    {
      id: '11',
      senderId: 'doctor1',
      text: 'Your prescription is ready. You can pick it up from the pharmacy now.',
      timestamp: new Date(new Date().getTime() - 3 * 60 * 60 * 1000).toISOString(),
      read: false,
    },
  ],
  '2': [
    {
      id: '1',
      senderId: 'patient2',
      text: 'Thank you, doctor!',
      timestamp: new Date(new Date().getTime() - 24 * 60 * 60 * 1000).toISOString(),
      read: true,
    },
  ],
  '3': [
    {
      id: '1',
      senderId: 'doctor2',
      text: 'How are you feeling today?',
      timestamp: new Date(new Date().getTime() - 24 * 60 * 60 * 1000).toISOString(),
      read: false,
    },
  ],
};

// Mock contact data
const contactsMock = {
  '1': {
    id: '1',
    name: 'Dr. Sarah Johnson',
    role: 'Cardiologist',
    image: 'https://images.pexels.com/photos/5452268/pexels-photo-5452268.jpeg?auto=compress&cs=tinysrgb&w=600',
    isOnline: true,
  },
  '2': {
    id: '2',
    name: 'John Smith',
    role: 'Patient',
    image: 'https://images.pexels.com/photos/6551937/pexels-photo-6551937.jpeg?auto=compress&cs=tinysrgb&w=600',
    isOnline: false,
  },
  '3': {
    id: '3',
    name: 'Dr. Mark Wilson',
    role: 'Pediatrician',
    image: 'https://images.pexels.com/photos/4173239/pexels-photo-4173239.jpeg?auto=compress&cs=tinysrgb&w=600',
    isOnline: true,
  },
};

const formatTime = (timestamp: string) => {
  const date = new Date(timestamp);
  const now = new Date();
  
  const isToday = date.getDate() === now.getDate() && 
                  date.getMonth() === now.getMonth() && 
                  date.getFullYear() === now.getFullYear();
  
  if (isToday) {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }
  
  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);
  const isYesterday = date.getDate() === yesterday.getDate() && 
                      date.getMonth() === yesterday.getMonth() && 
                      date.getFullYear() === yesterday.getFullYear();
  
  if (isYesterday) {
    return 'Yesterday';
  }
  
  return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
};

export default function ChatScreen() {
  const { colors } = useTheme();
  const { user, userType } = useAuth();
  const params = useLocalSearchParams();
  const conversationId = params.id as string;
  
  const [contact, setContact] = useState<any>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [showAttachments, setShowAttachments] = useState(false);
  
  const scrollViewRef = useRef<FlatList>(null);
  
  useEffect(() => {
    // Fetch contact and messages data
    setContact(contactsMock[conversationId as keyof typeof contactsMock]);
    setMessages(mockMessages[conversationId as keyof typeof mockMessages] || []);
    
    // Mark all messages as read
    if (mockMessages[conversationId as keyof typeof mockMessages]) {
      const updatedMessages = mockMessages[conversationId as keyof typeof mockMessages].map(msg => ({
        ...msg,
        read: true
      }));
      setMessages(updatedMessages);
    }
  }, [conversationId]);
  
  const sendMessage = () => {
    if (inputMessage.trim() === '') return;
    
    const newMessage = {
      id: (messages.length + 1).toString(),
      senderId: userType === 'patient' ? 'patient1' : 'doctor1',
      text: inputMessage.trim(),
      timestamp: new Date().toISOString(),
      read: false,
    };
    
    setMessages([...messages, newMessage]);
    setInputMessage('');
    setShowAttachments(false);
    
    // Scroll to bottom
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };
  
  const toggleAttachments = () => {
    setShowAttachments(!showAttachments);
    Keyboard.dismiss();
  };
  
  const goBack = () => {
    router.back();
  };

  // Group messages by day
  const groupedMessages = messages.reduce((groups, message) => {
    const date = new Date(message.timestamp).toLocaleDateString();
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(message);
    return groups;
  }, {});

  // Convert grouped messages to array format for FlatList
  const groupedMessagesArray = Object.keys(groupedMessages).map(date => {
    return {
      date,
      data: groupedMessages[date],
    };
  });

  const renderMessage = ({ item }: { item: any }) => {
    const isMyMessage = 
      (userType === 'patient' && item.senderId.includes('patient')) ||
      (userType === 'doctor' && item.senderId.includes('doctor'));
    
    return (
      <View 
        style={[
          styles.messageContainer,
          isMyMessage ? styles.myMessageContainer : styles.theirMessageContainer
        ]}
      >
        <View 
          style={[
            styles.messageBubble,
            isMyMessage 
              ? [styles.myMessageBubble, { backgroundColor: colors.primary }]
              : [styles.theirMessageBubble, { backgroundColor: colors.cardBg }]
          ]}
        >
          <Text 
            style={[
              styles.messageText,
              { color: isMyMessage ? '#fff' : colors.text }
            ]}
          >
            {item.text}
          </Text>
        </View>
        <View style={styles.messageFooter}>
          <Text 
            style={[
              styles.messageTime,
              { color: colors.textSecondary }
            ]}
          >
            {formatTime(item.timestamp)}
          </Text>
          {isMyMessage && (
            <Text 
              style={[
                styles.messageStatus,
                { color: item.read ? colors.success : colors.textSecondary }
              ]}
            >
              {item.read ? 'Read' : 'Delivered'}
            </Text>
          )}
        </View>
      </View>
    );
  };

  const renderDateSeparator = (date: string) => {
    const formattedDate = new Date(date).toLocaleDateString([], {
      weekday: 'long',
      month: 'long',
      day: 'numeric'
    });
    
    return (
      <View style={styles.dateSeparator}>
        <View style={[styles.dateLine, { backgroundColor: colors.border }]} />
        <Text style={[styles.dateText, { color: colors.textSecondary, backgroundColor: colors.background }]}>
          {formattedDate}
        </Text>
        <View style={[styles.dateLine, { backgroundColor: colors.border }]} />
      </View>
    );
  };

  if (!contact) {
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
        
        <TouchableOpacity style={styles.contactInfo}>
          <Image source={{ uri: contact.image }} style={styles.contactAvatar} />
          <View>
            <Text style={[styles.contactName, { color: colors.text }]}>{contact.name}</Text>
            <View style={styles.onlineStatus}>
              {contact.isOnline && (
                <View style={[styles.onlineDot, { backgroundColor: colors.success }]} />
              )}
              <Text style={[styles.contactRole, { color: colors.textSecondary }]}>
                {contact.isOnline ? 'Online' : contact.role}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.moreButton}>
          <MoreVertical color={colors.text} size={24} />
        </TouchableOpacity>
      </View>
      
      <FlatList
        ref={scrollViewRef}
        data={messages}
        keyExtractor={item => item.id}
        renderItem={renderMessage}
        contentContainerStyle={styles.messagesContainer}
        showsVerticalScrollIndicator={false}
        onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: false })}
        onLayout={() => scrollViewRef.current?.scrollToEnd({ animated: false })}
        ListHeaderComponent={() => (
          groupedMessagesArray.length > 0 ? renderDateSeparator(groupedMessagesArray[0].date) : null
        )}
      />
      
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={100}
      >
        <View style={[styles.inputContainer, { backgroundColor: colors.cardBg }]}>
          <TouchableOpacity 
            style={styles.attachButton} 
            onPress={toggleAttachments}
          >
            <Paperclip color={colors.primary} size={24} />
          </TouchableOpacity>
          
          <TextInput
            style={[styles.input, { color: colors.text }]}
            placeholder="Type a message..."
            placeholderTextColor={colors.textSecondary}
            value={inputMessage}
            onChangeText={setInputMessage}
            multiline
          />
          
          {inputMessage.trim() === '' ? (
            <TouchableOpacity style={styles.micButton}>
              <Mic color={colors.primary} size={24} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity 
              style={[styles.sendButton, { backgroundColor: colors.primary }]}
              onPress={sendMessage}
            >
              <Send color="#fff" size={18} />
            </TouchableOpacity>
          )}
        </View>
        
        {showAttachments && (
          <View style={[styles.attachmentsContainer, { backgroundColor: colors.cardBg }]}>
            <TouchableOpacity style={styles.attachmentOption}>
              <View style={[styles.attachmentIconContainer, { backgroundColor: colors.primary + '20' }]}>
                <Camera color={colors.primary} size={24} />
              </View>
              <Text style={[styles.attachmentText, { color: colors.text }]}>Camera</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.attachmentOption}>
              <View style={[styles.attachmentIconContainer, { backgroundColor: colors.primary + '20' }]}>
                <ImageIcon color={colors.primary} size={24} />
              </View>
              <Text style={[styles.attachmentText, { color: colors.text }]}>Gallery</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.attachmentOption}>
              <View style={[styles.attachmentIconContainer, { backgroundColor: colors.primary + '20' }]}>
                <Paperclip color={colors.primary} size={24} />
              </View>
              <Text style={[styles.attachmentText, { color: colors.text }]}>Document</Text>
            </TouchableOpacity>
          </View>
        )}
      </KeyboardAvoidingView>
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
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  backButton: {
    padding: 4,
  },
  contactInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 12,
  },
  contactAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  contactName: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
  },
  onlineStatus: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  onlineDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 4,
  },
  contactRole: {
    fontSize: 13,
    fontFamily: 'Inter-Regular',
  },
  moreButton: {
    padding: 4,
  },
  messagesContainer: {
    padding: 16,
    paddingBottom: 8,
  },
  dateSeparator: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 16,
  },
  dateLine: {
    flex: 1,
    height: 1,
  },
  dateText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    paddingHorizontal: 8,
  },
  messageContainer: {
    marginBottom: 16,
    maxWidth: '80%',
  },
  myMessageContainer: {
    alignSelf: 'flex-end',
  },
  theirMessageContainer: {
    alignSelf: 'flex-start',
  },
  messageBubble: {
    borderRadius: 16,
    padding: 12,
  },
  myMessageBubble: {
    borderBottomRightRadius: 4,
  },
  theirMessageBubble: {
    borderBottomLeftRadius: 4,
  },
  messageText: {
    fontSize: 15,
    fontFamily: 'Inter-Regular',
    lineHeight: 20,
  },
  messageFooter: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 4,
    paddingHorizontal: 4,
  },
  messageTime: {
    fontSize: 11,
    fontFamily: 'Inter-Regular',
  },
  messageStatus: {
    fontSize: 11,
    fontFamily: 'Inter-Regular',
    marginLeft: 4,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  attachButton: {
    padding: 8,
  },
  input: {
    flex: 1,
    height: 40,
    paddingHorizontal: 12,
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    maxHeight: 100,
  },
  micButton: {
    padding: 8,
  },
  sendButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  attachmentsContainer: {
    flexDirection: 'row',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  attachmentOption: {
    alignItems: 'center',
    marginRight: 24,
  },
  attachmentIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  attachmentText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
  },
});
