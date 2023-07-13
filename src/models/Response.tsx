export interface IResponseCreate {
  question: string;
  session?: string;
  text?: [
    {
      textLong?: string;
      textShort?: string;
    }
  ];
  optionSelected?: [
    {
      score: number;
      optionText: string;
    }
  ];
  dateResponded?: Date;
  numeric?: number;
}
