import { Text, Step, Stepper, useSteps, StepStatus, StepIcon, StepIndicator, Progress } from "@chakra-ui/react";

const ProgressBar = (): JSX.Element => {
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

  return (
    <>
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
      <Text fontWeight={500} fontSize={22} color="#199bf6" m="0px auto">
        RELACIONES
      </Text>
    </>
  );
};

export default ProgressBar;
