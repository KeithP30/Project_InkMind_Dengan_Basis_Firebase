import { useRouter } from 'expo-router';
import { signOut } from 'firebase/auth';
import { addDoc, collection } from "firebase/firestore";
import React, { useEffect, useState } from 'react';
import { Pressable, StyleSheet } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { auth, db } from '@/lib/firebase';
import { doc, getDoc } from "firebase/firestore";

export default function HomeScreen() {
  const router = useRouter();
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        router.replace('/login');
        return;
      }
      setEmail(user.email ?? user.uid);
    });
    return unsubscribe;
  }, [router]);

  const onLogout = async () => {
    await signOut(auth);
    router.replace('/login');
  };

  
  const saveDataUser = async () => {
  try {
    await addDoc(collection(db, "users"), {
      Username: "Admin1234@mail.com",
      Password: "123456",
    });
    alert("Data berhasil disimpan");
  } catch (e) {
    console.log(e);
    alert("Gagal simpan data");
  }
};

const [userData, setUserData] = useState<any>(null);

useEffect(() => {
  const fetchUser = async () => {
    const user = auth.currentUser;
    if (!user) return;

    const docRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setUserData(docSnap.data());
    } else {
      console.log("User tidak ditemukan");
    }
  };

  fetchUser();
}, []);

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Home</ThemedText>
      <ThemedText type="subtitle">Nama user login</ThemedText>
      <ThemedText type="defaultSemiBold">{email ?? '-'}</ThemedText>

      <Pressable style={styles.logoutButton} onPress={onLogout}>
        <ThemedText type="defaultSemiBold" style={styles.logoutButtonText}>
          Logout
        </ThemedText>
      </Pressable>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    gap: 12,
  },
  logoutButton: {
    marginTop: 10,
    backgroundColor: '#ef4444',
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
  },
  logoutButtonText: {
    color: '#ffffff',
  },
});
