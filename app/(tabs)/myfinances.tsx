import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import * as DocumentPicker from "expo-document-picker";
import { useState } from "react";
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

function ChatbotWidget() {
  type Message = {
    id: string;
    sender: string;
    text: string;
  };

  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;

    const newMessages = [
      ...messages,
      { id: Date.now().toString(), sender: "user", text: input },
      {
        id: (Date.now() + 1).toString(),
        sender: "bot",
        text: `You said: "${input}"`,
      },
    ];

    setMessages(newMessages);
    setInput("");
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.chatContainer}
      keyboardVerticalOffset={80}
    >
      <View style={{ flex: 1 }}>
        <FlatList
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View
              style={[
                styles.message,
                item.sender === "user" ? styles.user : styles.bot,
              ]}
            >
              <Text style={styles.messageText}>{item.text}</Text>
            </View>
          )}
          contentContainerStyle={{ padding: 12, paddingBottom: 70 }} // important!
        />
      </View>

      {/* Input bar fixed to bottom */}
      <View style={styles.inputBarFixed}>
        <TextInput
          style={styles.textInput}
          placeholder="Type a message..."
          value={input}
          onChangeText={setInput}
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

function FileUploadWidget() {
  const [fileName, setFileName] = useState("");

  const pickFile = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: "application/pdf",
      copyToCacheDirectory: true,
    });

    if (!result.canceled) {
      setFileName(result.assets[0].name);
      console.log("File URI:", result.assets[0].uri);
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

export default function CalculatorScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.header}>
        <ThemedText type="title" style={styles.title}>
          My Finances
        </ThemedText>
        <ChatbotWidget />
      </ThemedView>
      <FileUploadWidget />
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
    padding: 20
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
  chatContainer: {
    flex: 1,
    width: "90%",
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 20,
    marginTop: 25,
  },
  message: {
    padding: 10,
    borderRadius: 8,
    marginBottom: 8,
    maxWidth: "80%",
    backgroundColor: "#f1f1f1", // or any color you want
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
  // inputBar: {
  //   flexDirection: "row",
  //   padding: 10,
  //   borderTopWidth: 1,
  //   borderColor: "#CCC",
  //   backgroundColor: "#FFF",
  // },
  textInput: {
    flex: 1,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#354024",
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
});

// import { ThemedText } from "@/components/ThemedText";
// import { ThemedView } from "@/components/ThemedView";
// import * as DocumentPicker from "expo-document-picker";
// import React, { useState } from "react";
// import {
//   FlatList,
//   KeyboardAvoidingView,
//   Platform,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
// } from "react-native";

// // File Upload Widget
// function FileUploadWidget() {
//   const [fileName, setFileName] = useState("");

//   const pickFile = async () => {
//     const result = await DocumentPicker.getDocumentAsync({
//       type: "application/pdf",
//       copyToCacheDirectory: true,
//     });

//     if (!result.canceled) {
//       setFileName(result.assets[0].name);
//       console.log("File URI:", result.assets[0].uri);
//     }
//   };

//   return (
//     <View style={styles.uploadContainer}>
//       <View style={styles.uploadBox}>
//         <TouchableOpacity onPress={pickFile}>
//           <Text style={styles.customButtonText}>Choose a PDF File</Text>
//         </TouchableOpacity>
//         {fileName ? (
//           <Text style={styles.fileName}>Selected: {fileName}</Text>
//         ) : null}
//       </View>
//     </View>
//   );
// }

// // Chatbot Widget
// function ChatbotWidget() {
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState("");

//   const handleSend = () => {
//     if (!input.trim()) return;

//     const newMessages = [
//       ...messages,
//       { id: Date.now().toString(), sender: "user", text: input },
//       {
//         id: (Date.now() + 1).toString(),
//         sender: "bot",
//         text: `You said: "${input}"`,
//       },
//     ];

//     setMessages(newMessages);
//     setInput("");
//   };

//   return (
//     <KeyboardAvoidingView
//       style={styles.chatContainer}
//       behavior={Platform.OS === "ios" ? "padding" : "height"}
//     >
//       <FlatList
//         data={messages}
//         keyExtractor={(item) => item.id}
//         renderItem={({ item }) => (
//           <View
//             style={[
//               styles.message,
//               item.sender === "user" ? styles.user : styles.bot,
//             ]}
//           >
//             <Text style={styles.messageText}>{item.text}</Text>
//           </View>
//         )}
//         contentContainerStyle={{ padding: 12 }}
//       />
//       <View style={styles.inputBar}>
//         <TextInput
//           style={styles.textInput}
//           placeholder="Type a message..."
//           value={input}
//           onChangeText={setInput}
//         />
//         <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
//           <Text style={styles.sendButtonText}>Send</Text>
//         </TouchableOpacity>
//       </View>
//     </KeyboardAvoidingView>
//   );
// }

// // Main Screen
// export default function CalculatorScreen() {
//   return (
//     <ThemedView style={styles.container}>
//       <ThemedView style={styles.header}>
//         <ThemedText type="title" style={styles.title}>
//           My Finances
//         </ThemedText>
//       </ThemedView>
//       <FileUploadWidget />
//       <ChatbotWidget />
//     </ThemedView>
//   );
// }

// // Styles
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingTop: 60,
//     backgroundColor: "#E5D7C4",
//   },
//   header: {
//     backgroundColor: "#889063",
//     marginTop: 16,
//     borderRadius: 16,
//     padding: 20,
//     marginBottom: 24,
//     alignItems: "center",
//   },
//   title: {
//     color: "#E5D7C4",
//   },
//   uploadContainer: {
//     alignItems: "center",
//     marginBottom: 24,
//   },
//   uploadBox: {
//     backgroundColor: "#fff",
//     padding: 60,
//     borderRadius: 20,
//     borderWidth: 2,
//     borderColor: "#889063",
//     alignItems: "center",
//   },
//   customButtonText: {
//     fontSize: 16,
//     fontWeight: "bold",
//     color: "#889063",
//   },
//   fileName: {
//     marginTop: 12,
//     fontSize: 14,
//   },
//   chatContainer: {
//     flex: 1,
//     backgroundColor: "#F9F9F9",
//   },
//   message: {
//     maxWidth: "75%",
//     padding: 10,
//     marginVertical: 4,
//     borderRadius: 8,
//   },
//   user: {
//     alignSelf: "flex-end",
//     backgroundColor: "#DCF8C6",
//   },
//   bot: {
//     alignSelf: "flex-start",
//     backgroundColor: "#E5E5EA",
//   },
//   messageText: {
//     fontSize: 16,
//   },
//   inputBar: {
//     flexDirection: "row",
//     padding: 10,
//     borderTopWidth: 1,
//     borderColor: "#CCC",
//     backgroundColor: "#FFF",
//   },
//   textInput: {
//     flex: 1,
//     height: 40,
//     borderRadius: 20,
//     borderWidth: 1,
//     borderColor: "#CCC",
//     paddingHorizontal: 15,
//     backgroundColor: "#FFF",
//   },
//   sendButton: {
//     marginLeft: 8,
//     backgroundColor: "#889063",
//     borderRadius: 20,
//     paddingVertical: 10,
//     paddingHorizontal: 15,
//     justifyContent: "center",
//   },
//   sendButtonText: {
//     color: "white",
//     fontWeight: "bold",
//   },
// });
