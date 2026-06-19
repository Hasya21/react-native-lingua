import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useMemo, useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { images } from "@/constants/images";
import { defaultLanguageCode, languages } from "@/data/languages";
import type { LanguageCode } from "@/types/learning";

export default function LanguageSelectionScreen() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [selectedCode, setSelectedCode] =
    useState<LanguageCode>(defaultLanguageCode);

  const filteredLanguages = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
      return languages;
    }

    return languages.filter(
      (language) =>
        language.name.toLowerCase().includes(normalizedQuery) ||
        language.nativeName.toLowerCase().includes(normalizedQuery),
    );
  }, [query]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        bounces={false}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View className="flex-row items-center justify-between px-1 pb-8 pt-3">
          <TouchableOpacity
            accessibilityLabel="Go back"
            activeOpacity={0.7}
            className="h-11 w-11 items-start justify-center"
            onPress={() => router.back()}
          >
            <Ionicons color="#001328" name="chevron-back" size={31} />
          </TouchableOpacity>

          <Text className="font-poppins-semibold text-[23px] leading-8 text-text-primary">
            Choose a language
          </Text>
          <View className="h-11 w-11" />
        </View>

        <View className="h-[58px] flex-row items-center gap-4 rounded-[29px] border border-[#E5E7EB] bg-[#FAFAFC] px-5">
          <Ionicons color="#697592" name="search-outline" size={25} />
          <TextInput
            accessibilityLabel="Search languages"
            className="flex-1 font-poppins text-[16px] text-text-primary"
            onChangeText={setQuery}
            placeholder="Search languages"
            placeholderTextColor="#75809A"
            style={styles.searchInput}
            value={query}
          />
        </View>

        <Text className="pb-4 pt-8 font-poppins-semibold text-[17px] leading-6 text-text-primary">
          Popular
        </Text>

        <View className="gap-2.5">
          {filteredLanguages.map((language) => {
            const isSelected = language.code === selectedCode;

            return (
              <TouchableOpacity
                accessibilityRole="radio"
                accessibilityState={{ checked: isSelected }}
                activeOpacity={0.82}
                className={`h-[92px] flex-row items-center rounded-[24px] border px-4 ${
                  isSelected
                    ? "border-2 border-[#8064FF] bg-[#F8F7FF]"
                    : "border-[#F1F2F6] bg-white"
                }`}
                key={language.code}
                onPress={() => setSelectedCode(language.code)}
              >
                <View className="h-[50px] w-[50px] overflow-hidden rounded-full border border-[#E7E9EF] bg-white">
                  <Image
                    accessibilityLabel={`${language.name} flag`}
                    resizeMode="cover"
                    source={{ uri: language.flagEmoji }}
                    style={styles.flag}
                  />
                </View>

                <View className="flex-1 px-5">
                  <Text className="font-poppins-medium text-[18px] leading-7 text-text-primary">
                    {language.name}
                  </Text>
                  <Text className="font-poppins text-[14px] leading-6 text-[#75809A]">
                    {language.nativeName}
                  </Text>
                </View>

                {isSelected ? (
                  <View className="h-9 w-9 items-center justify-center rounded-full bg-lingua-deep-purple">
                    <Ionicons color="#FFFFFF" name="checkmark" size={24} />
                  </View>
                ) : (
                  <Ionicons color="#66738F" name="chevron-forward" size={24} />
                )}
              </TouchableOpacity>
            );
          })}

          {filteredLanguages.length === 0 ? (
            <View className="items-center rounded-[24px] border border-[#F1F2F6] px-6 py-10">
              <Text className="font-poppins-medium text-base text-text-secondary">
                No languages found
              </Text>
            </View>
          ) : null}
        </View>

        <TouchableOpacity
          accessibilityRole="button"
          activeOpacity={0.88}
          onPress={() => router.replace("/")}
          style={styles.confirmButton}
        >
          <Text className="font-poppins-semibold text-[17px] text-white">
            Continue
          </Text>
        </TouchableOpacity>

        <Image
          accessibilityLabel="World landmarks around the earth"
          resizeMode="contain"
          source={images.earth}
          style={styles.earth}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  confirmButton: {
    alignItems: "center",
    backgroundColor: "#5B3BF6",
    borderRadius: 22,
    boxShadow: "0 4px 0 #4727D9",
    height: 62,
    justifyContent: "center",
    marginTop: 24,
  },
  earth: {
    alignSelf: "center",
    height: 248,
    marginBottom: -64,
    marginTop: 10,
    width: "118%",
  },
  flag: {
    height: "100%",
    width: "100%",
  },
  safeArea: {
    backgroundColor: "#FFFFFF",
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 0,
    paddingHorizontal: 28,
  },
  searchInput: {
    paddingVertical: 0,
  },
});
