import { db } from "@/lib/renamed-firebase";
import { useRouter } from "expo-router";
import { addDoc, collection } from "firebase/firestore";
import { useState } from "react";
import { Button, TextInput, View } from "react-native";

export default function CreateCharacter() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [goal, setGoal] = useState("");
  const [conflict, setConflict] = useState("");
  const [relationships, setRelationships] = useState<any[]>([]);
  const router = useRouter();

  const handleSave = async () => {
    if (!name) return;

    await addDoc(collection(db, "characters"), {
      name,
      description,
      goal,
      conflict,
      createdAt: Date.now(),
    });

    router.back();
  };

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <TextInput placeholder="Name" value={name} onChangeText={setName} />
      <TextInput placeholder="Description" value={description} onChangeText={setDescription} />
      <TextInput placeholder="Goal" value={goal} onChangeText={setGoal} />
      <TextInput placeholder="Conflict" value={conflict} onChangeText={setConflict} />

      <Button title="Save Character" onPress={handleSave} />
    </View>
  );
}