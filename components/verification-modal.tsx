import { useEffect, useRef, useState } from "react";
import {
  KeyboardAvoidingView,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

type VerificationModalProps = {
  email: string;
  visible: boolean;
  onClose: () => void;
  onComplete: () => void;
};

const CODE_LENGTH = 6;

export function VerificationModal({
  email,
  visible,
  onClose,
  onComplete,
}: VerificationModalProps) {
  const [code, setCode] = useState("");
  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    if (!visible) {
      setCode("");
      return;
    }

    const focusTimer = setTimeout(() => inputRef.current?.focus(), 250);
    return () => clearTimeout(focusTimer);
  }, [visible]);

  function handleCodeChange(value: string) {
    const nextCode = value.replace(/\D/g, "").slice(0, CODE_LENGTH);
    setCode(nextCode);

    if (nextCode.length === CODE_LENGTH) {
      inputRef.current?.blur();
      onComplete();
    }
  }

  return (
    <Modal
      animationType="fade"
      onRequestClose={onClose}
      transparent
      visible={visible}
    >
      <KeyboardAvoidingView
        behavior={process.env.EXPO_OS === "ios" ? "padding" : "height"}
        style={styles.keyboardView}
      >
        <Pressable onPress={onClose} style={styles.backdrop}>
          <Pressable
            className="w-full max-w-[410px] rounded-[28px] bg-white px-6 pb-7 pt-8"
            onPress={() => inputRef.current?.focus()}
            style={styles.modalCard}
          >
            <Text className="text-center font-poppins-bold text-[25px] leading-8 text-text-primary">
              Check your email
            </Text>
            <Text className="pt-3 text-center font-poppins text-[15px] leading-6 text-text-secondary">
              You received an email at{"\n"}
              <Text className="font-poppins-medium text-text-primary">
                {email || "your email"}
              </Text>
              {"\n"}Enter the verification code below.
            </Text>

            <View className="relative mt-7 flex-row justify-between">
              {Array.from({ length: CODE_LENGTH }).map((_, index) => (
                <View
                  className={`h-[58px] w-[45px] items-center justify-center rounded-[14px] border ${
                    index === code.length
                      ? "border-lingua-deep-purple"
                      : "border-[#DFE3EA]"
                  }`}
                  key={index}
                >
                  <Text
                    className="font-poppins-semibold text-[22px] text-text-primary"
                    style={styles.codeDigit}
                  >
                    {code[index] ?? ""}
                  </Text>
                </View>
              ))}

              <TextInput
                accessibilityLabel="Six digit verification code"
                autoFocus
                caretHidden
                keyboardType="number-pad"
                maxLength={CODE_LENGTH}
                onChangeText={handleCodeChange}
                ref={inputRef}
                style={styles.hiddenInput}
                value={code}
              />
            </View>

            <TouchableOpacity
              activeOpacity={0.8}
              className="mt-6 items-center py-2"
              onPress={() => inputRef.current?.focus()}
            >
              <Text className="font-poppins-medium text-[14px] text-lingua-deep-purple">
                Enter the 6-digit code
              </Text>
            </TouchableOpacity>
          </Pressable>
        </Pressable>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    alignItems: "center",
    backgroundColor: "rgba(0, 19, 40, 0.42)",
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 22,
  },
  codeDigit: {
    fontVariant: ["tabular-nums"],
  },
  hiddenInput: {
    ...StyleSheet.absoluteFillObject,
    color: "transparent",
    opacity: 0.02,
  },
  keyboardView: {
    flex: 1,
  },
  modalCard: {
    borderCurve: "continuous",
    backgroundColor: "#FFFFFF",
    shadowColor: "rgba(0, 19, 40, 0.18)",
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.25,
    shadowRadius: 40,
    elevation: 12,
  },
});
