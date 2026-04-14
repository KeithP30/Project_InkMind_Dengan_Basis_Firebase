import { db } from "@/lib/firebase";
import { useLocalSearchParams, useRouter } from "expo-router";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Button, TextInput, View } from "react-native";

export default function EditCharacter() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [goal, setGoal] = useState("");
  const [conflict, setConflict] = useState("");
  const [relationships, setRelationships] = useState<any[]>([]);

  const fetchData = async () => {
    const ref = doc(db, "characters", String(id));
    const snap = await getDoc(ref);

    if (snap.exists()) {
      const data = snap.data();
      setName(data.name || "");
      setDescription(data.description || "");
      setGoal(data.goal || "");
      setConflict(data.conflict || "");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleUpdate = async () => {
    const ref = doc(db, "characters", String(id));

    await updateDoc(ref, {
      name,
      description,
      goal,
      conflict,
    });

    router.back();
  };

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <TextInput placeholder="Name" value={name} onChangeText={setName} />
      <TextInput placeholder="Description" value={description} onChangeText={setDescription} />
      <TextInput placeholder="Goal" value={goal} onChangeText={setGoal} />
      <TextInput placeholder="Conflict" value={conflict} onChangeText={setConflict} />

      <Button title="Update Character" onPress={handleUpdate} />
    </View>
  );
}