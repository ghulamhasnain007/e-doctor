import React, { createContext, useContext, useState, ReactNode } from 'react';
import { InfoModal, ConfirmationModal } from '../components/Modals';

interface ModalContextType {
  showInfo: (props: ShowInfoModalProps) => void;
  showConfirmation: (props: ShowConfirmationModalProps) => void;
  hideModals: () => void;
}

interface ShowInfoModalProps {
  title?: string;
  message: string;
  buttonText?: string;
  onClose?: () => void;
}

interface ShowConfirmationModalProps {
  title?: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel?: () => void;
  isDestructive?: boolean;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [infoVisible, setInfoVisible] = useState(false);
  const [confirmationVisible, setConfirmationVisible] = useState(false);
  
  const [infoProps, setInfoProps] = useState<ShowInfoModalProps>({
    message: '',
  });
  
  const [confirmationProps, setConfirmationProps] = useState<ShowConfirmationModalProps>({
    message: '',
    onConfirm: () => {},
  });

  const showInfo = (props: ShowInfoModalProps) => {
    setInfoProps(props);
    setInfoVisible(true);
  };

  const showConfirmation = (props: ShowConfirmationModalProps) => {
    setConfirmationProps(props);
    setConfirmationVisible(true);
  };

  const hideModals = () => {
    setInfoVisible(false);
    setConfirmationVisible(false);
  };

  const handleInfoClose = () => {
    setInfoVisible(false);
    if (infoProps.onClose) {
      infoProps.onClose();
    }
  };

  const handleConfirmationClose = () => {
    setConfirmationVisible(false);
    if (confirmationProps.onCancel) {
      confirmationProps.onCancel();
    }
  };

  return (
    <ModalContext.Provider value={{ showInfo, showConfirmation, hideModals }}>
      {children}
      
      <InfoModal
        visible={infoVisible}
        onClose={handleInfoClose}
        title={infoProps.title}
        message={infoProps.message}
        buttonText={infoProps.buttonText}
      />
      
      <ConfirmationModal
        visible={confirmationVisible}
        onClose={handleConfirmationClose}
        onConfirm={confirmationProps.onConfirm}
        title={confirmationProps.title}
        message={confirmationProps.message}
        confirmText={confirmationProps.confirmText}
        cancelText={confirmationProps.cancelText}
        isDestructive={confirmationProps.isDestructive}
      />
    </ModalContext.Provider>
  );
};

export const useModal = (): ModalContextType => {
  const context = useContext(ModalContext);
  if (context === undefined) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};
