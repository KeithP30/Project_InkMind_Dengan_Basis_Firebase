import { db } from "@/lib/renamed-firebase";
import { useLocalSearchParams, useRouter } from "expo-router";
import { collection, deleteDoc, doc, getDoc, getDocs, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Alert, Button, Text, View } from "react-native";

export default function CharacterDetail() {
  const { id } = useLocalSearchParams();
  const [character, setCharacter] = useState<any>(null);
  const [allCharacters, setAllCharacters] = useState<any[]>([]);

  const fetchCharacter = async () => {
    if (!id) return;

    const ref = doc(db, "characters", String(id));
    const snapshot = await getDoc(ref);

    if (snapshot.exists()) {
      setCharacter(snapshot.data());
    }
  };

const router = useRouter();

const handleDeleteRelationship = async (targetId: string) => {
  const ref = doc(db, "characters", String(id));

  const updated = character.relationships.filter(
    (rel: any) => rel.targetId !== targetId
  );

  await updateDoc(ref, {
    relationships: updated,
  });

  // refresh local state
  setCharacter({
    ...character,
    relationships: updated,
  });
};

const fetchAllCharacters = async () => {
  const snapshot = await getDocs(collection(db, "characters"));
  const data: any[] = [];

  snapshot.forEach((doc) => {
    data.push({ id: doc.id, ...doc.data() });
  });

  setAllCharacters(data);
};

const handleDelete = () => {
  Alert.alert("Delete", "Are you sure?", [
    { text: "Cancel" },
    {
      text: "Delete",
      onPress: async () => {
        await deleteDoc(doc(db, "characters", String(id)));
        router.back();
      },
    },
  ]);
};

  useEffect(() => {
  fetchCharacter();
  fetchAllCharacters();
}, [id]);

const getName = (id: string) => {
  const found = allCharacters.find((c) => c.id === id);
  return found ? found.name : id;
};

  if (!character) return <Text>Loading...</Text>;

  return (

   <View
  style={{
    backgroundColor: "#1e1e1e",
    padding: 16,
    borderRadius: 12,
  }}
>
  <Text style={{ fontSize: 22, color: "#fff", fontWeight: "bold" }}>
    {character.name}
  </Text>

  <Text style={{ color: "#aaa", marginTop: 8 }}>
    {character.description}
  </Text>

  <Text style={{ marginTop: 10, color: "#ccc" }}>
    Goal: {character.goal}
  </Text>

  <Text style={{ color: "#ccc" }}>
    Conflict: {character.conflict}
  </Text>

{!character.relationships || character.relationships.length === 0 ? (
  <Text style={{ marginTop: 10 }}>No relationships yet</Text>
) : (
  character.relationships.map((rel: any, index: number) => (
    <View
      key={index}
     style={{
    marginTop: 10,
    padding: 12,
    borderRadius: 10,
    backgroundColor: "#2a2a2a",
  }}
    >
    <Text style={{ color: "#fff" }}>
    {rel.type} → {getName(rel.targetId)}
    </Text>
    <View style={{ marginTop: 16 }}>
      <Button
        title="Delete"
        onPress={() => handleDeleteRelationship(rel.targetId)}
      />
      </View>
    </View>
  ))
)}
    <View style={{ marginTop: 16 }}>
    <Button title="Add Relationship" onPress={() => router.push(`/characters/relationship/${id}`)} />
    </View>
    <View style={{ marginTop: 16 }}>
    <Button title="Edit" onPress={() => router.push(`/characters/edit/${id}`)} />
    </View>
    <View style={{ marginTop: 16 }}>
    <Button title="Delete" onPress={handleDelete} />
    </View>
    
    
    </View>
    
  );
}