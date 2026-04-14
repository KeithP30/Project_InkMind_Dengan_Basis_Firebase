import { db } from "@/lib/firebase";
import { useLocalSearchParams, useRouter } from "expo-router";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";

export default function SceneDetail() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const [scene, setScene] = useState<any>(null);

  const fetchScene = async () => {
    const ref = doc(db, "scenes", String(id));
    const snap = await getDoc(ref);

    if (snap.exists()) {
      setScene(snap.data());
    }
  };

  useEffect(() => {
    fetchScene();
  }, []);

  if (!scene) return <Text>Loading...</Text>;

  return (
    <View style={{ padding: 16 }}>
      <Text style={{ fontSize: 22 }}>
        {scene.title}
      </Text>

      <Pressable onPress={() => router.push(`/scenes/edit/${id}`)}>
        <Text style={{ color: "#4a90e2", marginTop: 10 }}>
          Edit
        </Text>
      </Pressable>

      <Text style={{ marginTop: 10 }}>
        {scene.content}
      </Text>
    </View>
  );
}