import { Box, Text, CircularProgress, CircularProgressLabel, Divider, Button, Modal, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, ModalBody, FormControl, FormLabel, Input, ModalFooter, useDisclosure, Switch, Link, Flex } from "@chakra-ui/react";
import "../../styles/layouts/ResultsPage.scss";
import ResultsCategory from "./ResultsCategory";
import { useRef } from "react";

const Results = (): JSX.Element => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = useRef(null);
  return (
    <div className="results-page">
      <Box className="results-page__container">
        <Text fontSize="24px" textColor="#199bf6" fontWeight="extrabold" margin="0px auto" textAlign="center" as="legend">
          Resultado general
        </Text>
        <CircularProgress className="results-page__progress-circle" value={49.2} color="orange.400" size="150px" thickness="10px">
          <CircularProgressLabel>49,2%</CircularProgressLabel>
        </CircularProgress>
        <Divider className="results-page__horizontal-divider" />
        <Box className="results-page__categories">
          <ResultsCategory></ResultsCategory>
          <ResultsCategory></ResultsCategory>
          <ResultsCategory></ResultsCategory>
          <ResultsCategory></ResultsCategory>
          <ResultsCategory></ResultsCategory>
        </Box>
        <Button marginTop="20px" onClick={onOpen}>
          Enviar mis resultados
        </Button>
        <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>¿Quieres recibir tus resultados?</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>Escribe aquí tu e-mail:</FormLabel>
                <Input ref={initialRef} placeholder="ejemplo@mail.com" />
              </FormControl>
            </ModalBody>
            <Flex alignItems="center" margin="0px auto">
              <Switch colorScheme="teal" size="md" />
              <Link marginLeft="10px" href="https://nailted.com/es/legal/privacy" isExternal>
                Política de privacidad
              </Link>
            </Flex>
            <ModalFooter>
              <Button colorScheme="blue" onClick={onClose}>
                Enviar
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    </div>
  );
};
export default Results;
