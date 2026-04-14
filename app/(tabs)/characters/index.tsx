import { db } from "@/lib/firebase";
import { useFocusEffect } from "@react-navigation/native";
import { useRouter } from "expo-router";
import { collection, getDocs } from "firebase/firestore";
import { useCallback, useState } from "react";
import { Button, FlatList, Pressable, Text, View } from "react-native";

export default function CharactersScreen() {
  const [characters, setCharacters] = useState<any[]>([]);
  const router = useRouter();

  const fetchCharacters = async () => {
    const snapshot = await getDocs(collection(db, "characters"));
    const data: any[] = [];

    snapshot.forEach((doc) => {
      data.push({ id: doc.id, ...doc.data() });
    });

    setCharacters(data);
  };

  useFocusEffect(
  useCallback(() => {
    fetchCharacters();
  }, [])
);
 return (
  <View style={{ flex: 1, padding: 16 }}>
    
    <Button
      title="Add Character"
      onPress={() => router.push("/characters/create")}
    />

    <FlatList
      data={characters}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <Pressable
  onPress={() => router.push(`/(tabs)/characters/${item.id}`)}
  style={{
    marginTop: 12,
    padding: 16,
    borderRadius: 12,
    backgroundColor: "#1e1e1e",
  }}
>
  <Text style={{ fontSize: 18, color: "#fff", fontWeight: "bold" }}>
    {item.name}
  </Text>

  <Text style={{ color: "#aaa", marginTop: 4 }}>
    {item.description || "No description"}
  </Text>
</Pressable>
      )}
    />
    {characters.length === 0 && (
  <Text style={{ marginTop: 20, textAlign: "center", color: "#888" }}>
    No characters yet. Create one.
  </Text>
)}
  </View>
);
}