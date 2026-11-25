import React, { useState } from "react";
import { View, Alert, StyleSheet } from "react-native";
import { Button, TextInput, Title, Paragraph } from "react-native-paper";
import { useRouter } from "expo-router";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../firebaseConfig";

export default function SignIn() {
  const router = useRouter();
  const [isSignUp, setIsSignUp] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [submitting, setSubmitting] = useState<boolean>(false);

  const handleSubmit = async () => {
    if (!email.trim() || !password) {
      Alert.alert("Missing info", "Please enter your email and password.");
      return;
    }
    setSubmitting(true);
    try {
      if (isSignUp) {
        await createUserWithEmailAndPassword(auth, email.trim(), password);
      } else {
        await signInWithEmailAndPassword(auth, email.trim(), password);
      }
      router.replace("/(drawer)/(tabs)");
    } catch (error) {
      Alert.alert(
        isSignUp ? "Sign up failed" : "Sign in failed",
        (error as Error).message
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <View style={styles.container}>
      <Title style={styles.title}>StudyOS</Title>
      <Paragraph style={styles.subtitle}>
        {isSignUp ? "Create a new account" : "Sign in to continue"}
      </Paragraph>

      <TextInput
        label="Email"
        mode="outlined"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        style={styles.input}
      />
      <TextInput
        label="Password"
        mode="outlined"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        autoCapitalize="none"
        style={styles.input}
      />

      <Button
        mode="contained"
        onPress={handleSubmit}
        loading={submitting}
        disabled={submitting}
        style={styles.button}
      >
        {isSignUp ? "Sign Up" : "Sign In"}
      </Button>

      <Button mode="text" onPress={() => setIsSignUp(!isSignUp)}>
        {isSignUp
          ? "Already have an account? Sign In"
          : "Don't have an account? Sign Up"}
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 24 },
  title: { textAlign: "center", fontSize: 28, marginBottom: 4 },
  subtitle: { textAlign: "center", marginBottom: 24 },
  input: { marginBottom: 12 },
  button: { marginTop: 8, marginBottom: 8 },
});
