import { db } from "@/lib/firebase";
import { scheduleLocalNotification } from "@/lib/notifications";
import { useLocalSearchParams, useRouter } from "expo-router";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";

export default function EditScene() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const fetchScene = async () => {
    const ref = doc(db, "scenes", String(id));
    const snap = await getDoc(ref);

    if (snap.exists()) {
      const data = snap.data();
      setTitle(data.title || "");
      setContent(data.content || "");
    }
  };

  useEffect(() => {
    fetchScene();
  }, []);

  const handleUpdate = async () => {
    const ref = doc(db, "scenes", String(id));

    await updateDoc(ref, {
      title,
      content,
    });

    await scheduleLocalNotification(
      "Scene Updated",
      `"${title}" berhasil diupdate`
    );

    router.back();
  };

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <TextInput
        value={title}
        onChangeText={setTitle}
        style={{ fontSize: 20, marginBottom: 10 }}
      />

      <TextInput
        value={content}
        onChangeText={setContent}
        multiline
        style={{
          flex: 1,
          backgroundColor: "#1e1e1e",
          color: "#fff",
          padding: 12,
          borderRadius: 10,
        }}
      />

      <Pressable
        onPress={handleUpdate}
        style={{
          marginTop: 10,
          padding: 14,
          backgroundColor: "#4a90e2",
          borderRadius: 10,
        }}
      >
        <Text style={{ color: "#fff", textAlign: "center" }}>
          Update Scene
        </Text>
      </Pressable>
    </View>
  );
}