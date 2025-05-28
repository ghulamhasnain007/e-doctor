import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Bell, Calendar, MessageSquare, Clock, AlertCircle, FileText, Heart } from 'lucide-react-native';
import { useTheme } from '@/context/ThemeContext';
import { useAuth } from '@/context/AuthContext';
import { router } from 'expo-router';

export default function NotificationsScreen() {
  const { colors } = useTheme();
  const { userType } = useAuth();
  
  // Default notification settings
  const [notifications, setNotifications] = useState({
    // Common settings for both user types
    appointmentReminders: true,
    appointmentChanges: true,
    messages: true,
    appUpdates: false,
    
    // Patient-specific settings
    prescriptionRefills: userType === 'patient' ? true : false,
    medicationReminders: userType === 'patient' ? true : false,
    labResults: userType === 'patient' ? true : false,
    
    // Doctor-specific settings
    newPatientBookings: userType === 'doctor' ? true : false,
    patientRecordUpdates: userType === 'doctor' ? true : false,
    emergencyAlerts: userType === 'doctor' ? true : false,
  });
  
  const [emailNotifications, setEmailNotifications] = useState({
    dailySummary: false,
    weeklySummary: true,
    marketingEmails: false,
  });
  
  const [quietHours, setQuietHours] = useState({
    enabled: false,
    startTime: '22:00',
    endTime: '07:00',
  });

  const goBack = () => {
    router.back();
  };
  
interface NotificationSettings {
    appointmentReminders: boolean;
    appointmentChanges: boolean;
    messages: boolean;
    appUpdates: boolean;
    prescriptionRefills: boolean;
    medicationReminders: boolean;
    labResults: boolean;
    newPatientBookings: boolean;
    patientRecordUpdates: boolean;
    emergencyAlerts: boolean;
}

type NotificationKey = keyof NotificationSettings;

const toggleNotification = (key: NotificationKey) => {
    setNotifications((prev: NotificationSettings) => ({
        ...prev,
        [key]: !prev[key]
    }));
};
  
interface EmailNotificationSettings {
    dailySummary: boolean;
    weeklySummary: boolean;
    marketingEmails: boolean;
}

type EmailNotificationKey = keyof EmailNotificationSettings;

const toggleEmailNotification = (key: EmailNotificationKey) => {
    setEmailNotifications((prev: EmailNotificationSettings) => ({
        ...prev,
        [key]: !prev[key]
    }));
};
  
  const toggleQuietHours = () => {
    setQuietHours(prev => ({
      ...prev,
      enabled: !prev.enabled
    }));
  };
  
  const saveSettings = () => {
    // In a real app, this would save the settings to a backend
    alert('Notification settings saved successfully!');
    router.back();
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <View style={[styles.header, { backgroundColor: colors.cardBg }]}>
        <TouchableOpacity onPress={goBack} style={styles.backButton}>
          <ArrowLeft size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]}>
          Notifications
        </Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.container}>
        <View style={[styles.sectionCard, { backgroundColor: colors.cardBg }]}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Push Notifications
          </Text>
          
          <View style={styles.notificationItem}>
            <View style={styles.notificationInfo}>
              <View style={[styles.iconContainer, { backgroundColor: colors.primary + '20' }]}>
                <Calendar size={20} color={colors.primary} />
              </View>
              <View style={styles.notificationTextContainer}>
                <Text style={[styles.notificationTitle, { color: colors.text }]}>
                  Appointment Reminders
                </Text>
                <Text style={[styles.notificationDescription, { color: colors.textSecondary }]}>
                  Get reminded about upcoming appointments
                </Text>
              </View>
            </View>
            <Switch
              value={notifications.appointmentReminders}
              onValueChange={() => toggleNotification('appointmentReminders')}
              trackColor={{ false: '#767577', true: colors.primary + '80' }}
              thumbColor={notifications.appointmentReminders ? colors.primary : '#f4f3f4'}
            />
          </View>
          
          <View style={styles.notificationItem}>
            <View style={styles.notificationInfo}>
              <View style={[styles.iconContainer, { backgroundColor: colors.warning + '20' }]}>
                <Clock size={20} color={colors.warning} />
              </View>
              <View style={styles.notificationTextContainer}>
                <Text style={[styles.notificationTitle, { color: colors.text }]}>
                  Appointment Changes
                </Text>
                <Text style={[styles.notificationDescription, { color: colors.textSecondary }]}>
                  Get notified when appointments are rescheduled or canceled
                </Text>
              </View>
            </View>
            <Switch
              value={notifications.appointmentChanges}
              onValueChange={() => toggleNotification('appointmentChanges')}
              trackColor={{ false: '#767577', true: colors.primary + '80' }}
              thumbColor={notifications.appointmentChanges ? colors.primary : '#f4f3f4'}
            />
          </View>
          
          <View style={styles.notificationItem}>
            <View style={styles.notificationInfo}>
              <View style={[styles.iconContainer, { backgroundColor: colors.secondary + '20' }]}>
                <MessageSquare size={20} color={colors.secondary} />
              </View>
              <View style={styles.notificationTextContainer}>
                <Text style={[styles.notificationTitle, { color: colors.text }]}>
                  Messages
                </Text>
                <Text style={[styles.notificationDescription, { color: colors.textSecondary }]}>
                  Get notified when you receive new messages
                </Text>
              </View>
            </View>
            <Switch
              value={notifications.messages}
              onValueChange={() => toggleNotification('messages')}
              trackColor={{ false: '#767577', true: colors.primary + '80' }}
              thumbColor={notifications.messages ? colors.primary : '#f4f3f4'}
            />
          </View>
          
          {userType === 'patient' && (
            <>
              <View style={styles.notificationItem}>
                <View style={styles.notificationInfo}>
                  <View style={[styles.iconContainer, { backgroundColor: colors.success + '20' }]}>
                    <FileText size={20} color={colors.success} />
                  </View>
                  <View style={styles.notificationTextContainer}>
                    <Text style={[styles.notificationTitle, { color: colors.text }]}>
                      Prescription Refills
                    </Text>
                    <Text style={[styles.notificationDescription, { color: colors.textSecondary }]}>
                      Get reminded when your prescriptions need refilling
                    </Text>
                  </View>
                </View>
                <Switch
                  value={notifications.prescriptionRefills}
                  onValueChange={() => toggleNotification('prescriptionRefills')}
                  trackColor={{ false: '#767577', true: colors.primary + '80' }}
                  thumbColor={notifications.prescriptionRefills ? colors.primary : '#f4f3f4'}
                />
              </View>
              
              <View style={styles.notificationItem}>
                <View style={styles.notificationInfo}>
                  <View style={[styles.iconContainer, { backgroundColor: colors.error + '20' }]}>
                    <Heart size={20} color={colors.error} />
                  </View>
                  <View style={styles.notificationTextContainer}>
                    <Text style={[styles.notificationTitle, { color: colors.text }]}>
                      Medication Reminders
                    </Text>
                    <Text style={[styles.notificationDescription, { color: colors.textSecondary }]}>
                      Get daily reminders to take your medications
                    </Text>
                  </View>
                </View>
                <Switch
                  value={notifications.medicationReminders}
                  onValueChange={() => toggleNotification('medicationReminders')}
                  trackColor={{ false: '#767577', true: colors.primary + '80' }}
                  thumbColor={notifications.medicationReminders ? colors.primary : '#f4f3f4'}
                />
              </View>
              
              <View style={styles.notificationItem}>
                <View style={styles.notificationInfo}>
                  <View style={[styles.iconContainer, { backgroundColor: colors.secondary + '20' }]}>
                    <AlertCircle size={20} color={colors.secondary} />
                  </View>
                  <View style={styles.notificationTextContainer}>
                    <Text style={[styles.notificationTitle, { color: colors.text }]}>
                      Lab Results
                    </Text>
                    <Text style={[styles.notificationDescription, { color: colors.textSecondary }]}>
                      Get notified when your lab results are available
                    </Text>
                  </View>
                </View>
                <Switch
                  value={notifications.labResults}
                  onValueChange={() => toggleNotification('labResults')}
                  trackColor={{ false: '#767577', true: colors.primary + '80' }}
                  thumbColor={notifications.labResults ? colors.primary : '#f4f3f4'}
                />
              </View>
            </>
          )}
          
          {userType === 'doctor' && (
            <>
              <View style={styles.notificationItem}>
                <View style={styles.notificationInfo}>
                  <View style={[styles.iconContainer, { backgroundColor: colors.success + '20' }]}>
                    <FileText size={20} color={colors.success} />
                  </View>
                  <View style={styles.notificationTextContainer}>
                    <Text style={[styles.notificationTitle, { color: colors.text }]}>
                      New Patient Bookings
                    </Text>
                    <Text style={[styles.notificationDescription, { color: colors.textSecondary }]}>
                      Get notified when new patients book appointments
                    </Text>
                  </View>
                </View>
                <Switch
                  value={notifications.newPatientBookings}
                  onValueChange={() => toggleNotification('newPatientBookings')}
                  trackColor={{ false: '#767577', true: colors.primary + '80' }}
                  thumbColor={notifications.newPatientBookings ? colors.primary : '#f4f3f4'}
                />
              </View>
              
              <View style={styles.notificationItem}>
                <View style={styles.notificationInfo}>
                  <View style={[styles.iconContainer, { backgroundColor: colors.secondary + '20' }]}>
                    <AlertCircle size={20} color={colors.secondary} />
                  </View>
                  <View style={styles.notificationTextContainer}>
                    <Text style={[styles.notificationTitle, { color: colors.text }]}>
                      Patient Record Updates
                    </Text>
                    <Text style={[styles.notificationDescription, { color: colors.textSecondary }]}>
                      Get notified when patient records are updated
                    </Text>
                  </View>
                </View>
                <Switch
                  value={notifications.patientRecordUpdates}
                  onValueChange={() => toggleNotification('patientRecordUpdates')}
                  trackColor={{ false: '#767577', true: colors.primary + '80' }}
                  thumbColor={notifications.patientRecordUpdates ? colors.primary : '#f4f3f4'}
                />
              </View>
              
              <View style={styles.notificationItem}>
                <View style={styles.notificationInfo}>
                  <View style={[styles.iconContainer, { backgroundColor: colors.error + '20' }]}>
                    <Heart size={20} color={colors.error} />
                  </View>
                  <View style={styles.notificationTextContainer}>
                    <Text style={[styles.notificationTitle, { color: colors.text }]}>
                      Emergency Alerts
                    </Text>
                    <Text style={[styles.notificationDescription, { color: colors.textSecondary }]}>
                      High priority alerts for urgent patient cases
                    </Text>
                  </View>
                </View>
                <Switch
                  value={notifications.emergencyAlerts}
                  onValueChange={() => toggleNotification('emergencyAlerts')}
                  trackColor={{ false: '#767577', true: colors.primary + '80' }}
                  thumbColor={notifications.emergencyAlerts ? colors.primary : '#f4f3f4'}
                />
              </View>
            </>
          )}
          
          <View style={styles.notificationItem}>
            <View style={styles.notificationInfo}>
              <View style={[styles.iconContainer, { backgroundColor: colors.textSecondary + '20' }]}>
                <Bell size={20} color={colors.textSecondary} />
              </View>
              <View style={styles.notificationTextContainer}>
                <Text style={[styles.notificationTitle, { color: colors.text }]}>
                  App Updates
                </Text>
                <Text style={[styles.notificationDescription, { color: colors.textSecondary }]}>
                  Get notified about new features and updates
                </Text>
              </View>
            </View>
            <Switch
              value={notifications.appUpdates}
              onValueChange={() => toggleNotification('appUpdates')}
              trackColor={{ false: '#767577', true: colors.primary + '80' }}
              thumbColor={notifications.appUpdates ? colors.primary : '#f4f3f4'}
            />
          </View>
        </View>
        
        <View style={[styles.sectionCard, { backgroundColor: colors.cardBg }]}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Email Notifications
          </Text>
          
          <View style={styles.notificationItem}>
            <View style={styles.notificationInfo}>
              <View style={styles.notificationTextContainer}>
                <Text style={[styles.notificationTitle, { color: colors.text }]}>
                  Daily Summary
                </Text>
                <Text style={[styles.notificationDescription, { color: colors.textSecondary }]}>
                  Receive a daily summary of your activities
                </Text>
              </View>
            </View>
            <Switch
              value={emailNotifications.dailySummary}
              onValueChange={() => toggleEmailNotification('dailySummary')}
              trackColor={{ false: '#767577', true: colors.primary + '80' }}
              thumbColor={emailNotifications.dailySummary ? colors.primary : '#f4f3f4'}
            />
          </View>
          
          <View style={styles.notificationItem}>
            <View style={styles.notificationInfo}>
              <View style={styles.notificationTextContainer}>
                <Text style={[styles.notificationTitle, { color: colors.text }]}>
                  Weekly Summary
                </Text>
                <Text style={[styles.notificationDescription, { color: colors.textSecondary }]}>
                  Receive a weekly summary of your activities
                </Text>
              </View>
            </View>
            <Switch
              value={emailNotifications.weeklySummary}
              onValueChange={() => toggleEmailNotification('weeklySummary')}
              trackColor={{ false: '#767577', true: colors.primary + '80' }}
              thumbColor={emailNotifications.weeklySummary ? colors.primary : '#f4f3f4'}
            />
          </View>
          
          <View style={styles.notificationItem}>
            <View style={styles.notificationInfo}>
              <View style={styles.notificationTextContainer}>
                <Text style={[styles.notificationTitle, { color: colors.text }]}>
                  Marketing Emails
                </Text>
                <Text style={[styles.notificationDescription, { color: colors.textSecondary }]}>
                  Receive promotional emails and offers
                </Text>
              </View>
            </View>
            <Switch
              value={emailNotifications.marketingEmails}
              onValueChange={() => toggleEmailNotification('marketingEmails')}
              trackColor={{ false: '#767577', true: colors.primary + '80' }}
              thumbColor={emailNotifications.marketingEmails ? colors.primary : '#f4f3f4'}
            />
          </View>
        </View>
        
        <View style={[styles.sectionCard, { backgroundColor: colors.cardBg }]}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Quiet Hours
          </Text>
          
          <View style={styles.notificationItem}>
            <View style={styles.notificationInfo}>
              <View style={styles.notificationTextContainer}>
                <Text style={[styles.notificationTitle, { color: colors.text }]}>
                  Enable Quiet Hours
                </Text>
                <Text style={[styles.notificationDescription, { color: colors.textSecondary }]}>
                  Mute non-urgent notifications during specified hours
                </Text>
              </View>
            </View>
            <Switch
              value={quietHours.enabled}
              onValueChange={toggleQuietHours}
              trackColor={{ false: '#767577', true: colors.primary + '80' }}
              thumbColor={quietHours.enabled ? colors.primary : '#f4f3f4'}
            />
          </View>
          
          {quietHours.enabled && (
            <View style={styles.quietHoursContainer}>
              <View style={styles.timeContainer}>
                <Text style={[styles.timeLabel, { color: colors.textSecondary }]}>
                  Start Time
                </Text>
                <Text style={[styles.timeValue, { color: colors.text }]}>
                  {quietHours.startTime}
                </Text>
              </View>
              
              <View style={styles.timeContainer}>
                <Text style={[styles.timeLabel, { color: colors.textSecondary }]}>
                  End Time
                </Text>
                <Text style={[styles.timeValue, { color: colors.text }]}>
                  {quietHours.endTime}
                </Text>
              </View>
            </View>
          )}
        </View>
        
        <TouchableOpacity 
          style={[styles.saveButton, { backgroundColor: colors.primary }]}
          onPress={saveSettings}
        >
          <Text style={styles.saveButtonText}>
            Save Changes
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
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
  sectionCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  notificationItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)',
  },
  notificationInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 16,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  notificationTextContainer: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  notificationDescription: {
    fontSize: 14,
  },
  quietHoursContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 16,
  },
  timeContainer: {
    alignItems: 'center',
  },
  timeLabel: {
    fontSize: 14,
    marginBottom: 4,
  },
  timeValue: {
    fontSize: 18,
    fontWeight: '600',
  },
  saveButton: {
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 30,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});
