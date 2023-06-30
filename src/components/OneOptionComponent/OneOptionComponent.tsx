import { FormLabel, RadioGroup, Checkbox, FormHelperText, FormControl, HStack } from "@chakra-ui/react";

const OneOptionComponent = (): JSX.Element => {
  return (
    <FormControl as="fieldset">
      <FormLabel textAlign="center" as="legend" m="0">
        Cuantos 1&1 se realizan con el General Manager al mes
      </FormLabel>
      <RadioGroup color="black" defaultValue="1 a 3">
        <HStack color="black" alignContent="center" justifyContent="center" spacing="25px">
          <Checkbox size="lg" colorScheme="blue" color="black">
            0
          </Checkbox>
          <Checkbox size="lg" colorScheme="blue">
            1-3
          </Checkbox>
          <Checkbox size="lg" colorScheme="blue">
            4-6
          </Checkbox>
          <Checkbox size="lg" colorScheme="blue">
            7-10
          </Checkbox>
        </HStack>
      </RadioGroup>
      <FormHelperText color="black" m="0">
        Selecciona un rango
      </FormHelperText>
    </FormControl>
  );
};

export default OneOptionComponent;
