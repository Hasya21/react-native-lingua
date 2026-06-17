import { useAuth, useUser } from "@clerk/expo";
import { Redirect } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";

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

      <TouchableOpacity
        activeOpacity={0.85}
        className="mt-8 rounded-2xl bg-lingua-deep-purple px-7 py-4"
        onPress={() => signOut()}
      >
        <Text className="font-poppins-semibold text-base text-white">
          Sign out
        </Text>
      </TouchableOpacity>
    </View>
  );
}
