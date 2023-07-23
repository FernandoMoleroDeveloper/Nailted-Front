import { render, screen, fireEvent } from "@testing-library/react";
import { ChakraProvider } from "@chakra-ui/react";
import QuizzNavigation from "./QuizzNavigation";

describe("QuizzNavigation", () => {
  const currentQuestionPosition = 0;
  const previousQuestionRecoveringResponse = jest.fn();
  const quizzQuestions = [
    { _id: "q1", questionText: "Question 1" },
    { _id: "q2", questionText: "Question 2" },
    { _id: "q3", questionText: "Question 3" },
  ];
  const nextQuestionActions = jest.fn();
  const responseManagement = jest.fn();
  const onOpen = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the next button if currentQuestionPosition is less than quizzQuestions length - 1", () => {
    render(
      <ChakraProvider>
        <QuizzNavigation currentQuestionPosition={currentQuestionPosition} previousQuestionRecoveringResponse={previousQuestionRecoveringResponse} quizzQuestions={quizzQuestions} nextQuestionActions={nextQuestionActions} responseManagement={responseManagement} onOpen={onOpen} />
      </ChakraProvider>
    );
    const nextButton = screen.getByText("Siguiente");
    expect(nextButton).toBeInTheDocument();
  });

  it("renders the 'Resultados' button if currentQuestionPosition is equal to quizzQuestions length - 1", () => {
    const currentQuestionPosition = quizzQuestions.length - 1;

    render(
      <ChakraProvider>
        <QuizzNavigation currentQuestionPosition={currentQuestionPosition} previousQuestionRecoveringResponse={previousQuestionRecoveringResponse} quizzQuestions={quizzQuestions} nextQuestionActions={nextQuestionActions} responseManagement={responseManagement} onOpen={onOpen} />
      </ChakraProvider>
    );

    const resultadosButton = screen.getByText("Resultados");
    expect(resultadosButton).toBeInTheDocument();
  });

  it("calls nextQuestionActions when clicking the 'Siguiente' button", () => {
    render(
      <ChakraProvider>
        <QuizzNavigation currentQuestionPosition={currentQuestionPosition} previousQuestionRecoveringResponse={previousQuestionRecoveringResponse} quizzQuestions={quizzQuestions} nextQuestionActions={nextQuestionActions} responseManagement={responseManagement} onOpen={onOpen} />
      </ChakraProvider>
    );

    const nextButton = screen.getByText("Siguiente");
    fireEvent.click(nextButton);
    expect(nextQuestionActions).toHaveBeenCalled();
  });

  it("calls nextQuestionActions when clicking the 'Resultados' button", () => {
    const currentQuestionPosition = quizzQuestions.length - 1;

    render(
      <ChakraProvider>
        <QuizzNavigation currentQuestionPosition={currentQuestionPosition} previousQuestionRecoveringResponse={previousQuestionRecoveringResponse} quizzQuestions={quizzQuestions} nextQuestionActions={nextQuestionActions} responseManagement={responseManagement} onOpen={onOpen} />
      </ChakraProvider>
    );
    const resultadosButton = screen.getByText("Resultados");
    fireEvent.click(resultadosButton);
    expect(nextQuestionActions).toHaveBeenCalled();
  });
});
