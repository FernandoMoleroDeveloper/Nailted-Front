import { Box, FormLabel, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper } from "@chakra-ui/react";

const NumberComponent = (): JSX.Element => {
  return (
    <Box>
      <FormLabel textAlign="center" as="legend" fontSize="30px">
        Puntua de 0 a 10 tu satisfacción con la empresa
      </FormLabel>
      <NumberInput alignItems="center" justifyContent="center" m="0" p="0" size="sm" w="70px" step={1} defaultValue={1} min={1} max={10}>
        <NumberInputField borderRadius="80" />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
    </Box>
  );
};

export default NumberComponent;
