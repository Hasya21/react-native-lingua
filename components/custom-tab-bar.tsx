import { Ionicons } from "@expo/vector-icons";
import type { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const ACTIVE_COLOR = "#6547F5";
const INACTIVE_COLOR = "#71809E";

const TAB_DETAILS = {
  home: { icon: "home-outline", label: "Home" },
  learn: { icon: "book-outline", label: "Learn" },
  "ai-teacher": { icon: "people-outline", label: "AI Teacher" },
  chat: { icon: "chatbubble-outline", label: "Chat" },
  profile: { icon: "person-outline", label: "Profile" },
} as const satisfies Record<
  string,
  { icon: keyof typeof Ionicons.glyphMap; label: string }
>;

export function CustomTabBar({ state, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();

  return (
    <View
      className="min-h-[86px] flex-row rounded-t-[30px] border-t border-border bg-white pt-3"
      style={[styles.container, { paddingBottom: Math.max(insets.bottom, 10) }]}
    >
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
            accessibilityRole="tab"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={details.label}
            key={route.key}
            onLongPress={handleLongPress}
            onPress={handlePress}
            style={styles.tabButton}
          >
            <Ionicons
              color={isFocused ? ACTIVE_COLOR : INACTIVE_COLOR}
              name={isFocused ? details.icon.replace("-outline", "") as keyof typeof Ionicons.glyphMap : details.icon}
              size={27}
            />
            <Text
              className="font-poppins-medium text-[11px]"
              style={{ color: isFocused ? ACTIVE_COLOR : INACTIVE_COLOR }}
            >
              {details.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    boxShadow: "0 -3px 14px rgba(30, 42, 70, 0.06)",
  },
  tabButton: {
    alignItems: "center",
    flex: 1,
    gap: 5,
    height: 60,
    justifyContent: "center",
    zIndex: 1,
  },
});
