import React from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity as RNTouchableOpacity,
  TouchableHighlight,
  TouchableNativeFeedback,
  View,
  ViewStyle,
  TextStyle,
  Pressable,
} from 'react-native';

interface AppButtonProps {
  onPress: () => void;
  title: string;
  backgroundColor?: string;
  textColor?: string;
  style?: ViewStyle;
  textStyle?: TextStyle;
  disabled?: boolean;
  outlined?: boolean;
  borderColor?: string;
}

export default function AppButton({
  onPress,
  title,
  backgroundColor = '#007AFF',
  textColor = 'white',
  style,
  textStyle,
  disabled = false,
  outlined = false,
  borderColor,
}: AppButtonProps) {
  // No need to select a ButtonComponent, branch directly in render below

  // Calculate proper styles
  const buttonStyle = [
    styles.button,
    outlined
      ? { borderWidth: 2, borderColor: borderColor || backgroundColor, backgroundColor: 'transparent' }
      : { backgroundColor },
    disabled && styles.disabled,
    style,
  ];

  const finalTextColor = outlined ? (textColor === 'white' ? backgroundColor : textColor) : textColor;
  const buttonTextStyle = [
    styles.text,
    { color: finalTextColor },
    disabled && styles.disabledText,
    textStyle,
  ];
  // Force the delay for touch events on Android to make sure they register properly
  const handlePress = () => {
    if (Platform.OS === 'android') {
      // Using a more significant delay for Android
      setTimeout(() => {
        onPress();
      }, 200);
    } else {
      onPress();
    }
  };
  return (
    Platform.OS === 'android' ? (
      <Pressable
        onPress={handlePress}
        disabled={disabled}
        style={buttonStyle}
        android_ripple={{ color: 'rgba(0, 0, 0, 0.1)' }}
      >
        <Text style={buttonTextStyle}>{title}</Text>
      </Pressable>
    ) : (
      <RNTouchableOpacity
        onPress={handlePress}
        disabled={disabled}
        style={buttonStyle}
        activeOpacity={0.7}
      >
        <Text style={buttonTextStyle}>{title}</Text>
      </RNTouchableOpacity>
    )
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 56,
  },
  text: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    textAlign: 'center',
  },
  disabled: {
    opacity: 0.6,
  },
  disabledText: {
    opacity: 0.8,
  },
});
