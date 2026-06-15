import { FontAwesome6, Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
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

import { VerificationModal } from "@/components/verification-modal";
import { images } from "@/constants/images";

type AuthMode = "sign-in" | "sign-up";

type AuthScreenProps = {
  mode: AuthMode;
};

const authCopy = {
  "sign-in": {
    title: "Welcome back",
    subtitle: "Continue your language journey",
    button: "Sign In",
    footer: "New to Lingua?",
    footerAction: "Sign up",
    footerRoute: "/sign-up" as const,
  },
  "sign-up": {
    title: "Create your account",
    subtitle: "Start your language journey today ✨",
    button: "Sign Up",
    footer: "Already have an account?",
    footerAction: "Log in",
    footerRoute: "/sign-in" as const,
  },
};

const socialProviders = [
  { name: "Google", icon: "google", color: "#4285F4" },
  { name: "Facebook", icon: "facebook", color: "#1877F2" },
  { name: "Apple", icon: "apple", color: "#001328" },
] as const;

export function AuthScreen({ mode }: AuthScreenProps) {
  const copy = authCopy[mode];
  const isSignUp = mode === "sign-up";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [verificationVisible, setVerificationVisible] = useState(false);

  function handleContinue() {
    setVerificationVisible(true);
  }

  function completeVerification() {
    setVerificationVisible(false);
    router.replace("/");
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        bounces={false}
        contentContainerStyle={styles.scrollContent}
        contentInsetAdjustmentBehavior="automatic"
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <TouchableOpacity
          accessibilityLabel="Go back"
          activeOpacity={0.7}
          className="h-11 w-11 items-start justify-center"
          onPress={() => router.back()}
        >
          <Ionicons color="#001328" name="chevron-back" size={31} />
        </TouchableOpacity>

        <View className="pt-8">
          <Text className="font-poppins-bold text-[32px] leading-[40px] text-text-primary">
            {copy.title}
          </Text>
          <Text className="pt-3 font-poppins text-[17px] leading-7 text-[#667085]">
            {copy.subtitle}
          </Text>
        </View>

        <View className="h-[205px] items-center justify-end overflow-hidden">
          <Image
            resizeMode="contain"
            source={images.mascotAuth}
            style={styles.mascot}
          />
        </View>

        <View className="-mt-[1px] gap-4">
          <View className="h-[82px] justify-center rounded-[19px] border border-[#E2E5EA] bg-white px-6">
            <Text className="font-poppins-medium text-[14px] text-[#74809A]">
              Email
            </Text>
            <TextInput
              autoCapitalize="none"
              autoComplete="email"
              keyboardType="email-address"
              onChangeText={setEmail}
              placeholder="alex@gmail.com"
              placeholderTextColor="#001328"
              selectionColor="#5B3BF6"
              style={styles.input}
              value={email}
            />
          </View>

          {isSignUp ? (
            <View className="h-[82px] justify-center rounded-[19px] border border-[#E2E5EA] bg-white px-6">
              <Text className="font-poppins-medium text-[14px] text-[#74809A]">
                Password
              </Text>
              <View className="flex-row items-center">
                <TextInput
                  autoCapitalize="none"
                  autoComplete="new-password"
                  onChangeText={setPassword}
                  placeholder="•••••••••"
                  placeholderTextColor="#001328"
                  secureTextEntry={!passwordVisible}
                  selectionColor="#5B3BF6"
                  style={[styles.input, styles.passwordInput]}
                  value={password}
                />
                <TouchableOpacity
                  accessibilityLabel={
                    passwordVisible ? "Hide password" : "Show password"
                  }
                  activeOpacity={0.7}
                  className="h-11 w-11 items-end justify-center"
                  onPress={() => setPasswordVisible((visible) => !visible)}
                >
                  <Ionicons
                    color="#74809A"
                    name={passwordVisible ? "eye-off-outline" : "eye-outline"}
                    size={27}
                  />
                </TouchableOpacity>
              </View>
            </View>
          ) : null}
        </View>

        <TouchableOpacity
          activeOpacity={0.88}
          className="h-[64px] items-center justify-center rounded-[18px] bg-lingua-deep-purple"
          onPress={handleContinue}
          style={styles.primaryButton}
        >
          <View
            className="absolute inset-0 items-center justify-center"
            pointerEvents="none"
          >
            <Text className="font-poppins-semibold text-[19px] text-white">
              {copy.button}
            </Text>
          </View>
        </TouchableOpacity>

        <View className="flex-row items-center gap-5 py-7">
          <View className="h-px flex-1 bg-[#DFE3EA]" />
          <Text className="font-poppins text-[15px] text-[#667085]">
            or continue with
          </Text>
          <View className="h-px flex-1 bg-[#DFE3EA]" />
        </View>

        <View className="gap-3">
          {socialProviders.map((provider) => (
            <TouchableOpacity
              activeOpacity={0.75}
              className="h-[62px] flex-row items-center rounded-[18px] border border-[#E8EAF0] bg-white px-7"
              key={provider.name}
              onPress={() => {
                // TODO: implement social authentication
              }}
            >
              <View className="w-12 items-center">
                <FontAwesome6
                  color={provider.color}
                  name={provider.icon}
                  size={29}
                />
              </View>
              <Text className="ml-5 font-poppins-medium text-[16px] text-text-primary">
                Continue with {provider.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View className="flex-row justify-center pb-5 pt-12">
          <Text className="font-poppins text-[15px] text-[#667085]">
            {copy.footer}{" "}
          </Text>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => router.replace(copy.footerRoute)}
          >
            <Text className="font-poppins-medium text-[15px] text-lingua-deep-purple">
              {copy.footerAction}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <VerificationModal
        email={email}
        onClose={() => setVerificationVisible(false)}
        onComplete={completeVerification}
        visible={verificationVisible}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  input: {
    color: "#001328",
    fontFamily: "Poppins-Regular",
    fontSize: 17,
    lineHeight: 25,
    marginTop: 2,
    padding: 0,
  },
  mascot: {
    height: 238,
    marginBottom: -47,
    width: 282,
  },
  passwordInput: {
    flex: 1,
  },
  primaryButton: {
    backgroundColor: "#5B3BF6",
    borderRadius: 22,
    boxShadow: "0 5px 0 #4727D9",
    height: 72,
    marginHorizontal: -4,
    marginTop: 32,
  },
  safeArea: {
    backgroundColor: "#FFFFFF",
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 18,
    paddingHorizontal: 31,
    paddingTop: 16,
  },
});
