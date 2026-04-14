import { Stack } from "expo-router";

export default function ScenesLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Scenes" }} />
      <Stack.Screen name="create" options={{ title: "Write Scene" }} />
      <Stack.Screen name="[id]" options={{ title: "Read Scene" }} />
      <Stack.Screen name="edit/[id]" options={{ title: "Edit Scene" }} />
    </Stack>
  );
}