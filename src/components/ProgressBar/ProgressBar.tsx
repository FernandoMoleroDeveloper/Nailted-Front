import { useEffect, useState } from "react";
import { Box, Text, Step, Stepper, StepIndicator, Progress, StepIcon } from "@chakra-ui/react";

const ProgressBar = ({ question }: any): JSX.Element => {
  const steps = [{ name: "Bienestar" }, { name: "Comunicación" }, { name: "Desarrollo" }, { name: "Reconocimiento" }, { name: "Cultura" }];

  const categoryToIndex = {
    Cultura: 0,
    Comunicación: 1,
    Desarrollo: 2,
    Reconocimiento: 3,
    Bienestar: 4,
  };

  const [activeStep, setActiveStep] = useState(0);

  const max = steps.length - 1;
  const progressPercent = (activeStep / max) * 100;

  useEffect(() => {
    const categoryName = question?.category?.name;
    if (categoryName && categoryName in categoryToIndex) {
      setActiveStep(categoryToIndex[categoryName as keyof typeof categoryToIndex]);
    }
  }, [question?.category?.name, setActiveStep]);

  return (
    <>
      <Stepper size="sm" index={activeStep}>
        {steps.map((step, index) => (
          <Step key={index}>
            <Box as={StepIndicator} m="25" bg={index <= activeStep ? "blue.500" : "gray.200"}>
              <StepIcon boxSize={4} color={index <= activeStep ? "gray.200" : "gray.200"} />
            </Box>
          </Step>
        ))}
      </Stepper>
      <Progress value={progressPercent} position="absolute" height="3px" width="full" top="10px" zIndex={-1} />
      <Text fontWeight={500} fontSize={22} color="#199bf6" m="0px auto">
        {question?.category?.name.toUpperCase()}
      </Text>
    </>
  );
};

export default ProgressBar;
