import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import * as DocumentPicker from "expo-document-picker";
import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

function FileUploadWidget() {
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

      if (!request.ok) {
        const errorText = await request.text();
        console.error("Error response:", {
          status: request.status,
          statusText: request.statusText,
          body: errorText
        });
        throw new Error(`HTTP error! status: ${request.status}, body: ${errorText}`);
      }

      const json = await request.json();
      console.log("Response:", json);
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

function FinanceInputs() {
  const [scholarships, setScholarships] = useState("");
  const [grants, setGrants] = useState("");
  const [loans, setLoans] = useState("");
  const [income, setIncome] = useState("");
  const [expenses, setExpenses] = useState("");

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
        <Text style={styles.inputLabel}>Loans</Text>
        <TextInput
          style={styles.financeInput}
          value={loans}
          onChangeText={setLoans}
          placeholder="Enter loan amount"
          keyboardType="numeric"
          placeholderTextColor="#889063"
        />
        {loans ? (
          <Text style={styles.displayAmount}>Amount: ${loans}</Text>
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
    </View>
  );
}

export default function CalculatorScreen() {
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
        <FileUploadWidget />
        <FinanceInputs />
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    alignItems: "center",
    backgroundColor: "#E5D7C4",
  },
  messagesContainer: {
    padding: 16,
    paddingBottom: 80,
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
  title: {
    color: "#E5D7C4",
  },
  uploadContainer: {
    marginTop: -10,
    alignItems: "center",
  },
  uploadBox: {
    backgroundColor: "#E5D7C4",
    padding: 100,
    borderRadius: 50,
    shadowColor: "#000",
    shadowOpacity: 0.0,
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 6,
    elevation: 5,
    width: "200%",
    alignItems: "center",
  },
  fileName: {
    marginTop: 12,
    fontSize: 14,
  },
  customButton: {
    backgroundColor: "#889063",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
    alignItems: "center",
  },
  customButtonText: {
    color: "#889063",
    fontSize: 16,
    fontWeight: "bold",
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
  textButton: {
    fontSize: 18,
    color: "#889063",
    fontWeight: "bold",
  },
  // New styles for finance inputs
  financeContainer: {
    width: "90%",
    marginTop: 20,
    gap: 15,
  },
  inputGroup: {
    alignItems: "center",
  },
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
  chatContainer: {
    flex: 1,
    width: "90%",
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 16,
    marginTop: 20,
  },
  message: {
    padding: 10,
    borderRadius: 8,
    marginBottom: 8,
    maxWidth: "80%",
    backgroundColor: "#f1f1f1",
  },
  user: {
    alignSelf: "flex-end",
    backgroundColor: "#DCF8C6",
  },
  bot: {
    alignSelf: "flex-start",
    backgroundColor: "#E5E5EA",
  },
  messageText: {
    fontSize: 16,
  },
  textInput: {
    flex: 1,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#CCC",
    paddingHorizontal: 15,
    backgroundColor: "#FFF",
  },
  sendButton: {
    marginLeft: 8,
    backgroundColor: "#889063",
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 15,
    justifyContent: "center",
  },
  sendButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  inputBarFixed: {
    flexDirection: "row",
    padding: 10,
    borderTopWidth: 1,
    borderColor: "#CCC",
    backgroundColor: "#FFF",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  scrollView: {
    flex: 1,
    width: "100%",
  },
  scrollContent: {
    alignItems: "center",
    paddingBottom: 50,
  },
});
