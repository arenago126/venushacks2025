import { ThemedText } from "@/components/ThemedText";
// This file is part of a React Native application that displays a dashboard with financial information.
import { useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { Dimensions, ScrollView, StyleSheet, View } from "react-native";

const screenWidth = Dimensions.get("window").width;
const TOTAL_DUE = 500;
const TOTAL_DEBT = 50000;
const DUE_COLOR = "#354024";
const OTHER_COLOR = "#4c3d19";
const BG_COLOR = "#E5D7C4";

export default function DashboardScreen() {
  const { scholarships, grants, income, expenses, costOfAttendance, giftAid } =
    useLocalSearchParams();

  const toNumber = (val: unknown) => parseFloat(String(val || "0"));

  const unmetNeed =
    toNumber(costOfAttendance) -
    toNumber(giftAid) -
    toNumber(scholarships) -
    toNumber(grants);

  const annualInterestRate = 0.05;
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

        <View style={styles.infoCard}>
          <ThemedText style={styles.cardLabel}>
            Unmet Need (Loan Principal)
          </ThemedText>
          <ThemedText style={styles.cardValue}>
            ${principal.toFixed(2)}
          </ThemedText>
        </View>

        <View style={styles.infoCard}>
          <ThemedText style={styles.cardLabel}>Fixed Interest Rate</ThemedText>
          <ThemedText style={styles.cardValue}>
            {(annualInterestRate * 100).toFixed(2)}% APR
          </ThemedText>
        </View>

        <View style={styles.infoCard}>
          <ThemedText style={styles.cardLabel}>Monthly Payment</ThemedText>
          <ThemedText style={styles.cardValue}>
            ${monthlyPayment.toFixed(2)}
          </ThemedText>
        </View>

        <View style={styles.infoCard}>
          <ThemedText style={styles.cardLabel}>Net Monthly Income</ThemedText>
          <ThemedText style={styles.cardValue}>
            ${netIncome.toFixed(2)}
          </ThemedText>
        </View>

        <View style={styles.infoCard}>
          <ThemedText style={styles.cardLabel}>
            Payment as % of Net Income
          </ThemedText>
          <ThemedText style={styles.cardValue}>
            {paymentPercentIncome.toFixed(1)}%
          </ThemedText>
        </View>
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#354024",
  },
  infoCard: {
    backgroundColor: "#E5D7C4",
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },

  cardLabel: {
    color: "#354024",
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },

  cardValue: {
    color: "#4c3d19",
    fontSize: 18,
    fontWeight: "bold",
  },
});
