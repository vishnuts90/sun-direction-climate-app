import { Link, Stack } from "expo-router";
import { StyleSheet, Text } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { Sun } from 'lucide-react-native';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "Oops!", headerShown: false }} />
      <LinearGradient
        colors={['#87CEEB', '#FFE082', '#FF8A65']}
        style={styles.container}
      >
        <Sun size={64} color="#FFF" />
        <Text style={styles.title}>This screen doesn&apos;t exist.</Text>
        <Text style={styles.subtitle}>The sun position you&apos;re looking for isn&apos;t here.</Text>

        <Link href="/" style={styles.link}>
          <Text style={styles.linkText}>Return to Sun Position</Text>
        </Link>
      </LinearGradient>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: '#FFF',
    textAlign: 'center',
    marginTop: 20,
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#FFF',
    textAlign: 'center',
    marginTop: 8,
    opacity: 0.9,
  },
  link: {
    marginTop: 30,
    paddingVertical: 15,
    paddingHorizontal: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#FFF',
  },
  linkText: {
    fontSize: 16,
    color: "#FFF",
    fontWeight: '600',
    textAlign: 'center',
  },
});
