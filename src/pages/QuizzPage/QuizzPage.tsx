import "../../styles/layouts/QuizzPage.scss";
import React, { useContext, useState, useEffect } from "react";
import { SessionIdContext } from "../../App";
import { Box, Button, Alert, AlertIcon, Modal, ModalOverlay, ModalContent, ModalCloseButton, ModalBody, ModalFooter, useDisclosure, ModalHeader } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { editButton, sendButton, transitionIn } from "../../styles/motions/props";
import TextLong from "../../components/Questions/TextLong/TextLong";
import TextShort from "../../components/Questions/TextShort/TextShort";
import SelectionBoxes from "../../components/Questions/SelectionBoxes/SelectionBoxes";
import NumberSelector from "../../components/Questions/NumberSelector/NumberSelector";
import ProgressBar from "../../components/ProgressBar/ProgressBar";
import { Question, VARIANT } from "../../models/Question";
import { Link } from "react-router-dom";
import LoadingAnimation from "../../components/LoadingAnimation/LoadingAnimation";
import QuizzNavigation from "../../components/QuizzNavigation/QuizzNavigation";

const QuizzPage = (): React.JSX.Element => {
  const { updateSessionId } = useContext<any>(SessionIdContext as any);
  const [sessionId, setSessionId] = useState<string>("");
  const [questionResponse, setQuestionResponse] = useState<any>("");
  const [content, setContent] = useState<React.ReactNode | null>(
    <div className="quizz-page__loading">
      <div className="quizz-page__ball">
        <div></div>
      </div>
    </div>
  );
  const [quizzQuestions, setQuizzQuestions] = useState<Question[]>([]);
  const [quizzResponses, setQuizzResponses] = useState<Response[]>([]);
  const [quizzResponsesId, setQuizzResponsesId] = useState<string[]>([]);
  const [currentQuestionPosition, setCurrentQuestionPosition] = useState(0);
  const [hasUserAnswered, setHasUserAnswered] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const QUESTIONS_URL = `${process.env.REACT_APP_API_URL as string}/quizz/current-version/`;
  const SESSION_URL = `${process.env.REACT_APP_API_URL as string}/session/`;
  const RESPONSE_URL = `${process.env.REACT_APP_API_URL as string}/response/`;

  const nextQuestionActions = async (): Promise<void> => {
    setErrorMessage("");
    if (currentQuestionPosition < quizzQuestions.length - 1) {
      if (hasUserAnswered) {
        if (checkTextResponseIsValid()) {
          await responseManagement(incrementCurrentQuestionValue);
        } else {
          setErrorMessage("Debe escribir al menos 5 caracteres.");
        }
      } else {
        setErrorMessage("Es necesario responder a la pregunta para poder continuar");
      }
    } else if (isTheLastQuestion()) {
      if (hasUserAnswered) {
        onOpen();
      } else {
        setErrorMessage("Es necesario responder a la pregunta para poder continuar");
      }
    }

    setHasUserAnswered(false);
  };

  const previousQuestionRecoveringResponse = async (): Promise<void> => {
    if (currentQuestionPosition >= 0) {
      if (checkTextResponseIsValid() && hasUserAnswered) {
        await responseManagement(decrementCurrentQuestionValue);
      } else {
        decrementCurrentQuestionValue();
      }
      setErrorMessage("");
    }
  };

  const responseManagement = async (goToNextOrPreviousQuestion: any): Promise<void> => {
    if (!quizzResponses[currentQuestionPosition]) {
      await createResponse();
      setErrorMessage("");
      if (isTheLastQuestion() && goToNextOrPreviousQuestion === decrementCurrentQuestionValue) {
        decrementCurrentQuestionValue();
      } else {
        !isTheLastQuestion() && goToNextOrPreviousQuestion();
        setErrorMessage("");
      }
    } else if (quizzResponses[currentQuestionPosition] && hasResponseChanged()) {
      if (isTheLastQuestion() && goToNextOrPreviousQuestion === decrementCurrentQuestionValue) {
        await updateResponseFromDatabase();
        decrementCurrentQuestionValue();
      } else {
        await updateResponseFromDatabase();
        !isTheLastQuestion() && goToNextOrPreviousQuestion();
        setErrorMessage("");
      }
    } else if (quizzResponses[currentQuestionPosition] && !hasResponseChanged()) {
      if (isTheLastQuestion() && goToNextOrPreviousQuestion === decrementCurrentQuestionValue) {
        decrementCurrentQuestionValue();
      } else {
        !isTheLastQuestion() && goToNextOrPreviousQuestion();
        setErrorMessage("");
      }
    } else {
      goToNextOrPreviousQuestion();
      setErrorMessage("");
    }
  };

  const hasResponseChanged = (): boolean => {
    return JSON.stringify(quizzResponses[currentQuestionPosition]) !== JSON.stringify(questionResponse);
  };

  const isTheLastQuestion = () => {
    return currentQuestionPosition === quizzQuestions?.length - 1;
  };

  const checkTextResponseIsValid = () => {
    return questionResponse?.text?.textShort?.length >= 5 || questionResponse?.text?.textLong?.length >= 5 || !questionResponse?.text;
  };

  const incrementCurrentQuestionValue = () => {
    setCurrentQuestionPosition(currentQuestionPosition + 1);
  };

  const decrementCurrentQuestionValue = () => {
    setCurrentQuestionPosition(currentQuestionPosition - 1);
  };

  const storeResponsesLocally = (receivedResponse: Response) => {
    setQuizzResponses((prevResponses) => {
      const updatedResponses = [...prevResponses];
      updatedResponses[currentQuestionPosition] = receivedResponse;
      return updatedResponses;
    });
  };

  const showLoadingAnimation = () => {
    setContent(<LoadingAnimation></LoadingAnimation>);
  };

  const fetchQuizzQuestions = async (): Promise<void> => {
    showLoadingAnimation();

    fetch(QUESTIONS_URL)
      .then(async (res) => {
        if (res.status !== 201) {
          alert("Error obteniendo las preguntas del quizz.");
        }
        return await res.json();
      })
      .then(async (resParsed) => {
        setQuizzQuestions(resParsed);
        createSessionInDatabase(resParsed[0].version);
      })
      .catch((error) => {
        alert("Error al iniciar el quizz.");
        console.error(error);
      });
  };

  const createSessionInDatabase = (version: number): void => {
    const data = { version };

    fetch(SESSION_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then(async (res) => {
        if (res.status !== 201) {
          alert("La respuesta del servidor no fue la esperada. No se ha creado la sesion.");
        }
        const responseData = await res.json();
        setSessionId(responseData._id);
        updateSessionId(responseData._id);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const createResponse = async (): Promise<void> => {
    !isTheLastQuestion() && showLoadingAnimation();

    if (questionResponse) {
      fetch(RESPONSE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(questionResponse),
      })
        .then(async (res) => {
          if (res.status !== 201) {
            setCurrentQuestionPosition(currentQuestionPosition - 1);
            alert("La respuesta del servidor no fue la esperada. No se ha almacenado la respuesta.");
          } else {
            storeResponsesLocally(questionResponse);
            const responseData = await res.json();
            setQuizzResponsesId((prevResponsesId) => {
              const updatedResponsesId = [...prevResponsesId];
              updatedResponsesId[currentQuestionPosition] = responseData._id;
              return updatedResponsesId;
            });
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };

  const updateResponseFromDatabase = async (): Promise<void> => {
    !isTheLastQuestion() && showLoadingAnimation();

    if (questionResponse) {
      fetch(`${RESPONSE_URL}${quizzResponsesId[currentQuestionPosition]}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(questionResponse),
      })
        .then(async (res) => {
          if (res.status !== 201) {
            setCurrentQuestionPosition(currentQuestionPosition - 1);
            alert("La respuesta del servidor no fue la esperada. No se ha almacenado la respuesta.");
          } else {
            storeResponsesLocally(questionResponse);
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };

  const showCurrentQuestion = async (): Promise<void> => {
    if (quizzQuestions?.length > 0) {
      switch (quizzQuestions[currentQuestionPosition]?.variant) {
        case VARIANT.MULTI_OPTION:
          setContent(<SelectionBoxes sessionId={sessionId} question={quizzQuestions[currentQuestionPosition]} previousResponse={quizzResponses[currentQuestionPosition]} setQuestionResponse={setQuestionResponse} setHasUserAnswered={setHasUserAnswered} multiSelection={true}></SelectionBoxes>);
          break;
        case VARIANT.SINGLE_OPTION:
          setContent(<SelectionBoxes sessionId={sessionId} question={quizzQuestions[currentQuestionPosition]} previousResponse={quizzResponses[currentQuestionPosition]} setQuestionResponse={setQuestionResponse} setHasUserAnswered={setHasUserAnswered} multiSelection={false}></SelectionBoxes>);
          break;
        case VARIANT.NUMERIC:
          setContent(<NumberSelector sessionId={sessionId} question={quizzQuestions[currentQuestionPosition]} previousResponse={quizzResponses[currentQuestionPosition]} setQuestionResponse={setQuestionResponse} setHasUserAnswered={setHasUserAnswered}></NumberSelector>);
          break;
        case VARIANT.TEXT_LONG:
          setContent(<TextLong sessionId={sessionId} question={quizzQuestions[currentQuestionPosition]} previousResponse={quizzResponses[currentQuestionPosition]} setQuestionResponse={setQuestionResponse} hasUserAnswered={hasUserAnswered} setHasUserAnswered={setHasUserAnswered} setErrorMessage={setErrorMessage}></TextLong>);
          break;
        // Input Text Single line
        case VARIANT.TEXT_SHORT:
          setContent(<TextShort sessionId={sessionId} question={quizzQuestions[currentQuestionPosition]} previousResponse={quizzResponses[currentQuestionPosition]} setQuestionResponse={setQuestionResponse} hasUserAnswered={hasUserAnswered} setHasUserAnswered={setHasUserAnswered} setErrorMessage={setErrorMessage}></TextShort>);
          break;
      }
    }
  };

  useEffect(() => {
    if (quizzQuestions?.length === 0) {
      showLoadingAnimation();
      void fetchQuizzQuestions();
    } else {
      void showCurrentQuestion();
    }
  }, [questionResponse, sessionId, quizzQuestions, quizzResponses, quizzResponsesId, currentQuestionPosition]);

  return (
    <div className="quizz-page page">
      {quizzQuestions?.length === 0 ? (
        content
      ) : (
        <>
          {errorMessage && (
            <Alert status="error">
              <AlertIcon />
              {errorMessage}
            </Alert>
          )}
          <Box minWidth="100vw" maxHeight={100}>
            <ProgressBar question={quizzQuestions[currentQuestionPosition]} quizzQuestions={quizzQuestions}></ProgressBar>
          </Box>

          <Box className="quizz-page__container">
            <Box className="quizz-page__formulary">{<motion.div {...transitionIn}> {content} </motion.div>}</Box>
            <QuizzNavigation currentQuestionPosition={currentQuestionPosition} previousQuestionRecoveringResponse={previousQuestionRecoveringResponse} quizzQuestions={quizzQuestions} nextQuestionActions={nextQuestionActions} responseManagement={responseManagement} onOpen={onOpen}></QuizzNavigation>
          </Box>
        </>
      )}
      <Modal onClose={() => { onClose(); setHasUserAnswered(true); }} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent m="auto 20px">
          <ModalHeader textAlign="center">Ver resultados</ModalHeader>
          <ModalCloseButton />
          <ModalBody textAlign="center">
            <span>Una vez confirmes el envío no podrás volver para modificar tus respuestas.</span>
          </ModalBody>
          <ModalFooter m="0px auto">
            <Button {...editButton} minWidth="fit-content" p="25px 0px" colorScheme="gray" onClick={() => { onClose(); setHasUserAnswered(true); }} m="0px 20px">
              Modificar
            </Button>
            <Link to="/results" className="home-page__link">
              <Button {...sendButton} minWidth="fit-content" p="25px 30px" colorScheme="blue" onClick={() => checkTextResponseIsValid() && nextQuestionActions} m="0px 10px">
                Enviar
              </Button>
            </Link>
          </ModalFooter>
        </ModalContent>
      </Modal>
      ;
    </div>
  );
};
export default QuizzPage;
