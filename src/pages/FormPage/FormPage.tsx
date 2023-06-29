import { Box, Button, FormControl, FormHelperText, FormLabel, HStack, Progress, Radio, RadioGroup } from "@chakra-ui/react";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import "./FormPage.scss";
import { blueButton } from "../../styles/motions/props";

const FormPage = (): JSX.Element => {
  return (
    <div className="form-page page">
      <Box className="form-page__header" boxShadow="md" p="3">
        <Header></Header>
      </Box>
      <Progress value={20} size="xs" colorScheme="#0469da" />
      <Box className="form-page__container">
        <FormControl as="fieldset">
          <FormLabel textAlign="center" as="legend">
            Cuantos 1&1 se realizan con el General Manager al mes
          </FormLabel>
          <RadioGroup color="black" defaultValue="1 a 3">
            <HStack color="black" alignContent="center" justifyContent="center" spacing="25px">
              <Radio value="0">0</Radio>
              <Radio value="1 a 3">1-3</Radio>
              <Radio value="4 a 6">4-6</Radio>
              <Radio value="7 a 10">7-10</Radio>
            </HStack>
          </RadioGroup>
          <FormHelperText>Selecciona un rango</FormHelperText>
          <Button
            {...blueButton} className="form-page__button center">
            Siguiente
          </Button>
        </FormControl>
      </Box>
      <Box className="form-page__footer">
        <Footer></Footer>
      </Box>
    </div>
  );
};
export default FormPage;
