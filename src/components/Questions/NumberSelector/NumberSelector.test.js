import { render, screen, fireEvent } from "@testing-library/react";
import { ChakraProvider } from "@chakra-ui/react";
import NumberSelector from "./NumberSelector";

describe("NumberSelector", () => {
  const sessionId = "session_id";
  const question = {
    _id: "question_id",
    questionText: "Select a number",
    selectedNumber: {
      min: 1,
      max: 10,
    },
  };
  const previousResponse = undefined;
  const setQuestionResponse = jest.fn();
  const setHasUserAnswered = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    render(
      <ChakraProvider>
        <NumberSelector sessionId={sessionId} question={question} previousResponse={previousResponse} setQuestionResponse={setQuestionResponse} setHasUserAnswered={setHasUserAnswered} />
      </ChakraProvider>
    );
  });

  it("renders the number selector and label correctly", () => {
    expect(screen.getByText("Select a number")).toBeInTheDocument();
    expect(screen.getByText("Min: 1 / Max: 10")).toBeInTheDocument();
    expect(screen.getByText("+")).toBeInTheDocument();
    expect(screen.getByText("-")).toBeInTheDocument();
  });

  it("increments and decrements the value when buttons are clicked", () => {
    const incrementButton = screen.getByText("+");
    const decrementButton = screen.getByText("-");

    const inputElement = screen.getByRole("spinbutton");
    expect(inputElement).toHaveValue(5);

    fireEvent.click(incrementButton);
    expect(inputElement).toHaveValue(6);

    fireEvent.click(decrementButton);
    expect(inputElement).toHaveValue(5);
  });

  it("updates the value when input is changed", () => {
    const inputElement = screen.getByRole("spinbutton");

    fireEvent.change(inputElement, { target: { value: "7" } });
    expect(inputElement).toHaveValue(7);
  });

  it("calls setQuestionResponse and setHasUserAnswered when the value is changed", () => {
    const inputElement = screen.getByRole("spinbutton");

    fireEvent.change(inputElement, { target: { value: "7" } });
    expect(setQuestionResponse).toHaveBeenCalledWith({
      question: "question_id",
      session: "session_id",
      numeric: 7,
    });

    expect(setHasUserAnswered).toHaveBeenCalledWith(true);
  });
});
