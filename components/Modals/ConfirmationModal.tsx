import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { AlertTriangle } from 'lucide-react-native';
import BaseModal from './BaseModal';
import { useTheme } from '../../context/ThemeContext';

interface ConfirmationModalProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  isDestructive?: boolean;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  visible,
  onClose,
  onConfirm,
  title = 'Confirmation',
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  isDestructive = false,
}) => {
  const { colors } = useTheme();
  
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <BaseModal
      visible={visible}
      onClose={onClose}
      title={title}
      closeOnBackdropPress={false}
    >
      <View style={styles.contentContainer}>
        <View style={styles.iconContainer}>
          <AlertTriangle 
            size={32} 
            color={isDestructive ? colors.error : colors.warning} 
          />
        </View>
        <Text style={[styles.message, { color: colors.text }]}>
          {message}
        </Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.cancelButton, { borderColor: colors.border }]}
            onPress={onClose}
          >
            <Text style={[styles.buttonText, { color: colors.text }]}>
              {cancelText}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.button, 
              styles.confirmButton, 
              { backgroundColor: isDestructive ? colors.error : colors.primary }
            ]}
            onPress={handleConfirm}
          >
            <Text style={[styles.buttonText, { color: colors.white }]}>
              {confirmText}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </BaseModal>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    alignItems: 'center',
    paddingVertical: 8,
  },
  iconContainer: {
    marginBottom: 16,
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 24,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    minWidth: 120,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    marginRight: 8,
  },
  confirmButton: {
    marginLeft: 8,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ConfirmationModal;
