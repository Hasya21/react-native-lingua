import { Link } from "expo-router";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { images } from "@/constants/images";

export default function OnboardingScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        bounces={false}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View className="flex-1">
          <View className="flex-row items-center justify-center">
            <View className="h-[70px] w-[70px]">
              <Image
                resizeMode="contain"
                source={images.mascotLogo}
                style={styles.image}
              />
            </View>
            <Text className="-ml-2 font-poppins-bold text-[32px] leading-[40px] text-text-primary">
              lingua
            </Text>
          </View>

          <View className="px-2 pt-11">
            <Text className="font-poppins-bold text-[34px] leading-[44px] text-text-primary">
              Your AI language{"\n"}
              <Text className="text-lingua-deep-purple">teacher.</Text>
            </Text>

            <Text className="pt-4 font-poppins text-[17px] leading-8 text-[#667085]">
              Real conversations, personalized{"\n"}
              lessons, anytime, anywhere.
            </Text>
          </View>

          <View className="relative h-[400px]">
            <View className="absolute left-1 top-[52px] z-20 w-[116px] -rotate-[7deg] rounded-[18px] bg-[#EEF7FF] px-5 py-3">
              <Text className="font-poppins-medium text-[21px] text-text-primary">
                Hello!
              </Text>
              <View className="absolute -bottom-3 right-4 h-0 w-0 border-l-[13px] border-r-2 border-t-[14px] border-l-transparent border-r-transparent border-t-[#EEF7FF]" />
            </View>

            <View className="absolute right-1 top-7 z-20 w-[116px] rotate-[10deg] rounded-[18px] bg-[#F7F5FF] px-5 py-3">
              <Text className="font-poppins-medium text-[21px] italic text-[#5537F6]">
                ¡Hola!
              </Text>
              <View className="absolute -bottom-3 left-5 h-0 w-0 border-l-2 border-r-[13px] border-t-[14px] border-l-transparent border-r-transparent border-t-[#F7F5FF]" />
            </View>

            <View className="absolute right-0 top-[126px] z-20 w-[116px] rotate-[9deg] rounded-[18px] bg-[#FFF3ED] px-5 py-3">
              <Text className="font-poppins-medium text-[21px] text-[#FF4C42]">
                你好!
              </Text>
              <View className="absolute -bottom-3 left-5 h-0 w-0 border-l-2 border-r-[13px] border-t-[14px] border-l-transparent border-r-transparent border-t-[#FFF3ED]" />
            </View>

            <View className="absolute bottom-0 h-[365px] w-[365px] self-center">
              <Image
                resizeMode="contain"
                source={images.mascotWelcome}
                style={styles.image}
              />
            </View>
          </View>

          <Link href="/sign-up" asChild>
            <TouchableOpacity activeOpacity={0.88} style={styles.button}>
              <View
                className="absolute inset-0 items-center justify-center"
                pointerEvents="none"
              >
                <Text className="font-poppins-semibold text-[20px] text-white">
                  Get Started
                </Text>
              </View>
              <Text className="absolute right-8 top-[-2px] font-poppins text-[44px] text-white">
                ›
              </Text>
            </TouchableOpacity>
          </Link>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: "#FFFFFF",
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 28,
    paddingHorizontal: 32,
    paddingTop: 28,
  },
  button: {
    backgroundColor: "#5B3BF6",
    borderRadius: 22,
    boxShadow: "0 5px 0 #4727D9",
    height: 72,
    marginHorizontal: -4,
  },
  image: {
    height: "100%",
    width: "100%",
  },
});
