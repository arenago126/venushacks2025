import { ThemedText } from "@/components/ThemedText";
// This file is part of a React Native application that displays a dashboard with financial information.
import { useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { Dimensions, ScrollView, StyleSheet, View } from "react-native";

const screenWidth = Dimensions.get("window").width;
const TOTAL_DUE = 500; // Example total due for calculation
const TOTAL_DEBT = 50000;
const DUE_COLOR = "#354024";
const OTHER_COLOR = "#4c3d19";
const BG_COLOR = "#E5D7C4";

const CalendarBox = () => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [paymentDate, setPaymentDate] = useState<Date | null>(null);
};

export default function DashboardScreen() {
  const { scholarships, grants, income, expenses, costOfAttendance, giftAid } =
    useLocalSearchParams();

  const toNumber = (val: unknown) => parseFloat(String(val || "0"));

  // Calculate unmet need = costOfAttendance - giftAid
  const unmetNeed = toNumber(costOfAttendance) - toNumber(giftAid);

  // Assume fixed interest rate for loans
  const annualInterestRate = 0.05; // 5% annual interest (example)
  const monthlyInterestRate = annualInterestRate / 12;

  const loanTermMonths = 10 * 12; // 10 years in months

  // Monthly payment formula for amortized loan:
  // M = P * r * (1 + r)^n / ((1 + r)^n - 1)
  // P = principal (unmet need), r = monthly interest rate, n = total months

  const principal = unmetNeed > 0 ? unmetNeed : 0;

  let monthlyPayment = 0;
  if (principal > 0) {
    monthlyPayment =
      (principal *
        monthlyInterestRate *
        Math.pow(1 + monthlyInterestRate, loanTermMonths)) /
      (Math.pow(1 + monthlyInterestRate, loanTermMonths) - 1);
  }

  const netIncome = toNumber(income) - toNumber(expenses);

  // Optional: show affordability (e.g. monthly payment as % of net income)
  const paymentPercentIncome =
    netIncome > 0 ? (monthlyPayment / netIncome) * 100 : 0;

  const [input, setInput] = useState("");
  const [amount, setAmount] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [paymentDate, setPaymentDate] = useState<Date | null>(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const [dueDate, setDueDate] = useState<string | null>(null);

  const handleSubmit = () => {
    const payment = parseFloat(input) || 0;
    if (payment < 0) {
      setAmount((prev) => (parseFloat(prev) + payment).toString());
      setInput("");
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
    if (selectedDate) setDueDate(selectedDate.toISOString().split("T")[0]);
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
  let statusMessage = "";
  if (paid > TOTAL_DUE) {
    statusMessage = `You have overpaid by $${(paid - TOTAL_DUE).toFixed(2)}.`;
  } else if (paid === TOTAL_DUE) {
    statusMessage = "You have paid the full amount due.";
  } else if (paid < TOTAL_DUE && paid > 0) {
    statusMessage = `You still need to pay $${leftToPay.toFixed(2)}.`;
  } else {
    statusMessage = "Please enter an amount to see your payment status.";
  }

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: BG_COLOR }}
      contentContainerStyle={{ padding: 20 }}
    >
      {/* Greeting */}
      <ThemedText style={styles.greeting} type="title">
        ZERO BOUND
      </ThemedText>
      {/* New 10-Year Loan Plan Summary */}
      <View style={styles.card}>
        <ThemedText style={styles.sectionTitle}>
          10-Year Loan Payoff Plan
        </ThemedText>
        <ThemedText>
          Unmet Need (Loan Principal): ${principal.toFixed(2)}
        </ThemedText>
        <ThemedText>
          Fixed Interest Rate: {(annualInterestRate * 100).toFixed(2)}% APR
        </ThemedText>
        <ThemedText>Monthly Payment: ${monthlyPayment.toFixed(2)}</ThemedText>
        <ThemedText>
          Monthly Net Income (Income - Expenses): ${netIncome.toFixed(2)}
        </ThemedText>
        <ThemedText>
          Payment is {paymentPercentIncome.toFixed(1)}% of your net income.
        </ThemedText>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  greeting: {
    marginBottom: 16,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    fontWeight: "bold",
    fontSize: 28,
    color: "#354024",
  },
  card: {
    backgroundColor: "#889063",
    marginTop: 16,
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
  },
  label: {
    color: "#E5D7C4",
    fontSize: 20,
    marginBottom: 4,
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
    textAlign: "center",
  },
  balance: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#E5D7C4",
    lineHeight: 40,
    marginBottom: 8,
    alignContent: "center",
    textAlign: "center",
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#354024",
  },
  row: {
    flexDirection: "row",
    gap: 12,
  },
  paymentCard: {
    flex: 1,
    borderRadius: 12,
    padding: 16,
    marginRight: 8,
  },
  paymentTitle: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 4,
    lineHeight: 22,
  },
  paymentAmount: {
    color: "#E5D7C4",
    marginBottom: 2,
  },
  paymentDue: {
    color: "#E5D7C4",
    fontSize: 12,
  },
  transactionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  transactionName: {
    color: "#3B3B54",
  },
  transactionAmountNeg: {
    color: "#FF4D4F",
    fontWeight: "bold",
  },
  box: {
    backgroundColor: "#354024",
    borderRadius: 20,
    padding: 24,
    marginBottom: 24,
    alignItems: "center",
  },
  boxText: {
    color: "#fff",
    fontSize: 18,
    textAlign: "center",
    marginBottom: 12,
  },
  input: {
    backgroundColor: "#889063",
    color: "#fff",
    borderRadius: 8,
    padding: 10,
    width: "80%",
    marginBottom: 12,
    textAlign: "center",
    fontSize: 18,
  },
  boxRow: {
    flexDirection: "row",
    backgroundColor: "#889063",
    borderRadius: 20,
    padding: 24,
    marginBottom: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  boxTextSmall: {
    color: "#fff",
    fontSize: 16,
    marginBottom: 4,
  },
  boxChart: {
    backgroundColor: "#354024",
    borderRadius: 20,
    padding: 24,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
  },
  chartCenterText: {
    position: "absolute",
    top: 70,
    left: 0,
    right: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  chartText: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    alignItems: "center",
    justifyContent: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 24,
    alignItems: "center",
    width: 280,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#354024",
  },
  modalText: {
    fontSize: 16,
    marginBottom: 8,
    color: "#354024",
  },
  chartBox: {
    backgroundColor: "#889063",
    borderRadius: 18,
    padding: 18,
    marginBottom: 28,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    alignItems: "center",
    position: "relative",
    justifyContent: "center",
  },
  chartHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 8,
  },
  chartLabel: {
    color: "#354024",
    fontSize: 15,
    backgroundColor: "#889063",
  },
  monthBox: {
    backgroundColor: "#889063",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 2,
  },
  monthText: {
    color: "#354024",
    fontSize: 14,
    fontWeight: "bold",
  },
  chartSvgContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    flexDirection: "row",
    color: "#354024",
    backgroundColor: "#889063",
  },
  chartCenter: {
    position: "absolute",
    top: 70,
    left: 0,
    right: 0,
    alignItems: "center",
    justifyContent: "center",
    pointerEvents: "none",
  },
  chartBalance: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#354024",
    backgroundColor: "#889063",
  },
  chartSub: {
    color: "#354024",
    fontSize: 15,
    marginTop: 2,
  },
});
