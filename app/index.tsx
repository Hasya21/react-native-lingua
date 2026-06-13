import { Link } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

export default function Index() {
  return (
    <View className="flex-1 items-center justify-center bg-white px-8">
      <Text className="h2 text-center text-lingua-purple">Lingua</Text>

      <Link href="/onboarding" asChild>
        <TouchableOpacity
          activeOpacity={0.85}
          className="mt-8 rounded-2xl bg-lingua-deep-purple px-7 py-4"
        >
          <Text className="font-poppins-semibold text-base text-lingua-purple">
            Open onboarding
          </Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}
