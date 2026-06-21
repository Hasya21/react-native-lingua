import { Ionicons } from "@expo/vector-icons";
import type { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

const ACTIVE_COLOR = "#6547F5";
const INACTIVE_COLOR = "#71809E";
const INDICATOR_SIZE = 52;

const TAB_DETAILS = {
  home: { icon: "home-outline", label: "Home" },
  learn: { icon: "book-outline", label: "Learn" },
  "ai-teacher": { icon: "videocam-outline", label: "AI Teacher" },
  chat: { icon: "chatbubble-outline", label: "Chat" },
  profile: { icon: "person-outline", label: "Profile" },
} as const satisfies Record<
  string,
  { icon: keyof typeof Ionicons.glyphMap; label: string }
>;

export function CustomTabBar({ state, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();
  const [barWidth, setBarWidth] = useState(0);
  const activeIndex = useSharedValue(state.index);
  const tabWidth = barWidth / state.routes.length;

  useEffect(() => {
    activeIndex.value = withTiming(state.index, {
      duration: 240,
      easing: Easing.linear,
    });
  }, [activeIndex, state.index]);

  const indicatorStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX:
          activeIndex.value * tabWidth + (tabWidth - INDICATOR_SIZE) / 2,
      },
    ],
  }));

  return (
    <View
      className="border-t border-border bg-white"
      onLayout={(event) => setBarWidth(event.nativeEvent.layout.width)}
      style={[styles.container, { paddingBottom: Math.max(insets.bottom, 10) }]}
    >
      {barWidth > 0 ? (
        <Animated.View style={[styles.activeIndicator, indicatorStyle]} />
      ) : null}

      {state.routes.map((route, index) => {
        const details = TAB_DETAILS[route.name as keyof typeof TAB_DETAILS];
        const isFocused = state.index === index;

        if (!details) {
          return null;
        }

        const handlePress = () => {
          const event = navigation.emit({
            canPreventDefault: true,
            target: route.key,
            type: "tabPress",
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const handleLongPress = () => {
          navigation.emit({ target: route.key, type: "tabLongPress" });
        };

        return (
          <Pressable
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={details.label}
            key={route.key}
            onLongPress={handleLongPress}
            onPress={handlePress}
            style={styles.tabButton}
          >
            <Ionicons
              color={isFocused ? "#FFFFFF" : INACTIVE_COLOR}
              name={isFocused ? details.icon.replace("-outline", "") as keyof typeof Ionicons.glyphMap : details.icon}
              size={isFocused ? 25 : 24}
            />
            {!isFocused ? (
              <Text className="font-poppins-medium text-[11px] text-[#71809E]">
                {details.label}
              </Text>
            ) : null}
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  activeIndicator: {
    alignItems: "center",
    backgroundColor: ACTIVE_COLOR,
    borderRadius: INDICATOR_SIZE / 2,
    height: INDICATOR_SIZE,
    left: 0,
    position: "absolute",
    top: 10,
    width: INDICATOR_SIZE,
  },
  container: {
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    boxShadow: "0 -3px 14px rgba(30, 42, 70, 0.06)",
    flexDirection: "row",
    minHeight: 82,
    paddingTop: 10,
  },
  tabButton: {
    alignItems: "center",
    flex: 1,
    gap: 5,
    height: 58,
    justifyContent: "center",
    zIndex: 1,
  },
});
