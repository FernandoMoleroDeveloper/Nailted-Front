import { render, screen, fireEvent } from "@testing-library/react";
import { ChakraProvider } from "@chakra-ui/react";
import TextShort from "./TextShort";

describe("TextShort", () => {
  const sessionId = "session_id";
  const question = {
    _id: "question_id",
    questionText: "Write a short text:",
  };
  const previousResponse = {
    question: "question_id",
    session: "session_id",
    text: {
      textShort: "Lorem ipsum",
    },
  };
  const setHasUserAnswered = jest.fn();
  const setQuestionResponse = jest.fn();

  const setErrorMessage = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the question text correctly", () => {
    render(
      <ChakraProvider>
        <TextShort sessionId={sessionId} question={question} previousResponse={previousResponse} setHasUserAnswered={setHasUserAnswered} setQuestionResponse={setQuestionResponse} setErrorMessage={setErrorMessage} />
      </ChakraProvider>
    );

    const questionText = screen.getByText("Write a short text:");
    expect(questionText).toBeInTheDocument();
  });

  it("calls setQuestionResponse when text is changed", () => {
    render(
      <ChakraProvider>
        <TextShort sessionId={sessionId} question={question} previousResponse={previousResponse} setHasUserAnswered={setHasUserAnswered} setQuestionResponse={setQuestionResponse} setErrorMessage={setErrorMessage} />
      </ChakraProvider>
    );

    const textarea = screen.getByPlaceholderText("Escribe aquí...");

    fireEvent.change(textarea, { target: { value: "New short text" } });

    expect(setQuestionResponse).toHaveBeenCalledWith({
      question: "question_id",
      session: "session_id",
      text: { textShort: "New short text" },
    });
  });

  it("calls setHasUserAnswered when text is changed", () => {
    render(
      <ChakraProvider>
        <TextShort sessionId={sessionId} question={question} previousResponse={previousResponse} setHasUserAnswered={setHasUserAnswered} setQuestionResponse={setQuestionResponse} setErrorMessage={setErrorMessage} />
      </ChakraProvider>
    );

    const textarea = screen.getByPlaceholderText("Escribe aquí...");
    fireEvent.change(textarea, { target: { value: "New short text" } });

    expect(setHasUserAnswered).toHaveBeenCalledWith(true);
  });
});
