import { useAuth, useUser } from "@clerk/expo";
import { Link, Redirect } from "expo-router";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Index() {
  const { isLoaded, isSignedIn, signOut } = useAuth();
  const { user } = useUser();

  if (!isLoaded) {
    return null;
  }

  if (!isSignedIn) {
    return <Redirect href="/onboarding" />;
  }

  return (
    <View className="flex-1 items-center justify-center bg-white px-8">
      {user?.imageUrl ? (
        <Image
          accessibilityLabel="Signed-in user profile"
          className="h-20 w-20 rounded-full"
          source={{ uri: user.imageUrl }}
        />
      ) : null}
      <Text className="h2 text-center text-lingua-purple">Lingua</Text>
      <Text className="pt-3 text-center font-poppins text-base text-text-secondary">
        Signed in as {user?.primaryEmailAddress?.emailAddress}
      </Text>

      <Link href="/language-selection" asChild>
        <TouchableOpacity
          accessibilityRole="button"
          activeOpacity={0.85}
          style={styles.languageButton}
        >
          <Text className="font-poppins-semibold text-base text-white">
            Choose a language
          </Text>
        </TouchableOpacity>
      </Link>

      <TouchableOpacity
        activeOpacity={0.85}
        className="mt-4 rounded-2xl border border-border bg-white px-7 py-4"
        onPress={() => signOut()}
      >
        <Text className="font-poppins-semibold text-base text-text-primary">
          Sign out
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  languageButton: {
    alignItems: "center",
    backgroundColor: "#5B3BF6",
    borderRadius: 18,
    boxShadow: "0 4px 0 #4727D9",
    height: 58,
    justifyContent: "center",
    marginTop: 32,
    paddingHorizontal: 28,
  },
});
