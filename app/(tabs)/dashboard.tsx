import { ThemedText } from '@/components/ThemedText';
import { ScrollView, StyleSheet, View } from 'react-native';

export default function DashboardScreen() {
  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#F6F7FB' }} contentContainerStyle={{ padding: 20 }}>
      {/* Greeting */}
      <ThemedText style={styles.greeting} type="title">Hello, Jane Doe!</ThemedText>
      {/* Current Balance */}
      <View style={styles.card}>
        <ThemedText style={styles.label}>Current Balance</ThemedText>
        <ThemedText style={styles.balance}>$4,570.80</ThemedText>
      </View>
      {/* Upcoming Payments */}
      <View style={styles.section}>
        <ThemedText style={styles.sectionTitle}>Upcoming payment</ThemedText>
        <View style={styles.row}>
          <View style={[styles.paymentCard, { backgroundColor: '#E5E0FF' }]}> 
            <ThemedText style={styles.paymentTitle}>Adobe Premium</ThemedText>
            <ThemedText style={styles.paymentAmount}>$30/month</ThemedText>
            <ThemedText style={styles.paymentDue}>2 days left</ThemedText>
          </View>
          <View style={[styles.paymentCard, { backgroundColor: '#F6F7FB', borderWidth: 1, borderColor: '#E0E0E0' }]}> 
            <ThemedText style={styles.paymentTitle}>Apple Premium</ThemedText>
            <ThemedText style={styles.paymentAmount}>$30/month</ThemedText>
            <ThemedText style={styles.paymentDue}>2 days left</ThemedText>
          </View>
        </View>
      </View>
      {/* Recent Transactions */}
      <View style={styles.section}>
        <ThemedText style={styles.sectionTitle}>Recent Transactions</ThemedText>
        <View style={styles.transactionRow}>
          <ThemedText style={styles.transactionName}>Apple Inc.</ThemedText>
          <ThemedText style={styles.transactionAmountNeg}>- $230.50</ThemedText>
        </View>
        <View style={styles.transactionRow}>
          <ThemedText style={styles.transactionName}>Adobe</ThemedText>
          <ThemedText style={styles.transactionAmountNeg}>- $130.50</ThemedText>
        </View>
        <View style={styles.transactionRow}>
          <ThemedText style={styles.transactionName}>Amazon</ThemedText>
          <ThemedText style={styles.transactionAmountNeg}>- $20.50</ThemedText>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  greeting: {
    marginBottom: 16,
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: '#E5E0FF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
  },
  label: {
    color: '#6C6C80',
    fontSize: 16,
    marginBottom: 4,
  },
  balance: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#3B3B54',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#3B3B54',
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  paymentCard: {
    flex: 1,
    borderRadius: 12,
    padding: 16,
    marginRight: 8,
  },
  paymentTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4,
  },
  paymentAmount: {
    color: '#6C6C80',
    marginBottom: 2,
  },
  paymentDue: {
    color: '#A0A0B2',
    fontSize: 12,
  },
  transactionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  transactionName: {
    color: '#3B3B54',
  },
  transactionAmountNeg: {
    color: '#FF4D4F',
    fontWeight: 'bold',
  },
});
