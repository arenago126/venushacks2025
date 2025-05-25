import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Button, ScrollView, StyleSheet, Text, View } from "react-native";

export default function CalculatorScreen() {
  const { scholarships, grants, income, expenses, costOfAttendance, giftAid } =
    useLocalSearchParams();

  const toNumber = (val: unknown) => parseFloat(String(val || "0"));

  const totalAid = toNumber(scholarships) + toNumber(grants);
  const netIncome = toNumber(income) - toNumber(expenses);
  const unmetNeed = toNumber(costOfAttendance) - toNumber(giftAid);

  const summaryItems = [
    { label: "Scholarships", value: scholarships },
    { label: "Grants", value: grants },
    { label: "Total Aid", value: `${totalAid.toFixed(2)}` },
    { label: "Net Income", value: `${netIncome.toFixed(2)}` },
    { label: "Cost of Attendance", value: costOfAttendance },
    { label: "Gift Aid", value: giftAid },
    { label: "Unmet Need", value: `${unmetNeed.toFixed(2)}` },
  ];

  const router = useRouter();

  const handleGoToDashboard = () => {
    router.push({
      pathname: "/(tabs)",
      params: {
        scholarships,
        grants,
        income,
        expenses,
        costOfAttendance,
        giftAid,
      },
    });
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.title}>
        Financial Summary
      </ThemedText>

      <ScrollView
        contentContainerStyle={styles.summaryGrid}
        showsVerticalScrollIndicator={false}
      >
        {summaryItems.map(({ label, value }) => (
          <View style={styles.infoCard} key={label}>
            <Text style={styles.cardLabel}>{label}</Text>
            <Text style={styles.cardValue}>${value}</Text>
          </View>
        ))}
      </ScrollView>
      <Button
        title="View 10-Year Loan Plan"
        onPress={handleGoToDashboard}
        color="#889063"
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E5D7C4",
    paddingTop: 60,
    alignItems: "center",
  },
  title: {
    marginBottom: 20,
    color: "#889063",
    fontSize: 28,
    fontWeight: "bold",
  },
  summaryGrid: {
    width: "90%",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 16,
    paddingBottom: 40,
  },
  infoCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    width: "48%",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  cardLabel: {
    fontSize: 14,
    color: "#889063",
    fontWeight: "bold",
    marginBottom: 6,
    textAlign: "center",
  },
  cardValue: {
    fontSize: 18,
    color: "#333",
    fontWeight: "bold",
    textAlign: "center",
  },
});
