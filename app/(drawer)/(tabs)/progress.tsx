import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { Card, Title, Paragraph } from "react-native-paper";

export default function Progress() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Title>Hours Studied</Title>
          <Paragraph>Hours Studied: 5</Paragraph>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Title>Tasks Completed</Title>
          <Paragraph>Tasks Completed: 8</Paragraph>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Title>Current Streak</Title>
          <Paragraph>Current Streak: 3 days</Paragraph>
        </Card.Content>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  card: { marginBottom: 16 },
});
