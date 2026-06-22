import { Ionicons } from "@expo/vector-icons";
import { useUser } from "@clerk/expo";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { images } from "@/constants/images";
import { languages } from "@/data/languages";
import { lessons } from "@/data/lessons";
import { units } from "@/data/units";
import { useLanguageStore } from "@/store/language-store";

const DAILY_GOAL = 20;

const PLAN_ITEMS = [
  { icon: "book", title: "Lesson", subtitle: "At the cafe", complete: true },
  { icon: "headset", title: "AI Conversation", subtitle: "Talk about your day", complete: false },
  { icon: "game-controller", title: "New words", subtitle: "10 words", complete: false },
] as const;

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { user } = useUser();
  const selectedLanguageCode = useLanguageStore((state) => state.selectedLanguage);
  const language = languages.find((item) => item.code === selectedLanguageCode) ?? languages[0];
  const unit = units.find((item) => item.languageCode === language.code);
  const lesson = lessons.find((item) => item.languageCode === language.code);
  const firstName = user?.firstName ?? user?.username ?? "Learner";
  const dailyXp = lesson?.xpReward ?? 0;
  const flagUri = language.flagEmoji.replace("/16x12/", "/80x60/");

  return (
    <ScrollView
      bounces={false}
      className="flex-1 bg-white"
      contentContainerStyle={[styles.content, { paddingTop: insets.top + 18 }]}
      showsVerticalScrollIndicator={false}
    >
      <View className="flex-row items-center">
        <Image className="h-[38px] w-[38px] rounded-[20px]" contentFit="cover" source={{ uri: flagUri }} />
        <Text className="ml-3 flex-1 font-poppins-semibold text-[19px] text-text-primary">
          {language.greeting}, {firstName}! <Text className="text-[20px]">👋</Text>
        </Text>
        <Image className="h-9 w-[30px]" contentFit="contain" source={images.streakFire} />
        <Text className="ml-1 font-poppins-medium text-[17px] text-[#4E5874]">12</Text>
        <Ionicons className="ml-[22px]" color="#17203E" name="notifications-outline" size={28} />
      </View>

      <View className="mt-7 h-[132px] flex-row overflow-hidden rounded-[21px] bg-[#FFF8EF] px-5 py-4">
        <View className="flex-1">
          <Text className="font-poppins-medium text-[16px] text-[#22304D]">Daily goal</Text>
          <View className="mt-2 flex-row items-baseline">
            <Text className="font-poppins-semibold text-[29px] text-[#071632]">{dailyXp}</Text>
            <Text className="ml-2 font-poppins-medium text-[16px] text-[#77829B]">/ {DAILY_GOAL} XP</Text>
          </View>
          <View className="mt-4 h-2 overflow-hidden rounded-full bg-[#FFE2C1]">
            <View className="h-full rounded-full bg-[#FF7410]" style={{ width: `${Math.min(dailyXp / DAILY_GOAL, 1) * 100}%` }} />
          </View>
        </View>
        <Image className="ml-[13px] h-[105px] w-[105px] self-center" contentFit="contain" source={images.treasure} />
      </View>

      <View className="relative mt-6 h-[204px] overflow-hidden rounded-[20px] bg-[#6747F6] px-5 py-5">
        <View className="absolute -right-8 -top-12 h-[190px] w-[190px] rounded-full bg-[#7658F8] opacity-70" />
        <View className="absolute bottom-[-95px] left-[110px] h-[190px] w-[190px] rounded-full bg-[#4E50DF] opacity-70" />
        <Text className="font-poppins text-[16px] text-white">Continue learning</Text>
        <Text className="mt-1 font-poppins-semibold text-[26px] text-white">{language.name}</Text>
        <Text className="font-poppins-medium text-[18px] text-white">
          {unit?.level ?? "A1"} · Unit {unit?.order ?? 1}
        </Text>
        <TouchableOpacity
          accessibilityLabel="Continue learning"
          activeOpacity={0.85}
          className="absolute bottom-4 left-5 h-[43px] w-[108px] items-center justify-center rounded-[14px] bg-white"
          onPress={() => router.push("/learn")}
        >
          <Text className="font-poppins-semibold text-[15px] text-[#6847F6]">Continue</Text>
        </TouchableOpacity>
        <Image className="absolute -bottom-[22px] -right-[5px] h-[174px] w-[174px]" contentFit="contain" source={images.palace} />
      </View>

      <View className="mt-6 flex-row items-center justify-between">
        <Text className="font-poppins-semibold text-[18px] text-text-primary">Today&apos;s plan</Text>
        <TouchableOpacity
          accessibilityLabel="View all lessons"
          activeOpacity={0.7}
          onPress={() => router.push("/learn")}
        >
          <Text className="font-poppins-semibold text-[15px] text-[#6547F5]">View all</Text>
        </TouchableOpacity>
      </View>

      <View className="mt-3 gap-2">
        {PLAN_ITEMS.map((item, index) => (
          <View className="h-[66px] flex-row items-center" key={item.title}>
            <View className={`h-[47px] w-[47px] items-center justify-center rounded-[13px] ${index === 2 ? "bg-[#FF5A66]" : "bg-[#6747F6]"}`}>
              <Ionicons color="#FFFFFF" name={item.icon} size={25} />
            </View>
            <View className="ml-4 flex-1">
              <Text className="font-poppins-medium text-[16px] text-[#16213D]">{item.title}</Text>
              <Text className="font-poppins text-[14px] text-[#77829B]">{index === 0 ? lesson?.title ?? item.subtitle : item.subtitle}</Text>
            </View>
            <View className={`h-[25px] w-[25px] items-center justify-center rounded-full border-2 ${item.complete ? "border-[#6747F6] bg-[#6747F6]" : "border-[#8792AB]"}`}>
              {item.complete ? <Ionicons color="#FFFFFF" name="checkmark" size={16} /> : null}
            </View>
          </View>
        ))}
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: { flexGrow: 1, paddingBottom: 22, paddingHorizontal: 28 },
});
