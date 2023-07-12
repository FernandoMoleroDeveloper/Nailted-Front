import { Box, Flex, Button, FormControl, Alert, AlertIcon } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaAnglesLeft, FaAnglesRight } from "react-icons/fa6";
import { transitionIn } from "../../styles/motions/props";
import "../../styles/layouts/FormPage.scss";
import TextLong from "../../components/Questions/TextLong/TextLong";
import TextShort from "../../components/Questions/TextShort/TextShort";
import SelectionBoxes from "../../components/Questions/SelectionBoxes/SelectionBoxes";
import NumberSelector from "../../components/Questions/NumberSelector/NumberSelector";
import Results from "../../components/Results/Results";
// import EmailRequest from "../../components/EmailRequest/EmailRequest";
import ProgressBar from "../../components/ProgressBar/ProgressBar";
import { Question, VARIANT } from "../../models/Question";
import SingleBox from "../../components/Questions/SelectionBoxes/SingleBox/SingleBox";

const QuizzPage = (): JSX.Element => {
  // const [questionNumber, setQuestionNumber] = useState(0);
  const [content, setContent] = useState<React.ReactNode | null>("");
  const QUIZZ_URL = `${process.env.REACT_APP_API_URL as string}/quizz/current-version`;
  const [quizzQuestions, setQuizzQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showingResults, setShowingResults] = useState(false);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  console.log(showingResults);

  const nextQuestion = (): void => {
    if (currentQuestion < 19) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handleNextClick = (): void => {
    if (hasAnswered) {
      nextQuestion();
    } else {
      setErrorMessage("Por favor, responde a la pregunta antes de continuar");
    }
  };

  const previousQuestion = (): void => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const showResults = (): void => {
    setContent(
      <motion.div {...transitionIn}>
        <FormControl as="fieldset">
          <Results></Results>
        </FormControl>
      </motion.div>
    );
    setShowingResults(true);
  };

  const fetchQuestions = (): void => {
    fetch(QUIZZ_URL)
      .then(async (response) => {
        if (response.status !== 201) {
          alert("Error obteniendo las preguntas del quizz.");
        }
        return await response.json();
      })
      .then((responseParsed) => {
        console.log("Respuesta del servidor:");
        console.log(responseParsed);
        setQuizzQuestions(responseParsed);
      })
      .catch((error) => {
        alert("Error al iniciar el quizz.");
        console.error(error);
      });
  };

  useEffect(() => {
    if (quizzQuestions?.length === 0) {
      fetchQuestions();
    }

    if (quizzQuestions?.length > 0) {
      quizzQuestions && console.log("Tipo de pregunta actual");
      quizzQuestions && console.log(quizzQuestions[currentQuestion].variant);
      quizzQuestions && currentQuestion && console.log(`La pregunta actual es la numero ${currentQuestion}`);

      switch (quizzQuestions[currentQuestion]?.variant) {
        // Selection Boxes
        case VARIANT.MULTI_OPTION:
          setContent(
            <motion.div {...transitionIn}>
              <FormControl as="fieldset">
                <SelectionBoxes
                  onAnswer={(value) => {
                    setHasAnswered(value);
                  }}
                ></SelectionBoxes>
              </FormControl>
            </motion.div>
          );
          break;
        case VARIANT.SINGLE_OPTION:
          setContent(
            <motion.div {...transitionIn}>
              <FormControl as="fieldset">
                <SingleBox
                  onSelect={(value) => {
                    if (value) setHasAnswered(true);
                  }}
                ></SingleBox>
              </FormControl>
            </motion.div>
          );
          break;
        // Input text Long
        case VARIANT.TEXT_LONG:
          setContent(
            <motion.div {...transitionIn}>
              <FormControl as="fieldset">
                <TextLong
                  onAnswer={(answer) => {
                    setHasAnswered(true);
                  }}
                ></TextLong>
              </FormControl>
            </motion.div>
          );
          break;
        // Number Selector
        case VARIANT.NUMERIC:
          setContent(
            <FormControl as="fieldset">
              <motion.div {...transitionIn}>
                <NumberSelector
                  onAnswer={(answer) => {
                    setHasAnswered(true);
                  }}
                ></NumberSelector>
              </motion.div>
            </FormControl>
          );
          break;
        // Input Text Single line
        case VARIANT.TEXT_SHORT:
          setContent(
            <motion.div {...transitionIn}>
              <FormControl as="fieldset">
                <TextShort
                  onAnswer={(answer) => {
                    setHasAnswered(true);
                  }}
                ></TextShort>
              </FormControl>
            </motion.div>
          );
          break;
        // // Email request
        // case "ESTE ES EL COMPONENTE EMAIL":
        //   setContent(
        //     <motion.div {...transitionIn}>
        //       <EmailRequest></EmailRequest>
        //     </motion.div>
        //   );
        //   break;
      }
    }
  }, [quizzQuestions, currentQuestion]);

  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <div className="form-page page">
      {loading ? (
        <div className="form-page__loading">
          <div className="form-page__ball">
            <div></div>
          </div>
        </div>
      ) : (
        <>
          {/* Código para mostrar el mensaje de error */}
          {errorMessage && (
            <Alert status="error">
              <AlertIcon />
              {errorMessage}
            </Alert>
          )}

          <Box minWidth="100vw" maxHeight={100}>
            <ProgressBar></ProgressBar>
          </Box>
          <Box className="form-page__container">
            <Box className="form-page__formulary">{content}</Box>
            <Flex className="form-page__navigation">
              {currentQuestion > 0 ? (
                <Button leftIcon={<FaAnglesLeft />} fontSize={20} color="#199bf6" borderRadius={30} backgroundColor="#ffff" className="form-page__previous center" onClick={previousQuestion}>
                  Anterior
                </Button>
              ) : null}
              {currentQuestion < 19 ? (
                <Button
                  rightIcon={<FaAnglesRight />}
                  fontSize={20}
                  color="#ffff"
                  borderRadius={30}
                  backgroundColor="#199bf6"
                  _hover={{ bg: "#0469da" }}
                  className="form-page__next center"
                  onClick={() => {
                    nextQuestion();
                    handleNextClick();
                  }}
                >
                  Siguiente
                </Button>
              ) : (
                <Button rightIcon={<FaAnglesRight />} fontSize={20} color="#ffff" borderRadius={30} backgroundColor="#199bf6" _hover={{ bg: "#0469da" }} className="form-page__next center" onClick={showResults}>
                  Resultados
                </Button>
              )}
              {/* REHACER PARA MOSTRAR, SI NO, EL ENVIO DE EMAIL */}
            </Flex>
          </Box>
        </>
      )}
    </div>
  );
};
export default QuizzPage;
