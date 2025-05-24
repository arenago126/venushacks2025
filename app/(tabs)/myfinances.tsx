import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { StyleSheet } from 'react-native';

export default function CalculatorScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.header}>
      <ThemedText type="title" style={styles.title}>My Finances</ThemedText>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    alignItems: 'center',
    backgroundColor: '#E5D7C4',
  },
  header: {
    backgroundColor: '#889063',
    marginTop: 16,
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
  },
  title: {
  color: '#E5D7C4'}
},
);
