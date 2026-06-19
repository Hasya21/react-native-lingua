import type { Unit } from "@/types/learning";

export const units = [
  {
    id: "spanish-basics-1",
    languageCode: "es",
    title: "Spanish Basics 1",
    description: "Meet people, say hello, and use simple polite phrases.",
    level: "A1",
    order: 1,
    lessonIds: ["spanish-greetings", "spanish-introductions"],
  },
  {
    id: "french-basics-1",
    languageCode: "fr",
    title: "French Basics 1",
    description: "Use greetings and polite words in everyday moments.",
    level: "A1",
    order: 1,
    lessonIds: ["french-greetings"],
  },
  {
    id: "japanese-basics-1",
    languageCode: "ja",
    title: "Japanese Basics 1",
    description: "Build confidence with common greetings and responses.",
    level: "A1",
    order: 1,
    lessonIds: ["japanese-greetings"],
  },
] satisfies Unit[];
