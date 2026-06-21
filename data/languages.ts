import type { SupportedLanguage } from "@/types/learning";

export const languages = [
  {
    code: "es",
    name: "Spanish",
    nativeName: "Español",
    flagEmoji: "https://flagcdn.com/16x12/es.png",
    description: "Start with friendly greetings and everyday travel phrases.",
    greeting: "Hola",
    color: "#58CC02",
    isAvailable: true,
  },
  {
    code: "fr",
    name: "French",
    nativeName: "Français",
    flagEmoji: "https://flagcdn.com/16x12/fr.png",
    description: "Practice polite introductions and cafe-ready basics.",
    greeting: "Bonjour",
    color: "#1CB0F6",
    isAvailable: true,
  },
  {
    code: "ja",
    name: "Japanese",
    nativeName: "日本語",
    flagEmoji: "https://flagcdn.com/16x12/ja.png",
    description: "Learn simple greetings with gentle pronunciation practice.",
    greeting: "こんにちは",
    color: "#FF9600",
    isAvailable: true,
  },
  // {
  //   code: "ko",
  //   name: "Korean",
  //   nativeName: "한국어",
  //   flagEmoji: "https://flagcdn.com/16x12/kr.png",
  //   description: "Build confidence with useful greetings and daily phrases.",
  //   greeting: "안녕하세요",
  //   color: "#FF4B4B",
  //   isAvailable: true,
  // },
  // {
  //   code: "zh",
  //   name: "Chinese",
  //   nativeName: "中文",
  //   flagEmoji: "https://flagcdn.com/16x12/cn.png",
  //   description: "Practice essential Mandarin greetings and expressions.",
  //   greeting: "你好",
  //   color: "#FFB020",
  //   isAvailable: true,
  // },
] satisfies SupportedLanguage[];

export const defaultLanguageCode = "es";
