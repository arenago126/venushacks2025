import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import * as DocumentPicker from "expo-document-picker";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

type FinanceInputsProps = {
  scholarships: string;
  setScholarships: (value: string) => void;
  grants: string;
  setGrants: (value: string) => void;
  income: string;
  setIncome: (value: string) => void;
  expenses: string;
  setExpenses: (value: string) => void;
};

type FileUploadWidgetProps = {
  setCostOfAttendance: (value: string) => void;
  setGiftAid: (value: string) => void;
};

// function FileUploadWidget({
//   setCostOfAttendance,
//   setGiftAid,
// }: FileUploadWidgetProps) {
//   const [fileName, setFileName] = useState("");

//   const pickFile = async () => {
//     const result = await DocumentPicker.getDocumentAsync({
//       type: "application/pdf",
//       copyToCacheDirectory: true,
//     });

//     if (!result.canceled) {
//       const fileUri = result.assets[0].uri;
//       setFileName(result.assets[0].name);
//       console.log("File URI:", fileUri);

//       // Simulate parsing results (replace with real backend call later)
//       setCostOfAttendance("45000");
//       setGiftAid("25000");
//     }
//   };

function FileUploadWidget({
  setCostOfAttendance,
  setGiftAid,
}: FileUploadWidgetProps) {
  const [fileName, setFileName] = useState("");
  const pickFile = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "application/pdf",
        copyToCacheDirectory: true, // Changed to true to ensure file is accessible
      });

      if (result.canceled || !result.assets || result.assets.length === 0) {
        console.log("Document picking was canceled or no assets were returned");
        return;
      }

      const file = result.assets[0];
      console.log("Selected file:", file);

      const formData = new FormData();
      // formData.append("file", {
      //   uri: file.uri,
      //   name: file.name ?? "Boo.pdf",
      //   type: file.mimeType ?? "application/pdf",
      // } as any);
      const fileToUpload = file.file as File; // important part of the code must keep

      let fileName: string;
      fileName = file.name;

      formData.append("file", fileToUpload, fileName);

      console.log("FormData prepared:", formData);


      const request = await fetch("http://localhost:8000/extract-ai", {
        method: "POST",
        body: formData,
        headers: {
          "Accept": "application/json",
        },
      });

      const response = await request.text();
      console.log("Response text:", response);
      console.log("Request sent to server:", request);

      if (!request.ok) {
        const errorText = await request.text();
        console.error("Error response:", {
          status: request.status,
          statusText: request.statusText,
          body: errorText,
        });
        throw new Error(
          `HTTP error! status: ${request.status}, body: ${errorText}`
        );
      }

      const json = await request.json();
      console.log("Response:", json);
      setCostOfAttendance(json.costOfAttendance ?? "0");
      setGiftAid(json.giftAid ?? "0");
      setFileName(file.name);
    } catch (error) {
      console.error("Error in pickFile:", error);
    }
  };

  return (
    <View style={styles.uploadContainer}>
      <View style={styles.uploadBox}>
        <TouchableOpacity onPress={pickFile}>
          <View style={styles.textButtonBox}>
            <Text style={styles.textButton}>Choose a PDF File</Text>
          </View>
        </TouchableOpacity>

        {fileName ? (
          <Text style={styles.fileName}>Selected: {fileName}</Text>
        ) : null}
      </View>
    </View>
  );
}

function FinanceInputs({
  scholarships,
  setScholarships,
  grants,
  setGrants,
  income,
  setIncome,
  expenses,
  setExpenses,
}: FinanceInputsProps) {
  return (
    <View style={styles.financeContainer}>
      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>Scholarships</Text>
        <TextInput
          style={styles.financeInput}
          value={scholarships}
          onChangeText={setScholarships}
          placeholder="Enter scholarship amount"
          keyboardType="numeric"
          placeholderTextColor="#889063"
        />
        {scholarships ? (
          <Text style={styles.displayAmount}>Amount: ${scholarships}</Text>
        ) : null}
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>Grants</Text>
        <TextInput
          style={styles.financeInput}
          value={grants}
          onChangeText={setGrants}
          placeholder="Enter grant amount"
          keyboardType="numeric"
          placeholderTextColor="#889063"
        />
        {grants ? (
          <Text style={styles.displayAmount}>Amount: ${grants}</Text>
        ) : null}
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>Annual Income</Text>
        <TextInput
          style={styles.financeInput}
          value={income}
          onChangeText={setIncome}
          placeholder="Enter annual income"
          keyboardType="numeric"
          placeholderTextColor="#889063"
        />
        {income ? (
          <Text style={styles.displayAmount}>Amount: ${income}</Text>
        ) : null}
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>Annual Expenses</Text>
        <TextInput
          style={styles.financeInput}
          value={expenses}
          onChangeText={setExpenses}
          placeholder="Enter annual expenses"
          keyboardType="numeric"
          placeholderTextColor="#889063"
        />
        {expenses ? (
          <Text style={styles.displayAmount}>Amount: ${expenses}</Text>
        ) : null}
      </View>
      {/* Repeat this pattern for each field */}
      {[
        { label: "Scholarships", value: scholarships, set: setScholarships },
        { label: "Grants", value: grants, set: setGrants },
        { label: "Annual Income", value: income, set: setIncome },
        { label: "Annual Expenses", value: expenses, set: setExpenses },
      ].map(({ label, value, set }) => (
        <View style={styles.inputGroup} key={label}>
          <Text style={styles.inputLabel}>{label}</Text>
          <TextInput
            style={styles.financeInput}
            value={value}
            onChangeText={set}
            placeholder={`Enter ${label.toLowerCase()}`}
            keyboardType="numeric"
            placeholderTextColor="#889063"
          />
          {value ? (
            <Text style={styles.displayAmount}>Amount: ${value}</Text>
          ) : null}
        </View>
      ))}
    </View>
  );
}

export default function MyFinancesScreen() {
  const [scholarships, setScholarships] = useState("");
  const [grants, setGrants] = useState("");
  const [income, setIncome] = useState("");
  const [expenses, setExpenses] = useState("");
  const [costOfAttendance, setCostOfAttendance] = useState("");
  const [giftAid, setGiftAid] = useState("");
  const router = useRouter();

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.header}>
        <ThemedText type="title" style={styles.title}>
          My Finances
        </ThemedText>
      </ThemedView>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <FileUploadWidget
          setCostOfAttendance={setCostOfAttendance}
          setGiftAid={setGiftAid}
        />
        <FinanceInputs
          scholarships={scholarships}
          setScholarships={setScholarships}
          grants={grants}
          setGrants={setGrants}
          income={income}
          setIncome={setIncome}
          expenses={expenses}
          setExpenses={setExpenses}
        />

        <TouchableOpacity
          style={[styles.customButton, { marginTop: 30 }]}
          onPress={() =>
            router.push({
              pathname: "/calculator",
              params: {
                scholarships,
                grants,
                income,
                expenses,
                costOfAttendance,
                giftAid,
              },
            })
          }
        >
          <Text style={{ color: "#fff", fontWeight: "bold" }}>
            Go to Calculator
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  // Same styles you already have
  container: {
    flex: 1,
    paddingTop: 60,
    alignItems: "center",
    backgroundColor: "#E5D7C4",
  },
  header: {
    backgroundColor: "#889063",
    marginTop: -30,
    borderRadius: 16,
    padding: 20,
    marginBottom: 10,
    alignItems: "center",
    width: "100%",
  },
  title: { color: "#E5D7C4" },
  scrollView: { flex: 1, width: "100%" },
  scrollContent: { alignItems: "center", paddingBottom: 50 },
  uploadContainer: { marginTop: -10, alignItems: "center" },
  uploadBox: {
    backgroundColor: "#E5D7C4",
    padding: 100,
    borderRadius: 50,
    elevation: 5,
    width: "200%",
    alignItems: "center",
  },
  textButtonBox: {
    borderWidth: 2,
    borderColor: "#889063",
    paddingVertical: 25,
    paddingHorizontal: 200,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginTop: -70,
  },
  textButton: { fontSize: 18, color: "#889063", fontWeight: "bold" },
  fileName: { marginTop: 12, fontSize: 14 },
  customButton: {
    backgroundColor: "#889063",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
    alignItems: "center",
  },
  financeContainer: { width: "90%", marginTop: 20, gap: 15 },
  inputGroup: { alignItems: "center" },
  inputLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#889063",
    marginBottom: 8,
  },
  financeInput: {
    width: "100%",
    height: 50,
    borderWidth: 2,
    borderColor: "#889063",
    borderRadius: 12,
    paddingHorizontal: 15,
    fontSize: 16,
    color: "#889063",
    backgroundColor: "#E5D7C4",
    textAlign: "center",
  },
  displayAmount: {
    marginTop: 8,
    fontSize: 14,
    color: "#889063",
    fontWeight: "bold",
  },
});
