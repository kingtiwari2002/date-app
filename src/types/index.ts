export interface Question {
  id: string;
  text: string;
  duration: 45 | 60 | 90 | 120;
}

export interface Mission {
  id: string;
  text: string;
}

export interface Chapter {
  id: string;
  title: string;
  description: string;
  questions: Question[];
  mission: Mission;
}

export interface QuestionPack {
  id: string;
  name: string;
  chapters: Chapter[];
}

export interface DateSession {
  id: string;
  girlName: string;
  theme: string;
  mood: string | null;
  adventure: string | null;
  currentChapterIndex: number;
  currentQuestionIndex: number;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AdminConfig {
  availableAdventures: string[];
}
