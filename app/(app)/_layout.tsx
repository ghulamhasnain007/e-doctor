import { Tabs } from 'expo-router';
import { Home, Calendar, User, MessageCircle, Settings } from 'lucide-react-native';
import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';

export default function AppLayout() {
  const { userType } = useAuth();
  const { colors } = useTheme();

  // Different tab configurations based on user type
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarStyle: {
          borderTopWidth: 1,
          borderTopColor: colors.border,
          backgroundColor: colors.cardBg,
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontFamily: 'Inter-Medium',
          fontSize: 12,
        },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => <Home size={size} color={color} />,
        }}
      />
      
      <Tabs.Screen
        name="appointments"
        options={{
          title: 'Appointments',
          tabBarIcon: ({ color, size }) => <Calendar size={size} color={color} />,
        }}
      />
      
      <Tabs.Screen
        name="messages"
        options={{
          title: 'Messages',
          tabBarIcon: ({ color, size }) => <MessageCircle size={size} color={color} />,
        }}
      />
      
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }) => <User size={size} color={color} />,
        }}
      />
      
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color, size }) => <Settings size={size} color={color} />,
        }}
      />
      
      {/* Hide these pages from the tab bar */}
      <Tabs.Screen
        name="doctor-details"
        options={{
          href: null, // This prevents the tab from showing in the tab bar
        }}
      />
      
      <Tabs.Screen
        name="book-appointment"
        options={{
          href: null, // This prevents the tab from showing in the tab bar
        }}
      />
      
      <Tabs.Screen
        name="reschedule-appointment"
        options={{
          href: null, // This prevents the tab from showing in the tab bar
        }}
      />
      
      <Tabs.Screen
        name="chat"
        options={{
          href: null, // This prevents the tab from showing in the tab bar
        }}
      />
      
      <Tabs.Screen
        name="new-message"
        options={{
          href: null, // This prevents the tab from showing in the tab bar
        }}
      />
      
      <Tabs.Screen
        name="specialties"
        options={{
          href: null, // This prevents the tab from showing in the tab bar
        }}
      />
      
      <Tabs.Screen
        name="doctors"
        options={{
          href: null, // This prevents the tab from showing in the tab bar
        }}
      />
      
      <Tabs.Screen
        name="edit-profile"
        options={{
          href: null, // This prevents the tab from showing in the tab bar
        }}
      />
      
      <Tabs.Screen
        name="personal-details"
        options={{
          href: null, // This prevents the tab from showing in the tab bar
        }}
      />
      
      <Tabs.Screen
        name="schedule"
        options={{
          href: null, // This prevents the tab from showing in the tab bar
        }}
      />
      
      <Tabs.Screen
        name="medical-records"
        options={{
          href: null, // This prevents the tab from showing in the tab bar
        }}
      />
      
      <Tabs.Screen
        name="qualifications"
        options={{
          href: null, // This prevents the tab from showing in the tab bar
        }}
      />
      
      <Tabs.Screen
        name="reviews"
        options={{
          href: null, // This prevents the tab from showing in the tab bar
        }}
      />
      
      <Tabs.Screen
        name="notifications"
        options={{
          href: null, // This prevents the tab from showing in the tab bar
        }}
      />
      
      <Tabs.Screen
        name="privacy-security"
        options={{
          href: null, // This prevents the tab from showing in the tab bar
        }}
      />
    </Tabs>
  );
}