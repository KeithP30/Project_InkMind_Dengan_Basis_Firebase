import { db } from "@/lib/firebase";
import { useFocusEffect } from "@react-navigation/native";
import { useRouter } from "expo-router";
import { collection, getDocs } from "firebase/firestore";
import { useCallback, useState } from "react";
import { FlatList, Pressable, Text, View } from "react-native";

export default function SceneList() {
  const [scenes, setScenes] = useState<any[]>([]);
  const router = useRouter();

  const fetchScenes = async () => {
    const snapshot = await getDocs(collection(db, "scenes"));
    const data: any[] = [];

    snapshot.forEach((doc) => {
      data.push({ id: doc.id, ...doc.data() });
    });

    setScenes(data);
  };

 useFocusEffect(
  useCallback(() => {
    fetchScenes();
  }, [])
);
  return (
    <View style={{ flex: 1, padding: 16 }}>

      <Pressable
        onPress={() => router.push("/scenes/create" as any)}
        style={{
          padding: 12,
          backgroundColor: "#4a90e2",
          borderRadius: 10,
        }}
      >
        <Text style={{ color: "#fff", textAlign: "center" }}>
          + New Scene
        </Text>
      </Pressable>

      <FlatList
        data={scenes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => router.push("/scenes/ ${item.id}" as any)}
            style={{
              padding: 16,
              marginTop: 10,
              backgroundColor: "#1e1e1e",
              borderRadius: 12,
            }}
          >
            <Text style={{ color: "#fff", fontSize: 18 }}>
              {item.title || "Untitled"}
            </Text>

            <Text style={{ color: "#888", marginTop: 4 }}>
              {item.content?.slice(0, 60)}...
            </Text>
          </Pressable>
        )}
      />

    </View>
  );
}