import "../../styles/layouts/FormPage.scss";
import React, { useState, useEffect } from "react";
import { Box, Flex, Button, FormControl, Alert, AlertIcon } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { FaAnglesLeft, FaAnglesRight } from "react-icons/fa6";
import { transitionIn } from "../../styles/motions/props";
import TextLong from "../../components/Questions/TextLong/TextLong";
import TextShort from "../../components/Questions/TextShort/TextShort";
import SelectionBoxes from "../../components/Questions/SelectionBoxes/SelectionBoxes";
import NumberSelector from "../../components/Questions/NumberSelector/NumberSelector";
// import Results from "../../components/Results/Results";
// import EmailRequest from "../../components/EmailRequest/EmailRequest";
import ProgressBar from "../../components/ProgressBar/ProgressBar";
import { Question, VARIANT } from "../../models/Question";
import Results from "../../components/Results/Results";

const QuizzPage = (): JSX.Element => {
  const [sessionId, setSessionId] = useState<string>("");
  const [response, setResponse] = useState<any>("");
  const [content, setContent] = useState<React.ReactNode | null>("");
  const [quizzQuestions, setQuizzQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [hasAnswered, setHasAnswered] = useState<any>(false);
  const [errorMessage, setErrorMessage] = useState("");
  const GET_QUESTIONS_URL = `${process.env.REACT_APP_API_URL as string}/quizz/current-version`;
  const CREATE_SESSION_URL = `${process.env.REACT_APP_API_URL as string}/session`;
  const CREATE_RESPONSE_URL = `${process.env.REACT_APP_API_URL as string}/response`;


  const nextQuestion = async (): Promise<void> => {
    if (currentQuestion < 19 && hasAnswered) {
      setCurrentQuestion(currentQuestion + 1);
      setHasAnswered(false);
      setErrorMessage("");
      console.log("Voy a enviar esta respuesta: ");
      console.log(response);
      await createResponse();
    } else if (!hasAnswered) {
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
    fetch(GET_QUESTIONS_URL)
      .then(async (response) => {
        if (response.status !== 201) {
          alert("Error obteniendo las preguntas del quizz.");
        }
        return await response.json();
      })
      .then(async (responseParsed) => {
        setQuizzQuestions(responseParsed);
        createSession(responseParsed[0].version);
      })
      .catch((error) => {
        alert("Error al iniciar el quizz.");
        console.error(error);
      });
  };

  const createSession = (version: number): void => {
    const data = { version };

    fetch(CREATE_SESSION_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then(async (response) => {
        if (response.status !== 201) {
          alert("La respuesta del servidor no fue la esperada. No se ha creado la sesion.");
        }
        const responseData = await response.json();
        setSessionId(responseData._id);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const createResponse = async (): Promise<void> => {
    setContent(
      <div className="form-page__loading">
        <div className="form-page__ball">
        </div>
      </div>
    );

    if (response) {
      const data = await response;
      console.log("El data: ");
      console.log(data);

      fetch(CREATE_RESPONSE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then(async (response) => {
          if (response.status !== 201) {
            alert("La respuesta del servidor no fue la esperada. No se ha almacenado la respuesta.");
          }
          // await clearResponse();
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };

  useEffect(() => {
    if (quizzQuestions?.length === 0) {
      setContent(
        <div className="form-page__loading">
          <div className="form-page__ball">
            <div></div>
          </div>
        </div>
      );
      fetchQuestions();
    }

    if (quizzQuestions?.length > 0) {
      switch (quizzQuestions[currentQuestion]?.variant) {
        // Selection Boxes.
        case VARIANT.MULTI_OPTION:
          setContent(
            <motion.div {...transitionIn}>
              <FormControl as="fieldset">
                <SelectionBoxes sessionId={sessionId} question={quizzQuestions[currentQuestion]} response={response} setResponse={setResponse} setHasAnswered={setHasAnswered} multiSelection={true}></SelectionBoxes>
              </FormControl>
            </motion.div>
          );
          break;
        case VARIANT.SINGLE_OPTION:
          setContent(
            <motion.div {...transitionIn}>
              <FormControl as="fieldset">
                <SelectionBoxes sessionId={sessionId} question={quizzQuestions[currentQuestion]} response={response} setResponse={setResponse} setHasAnswered={setHasAnswered} multiSelection={false}></SelectionBoxes>
              </FormControl>
            </motion.div>
          );
          break;
        // Number Selector
        case VARIANT.NUMERIC:
          setContent(
            <FormControl as="fieldset">
              <motion.div {...transitionIn}>
                <NumberSelector sessionId={sessionId} question={quizzQuestions[currentQuestion]} response={response} setResponse={setResponse} setHasAnswered={setHasAnswered}></NumberSelector>
              </motion.div>
            </FormControl>
          );
          break;
        // Input text Long
        case VARIANT.TEXT_LONG:
          setContent(
            <motion.div {...transitionIn}>
              <FormControl as="fieldset">
                <TextLong sessionId={sessionId} question={quizzQuestions[currentQuestion]} response={response} setResponse={setResponse} setHasAnswered={setHasAnswered}></TextLong>
              </FormControl>
            </motion.div>
          );
          break
        // Input Text Single line
        case VARIANT.TEXT_SHORT:
          setContent(
            <motion.div {...transitionIn}>
              <FormControl as="fieldset">
                <TextShort sessionId={sessionId} question={quizzQuestions[currentQuestion]} response={response} setResponse={setResponse} setHasAnswered={setHasAnswered}></TextShort>
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
  }, [response, sessionId, quizzQuestions, currentQuestion]);

  return (
    <div className="form-page page">
      {quizzQuestions?.length === 0 ? (
        content
      ) : (
        <>
          {/* Código para mostrar el mensaje de error */}
          {errorMessage && (
            <Alert status="error">
              <AlertIcon />
              {errorMessage}
            </Alert>
          )}

          {!showingResults && (
            <Box minWidth="100vw" maxHeight={100}>
              <ProgressBar question={quizzQuestions[currentQuestion]}></ProgressBar>
            </Box>
          )}
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
                  onClick={async () => {
                    await nextQuestion();
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
