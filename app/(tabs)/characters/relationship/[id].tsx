import { db } from "@/lib/firebase";
import { useLocalSearchParams, useRouter } from "expo-router";
import { collection, doc, getDoc, getDocs, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Button, FlatList, Pressable, Text, View } from "react-native";

export default function AddRelationship() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const [characters, setCharacters] = useState<any[]>([]);

  const fetchCharacters = async () => {
    const snapshot = await getDocs(collection(db, "characters"));
    const data: any[] = [];

    snapshot.forEach((doc) => {
      if (doc.id !== id) {
        data.push({ id: doc.id, ...doc.data() });
      }
    });

    setCharacters(data);
  };

  useEffect(() => {
    fetchCharacters();
  }, []);

  const [selectedType, setSelectedType] = useState("friend");
  const handleAdd = async (targetId: string, type: string) => {
  const ref = doc(db, "characters", String(id));

  const snap = await getDoc(ref);
  const currentData = snap.data();

  const existing = currentData?.relationships || [];

  // ❗ cegah duplicate
  const alreadyExists = existing.some(
    (rel: any) => rel.targetId === targetId
  );

  if (alreadyExists) {
    alert("Relationship already exists");
    return;
  }

  const updated = [
    ...existing,
    {
      targetId,
      type,
    },
  ];

  await updateDoc(ref, {
    relationships: updated,
  });

  router.back();
};

  return (
    <View style={{ flex: 1, padding: 16 }}>
        <View style={{ marginBottom: 16 }}>
  <Text>Select Relationship Type:</Text>

  <Button title="Friend" onPress={() => setSelectedType("Friend ")} />
  <Button title="Enemy" onPress={() => setSelectedType("Enemy ")} />
  <Button title="Family" onPress={() => setSelectedType("Family ")} />
    </View>
      <FlatList
        data={characters}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Pressable onPress={() => handleAdd(item.id, selectedType)}>
            <Text style={{ marginTop: 12 }}>{item.name}</Text>
          </Pressable>
        )}
      />
    </View>
  );
}