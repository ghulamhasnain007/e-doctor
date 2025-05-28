import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Switch, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { 
  ArrowLeft, 
  Bell, 
  Moon, 
  Shield, 
  HelpCircle, 
  FileText, 
  ChevronRight,
  LogOut
} from 'lucide-react-native';
import { router } from 'expo-router';
import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';

export default function SettingsScreen() {
  const { logout } = useAuth();
  const { colors, isDark } = useTheme();
  
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(isDark);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [appointmentReminders, setAppointmentReminders] = useState(true);
  
  const handleLogout = async () => {
    await logout();
    router.replace('/welcome');
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ArrowLeft color={colors.text} size={24} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]}>
          Settings
        </Text>
        <View style={{ width: 24 }} />
      </View>
      
      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Notifications
          </Text>
          
          <View style={[styles.settingsCard, { backgroundColor: colors.cardBg }]}>
            <View style={styles.settingItem}>
              <View style={styles.settingInfo}>
                <View style={[styles.iconContainer, { backgroundColor: colors.primary + '15' }]}>
                  <Bell size={20} color={colors.primary} />
                </View>
                <Text style={[styles.settingTitle, { color: colors.text }]}>
                  App Notifications
                </Text>
              </View>
              <Switch
                value={notificationsEnabled}
                onValueChange={setNotificationsEnabled}
                trackColor={{ false: colors.border, true: colors.primary }}
                thumbColor={'#fff'}
              />
            </View>
            
            <View style={[styles.settingDivider, { backgroundColor: colors.border }]} />
            
            <View style={styles.settingItem}>
              <View style={styles.settingInfo}>
                <Text style={[styles.settingSubtitle, { color: colors.text }]}>
                  Email Notifications
                </Text>
              </View>
              <Switch
                value={emailNotifications}
                onValueChange={setEmailNotifications}
                trackColor={{ false: colors.border, true: colors.primary }}
                thumbColor={'#fff'}
                disabled={!notificationsEnabled}
              />
            </View>
            
            <View style={[styles.settingDivider, { backgroundColor: colors.border }]} />
            
            <View style={styles.settingItem}>
              <View style={styles.settingInfo}>
                <Text style={[styles.settingSubtitle, { color: colors.text }]}>
                  Appointment Reminders
                </Text>
              </View>
              <Switch
                value={appointmentReminders}
                onValueChange={setAppointmentReminders}
                trackColor={{ false: colors.border, true: colors.primary }}
                thumbColor={'#fff'}
                disabled={!notificationsEnabled}
              />
            </View>
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Appearance
          </Text>
          
          <View style={[styles.settingsCard, { backgroundColor: colors.cardBg }]}>
            <View style={styles.settingItem}>
              <View style={styles.settingInfo}>
                <View style={[styles.iconContainer, { backgroundColor: colors.primary + '15' }]}>
                  <Moon size={20} color={colors.primary} />
                </View>
                <Text style={[styles.settingTitle, { color: colors.text }]}>
                  Dark Mode
                </Text>
              </View>
              <Switch
                value={darkModeEnabled}
                onValueChange={setDarkModeEnabled}
                trackColor={{ false: colors.border, true: colors.primary }}
                thumbColor={'#fff'}
              />
            </View>
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Privacy & Support
          </Text>
          
          <View style={[styles.settingsCard, { backgroundColor: colors.cardBg }]}>
            <TouchableOpacity style={styles.settingItemButton}>
              <View style={styles.settingInfo}>
                <View style={[styles.iconContainer, { backgroundColor: colors.secondary + '15' }]}>
                  <Shield size={20} color={colors.secondary} />
                </View>
                <Text style={[styles.settingTitle, { color: colors.text }]}>
                  Privacy Settings
                </Text>
              </View>
              <ChevronRight size={20} color={colors.textSecondary} />
            </TouchableOpacity>
            
            <View style={[styles.settingDivider, { backgroundColor: colors.border }]} />
            
            <TouchableOpacity style={styles.settingItemButton}>
              <View style={styles.settingInfo}>
                <View style={[styles.iconContainer, { backgroundColor: colors.warning + '15' }]}>
                  <HelpCircle size={20} color={colors.warning} />
                </View>
                <Text style={[styles.settingTitle, { color: colors.text }]}>
                  Help & Support
                </Text>
              </View>
              <ChevronRight size={20} color={colors.textSecondary} />
            </TouchableOpacity>
            
            <View style={[styles.settingDivider, { backgroundColor: colors.border }]} />
            
            <TouchableOpacity style={styles.settingItemButton}>
              <View style={styles.settingInfo}>
                <View style={[styles.iconContainer, { backgroundColor: colors.primary + '15' }]}>
                  <FileText size={20} color={colors.primary} />
                </View>
                <Text style={[styles.settingTitle, { color: colors.text }]}>
                  Terms & Conditions
                </Text>
              </View>
              <ChevronRight size={20} color={colors.textSecondary} />
            </TouchableOpacity>
          </View>
        </View>
        
        <TouchableOpacity 
          style={[styles.logoutButton, { backgroundColor: colors.error + '10' }]}
          onPress={handleLogout}
        >
          <LogOut size={20} color={colors.error} />
          <Text style={[styles.logoutText, { color: colors.error }]}>
            Logout
          </Text>
        </TouchableOpacity>
        
        <Text style={[styles.versionText, { color: colors.textSecondary }]}>
          Version 1.0.0
        </Text>
      </ScrollView>
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
    height: 60,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    marginBottom: 16,
  },
  settingsCard: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  settingItemButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  settingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  settingTitle: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
  },
  settingSubtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    marginLeft: 56, // Align with setting title (40 + 16)
  },
  settingDivider: {
    height: 1,
    marginHorizontal: 20,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 16,
    marginBottom: 20,
  },
  logoutText: {
    marginLeft: 8,
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
  },
  versionText: {
    textAlign: 'center',
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    marginBottom: 40,
  },
});