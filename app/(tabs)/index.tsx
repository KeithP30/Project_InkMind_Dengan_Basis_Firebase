import { db } from "@/lib/firebase";
import { useFocusEffect } from "@react-navigation/native";
import { useRouter } from "expo-router";
import { collection, getDocs } from "firebase/firestore";
import { useCallback, useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";


export default function HomeScreen() {
  const router = useRouter();

  const [characterCount, setCharacterCount] = useState(0);

  const fetchStats = async () => {
    const snapshot = await getDocs(collection(db, "characters"));
    setCharacterCount(snapshot.size);
  };

  useEffect(() => {
    fetchStats();
  }, []);
  
  useFocusEffect(
  useCallback(() => {
    fetchStats();
  }, [])
);

  return (
    <View style={{ flex: 1, padding: 16 }}>

      {/* HEADER */}
      <Text style={{ fontSize: 26, fontWeight: "bold" }}>
        InkMind
      </Text>
      <Text style={{ color: "#888", marginTop: 4 }}>
        Build your story world
      </Text>

      {/* STATS */}
      <View
        style={{
          marginTop: 20,
          padding: 16,
          borderRadius: 12,
          backgroundColor: "#1e1e1e",
        }}
      >
        <Text style={{ color: "#aaa" }}>Characters</Text>
        <Text style={{ fontSize: 22, color: "#fff", marginTop: 4 }}>
          {characterCount}
        </Text>
      </View>

      {/* ACTIONS */}
      <View style={{ marginTop: 20 }}>

        <Pressable
          onPress={() => router.push("/characters")}
          style={{
            padding: 16,
            borderRadius: 12,
            backgroundColor: "#2a2a2a",
            marginBottom: 10,
          }}
        >
          <Text style={{ color: "#fff" }}>
            📚 View Characters
          </Text>
        </Pressable>

        <Pressable
          onPress={() => router.push("/characters/create")}
          style={{
            padding: 16,
            borderRadius: 12,
            backgroundColor: "#4a90e2",
          }}
        >
          <Text style={{ color: "#fff" }}>
            ➕ Add New Character
          </Text>
        </Pressable>

      </View>
    </View>
  );
}