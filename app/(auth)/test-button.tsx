import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@/context/ThemeContext';
import AppButton from '@/components/AppButton';

export default function TestButtonScreen() {
  const { colors } = useTheme();
  const [counter, setCounter] = useState(0);

  const handlePress = () => {
    console.log('Button pressed!');
    setCounter(prevCount => prevCount + 1);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.content}>
        <Text style={[styles.title, { color: colors.text }]}>
          Button Test Screen
        </Text>
        
        <Text style={[styles.counter, { color: colors.primary }]}>
          Button pressed: {counter} times
        </Text>
        
        <AppButton
          title="Press Me"
          backgroundColor={colors.primary}
          textColor="#fff"
          onPress={handlePress}
          style={{
            width: '100%',
            height: 56,
            borderRadius: 28,
            marginTop: 20,
          }}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    marginBottom: 16,
  },
  counter: {
    fontSize: 18,
    fontFamily: 'Inter-Medium',
    marginBottom: 24,
  },
});
