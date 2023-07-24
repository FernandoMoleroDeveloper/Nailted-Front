import { Button, Flex } from "@chakra-ui/react";
import { nextButton, previousButton } from "../../styles/motions/props";

const QuizzNavigation = ({ currentQuestionPosition, previousQuestionRecoveringResponse, quizzQuestions, nextQuestionActions, responseManagement, onOpen }: any): React.JSX.Element => {
  return (
    <>
      <Flex className="quizz-page__navigation">
        {currentQuestionPosition > 0 ? (
          <Button {...previousButton} width="44%" className="quizz-page__previous center" onClick={previousQuestionRecoveringResponse}>
            Anterior
          </Button>
        ) : (
          <Flex width="44%">
          </Flex>
        )}
        {currentQuestionPosition < quizzQuestions?.length - 1 ? (
          <Button {...nextButton} width="44%" onClick={nextQuestionActions} >
            Siguiente
          </Button>
        ) : (
          <Button
            {...nextButton} width="44%"
            className="quizz-page__next center"
            onClick={nextQuestionActions}
          >
            Resultados
          </Button>
        )}
      </Flex>
    </>
  );
};

export default QuizzNavigation;
