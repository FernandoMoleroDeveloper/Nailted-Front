import { Box, Flex, Button, FormControl } from "@chakra-ui/react";
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
import EmailRquest from "../../components/EmailRequest/EmailRequest";
import ProgressBar from "../../components/ProgressBar/ProgressBar";

const FormPage = (): JSX.Element => {
  const [questionNumber, setQuestionNumber] = useState(0);
  const [content, setContent] = useState<React.ReactNode | null>("");

  const nextQuestion = (): void => {
    console.log("Next");
    if (questionNumber <= 5) {
      // sumar un numero por cada pregunta que se agregue
      setQuestionNumber(questionNumber + 1);
    }
  };

  const previousQuestion = (): void => {
    questionNumber > 0 && setQuestionNumber(questionNumber - 1);
  };

  useEffect(() => {
    switch (questionNumber) {
      // Selection Boxes
      case 0:
        setContent(
          <motion.div {...transitionIn}>
            <FormControl as="fieldset">
              <SelectionBoxes></SelectionBoxes>
            </FormControl>
          </motion.div>
        );
        break;
      // Input text Long
      case 1:
        setContent(
          <motion.div {...transitionIn}>
            <FormControl as="fieldset">
              <TextLong></TextLong>
            </FormControl>
          </motion.div>
        );
        break;
      // Number Selector
      case 2:
        setContent(
          <FormControl as="fieldset">
            <motion.div {...transitionIn}>
              <NumberSelector></NumberSelector>
            </motion.div>
          </FormControl>
        );
        break;
      // Input Text Single line
      case 3:
        setContent(
          <motion.div {...transitionIn}>
            <FormControl as="fieldset">
              <TextShort></TextShort>
            </FormControl>
          </motion.div>
        );
        break;
      // Results
      case 4:
        setContent(
          <motion.div {...transitionIn}>
            <FormControl as="fieldset">
              <Results></Results>
            </FormControl>
          </motion.div>
        );
        break;
      // Email request
      case 5:
        setContent(
          <motion.div {...transitionIn}>
            <EmailRquest></EmailRquest>
          </motion.div>
        );
        break;
    }
  }, [questionNumber]);

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
          {questionNumber !== 4 && questionNumber !== 5 && (
            <Box minWidth="100vw" maxHeight={100}>
              <ProgressBar></ProgressBar>
            </Box>
          )}
          <Box className="form-page__container">
            <Box className="form-page__formulary">{content}</Box>
            <Flex className="form-page__navigation">
              {questionNumber !== 5 && (
                <Button leftIcon={<FaAnglesLeft />} fontSize={20} color="#199bf6" borderRadius={30} backgroundColor="#ffff" className="form-page__previous center" onClick={previousQuestion}>
                  Anterior
                </Button>
              )}
              {questionNumber < 5 && (
                <Button rightIcon={<FaAnglesRight />} fontSize={20} color="#ffff" borderRadius={30} backgroundColor="#199bf6" _hover={{ bg: "#0469da" }} className="form-page__next center" onClick={nextQuestion}>
                  {questionNumber !== 3 ? "Siguiente" : "Resultados"}
                </Button>
              )}
            </Flex>
          </Box>
        </>
      )}
    </div>
  );
};
export default FormPage;
