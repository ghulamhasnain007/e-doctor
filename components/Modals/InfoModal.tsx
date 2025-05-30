import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Info } from 'lucide-react-native';
import BaseModal from './BaseModal';
import { useTheme } from '../../context/ThemeContext';

interface InfoModalProps {
  visible: boolean;
  onClose: () => void;
  title?: string;
  message: string;
  buttonText?: string;
}

const InfoModal: React.FC<InfoModalProps> = ({
  visible,
  onClose,
  title = 'Information',
  message,
  buttonText = 'OK',
}) => {
  const { colors } = useTheme();

  return (
    <BaseModal
      visible={visible}
      onClose={onClose}
      title={title}
    >
      <View style={styles.contentContainer}>
        <View style={styles.iconContainer}>
          <Info size={32} color={colors.primary} />
        </View>
        <Text style={[styles.message, { color: colors.text }]}>
          {message}
        </Text>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: colors.primary }]}
          onPress={onClose}
        >
          <Text style={[styles.buttonText, { color: colors.white }]}>
            {buttonText}
          </Text>
        </TouchableOpacity>
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
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    minWidth: 120,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
});

export default InfoModal;
