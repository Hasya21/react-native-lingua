export type LanguageCode = "es" | "fr" | "ja" | "ko" | "zh";

export type LessonMode = "standard" | "audio" | "ai-teacher";

export type ActivityType =
  | "vocabulary"
  | "phrase"
  | "multiple-choice"
  | "fill-blank"
  | "listen-repeat"
  | "chat";

export type CEFRLevel = "A1" | "A2";

export type SupportedLanguage = {
  code: LanguageCode;
  name: string;
  nativeName: string;
  flagEmoji: string;
  description: string;
  greeting: string;
  color: string;
  isAvailable: boolean;
};

export type VocabularyItem = {
  id: string;
  term: string;
  translation: string;
  pronunciation?: string;
  partOfSpeech?: "noun" | "verb" | "adjective" | "adverb" | "phrase";
  example?: string;
};

export type PhraseItem = {
  id: string;
  phrase: string;
  translation: string;
  pronunciation?: string;
  context: string;
};

export type LessonGoal = {
  id: string;
  label: string;
};

export type BaseActivity = {
  id: string;
  type: ActivityType;
  prompt: string;
  xp: number;
};

export type VocabularyActivity = BaseActivity & {
  type: "vocabulary";
  vocabularyId: string;
};

export type PhraseActivity = BaseActivity & {
  type: "phrase";
  phraseId: string;
};

export type MultipleChoiceActivity = BaseActivity & {
  type: "multiple-choice";
  answer: string;
  options: string[];
};

export type FillBlankActivity = BaseActivity & {
  type: "fill-blank";
  sentence: string;
  answer: string;
};

export type ListenRepeatActivity = BaseActivity & {
  type: "listen-repeat";
  phraseId: string;
  slowAudioText: string;
};

export type ChatActivity = BaseActivity & {
  type: "chat";
  scenario: string;
  expectedPhrases: string[];
};

export type LessonActivity =
  | VocabularyActivity
  | PhraseActivity
  | MultipleChoiceActivity
  | FillBlankActivity
  | ListenRepeatActivity
  | ChatActivity;

export type AITeacherPrompt = {
  system: string;
  openingLine: string;
  correctionStyle: string;
  voiceDirection: string;
};

export type Unit = {
  id: string;
  languageCode: LanguageCode;
  title: string;
  description: string;
  level: CEFRLevel;
  order: number;
  lessonIds: string[];
};

export type Lesson = {
  id: string;
  unitId: string;
  languageCode: LanguageCode;
  title: string;
  description: string;
  mode: LessonMode;
  order: number;
  estimatedMinutes: number;
  xpReward: number;
  goals: LessonGoal[];
  vocabulary: VocabularyItem[];
  phrases: PhraseItem[];
  activities: LessonActivity[];
  aiTeacherPrompt: AITeacherPrompt;
};
