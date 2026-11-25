import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { Card, Title, Paragraph, ActivityIndicator } from "react-native-paper";
import { useAuth } from "../../../context/AuthContext";

type QuoteResponse = {
  id: number;
  quote: string;
  author: string;
};

export default function Home() {
  const { user } = useAuth();
  const [quote, setQuote] = useState<string>("");
  const [author, setAuthor] = useState<string>("");
  const [loadingQuote, setLoadingQuote] = useState<boolean>(true);
  const [quoteError, setQuoteError] = useState<string>("");

  const name = user?.email ? user.email.split("@")[0] : "Student";

  useEffect(() => {
    const fetchQuote = async () => {
      try {
        const response = await fetch("https://dummyjson.com/quotes/random");
        if (!response.ok) {
          throw new Error("Request failed with status " + response.status);
        }
        const data: QuoteResponse = await response.json();
        setQuote(data.quote);
        setAuthor(data.author);
      } catch (error) {
        setQuoteError("Could not load a quote right now.");
      } finally {
        setLoadingQuote(false);
      }
    };
    fetchQuote();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Title style={styles.greeting}>Hello, {name}!</Title>

      <Card style={styles.card}>
        <Card.Content>
          <Title>Quote of the moment</Title>
          {loadingQuote ? (
            <ActivityIndicator animating={true} />
          ) : quoteError ? (
            <Paragraph>{quoteError}</Paragraph>
          ) : (
            <>
              <Paragraph>"{quote}"</Paragraph>
              <Paragraph style={styles.author}>— {author}</Paragraph>
            </>
          )}
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Title>Today</Title>
          <Paragraph>3 tasks due today</Paragraph>
        </Card.Content>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  greeting: { fontSize: 24, marginBottom: 12 },
  card: { marginBottom: 16 },
  author: { marginTop: 8, fontStyle: "italic" },
});
