import { render, screen, fireEvent } from "@testing-library/react";
import { ChakraProvider } from "@chakra-ui/react";
import TextLong from "./TextLong";

describe("TextLong", () => {
  const sessionId = "session_id";
  const question = {
    _id: "question_id",
    questionText: "Write a long text:",
  };
  const previousResponse = {
    question: "question_id",
    session: "session_id",
    text: {
      textLong: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris vel nisi enim.",
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
        <TextLong sessionId={sessionId} question={question} previousResponse={previousResponse} setHasUserAnswered={setHasUserAnswered} setQuestionResponse={setQuestionResponse} setErrorMessage={setErrorMessage} />
      </ChakraProvider>
    );

    const questionText = screen.getByText("Write a long text:");
    expect(questionText).toBeInTheDocument();
  });

  it("calls setQuestionResponse when text is changed", () => {
    render(
      <ChakraProvider>
        <TextLong sessionId={sessionId} question={question} previousResponse={previousResponse} setHasUserAnswered={setHasUserAnswered} setQuestionResponse={setQuestionResponse} setErrorMessage={setErrorMessage} />
      </ChakraProvider>
    );
    const textarea = screen.getByPlaceholderText("Escribe aquí...");
    fireEvent.change(textarea, { target: { value: "New text response" } });

    expect(setQuestionResponse).toHaveBeenCalledWith({
      question: "question_id",
      session: "session_id",
      text: { textLong: "New text response" },
    });
  });

  it("calls setHasUserAnswered when text is changed", () => {
    render(
      <ChakraProvider>
        <TextLong sessionId={sessionId} question={question} previousResponse={previousResponse} setHasUserAnswered={setHasUserAnswered} setQuestionResponse={setQuestionResponse} setErrorMessage={setErrorMessage} />
      </ChakraProvider>
    );

    const textarea = screen.getByPlaceholderText("Escribe aquí...");

    fireEvent.change(textarea, { target: { value: "New text response" } });

    expect(setHasUserAnswered).toHaveBeenCalledWith(true);
  });
});
