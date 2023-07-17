import { useEffect, useState } from "react";
import { Text, Step, Stepper, StepIndicator, Progress, StepIcon, Flex, StepStatus } from "@chakra-ui/react";

const ProgressBar = ({ question, quizzQuestions }: any): JSX.Element => {
  console.log(quizzQuestions);
  const categoryToIndex: any = {};
  const steps: any[] = getCategoryNames(quizzQuestions);
  const [activeStep, setActiveStep] = useState(0);
  const max = steps.length - 1;
  const progressPercent = (activeStep / max) * 100;

  function getCategoryNames(quizzQuestions: any): any {
    const allCategoryNames: any[] = [];
    const categorySet = new Set<string>();

    for (const question of quizzQuestions) {
      const categoryName = question.category.name;
      if (!categorySet.has(categoryName)) {
        categorySet.add(categoryName);
        allCategoryNames.push({ name: categoryName });
      }
    }

    allCategoryNames.forEach((category, index) => {
      categoryToIndex[category.name] = index;
    });

    return allCategoryNames;
  }

  useEffect(() => {
    const categoryName = question?.category?.name;
    if (categoryName && categoryName in categoryToIndex) {
      setActiveStep(categoryToIndex[categoryName as keyof typeof categoryToIndex]);
    }
  }, [question?.category?.name, setActiveStep]);

  return (
    <Flex flexDirection="column" maxWidth="90%" margin="15px auto" position="relative">
      <Stepper size="sm" index={activeStep}>
        {steps.map((step, index) => (
          <Step key={index}>
            <StepIndicator m="0" bg={index <= activeStep ? "blue.500" : "gray.200"}>
              <StepStatus complete={<StepIcon boxSize={4} color={index <= activeStep ? "gray.200" : "gray.200"}/>} />
            </StepIndicator>
          </Step>
        ))}
      </Stepper>
      <Progress value={progressPercent} position="absolute" height="3px" width="full" top="10px" zIndex={-1}/>
      <Text fontWeight={500} fontSize={22} color="#199bf6" m="10px auto">
        {question?.category?.name.toUpperCase()}
      </Text>
    </Flex>
  );
};

export default ProgressBar;
