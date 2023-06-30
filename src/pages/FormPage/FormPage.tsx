
import { Box, Button, useSteps, Step, Stepper, StepStatus, StepIcon, StepIndicator, FormHelperText, FormLabel, HStack, Progress, RadioGroup, Checkbox, FormControl } from "@chakra-ui/react";
// import Footer from "../../components/Footer/Footer";
// import Header from "../../components/Header/Header";
import "../../styles/layouts/FormPage.scss";
import { blueButton } from "../../styles/motions/props";
import React, { useState, useEffect } from "react";
import TextComponentLong from "../../components/TextComponentLong/TextComponentLong";
import TextComponentShort from "../../components/TextComponentShort/TextComponentShort";
import { motion } from "framer-motion";
import NumberComponent from "../../components/NumberComponent/NumberComponent";
import { FaAnglesLeft, FaAnglesRight } from "react-icons/fa6";
import OneOptionComponent from "../../components/OneOptionComponent/OneOptionComponent";
import FourBoxes from "../../components/Questions/FourBoxes/FourBoxes";


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
    console.log("NExt");
    setQuestionNumber(questionNumber + 1);
  };

  const previousQuestion = (): void => {
    questionNumber > 0 && setQuestionNumber(questionNumber - 1);
  };

  useEffect(() => {
    console.log(questionNumber);
    switch (questionNumber) {
      // Radio buttons
      case 0:
        setContent(
          <>
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
              <OneOptionComponent></OneOptionComponent>
            </motion.div>
          </>
        );
        console.log(content);
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
              <NumberComponent></NumberComponent>
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
        console.log("Entra en caso 4");
        setContent(FourBoxes);
        break;
    }
  }, [questionNumber]);

  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
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
          {/* <Box className="form-page__header" boxShadow="md" p="3">
            <Header></Header>
          </Box> */}
          <Box mt="10" position="relative">
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
          <Box className="form-page__container">
            <Box className="form-page__formulary">
              {content}
              <Button mr="15" {...blueButton} leftIcon={<FaAnglesLeft />} className="form-page__button center" onClick={previousQuestion}>
                Anterior
              </Button>
              <Button ml="15" {...blueButton} rightIcon={<FaAnglesRight />} className="form-page__button center" onClick={nextQuestion}>
                Siguiente
              </Button>
            </Box>
          </Box>
          {/* <Box className="form-page__footer">
            <Footer></Footer>
          </Box> */}
        </>
      )}
    </div>
  );
};
export default FormPage;
