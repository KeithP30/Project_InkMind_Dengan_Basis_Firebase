import { db } from "@/lib/firebase";
import { scheduleLocalNotification } from "@/lib/notifications";
import { useRouter } from "expo-router";
import { addDoc, collection } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";

export default function CreateScene() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const router = useRouter();

  const handleSave = async () => {
    await addDoc(collection(db, "scenes"), {
      title,
      content,
      createdAt: Date.now(),
    });
    await scheduleLocalNotification(
    "Scene Saved",
    `"${title || "Untitled"}" berhasil disimpan`
  );

    router.back();
  };

  useEffect(() => {
  const timeout = setTimeout(() => {
    console.log("Auto saving draft...");
  }, 1000);

  return () => clearTimeout(timeout);
}, [content]);

  return (
    <View style={{ flex: 1, padding: 16 }}>

      {/* Title */}
      <TextInput
        placeholder="Scene Title"
        value={title}
        onChangeText={setTitle}
        style={{
          fontSize: 20,
          fontWeight: "bold",
          marginBottom: 10,
        }}
      />

      {/* Writing Area */}
      <TextInput
        placeholder="Start writing your story..."
        value={content}
        onChangeText={setContent}
        multiline
        textAlignVertical="top"
        style={{
          flex: 1,
          fontSize: 16,
          backgroundColor: "#1e1e1e",
          color: "#fff",
          padding: 12,
          borderRadius: 10,
        }}
      />

      {/* Save Button */}
      <Pressable
        onPress={handleSave}
        style={{
          marginTop: 10,
          padding: 14,
          backgroundColor: "#4a90e2",
          borderRadius: 10,
        }}
      >
        <Text style={{ color: "#fff", textAlign: "center" }}>
          Save Draft
        </Text>
      </Pressable>

    </View>
  );
}