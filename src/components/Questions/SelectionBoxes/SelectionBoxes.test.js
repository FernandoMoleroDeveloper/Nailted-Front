import { render, screen, fireEvent } from "@testing-library/react";
import { ChakraProvider } from "@chakra-ui/react";
import SelectionBoxes from "./SelectionBoxes";

describe("SelectionBoxes", () => {
  const sessionId = "session_id";
  const question = {
    _id: "question_id",
    questionText: "Select an option:",
    options: [
      { _id: "option_id_1", optionText: "Option 1", score: 10 },
      { _id: "option_id_2", optionText: "Option 2", score: 5 },
      { _id: "option_id_3", optionText: "Option 3", score: 3 },
    ],
  };
  const previousResponse = {
    question: "question_id",
    session: "session_id",
    optionSelected: [{ _id: "option_id_1", optionText: "Option 1", score: 10 }],
  };
  const setHasUserAnswered = jest.fn();
  const setQuestionResponse = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the question text correctly", () => {
    const multiSelection = true;

    render(
      <ChakraProvider>
        <SelectionBoxes sessionId={sessionId} question={question} previousResponse={previousResponse} setHasUserAnswered={setHasUserAnswered} setQuestionResponse={setQuestionResponse} multiSelection={multiSelection} />
      </ChakraProvider>
    );

    const questionText = screen.getByText("Select an option:");
    expect(questionText).toBeInTheDocument();
  });

  it("calls setQuestionResponse when an option is selected for multiSelection", () => {
    const multiSelection = true;

    render(
      <ChakraProvider>
        <SelectionBoxes sessionId={sessionId} question={question} previousResponse={previousResponse} setHasUserAnswered={setHasUserAnswered} setQuestionResponse={setQuestionResponse} multiSelection={multiSelection} />
      </ChakraProvider>
    );

    const optionBox = screen.getByText("Option 2");

    fireEvent.click(optionBox);

    expect(setQuestionResponse).toHaveBeenCalledWith({
      question: "question_id",
      session: "session_id",
      optionSelected: [
        { _id: "option_id_1", optionText: "Option 1", score: 10 },
        { _id: "option_id_2", optionText: "Option 2", score: 5 },
      ],
    });
  });

  it("calls setQuestionResponse to remove the option when clicked again for multiSelection", () => {
    const multiSelection = true;

    render(
      <ChakraProvider>
        <SelectionBoxes sessionId={sessionId} question={question} previousResponse={previousResponse} setHasUserAnswered={setHasUserAnswered} setQuestionResponse={setQuestionResponse} multiSelection={multiSelection} />
      </ChakraProvider>
    );

    const optionBox = screen.getByText("Option 1");

    fireEvent.click(optionBox);
    fireEvent.click(optionBox);

    expect(setQuestionResponse).toHaveBeenNthCalledWith(1, {
      question: "question_id",
      session: "session_id",
      optionSelected: [],
    });
    expect(setQuestionResponse).toHaveBeenNthCalledWith(2, {
      question: "question_id",
      session: "session_id",
      optionSelected: [{ _id: "option_id_1", optionText: "Option 1", score: 10 }],
    });
  });

  it("calls setQuestionResponse to select the option for singleSelection", () => {
    const multiSelection = false;

    render(
      <ChakraProvider>
        <SelectionBoxes sessionId={sessionId} question={question} previousResponse={previousResponse} setHasUserAnswered={setHasUserAnswered} setQuestionResponse={setQuestionResponse} multiSelection={multiSelection} />
      </ChakraProvider>
    );
    const optionBox = screen.getByText("Option 3");

    fireEvent.click(optionBox);

    expect(setQuestionResponse).toHaveBeenCalledWith({
      question: "question_id",
      session: "session_id",
      optionSelected: [{ _id: "option_id_3", optionText: "Option 3", score: 3 }],
    });
  });
});
