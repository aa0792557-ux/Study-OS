import React, { useEffect, useRef, useState } from "react";
import { View, Alert, Vibration, StyleSheet } from "react-native";
import {
  Card,
  Title,
  Paragraph,
  Button,
  ProgressBar,
  Text,
} from "react-native-paper";

const FOCUS_SECONDS = 25 * 60;
const BREAK_SECONDS = 5 * 60;

type Mode = "focus" | "break";

function formatTime(totalSeconds: number): string {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return (
    String(minutes).padStart(2, "0") + ":" + String(seconds).padStart(2, "0")
  );
}

export default function Focus() {
  const [mode, setMode] = useState<Mode>("focus");
  const [secondsLeft, setSecondsLeft] = useState<number>(FOCUS_SECONDS);
  const [running, setRunning] = useState<boolean>(false);
  const endTimeRef = useRef<number>(0);

  const totalSeconds = mode === "focus" ? FOCUS_SECONDS : BREAK_SECONDS;
  const progress = 1 - secondsLeft / totalSeconds;

  useEffect(() => {
    if (!running) return;

    const id = setInterval(() => {
      const remaining = Math.max(
        0,
        Math.round((endTimeRef.current - Date.now()) / 1000)
      );
      setSecondsLeft(remaining);

      if (remaining === 0) {
        clearInterval(id);
        setRunning(false);
        Vibration.vibrate(500);

        const nextMode: Mode = mode === "focus" ? "break" : "focus";
        setMode(nextMode);
        setSecondsLeft(nextMode === "focus" ? FOCUS_SECONDS : BREAK_SECONDS);

        if (mode === "focus") {
          Alert.alert("Session complete!", "Great work. Time for a 5-minute break.");
        } else {
          Alert.alert("Break over!", "Ready for another focus session?");
        }
      }
    }, 250);

    return () => clearInterval(id);
  }, [running, mode]);

  const handleStart = () => {
    const isFreshFocus = mode === "focus" && secondsLeft === FOCUS_SECONDS;
    endTimeRef.current = Date.now() + secondsLeft * 1000;
    setRunning(true);
    if (isFreshFocus) {
      Alert.alert("Timer started!", "Focus for 25 minutes.");
    }
  };

  const handlePause = () => {
    setRunning(false);
  };

  const handleReset = () => {
    setRunning(false);
    setSecondsLeft(totalSeconds);
  };

  const switchMode = (newMode: Mode) => {
    setRunning(false);
    setMode(newMode);
    setSecondsLeft(newMode === "focus" ? FOCUS_SECONDS : BREAK_SECONDS);
  };

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Title>The Pomodoro Technique</Title>
          <Paragraph>
            Work in focused 25-minute sessions, called pomodoros, separated by
            short 5-minute breaks. After four pomodoros, take a longer break of
            15 to 30 minutes. This keeps your mind fresh and helps you avoid
            burnout while studying.
          </Paragraph>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content style={styles.timerContent}>
          <Paragraph>{mode === "focus" ? "Focus time" : "Break time"}</Paragraph>
          <Text style={styles.time}>{formatTime(secondsLeft)}</Text>
          <ProgressBar progress={progress} style={styles.progress} />
        </Card.Content>
      </Card>

      <View style={styles.row}>
        {running ? (
          <Button mode="contained" onPress={handlePause} style={styles.rowButton}>
            Pause
          </Button>
        ) : (
          <Button mode="contained" onPress={handleStart} style={styles.rowButton}>
            {secondsLeft === totalSeconds ? "Start" : "Resume"}
          </Button>
        )}
        <Button mode="outlined" onPress={handleReset} style={styles.rowButton}>
          Reset
        </Button>
      </View>

      <View style={styles.row}>
        <Button
          mode={mode === "focus" ? "contained-tonal" : "text"}
          onPress={() => switchMode("focus")}
          style={styles.rowButton}
        >
          Focus 25
        </Button>
        <Button
          mode={mode === "break" ? "contained-tonal" : "text"}
          onPress={() => switchMode("break")}
          style={styles.rowButton}
        >
          Break 5
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  card: { marginBottom: 16 },
  timerContent: { alignItems: "center" },
  time: { fontSize: 64, fontWeight: "bold", marginVertical: 12 },
  progress: { height: 10, borderRadius: 5, width: 260 },
  row: { flexDirection: "row", justifyContent: "center", marginBottom: 12 },
  rowButton: { marginHorizontal: 6 },
});