import React, { useContext, useState, useEffect } from "react";
import { SessionIdContext, TokenContext } from "../../App";
import { Box, Alert, AlertIcon, useDisclosure } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { transitionIn } from "../../styles/motions/props";
import TextLong from "../Questions/TextLong/TextLong";
import TextShort from "../Questions/TextShort/TextShort";
import SelectionBoxes from "../Questions/SelectionBoxes/SelectionBoxes";
import NumberSelector from "../Questions/NumberSelector/NumberSelector";
import ProgressBar from "../ProgressBar/ProgressBar";
import { Question, VARIANT } from "../../models/Question";
import LoadingAnimation from "../LoadingAnimation/LoadingAnimation";
import QuizzNavigation from "../QuizzNavigation/QuizzNavigation";
import QuizzModal from "../QuizzModal/QuizzModal";

const Quizz = (): React.JSX.Element => {
  const { updateSessionId } = useContext<any>(SessionIdContext as any);
  const { updateToken } = useContext<any>(TokenContext as any);
  const [sessionId, setSessionId] = useState<string>("");
  const [questionResponse, setQuestionResponse] = useState<any>("");
  const [content, setContent] = useState<React.ReactNode | null>();
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
        if (checkTextResponseIsValid()) {
          await responseManagement(incrementCurrentQuestionValue);
          onOpen();
        } else {
          setErrorMessage("Debe escribir al menos 5 caracteres.");
        }
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
    } else if (hasResponseChanged()) {
      if (isTheLastQuestion() && goToNextOrPreviousQuestion === decrementCurrentQuestionValue) {
        await updateResponseFromDatabase();
        decrementCurrentQuestionValue();
      } else {
        await updateResponseFromDatabase();
        !isTheLastQuestion() && goToNextOrPreviousQuestion();
        setErrorMessage("");
      }
    } else if (!hasResponseChanged()) {
      if (isTheLastQuestion() && goToNextOrPreviousQuestion === decrementCurrentQuestionValue) {
        decrementCurrentQuestionValue();
      } else {
        !isTheLastQuestion() && goToNextOrPreviousQuestion();
        setErrorMessage("");
      }
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

  const showLoadingAnimation = (): React.JSX.Element => {
    return <LoadingAnimation></LoadingAnimation>;
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
        updateToken(responseData.email);
        localStorage.setItem("storedSessionId", responseData._id);
        localStorage.setItem("storedToken", responseData.email);
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
        showLoadingAnimation()
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
      <QuizzModal onClose={onClose} setHasUserAnswered={setHasUserAnswered} isOpen={isOpen} checkTextResponseIsValid={checkTextResponseIsValid} nextQuestionActions={nextQuestionActions} />;
    </div>
  );
};
export default Quizz;
