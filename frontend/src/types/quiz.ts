export interface Personality {
  pubkey: string;
  name: string;
  description: string;
  color: string;
}

export interface OptionScore {
  [personalityId: string]: string;
}

export interface QuestionOption {
  pubkey: string;
  questionId: number;
  text: string;
  order: number;
  scores: OptionScore;
}

export interface Question {
  pubkey: string;
  text: string;
  weight: number;
  order: number;
  options: QuestionOption[];
}

export interface Answer {
  questionId: string;
  optionId: string;
}

export interface PersonalityScore {
  personality: Personality;
  score: number;
  percentage: number;
}

export interface Result {
  personality: Personality;
  scores: PersonalityScore[];
}

export interface SubmitAnswersRequest {
  answers: Answer[];
}
