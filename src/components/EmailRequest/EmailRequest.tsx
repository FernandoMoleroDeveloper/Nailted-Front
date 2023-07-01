import { Text, Button, Flex, Heading, Input, Switch } from "@chakra-ui/react";
import { blueButton } from "../../styles/motions/props";

const EmailRquest = (): JSX.Element => {
  return (
    <div className="header">
      <Heading color="#179bf6">Recibir los resultados</Heading>
      <Heading mb="200" color="#179bf6">
        por e-mail
      </Heading>
      <Flex alignItems="center" justifyContent="center" flexDirection="column">
        <Input variant="flushed" placeholder="E-mail" width="300px" />
        <Flex margin="5px" minWidth="max-content" alignItems="center" gap="2" mt={10}>
          <Switch size="md" colorScheme="teal" />
          <Text color="black" fontSize="sm" fontWeight="bold">
            Acepto la Política de privacidad
          </Text>
        </Flex>
        <Button {...blueButton} mt={50} cursor="pointer">Enviar</Button>
      </Flex>
    </div>
  );
};

export default EmailRquest;
