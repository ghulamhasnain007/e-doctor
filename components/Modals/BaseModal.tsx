import React from 'react';
import { Modal as RNModal, View, StyleSheet, Pressable, TouchableOpacity, Text } from 'react-native';
import { X } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../../context/ThemeContext';

interface BaseModalProps {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  closeOnBackdropPress?: boolean;
}

const BaseModal: React.FC<BaseModalProps> = ({
  visible,
  onClose,
  children,
  title,
  closeOnBackdropPress = true,
}) => {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <RNModal
      animationType="fade"
      transparent
      visible={visible}
      onRequestClose={onClose}
    >
      <Pressable
        style={[styles.backdrop, { paddingTop: insets.top }]}
        onPress={() => closeOnBackdropPress && onClose()}
      >
        <View
          style={[
            styles.modalContainer,
            { backgroundColor: colors.background },
          ]}
          // This prevents the backdrop press from closing the modal when clicking on the modal content
          onStartShouldSetResponder={() => true}
        >
          <View style={styles.modalHeader}>
            {title && (
              <Text style={[styles.title, { color: colors.text }]}>
                {title}
              </Text>
            )}
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <X size={24} color={colors.text} />
            </TouchableOpacity>
          </View>
          <View style={styles.contentContainer}>{children}</View>
        </View>
      </Pressable>
    </RNModal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '85%',
    maxWidth: 400,
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    flex: 1,
  },
  closeButton: {
    padding: 4,
  },
  contentContainer: {
    padding: 16,
  },
});

export default BaseModal;
