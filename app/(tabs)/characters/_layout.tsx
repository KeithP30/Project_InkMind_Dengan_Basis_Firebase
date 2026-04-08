import { Stack } from "expo-router";

export default function CharacterLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Characters" }} />
      <Stack.Screen name="create" options={{ title: "Add Character" }} />
      <Stack.Screen name="[id]" options={{ title: "Detail" }} />
      <Stack.Screen name="edit/[id]" options={{ title: "Edit Character" }} />
      <Stack.Screen name="relationship/[id]" options={{ title: "Add Relationship" }} />
    </Stack>
  );
}