import { useEffect } from "react";
import { useRouter } from "expo-router";
import { useAuth } from "../context/AuthContext";

export default function Index() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;
    if (user) {
      router.replace("/(drawer)/(tabs)");
    } else {
      router.replace("/(auth)/sign-in");
    }
  }, [user, loading, router]);

  return null;
}
