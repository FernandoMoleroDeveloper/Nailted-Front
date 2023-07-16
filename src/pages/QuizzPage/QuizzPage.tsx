import "../../styles/layouts/QuizzPage.scss";
import React, { useState, useEffect } from "react";
import { Box, Button, FormControl, Alert, AlertIcon, Modal, ModalOverlay, ModalContent, ModalCloseButton, ModalBody, ModalFooter, useDisclosure, ModalHeader } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { transitionIn } from "../../styles/motions/props";
import TextLong from "../../components/Questions/TextLong/TextLong";
import TextShort from "../../components/Questions/TextShort/TextShort";
import SelectionBoxes from "../../components/Questions/SelectionBoxes/SelectionBoxes";
import NumberSelector from "../../components/Questions/NumberSelector/NumberSelector";
// import Results from "../../components/Results/Results";
// import EmailRequest from "../../components/EmailRequest/EmailRequest";
import ProgressBar from "../../components/ProgressBar/ProgressBar";
import { Question, VARIANT } from "../../models/Question";
// import Results from "../../components/Results/Results";
import { Link } from "react-router-dom";
import LoadingAnimation from "../../components/LoadingAnimation/LoadingAnimation";
import QuizzNavigation from "../../components/QuizzNavigation/QuizzNavigation";

const QuizzPage = (): JSX.Element => {
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
  // const [showingResults, setShowingResults] = useState(false);
  const QUESTIONS_URL = `${process.env.REACT_APP_API_URL as string}/quizz/current-version/`;
  const SESSION_URL = `${process.env.REACT_APP_API_URL as string}/session/`;
  const RESPONSE_URL = `${process.env.REACT_APP_API_URL as string}/response/`;

  const nextQuestionActions = async (): Promise<void> => {
    if (currentQuestionPosition < quizzQuestions.length - 1 && hasUserAnswered) {
      setHasUserAnswered(false);
      setErrorMessage("");
      if (checkTextResponseIsValid()) {
        await responseManagement();
      } else if (!checkTextResponseIsValid()) {
        setErrorMessage("Debe escribir al menos 5 caracteres.");
      }
    } else if (!hasUserAnswered) {
      setErrorMessage("Es necesario responder a la pregunta para poder continuar");
    }
  };

  const previousQuestionRecoveringResponse = () => {
    if (currentQuestionPosition >= 0) {
      decrementCurrentQuestionValue();
    }
  };

  const responseManagement = async (): Promise<void> => {
    if (!quizzResponses[currentQuestionPosition]) {
      await createResponse();
      isTheLastQuestion() && incrementCurrentQuestionValue();
    } else if (quizzResponses[currentQuestionPosition] && JSON.stringify(quizzResponses[currentQuestionPosition]) !== JSON.stringify(questionResponse)) {
      await updateResponseFromDatabase();
      isTheLastQuestion() && incrementCurrentQuestionValue();
    } else if (quizzResponses[currentQuestionPosition] && JSON.stringify(quizzResponses[currentQuestionPosition]) === JSON.stringify(questionResponse)) {
      isTheLastQuestion() && incrementCurrentQuestionValue();
    }
  };

  const isTheLastQuestion = () => {
    return currentQuestionPosition + 1 !== quizzQuestions?.length;
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

  const storeResponsesLocally = async (receivedResponse: Response): Promise<void> => {
    setQuizzResponses((prevResponses) => {
      const updatedResponses = [...prevResponses];
      updatedResponses[currentQuestionPosition] = receivedResponse;
      return updatedResponses;
    });

    await showCurrentQuestion();
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
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const createResponse = async (): Promise<void> => {
    !isTheLastQuestion && showLoadingAnimation();

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
            setCurrentQuestionPosition(currentQuestionPosition);
            alert("La respuesta del servidor no fue la esperada. No se ha almacenado la respuesta.");
          } else {
            await storeResponsesLocally(questionResponse);
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
    !isTheLastQuestion && showLoadingAnimation();

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
            setCurrentQuestionPosition(currentQuestionPosition);
            alert("La respuesta del servidor no fue la esperada. No se ha almacenado la respuesta.");
          } else {
            await storeResponsesLocally(questionResponse);
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };

  useEffect(() => {
    if (quizzQuestions?.length === 0) {
      showLoadingAnimation();
      void fetchQuizzQuestions();
    }
    void showCurrentQuestion();
  }, [questionResponse, sessionId, quizzQuestions, quizzResponses, quizzResponsesId, currentQuestionPosition]);

  const showCurrentQuestion = async (): Promise<void> => {
    if (quizzQuestions?.length > 0) {
      switch (quizzQuestions[currentQuestionPosition]?.variant) {
        // Selection Boxes.
        case VARIANT.MULTI_OPTION:
          setContent(
            <motion.div {...transitionIn}>
              <SelectionBoxes sessionId={sessionId} question={quizzQuestions[currentQuestionPosition]} previousResponse={quizzResponses[currentQuestionPosition]} setQuestionResponse={setQuestionResponse} setHasUserAnswered={setHasUserAnswered} multiSelection={true}></SelectionBoxes>
            </motion.div>
          );
          break;
        case VARIANT.SINGLE_OPTION:
          setContent(
            <motion.div {...transitionIn}>
              <SelectionBoxes sessionId={sessionId} question={quizzQuestions[currentQuestionPosition]} previousResponse={quizzResponses[currentQuestionPosition]} setQuestionResponse={setQuestionResponse} setHasUserAnswered={setHasUserAnswered} multiSelection={false}></SelectionBoxes>
            </motion.div>
          );
          break;
        // Number Selector
        case VARIANT.NUMERIC:
          setContent(
            <FormControl as="fieldset">
              <motion.div {...transitionIn}>
                <NumberSelector sessionId={sessionId} question={quizzQuestions[currentQuestionPosition]} previousResponse={quizzResponses[currentQuestionPosition]} setQuestionResponse={setQuestionResponse} setHasUserAnswered={setHasUserAnswered}></NumberSelector>
              </motion.div>
            </FormControl>
          );
          break;
        // Input text Long
        case VARIANT.TEXT_LONG:
          setContent(
            <motion.div {...transitionIn}>
              <FormControl as="fieldset">
                <TextLong sessionId={sessionId} question={quizzQuestions[currentQuestionPosition]} previousResponse={quizzResponses[currentQuestionPosition]} setQuestionResponse={setQuestionResponse} hasUserAnswered={hasUserAnswered} setHasUserAnswered={setHasUserAnswered} setErrorMessage={setErrorMessage}></TextLong>
              </FormControl>
            </motion.div>
          );
          break;
        // Input Text Single line
        case VARIANT.TEXT_SHORT:
          setContent(
            <motion.div {...transitionIn}>
              <FormControl as="fieldset">
                <TextShort sessionId={sessionId} question={quizzQuestions[currentQuestionPosition]} previousResponse={quizzResponses[currentQuestionPosition]} setQuestionResponse={setQuestionResponse} hasUserAnswered={hasUserAnswered} setHasUserAnswered={setHasUserAnswered} setErrorMessage={setErrorMessage}></TextShort>
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
  };

  return (
    <div className="quizz-page page">
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
          <Box minWidth="100vw" maxHeight={100}>
            <ProgressBar question={quizzQuestions[currentQuestionPosition]}></ProgressBar>
          </Box>

          <Box className="quizz-page__container">
            <Box className="quizz-page__formulary">{content}</Box>
            <QuizzNavigation currentQuestionPosition={currentQuestionPosition} previousQuestionRecoveringResponse={previousQuestionRecoveringResponse} quizzQuestions={quizzQuestions} nextQuestionActions={nextQuestionActions} responseManagement={responseManagement} onOpen={onOpen}></QuizzNavigation>
          </Box>
        </>
      )}
      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent m="20px">
          <ModalHeader>Finalizar evaluación</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <p>Se van a enviar las respuestas para calcular los resultados. Una vez confirmes el envío no podrás volver atrás para modificar tus respuestas.</p>
          </ModalBody>
          <ModalFooter m="0px auto">
            <Button colorScheme="gray" onClick={onClose} m="0px 10px">
              Modificar
            </Button>
            <Link to="/results" className="home-page__link">
              <Button colorScheme="blue" onClick={() => checkTextResponseIsValid() && nextQuestionActions} m="0px 10px">
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
