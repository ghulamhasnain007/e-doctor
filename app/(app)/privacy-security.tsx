import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Shield, Eye, EyeOff, Lock, Key, Fingerprint, AlertTriangle, BellOff, User, UserX, Trash, FileText } from 'lucide-react-native';
import { useTheme } from '@/context/ThemeContext';
import { useAuth } from '@/context/AuthContext';
import { router } from 'expo-router';
import { useModal } from '@/context/ModalContext';

export default function PrivacySecurityScreen() {
  const { colors } = useTheme();
  const { logout } = useAuth();
  const { showInfo, showConfirmation } = useModal();
  
  // Privacy settings
  const [privacySettings, setPrivacySettings] = useState<PrivacySettings>({
    profileVisibility: 'all',
    showOnlineStatus: true,
    showLastSeen: true,
    shareHealthData: false,
    allowAnalytics: true,
  });
  
  // Security settings
  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: false,
    biometricLogin: true,
    rememberMe: true,
  });

  const goBack = () => {
    router.back();
  };
  
interface PrivacySettings {
    profileVisibility: 'all' | 'patients' | 'none';
    showOnlineStatus: boolean;
    showLastSeen: boolean;
    shareHealthData: boolean;
    allowAnalytics: boolean;
}

type PrivacySettingKey = keyof Omit<PrivacySettings, 'profileVisibility'>;

const togglePrivacySetting = (key: PrivacySettingKey) => {
    setPrivacySettings((prev: PrivacySettings) => ({
        ...prev,
        [key]: !prev[key]
    }));
};
  
interface SecuritySettings {
    twoFactorAuth: boolean;
    biometricLogin: boolean;
    rememberMe: boolean;
}

type SecuritySettingKey = keyof SecuritySettings;

const toggleSecuritySetting = (key: SecuritySettingKey) => {
    setSecuritySettings((prev: SecuritySettings) => ({
        ...prev,
        [key]: !prev[key]
    }));
};
    const changePassword = () => {
    // In a real app, this would navigate to a password change screen
    showInfo({
      title: 'Change Password',
      message: 'This would navigate to the password change screen in a complete app.',
      buttonText: 'OK'
    });
  };
  
interface HandleProfileVisibilityChange {
    (value: 'all' | 'patients' | 'none'): void;
}

const handleProfileVisibilityChange: HandleProfileVisibilityChange = (value) => {
    setPrivacySettings((prev: PrivacySettings) => ({
        ...prev,
        profileVisibility: value
    }));
};
    const handleDeleteAccount = () => {
    showConfirmation({
      title: 'Delete Account',
      message: 'Are you sure you want to delete your account? This action cannot be undone.',
      confirmText: 'Delete',
      cancelText: 'Cancel',
      isDestructive: true,
      onConfirm: () => {
        // In a real app, this would call an API to delete the account
        logout();
        router.replace('/welcome');
      }
    });
  };
    const saveSettings = () => {
    // In a real app, this would save the settings to a backend
    showInfo({
      title: 'Success',
      message: 'Privacy and security settings saved successfully!',
      onClose: () => {
        router.back();
      }
    });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <View style={[styles.header, { backgroundColor: colors.cardBg }]}>
        <TouchableOpacity onPress={goBack} style={styles.backButton}>
          <ArrowLeft size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]}>
          Privacy & Security
        </Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.container}>
        <View style={[styles.sectionCard, { backgroundColor: colors.cardBg }]}>
          <View style={styles.sectionHeader}>
            <Shield size={20} color={colors.primary} />
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              Privacy
            </Text>
          </View>
          
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Text style={[styles.settingTitle, { color: colors.text }]}>
                Profile Visibility
              </Text>
              <Text style={[styles.settingDescription, { color: colors.textSecondary }]}>
                Control who can view your profile
              </Text>
            </View>
          </View>
          
          <View style={styles.radioGroup}>
            <TouchableOpacity 
              style={[
                styles.radioOption, 
                privacySettings.profileVisibility === 'all' && { borderColor: colors.primary }
              ]}
              onPress={() => handleProfileVisibilityChange('all')}
            >
              <View style={[
                styles.radioButton, 
                privacySettings.profileVisibility === 'all' && { borderColor: colors.primary }
              ]}>
                {privacySettings.profileVisibility === 'all' && (
                  <View style={[styles.radioButtonSelected, { backgroundColor: colors.primary }]} />
                )}
              </View>
              <Text style={[styles.radioLabel, { color: colors.text }]}>
                Everyone
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[
                styles.radioOption, 
                privacySettings.profileVisibility === 'patients' && { borderColor: colors.primary }
              ]}
              onPress={() => handleProfileVisibilityChange('patients')}
            >
              <View style={[
                styles.radioButton, 
                privacySettings.profileVisibility === 'patients' && { borderColor: colors.primary }
              ]}>
                {privacySettings.profileVisibility === 'patients' && (
                  <View style={[styles.radioButtonSelected, { backgroundColor: colors.primary }]} />
                )}
              </View>
              <Text style={[styles.radioLabel, { color: colors.text }]}>
                Patients/Doctors Only
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[
                styles.radioOption, 
                privacySettings.profileVisibility === 'none' && { borderColor: colors.primary }
              ]}
              onPress={() => handleProfileVisibilityChange('none')}
            >
              <View style={[
                styles.radioButton, 
                privacySettings.profileVisibility === 'none' && { borderColor: colors.primary }
              ]}>
                {privacySettings.profileVisibility === 'none' && (
                  <View style={[styles.radioButtonSelected, { backgroundColor: colors.primary }]} />
                )}
              </View>
              <Text style={[styles.radioLabel, { color: colors.text }]}>
                Private
              </Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <View style={styles.settingTitleContainer}>
                <Eye size={20} color={colors.secondary} style={styles.settingIcon} />
                <Text style={[styles.settingTitle, { color: colors.text }]}>
                  Show Online Status
                </Text>
              </View>
              <Text style={[styles.settingDescription, { color: colors.textSecondary }]}>
                Allow others to see when you're online
              </Text>
            </View>
            <Switch
              value={privacySettings.showOnlineStatus}
              onValueChange={() => togglePrivacySetting('showOnlineStatus')}
              trackColor={{ false: '#767577', true: colors.primary + '80' }}
              thumbColor={privacySettings.showOnlineStatus ? colors.primary : '#f4f3f4'}
            />
          </View>
          
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <View style={styles.settingTitleContainer}>
                <Clock size={20} color={colors.warning} style={styles.settingIcon} />
                <Text style={[styles.settingTitle, { color: colors.text }]}>
                  Show Last Seen
                </Text>
              </View>
              <Text style={[styles.settingDescription, { color: colors.textSecondary }]}>
                Allow others to see when you were last active
              </Text>
            </View>
            <Switch
              value={privacySettings.showLastSeen}
              onValueChange={() => togglePrivacySetting('showLastSeen')}
              trackColor={{ false: '#767577', true: colors.primary + '80' }}
              thumbColor={privacySettings.showLastSeen ? colors.primary : '#f4f3f4'}
            />
          </View>
          
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <View style={styles.settingTitleContainer}>
                <FileText size={20} color={colors.error} style={styles.settingIcon} />
                <Text style={[styles.settingTitle, { color: colors.text }]}>
                  Share Health Data
                </Text>
              </View>
              <Text style={[styles.settingDescription, { color: colors.textSecondary }]}>
                Share anonymous health data for research
              </Text>
            </View>
            <Switch
              value={privacySettings.shareHealthData}
              onValueChange={() => togglePrivacySetting('shareHealthData')}
              trackColor={{ false: '#767577', true: colors.primary + '80' }}
              thumbColor={privacySettings.shareHealthData ? colors.primary : '#f4f3f4'}
            />
          </View>
          
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <View style={styles.settingTitleContainer}>
                <ActivityIcon size={20} color={colors.primary} style={styles.settingIcon} />
                <Text style={[styles.settingTitle, { color: colors.text }]}>
                  Allow Analytics
                </Text>
              </View>
              <Text style={[styles.settingDescription, { color: colors.textSecondary }]}>
                Help improve the app by sending usage data
              </Text>
            </View>
            <Switch
              value={privacySettings.allowAnalytics}
              onValueChange={() => togglePrivacySetting('allowAnalytics')}
              trackColor={{ false: '#767577', true: colors.primary + '80' }}
              thumbColor={privacySettings.allowAnalytics ? colors.primary : '#f4f3f4'}
            />
          </View>
        </View>
        
        <View style={[styles.sectionCard, { backgroundColor: colors.cardBg }]}>
          <View style={styles.sectionHeader}>
            <Lock size={20} color={colors.primary} />
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              Security
            </Text>
          </View>
          
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <View style={styles.settingTitleContainer}>
                <Key size={20} color={colors.primary} style={styles.settingIcon} />
                <Text style={[styles.settingTitle, { color: colors.text }]}>
                  Two-Factor Authentication
                </Text>
              </View>
              <Text style={[styles.settingDescription, { color: colors.textSecondary }]}>
                Add an extra layer of security to your account
              </Text>
            </View>
            <Switch
              value={securitySettings.twoFactorAuth}
              onValueChange={() => toggleSecuritySetting('twoFactorAuth')}
              trackColor={{ false: '#767577', true: colors.primary + '80' }}
              thumbColor={securitySettings.twoFactorAuth ? colors.primary : '#f4f3f4'}
            />
          </View>
          
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <View style={styles.settingTitleContainer}>
                <Fingerprint size={20} color={colors.success} style={styles.settingIcon} />
                <Text style={[styles.settingTitle, { color: colors.text }]}>
                  Biometric Login
                </Text>
              </View>
              <Text style={[styles.settingDescription, { color: colors.textSecondary }]}>
                Use fingerprint or face ID to log in
              </Text>
            </View>
            <Switch
              value={securitySettings.biometricLogin}
              onValueChange={() => toggleSecuritySetting('biometricLogin')}
              trackColor={{ false: '#767577', true: colors.primary + '80' }}
              thumbColor={securitySettings.biometricLogin ? colors.primary : '#f4f3f4'}
            />
          </View>
          
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <View style={styles.settingTitleContainer}>
                <User size={20} color={colors.secondary} style={styles.settingIcon} />
                <Text style={[styles.settingTitle, { color: colors.text }]}>
                  Remember Me
                </Text>
              </View>
              <Text style={[styles.settingDescription, { color: colors.textSecondary }]}>
                Stay logged in on this device
              </Text>
            </View>
            <Switch
              value={securitySettings.rememberMe}
              onValueChange={() => toggleSecuritySetting('rememberMe')}
              trackColor={{ false: '#767577', true: colors.primary + '80' }}
              thumbColor={securitySettings.rememberMe ? colors.primary : '#f4f3f4'}
            />
          </View>
          
          <TouchableOpacity 
            style={[styles.actionButton, { borderColor: colors.primary }]}
            onPress={changePassword}
          >
            <Lock size={20} color={colors.primary} style={styles.actionButtonIcon} />
            <Text style={[styles.actionButtonText, { color: colors.primary }]}>
              Change Password
            </Text>
          </TouchableOpacity>
        </View>
        
        <View style={[styles.sectionCard, { backgroundColor: colors.cardBg }]}>
          <View style={styles.sectionHeader}>
            <AlertTriangle size={20} color={colors.error} />
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              Account Actions
            </Text>
          </View>
          
          <TouchableOpacity 
            style={[styles.actionButton, { borderColor: colors.warning }]}
          >
            <BellOff size={20} color={colors.warning} style={styles.actionButtonIcon} />
            <Text style={[styles.actionButtonText, { color: colors.warning }]}>
              Deactivate Account Temporarily
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.actionButton, { borderColor: colors.error, marginBottom: 0 }]}
            onPress={handleDeleteAccount}
          >
            <Trash size={20} color={colors.error} style={styles.actionButtonIcon} />
            <Text style={[styles.actionButtonText, { color: colors.error }]}>
              Delete Account Permanently
            </Text>
          </TouchableOpacity>
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

// Custom activity icon component
type ActivityIconProps = {
  size: number;
  color: string;
  style?: object;
};

const ActivityIcon: React.FC<ActivityIconProps> = ({ size, color, style }) => {
  return (
    <View style={[{ width: size, height: size, justifyContent: 'center', alignItems: 'center' }, style]}>
      <View style={{ width: size, height: size / 5, flexDirection: 'row', justifyContent: 'space-between' }}>
        <View style={{ width: size / 5, height: size / 3, backgroundColor: color, borderRadius: size / 10 }} />
        <View style={{ width: size / 5, height: size / 2, backgroundColor: color, borderRadius: size / 10 }} />
        <View style={{ width: size / 5, height: size / 1.5, backgroundColor: color, borderRadius: size / 10 }} />
      </View>
    </View>
  );
};

// Custom clock icon component
type ClockProps = {
  size: number;
  color: string;
  style?: object;
};

const Clock: React.FC<ClockProps> = ({ size, color, style }) => {
  return (
    <View style={[{ width: size, height: size, justifyContent: 'center', alignItems: 'center' }, style]}>
      <View style={{ width: size, height: size, borderRadius: size / 2, borderWidth: size / 10, borderColor: color, justifyContent: 'center', alignItems: 'center' }}>
        <View style={{ width: size / 3, height: size / 20, backgroundColor: color, position: 'absolute', right: size / 5, transform: [{ rotate: '-45deg' }] }} />
        <View style={{ width: size / 2.5, height: size / 20, backgroundColor: color, position: 'absolute', bottom: size / 3, transform: [{ rotate: '90deg' }] }} />
      </View>
    </View>
  );
};

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
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 8,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)',
  },
  settingInfo: {
    flex: 1,
    marginRight: 16,
  },
  settingTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  settingIcon: {
    marginRight: 8,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '500',
  },
  settingDescription: {
    fontSize: 14,
  },
  radioGroup: {
    marginBottom: 16,
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 8,
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'rgba(0,0,0,0.3)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  radioButtonSelected: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  radioLabel: {
    fontSize: 15,
    fontWeight: '500',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginTop: 16,
    marginBottom: 16,
  },
  actionButtonIcon: {
    marginRight: 8,
  },
  actionButtonText: {
    fontSize: 15,
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
