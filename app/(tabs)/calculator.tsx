import { ThemedText } from '@/components/ThemedText';
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Row, Rows, Table } from 'react-native-table-component';

const MAIN_COLOR = '#E5D7C4'; // Light beige/cream
const SECONDARY_COLOR = '#889063'; // Olive Green
const widthArray = [200, 400]; // Example widths for the columns

export default function ChatbotScreen() {
  const tableHead = ['Category', 'Amount'];
  const tableData = [
    ['Loan Principle', '23'],
    ['Intererst', '27'],
    ['Income', '30'],
    ['External Expenses', '22'],
    // Add more rows as needed
  ];

  // Modified summaryData to include trend information for the new cards
  const summaryData = [
    {
      title: "Total Debt",
      amount: "$138,500",
    },
    {
      title: "Paid",
      amount: "$97,400",
    },
  ];

  return (
    <ScrollView style={{ flex: 1, backgroundColor: MAIN_COLOR}}>
      <ThemedText style={styles.greeting} type="title">Summary Finances</ThemedText>
      
      {/* NEW SECTION: Top Summary Cards as per the image */}
      <View style={styles.newSummaryRow}>
        {summaryData.map((item, index) => (
          <View key={index} style={styles.newSummaryCard}>
            <ThemedText style={styles.newSummaryTitle}>{item.title}</ThemedText>
            <ThemedText style={styles.newSummaryMainAmount}>{item.amount}</ThemedText>
            <View style={styles.newTrendRow}>
            </View>
          </View>
        ))}
      </View>
      {/* END NEW SECTION */}

      {/* Existing "Hey, There!" card - kept as per your request not to change existing code */}
      <View style={styles.card}>
        <ThemedText style={styles.label}>Hey, There! You needed to pay $500</ThemedText>
      </View>
      
      {/* Existing table section */}
      <View style={[styles.container, { backgroundColor: MAIN_COLOR }]}>
        <ScrollView horizontal contentContainerStyle={ styles.horizontalScrollViewContent }>
          <View style={styles.centered}>
            <Table borderStyle={{ borderWidth: 3, borderColor: SECONDARY_COLOR}}> 
              <Row data={tableHead} style={styles.head} textStyle={styles.textHeader} widthArr={widthArray}/>
              <Rows data={tableData} textStyle={styles.text} widthArr={widthArray} />
            </Table>
          </View>
        </ScrollView>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  // Existing styles (no changes here for the table or original card)
  container: {
    flex: 1,
    padding: 16,
  },
  greeting: {
    textAlign: 'center',
    fontSize: 24,
    padding: 10,
    marginVertical: 40,
    color: '#354024',
    fontWeight: 'bold',
  },
  // NOTE: This summaryContainer was used for the previous attempt at cards.
  // It's not being used for the new top cards, but is kept as per "do not change existing".
  summaryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginBottom: 20,
    flexWrap: 'wrap',
  },
  // NOTE: This summaryCard was used for the previous attempt at cards.
  // It's not being used for the new top cards, but is kept as per "do not change existing".
  summaryCard: {
    backgroundColor: '#889063',
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  summaryTitle: {
    fontSize: 16,
    color: '#354024',
    marginBottom: 8,
    fontWeight: 'bold',
  },
  summaryAmount: {
    fontSize: 22,
    color: '#354024',
    fontWeight: 'bold',
    marginBottom: 12,
  },
  trendContainer: {
    // Add any needed styles
  },
  trendText: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  comparisonText: {
    fontSize: 12,
    color: '#354024',
    marginBottom: 4,
  },
  previousAmount: {
    fontSize: 12,
    color: '#354024',
    fontStyle: 'italic',
  },
  card: { // Existing "Hey, There!" card style
    padding: 20,
    borderRadius: 10,
    marginHorizontal: 20,
    marginBottom: 20,
    backgroundColor: '#889063', 
  },
  head: {
    height: 50,
    backgroundColor: '#889063',
  },
  centered: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center', 
    alignContent: 'center',
    flexDirection: 'row',
    flex: 1,
  },
  label: {
    fontSize: 18,
    color: '#354024',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  text: {
    margin: 10,
    textAlign: 'center',
    fontSize: 16,
    color: '#354024',
    fontWeight: 'bold',
  },
  textHeader: {
    margin: 10,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#354024',
    fontSize: 17,
  },
  horizontalScrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center', 
  },

  // NEW STYLES FOR THE TOP SUMMARY CARDS (matching the image)
  newSummaryRow: {
    flexDirection: 'row', // Arrange cards horizontally
    justifyContent: 'space-around', // Distribute space evenly around cards
    alignItems: 'flex-start', // Align cards to the top
    paddingHorizontal: 10, // Padding from screen edges
    marginBottom: 20, // Space below this row
    marginTop: 10, // Space above this row
  },
  newSummaryCard: {
    backgroundColor: SECONDARY_COLOR, // Olive green background for the cards
    borderRadius: 8,
    padding: 15,
    flex: 1, // Allows cards to take equal available space in the row
    marginHorizontal: 5, // Space between individual cards
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
    minHeight: 100, // Ensure a minimum height for consistent look
    justifyContent: 'space-between', // Distribute content vertically within the card
  },
  newSummaryTitle: {
    fontSize: 14,
    color: MAIN_COLOR, // Light text color on olive background
    marginBottom: 5,
    fontWeight: 'bold',
  },
  newSummaryMainAmount: {
    fontSize: 15,
    color: MAIN_COLOR, // Light text color
    fontWeight: 'bold',
    marginBottom: 10, // Space below the main amount
  },
  newTrendRow: {
    flexDirection: 'row', // Percentage and comparison text in a row
    alignItems: 'center', // Vertically align them
  },
  newTrendPercentage: {
    fontSize: 12,
    fontWeight: 'bold',
    color: MAIN_COLOR, // Light text color
    marginRight: 5, // Space between percentage and comparison text
  },
  newTrendComparison: {
    fontSize: 10,
    color: MAIN_COLOR, // Light text color
  },
});