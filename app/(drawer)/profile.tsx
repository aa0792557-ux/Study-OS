import React from "react";
import { View, Alert, StyleSheet } from "react-native";
import { Card, Title, Paragraph, Button } from "react-native-paper";
import { useRouter } from "expo-router";
import { signOut } from "firebase/auth";
import { auth } from "../../firebaseConfig";

export default function Profile() {
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      router.replace("/(auth)/sign-in");
    } catch (error) {
      Alert.alert("Sign out failed", (error as Error).message);
    }
  };

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Title>Your Account</Title>
          <Paragraph>{auth.currentUser?.email}</Paragraph>
        </Card.Content>
      </Card>

      <Button mode="contained" onPress={handleSignOut}>
        Sign Out
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  card: { marginBottom: 16 },
});
