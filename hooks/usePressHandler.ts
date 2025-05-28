import { useCallback } from 'react';
import { Platform } from 'react-native';

/**
 * A utility hook to ensure that navigation and button presses work
 * consistently across platforms
 */
export function usePressHandler() {
  return useCallback((callback: () => void) => {
    // Add a small delay on mobile to ensure the gesture is properly processed
    if (Platform.OS !== 'web') {
      // Using a longer delay for Android to ensure the press is registered
      setTimeout(callback, Platform.OS === 'android' ? 100 : 50);
    } else {
      callback();
    }
  }, []);
}
