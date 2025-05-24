import { ThemedText } from '@/components/ThemedText';
import { MaterialIcons } from '@expo/vector-icons';
// This file is part of a React Native application that displays a dashboard with financial information.
import React, { useState } from 'react';
import { Button, Dimensions, Modal, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { TextInput } from 'react-native-gesture-handler';
import Svg, { Circle, G } from 'react-native-svg';

const screenWidth = Dimensions.get('window').width;
const TOTAL_DUE = 500; // Example total due for calculation
const TOTAL_DEBT = 50000;
const DUE_COLOR = '#354024';
const OTHER_COLOR = '#4c3d19';
const BG_COLOR = '#E5D7C4';

const CalendarBox = () => {
    const [showCalendar, setShowCalendar] = useState(false);
    const [paymentDate, setPaymentDate] = useState<Date | null>(null);
};

export default function DashboardScreen() {
  const [input, setInput] = useState('');
  const [amount, setAmount] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [paymentDate, setPaymentDate] = useState<Date | null>(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const [dueDate, setDueDate] = useState<string | null>(null);

  const handleSubmit = () => {
    const payment = parseFloat(input) || 0;
    if (payment < 0) {
      setAmount(prev => (parseFloat(prev) + payment).toString());
      setInput('');
    }
  };

  const handleChartPress = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleDayPress = (day: any) => {
    setDueDate(day.dateString);
    setShowCalendar(false);
  };

  // Handles the date change from DateTimePicker
  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) setDueDate(selectedDate.toISOString().split('T')[0]);
  };

  const paid = parseFloat(amount) || 0;
  const percentPaid = Math.min(paid / TOTAL_DEBT, 1);
  const leftToPay = Math.max(TOTAL_DUE - paid, 0);

  // Chart math
  const savingsPercent = TOTAL_DUE / TOTAL_DEBT;

  // Chart dimensions
  const size = 180;
  const strokeWidth = 24;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  // Arc calculations
  const paidArcLength = circumference * percentPaid;
  const remainingArcLength = circumference - paidArcLength;

  // Status message based on payment
  let statusMessage = '';
  if (paid > TOTAL_DUE) {
    statusMessage = `You have overpaid by $${(paid - TOTAL_DUE).toFixed(2)}.`;
  } else if (paid === TOTAL_DUE) {
    statusMessage = 'You have paid the full amount due.';
  } else if (paid < TOTAL_DUE && paid > 0) {
    statusMessage = `You still need to pay $${leftToPay.toFixed(2)}.`;
  } else {
    statusMessage = 'Please enter an amount to see your payment status.';
  }

  return (
    <ScrollView style={{ flex: 1, backgroundColor: BG_COLOR }} contentContainerStyle={{ padding: 20 }}>
      {/* Greeting */}
      <ThemedText style={styles.greeting} type="title">Hello, Jane Doe!</ThemedText>
      {/* Current Balance */}
      <View style={styles.card}>
        <ThemedText style={styles.label}>Hey, There! You needed to pay $500</ThemedText>
        <TextInput
          style={styles.balance}
          placeholder="Enter your balance"
          placeholderTextColor="#E5D7C4"
          keyboardType="numeric"
          textAlign="center"
          value={amount}
          onChangeText={setAmount}
          onSubmitEditing={handleSubmit}
          returnKeyType="done"
        />
        <ThemedText style={styles.label}>
          {paid >= TOTAL_DUE ? 'Payment Complete!' : `Remaining $${(TOTAL_DUE - paid).toFixed(2)}`}
        </ThemedText>
        {statusMessage !== '' && (
          <ThemedText style={styles.label}>{statusMessage}</ThemedText>
        )}
      </View>

      {/* Calendar Box */}
      <TouchableOpacity
        style={styles.calendarBox}
        onPress={() => setShowCalendar(true)}
        activeOpacity={0.8}
      >
        <View style={styles.calendarIconBox}>
          <MaterialIcons name="calendar-today" size={40} color="#354024" />
        </View>
        <View style={styles.calendarTextBox}>
          <ThemedText style={styles.calendarLabel}>Next payment date:</ThemedText>
          <ThemedText style={styles.calendarDate}>
            {dueDate ? new Date(dueDate).toLocaleDateString() : '--/--/----'}
          </ThemedText>
        </View>
      </TouchableOpacity>

      {/* Calendar Modal */}
      {showCalendar && (
        <Modal visible={showCalendar} transparent animationType="fade">
          <View style={styles.modalOverlay}>
            <View style={styles.calendarModalContent}>
              <Calendar
                onDayPress={handleDayPress}
                markedDates={dueDate ? { [dueDate]: { selected: true, selectedColor: '#889063' } } : {}}
                theme={{
                  backgroundColor: '#E5D7C4',
                  calendarBackground: '#E5D7C4',
                  textSectionTitleColor: '#354024',
                  selectedDayBackgroundColor: '#354024',
                  selectedDayTextColor: '#354024',
                  todayTextColor: '#354024',
                  dayTextColor: '#354024',
                  textDisabledColor: '#354024',
                  arrowColor: '#354024',
                  monthTextColor: '#354024',
                  indicatorColor: '#5B5BF6',
                  textDayFontWeight: 'bold',
                  textMonthFontWeight: 'bold',
                  textDayHeaderFontWeight: 'bold',
                  textDayFontSize: 16,
                  textMonthFontSize: 18,
                  textDayHeaderFontSize: 14,
                }}
                style={{ borderRadius: 16 }}
              />
              <Button  title="Close" onPress={() => setShowCalendar(false)} color='#889063' />
            </View>
          </View>
        </Modal>
      )}

      {/* Chart Box */}
      <TouchableOpacity
        style={styles.chartBox}
        onPress={() => setShowModal(true)}
        activeOpacity={0.8}
      >
        <View style={styles.chartHeader}>
          <ThemedText style={styles.chartLabel}>Progress</ThemedText>
          <View style={styles.monthBox}><ThemedText style={styles.monthText}>Month ▼</ThemedText></View>
        </View>
        <View style={styles.chartSvgContainer}>
          <Svg width={size} height={size}>
            <G rotation="-90" origin={`${size / 2}, ${size / 2}`}> 
              {/* Other */}
              <Circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                stroke={OTHER_COLOR}
                strokeWidth={strokeWidth}
                strokeDasharray={`${remainingArcLength},${circumference}`}
                strokeLinecap="round"
                fill="none"
              />
              {/* Savings */}
              <Circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                stroke={DUE_COLOR}
                strokeWidth={strokeWidth}
                strokeDasharray={`${paidArcLength},${circumference}`}
                strokeDashoffset={-remainingArcLength}
                strokeLinecap="round"
                fill="none"
              />
            </G>
          </Svg>
          <View style={styles.chartCenter} pointerEvents="none">
            <ThemedText style={styles.chartBalance}>${paid.toFixed()}</ThemedText>
            <ThemedText style={styles.chartSub}>{(percentPaid * 100).toFixed(0)}%</ThemedText>
          </View>
        </View>
      </TouchableOpacity>
      <Modal visible={showModal} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <ThemedText style={styles.modalTitle}>Balance Details</ThemedText>
            <ThemedText style={styles.modalText}>Debt: ${TOTAL_DEBT.toLocaleString()}</ThemedText>
            <ThemedText style={styles.modalText}>Remaining Amount: ${(TOTAL_DEBT- TOTAL_DUE).toLocaleString()}</ThemedText>
            <Button title="Close" onPress={handleCloseModal} color='#889063' />
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  greeting: {
    marginBottom: 16,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 'bold',
    fontSize: 28,
    color: '#354024',
  },
  card: {
    backgroundColor: '#889063',
    marginTop: 16,
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
  },
  label: {
    color: '#E5D7C4',
    fontSize: 20,
    marginBottom: 4,
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    textAlign: 'center',
  },
  balance: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#E5D7C4',
    lineHeight: 40,
    marginBottom: 8,
    alignContent: 'center',
    textAlign: 'center',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#354024',
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
    lineHeight: 22,
  },
  paymentAmount: {
    color: '#E5D7C4',
    marginBottom: 2,
  },
  paymentDue: {
    color: '#E5D7C4',
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
  box: {
    backgroundColor: '#354024',
    borderRadius: 20,
    padding: 24,
    marginBottom: 24,
    alignItems: 'center',
  },
  boxText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 12,
  },
  input: {
    backgroundColor: '#889063',
    color: '#fff',
    borderRadius: 8,
    padding: 10,
    width: '80%',
    marginBottom: 12,
    textAlign: 'center',
    fontSize: 18,
  },
  boxRow: {
    flexDirection: 'row',
    backgroundColor: '#889063',
    borderRadius: 20,
    padding: 24,
    marginBottom: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  calendarBox: {
    flexDirection: 'row',
    backgroundColor: '#889063',
    borderRadius: 18,
    padding: 18,
    alignItems: 'center',
    marginBottom: 28,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
  },
  calendarIconBox: {
    marginRight: 16,
    backgroundColor: '#E5D7C4',
    borderRadius: 12,
    padding: 8,
  },
  calendarTextBox: {
    flex: 1,
  },
  boxTextSmall: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 4,
  },
  boxChart: {
    backgroundColor: '#354024',
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  chartCenterText: {
    position: 'absolute',
    top: 70,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chartText: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    width: 280,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#354024',
  },
  modalText: {
    fontSize: 16,
    marginBottom: 8,
    color: '#354024',
  },
  chartBox: {
    backgroundColor: '#889063',
    borderRadius: 18,
    padding: 18,
    marginBottom: 28,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    alignItems: 'center',
    position: 'relative',
    justifyContent: 'center',
  },
  chartHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 8,
  },
  chartLabel: {
    color: '#354024',
    fontSize: 15,
    backgroundColor: '#889063',
  },
  monthBox: {
    backgroundColor: '#889063',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 2,
  },
  monthText: {
    color: '#354024',
    fontSize: 14,
    fontWeight: 'bold',
  },
  chartSvgContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    flexDirection: 'row',
    color: '#354024',
    backgroundColor: '#889063',
  },
  chartCenter: {
    position: 'absolute',
    top: 70,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    pointerEvents: 'none',
  },
  chartBalance: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#354024',
    backgroundColor: '#889063',
  },
  chartSub: {
    color: '#354024',
    fontSize: 15,
    marginTop: 2,
  },
  calendarLabel: {
    color: '#354024',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  calendarDate: {
    color: '#354024',
    fontSize: 25,
    fontWeight: 'bold',
  },
  calendarModalContent: {
    backgroundColor: '#E5D7C4',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    width: 320,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
  },
});