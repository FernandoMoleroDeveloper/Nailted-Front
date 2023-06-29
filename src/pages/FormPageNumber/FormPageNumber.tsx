import { Box, FormControl, FormLabel, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Progress } from "@chakra-ui/react";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import "./FormPageNumber.scss";

const FormPageNumber = (): JSX.Element => {
  return (
    <div className="form-page page">
      <Box className="home-page__header" boxShadow="md" p="6" bg="w">
        <Header></Header>
      </Box>
      <Progress value={20} size="xs" colorScheme="#0469da" />
      <div className="form-page__question">
        <FormControl as="fieldset">
          <FormLabel textAlign="center" as="legend">
            Cuantos 1&1 se realizan con el General Manager al mes
          </FormLabel>
          <NumberInput step={1} defaultValue={15} min={1} max={30}>
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>
      </div>
      <Box
        as="button"
        height="30px"
        lineHeight="1.2"
        transition="all 0.2s cubic-bezier(.08,.52,.52,1)"
        border="1px"
        px="15px"
        borderRadius="10px"
        fontSize="14px"
        fontWeight="semibold"
        bg="#0469da"
        color="#ffff"
        _hover={{ bg: "#199bf6" }}
        _active={{
          bg: "#dddfe2",
          transform: "scale(1.2)",
        }}
        _focus={{
          boxShadow: "0 0 1px 2px rgba(88, 144, 255, .75), 0 1px 1px rgba(0, 0, 0, .15)",
        }}
      >
        SIGUIENTE
      </Box>
      <Footer></Footer>
    </div>
  );
};
export default FormPageNumber;
