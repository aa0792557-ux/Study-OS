import React, { useEffect, useState } from "react";
import { View, FlatList, Alert, StyleSheet } from "react-native";
import {
  Card,
  Title,
  Paragraph,
  FAB,
  Modal,
  Portal,
  TextInput,
  Button,
} from "react-native-paper";
import {
  collection,
  addDoc,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../../../firebaseConfig";
import { useAuth } from "../../../context/AuthContext";

type Task = {
  id: string;
  title: string;
  subject: string;
  dueDate: string;
  createdAtMs: number;
};

export default function Planner() {
  const { user } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loadingTasks, setLoadingTasks] = useState<boolean>(true);
  const [loadError, setLoadError] = useState<string>("");
  const [visible, setVisible] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [subject, setSubject] = useState<string>("");
  const [dueDate, setDueDate] = useState<string>("");
  const [saving, setSaving] = useState<boolean>(false);

  useEffect(() => {
    if (!user) {
      setTasks([]);
      setLoadingTasks(false);
      return;
    }
    setLoadingTasks(true);
    setLoadError("");

    const unsubscribe = onSnapshot(
      collection(db, "users", user.uid, "tasks"),
      (snapshot) => {
        const list: Task[] = snapshot.docs.map((d) => {
          const data = d.data();
          // Pending local writes have no server timestamp yet, so put them first
          const createdAtMs: number =
            data.createdAt && typeof data.createdAt.toMillis === "function"
              ? data.createdAt.toMillis()
              : Number.MAX_SAFE_INTEGER;
          return {
            id: d.id,
            title: data.title ?? "",
            subject: data.subject ?? "",
            dueDate: data.dueDate ?? "",
            createdAtMs,
          };
        });
        list.sort((a, b) => b.createdAtMs - a.createdAtMs);
        setTasks(list);
        setLoadingTasks(false);
      },
      (error) => {
        setLoadError(error.message);
        setLoadingTasks(false);
      }
    );
    return unsubscribe;
  }, [user]);

  const resetForm = () => {
    setTitle("");
    setSubject("");
    setDueDate("");
  };

  const handleSave = async () => {
    if (!title.trim()) {
      Alert.alert("Missing title", "Please enter a task title.");
      return;
    }
    if (!user) {
      Alert.alert("Not signed in", "Please sign in again.");
      return;
    }
    setSaving(true);
    try {
      await addDoc(collection(db, "users", user.uid, "tasks"), {
        title: title.trim(),
        subject: subject.trim(),
        dueDate: dueDate.trim(),
        createdAt: serverTimestamp(),
      });
      resetForm();
      setVisible(false);
    } catch (error) {
      Alert.alert("Could not save task", (error as Error).message);
    } finally {
      setSaving(false);
    }
  };

  const renderTask = ({ item }: { item: Task }) => (
    <Card style={styles.card}>
      <Card.Content>
        <Title>{item.title}</Title>
        <Paragraph>Subject: {item.subject || "—"}</Paragraph>
        <Paragraph>Due: {item.dueDate || "—"}</Paragraph>
      </Card.Content>
    </Card>
  );

  const renderBody = () => {
    if (loadError) {
      return (
        <View style={styles.empty}>
          <Paragraph>Could not load tasks: {loadError}</Paragraph>
        </View>
      );
    }
    if (loadingTasks) {
      return (
        <View style={styles.empty}>
          <Paragraph>Loading tasks...</Paragraph>
        </View>
      );
    }
    if (tasks.length === 0) {
      return (
        <View style={styles.empty}>
          <Paragraph>No tasks yet — tap + to add</Paragraph>
        </View>
      );
    }
    return (
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={renderTask}
        contentContainerStyle={styles.list}
      />
    );
  };

  return (
    <View style={styles.container}>
      {renderBody()}

      <Portal>
        <Modal
          visible={visible}
          onDismiss={() => setVisible(false)}
          contentContainerStyle={styles.modal}
        >
          <Title style={styles.modalTitle}>New Task</Title>
          <TextInput
            label="Title"
            mode="outlined"
            value={title}
            onChangeText={setTitle}
            style={styles.input}
          />
          <TextInput
            label="Subject"
            mode="outlined"
            value={subject}
            onChangeText={setSubject}
            style={styles.input}
          />
          <TextInput
            label="Due Date (e.g. 2026-12-01)"
            mode="outlined"
            value={dueDate}
            onChangeText={setDueDate}
            style={styles.input}
          />
          <Button
            mode="contained"
            onPress={handleSave}
            loading={saving}
            disabled={saving}
          >
            Save
          </Button>
        </Modal>
      </Portal>

      <FAB icon="plus" style={styles.fab} onPress={() => setVisible(true)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  list: { padding: 16, paddingBottom: 96 },
  card: { marginBottom: 12 },
  empty: { flex: 1, justifyContent: "center", alignItems: "center", padding: 24 },
  fab: { position: "absolute", right: 16, bottom: 16 },
  modal: {
    backgroundColor: "white",
    margin: 20,
    padding: 20,
    borderRadius: 8,
  },
  modalTitle: { marginBottom: 12 },
  input: { marginBottom: 12 },
});