import { Button, Flex } from "@chakra-ui/react";
import { nextButton, previousButton } from "../../styles/motions/props";

const QuizzNavigation = ({ currentQuestionPosition, previousQuestionRecoveringResponse, quizzQuestions, nextQuestionActions, responseManagement, onOpen }: any): JSX.Element => {
  return (
    <>
      <Flex className="quizz-page__navigation">
        {currentQuestionPosition > 0 ? (
          <Button {...previousButton} className="quizz-page__previous center" onClick={previousQuestionRecoveringResponse}>
            Anterior
          </Button>
        ) : (
          <Flex width="50%">
          </Flex>
        )}
        {currentQuestionPosition < quizzQuestions?.length - 1 ? (
          <Button {...nextButton} width="50%" onClick={nextQuestionActions} >
            Siguiente
          </Button>
        ) : (
          <Button
            {...nextButton} width="50%"
            className="quizz-page__next center"
            onClick={async () => {
              await responseManagement();
              onOpen();
            }}
          >
            Resultados
          </Button>
        )}
      </Flex>
    </>
  );
};

export default QuizzNavigation;
