export enum VARIANT {
  SINGLE_OPTION = "SINGLE_OPTION",
  MULTI_OPTION = "MULTI_OPTION",
  NUMERIC = "NUMERIC",
  TEXT_SHORT = "TEXT_SHORT",
  TEXT_LONG = "TEXT_LONG",
}

export interface Question {
  questionText: string;
  options: [
    {
      optionText: string;
      score: number;
    }
  ];
  selectedNumber: {
    min: number;
    max: number;
    multiplier: number;
    isInverseScore: boolean;
  };
  category: string;
  variant: VARIANT;
  version: number;
}
