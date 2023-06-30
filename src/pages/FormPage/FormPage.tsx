import { Box, Flex, Button, useSteps, Step, Stepper, StepStatus, StepIcon, StepIndicator, Progress, FormControl } from "@chakra-ui/react";
import "../../styles/layouts/FormPage.scss";
import React, { useState, useEffect } from "react";
import TextComponentLong from "../../components/TextComponentLong/TextComponentLong";
import TextComponentShort from "../../components/TextComponentShort/TextComponentShort";
import { motion } from "framer-motion";
import { FaAnglesLeft, FaAnglesRight } from "react-icons/fa6";
import SelectionBoxes from "../../components/Questions/SelectionBoxes/SelectionBoxes";
import NumberComponent2 from "../../components/NumberComponent/NumberComponent2";
import ResultsComponent from "../../components/ResultsComponent/ResultsComponent";

const FormPage = (): JSX.Element => {
  const [questionNumber, setQuestionNumber] = useState(0);
  const [content, setContent] = useState<React.ReactNode | null>("");

  const steps = [
    { title: "First", description: "Contact Info" },
    { title: "Second", description: "Date & Time" },
    { title: "Third", description: "Select Rooms" },
    { title: "Forth", description: "Date & Time" },
    { title: "Fifth", description: "Select Rooms" },
  ];

  const { activeStep } = useSteps({
    index: 1,
    count: steps.length,
  });

  const max = steps.length - 1;
  const progressPercent = (activeStep / max) * 100;

  const nextQuestion = (): void => {
    console.log("Next");
    if (questionNumber <= 4) { // sumar un numero por cada pregunta que se agregue
      setQuestionNumber(questionNumber + 1);
    }
  };

  const previousQuestion = (): void => {
    questionNumber > 0 && setQuestionNumber(questionNumber - 1);
  };

  useEffect(() => {
    console.log(questionNumber);
    switch (questionNumber) {
      // Radio buttons
      case 0:
        setContent(SelectionBoxes);
        break;
      // Input text
      case 1:
        setContent(
          <motion.div
            className="box"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.8,
              delay: 0.1,
              ease: [0, 0.71, 0.2, 1.01],
            }}
          >
            <FormControl as="fieldset">
              <TextComponentLong></TextComponentLong>
            </FormControl>
          </motion.div>
        );
        break;
      // TODO
      case 2:
        setContent(
          <FormControl as="fieldset">
            <motion.div
              className="box"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.8,
                delay: 0.1,
                ease: [0, 0.71, 0.2, 1.01],
              }}
            >
              <NumberComponent2></NumberComponent2>
            </motion.div>
          </FormControl>
        );
        break;
      case 3:
        setContent(
          <motion.div
            className="box"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.8,
              delay: 0.1,
              ease: [0, 0.71, 0.2, 1.01],
            }}
          >
            <FormControl as="fieldset">
              <TextComponentShort></TextComponentShort>
            </FormControl>
          </motion.div>
        );
        break;
      case 4:
        setContent(
          <motion.div
            className="box"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.8,
              delay: 0.1,
              ease: [0, 0.71, 0.2, 1.01],
            }}
          >
            <FormControl as="fieldset">
              <ResultsComponent></ResultsComponent>
            </FormControl>
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
        <div className="loadingio-spinner-ball-fr08q5zqxe9">
          <div className="ldio-iy69neut66">
            <div></div>
          </div>
        </div>
      ) : (
        <>
          <Box className="form-page__container">
            {questionNumber !== 5 && (
              <Box>
                <Stepper size="sm" index={activeStep} gap="0">
                  {steps.map((step, index) => (
                    <Step key={index}>
                      <StepIndicator m="25" bg="white">
                        <StepStatus complete={<StepIcon />} />
                      </StepIndicator>
                    </Step>
                  ))}
                </Stepper>
                <Progress value={progressPercent} position="absolute" height="3px" width="full" top="10px" zIndex={-1} />
              </Box>
            )}
            <Box className="form-page__formulary">
              {content}
              <Flex className="form-page__navigation">
                <Button leftIcon={<FaAnglesLeft />} fontSize={20} color="#199bf6" borderRadius={30} backgroundColor="#ffff" className="form-page__previous center" onClick={previousQuestion}>
                  Anterior
                </Button>
                <Button rightIcon={<FaAnglesRight />} fontSize={20} color="#ffff" borderRadius={30} backgroundColor="#199bf6" _hover={{ bg: "#0469da" }} className="form-page__next center" onClick={nextQuestion}>
                  Siguiente
                </Button>
              </Flex>
            </Box>
          </Box>
        </>
      )}
    </div>
  );
};
export default FormPage;
