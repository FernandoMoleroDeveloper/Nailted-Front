import { Box, Divider, Button, Modal, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, ModalBody, FormControl, FormLabel, Input, ModalFooter, useDisclosure, Switch, Link, Flex } from "@chakra-ui/react";
import "../../styles/layouts/ResultsPage.scss";
import ResultsCategory from "./ResultsCategory";
import { useContext, useEffect, useRef, useState } from "react";
import { nextButton, sendButton } from "../../styles/motions/props";
import { SessionIdContext } from "../../App";
import ResultsGlobal from "./ResultsGlobal";

const Results = (): React.JSX.Element => {
  const [results, setResults] = useState();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = useRef<HTMLInputElement>(null);
  const [email, setEmail] = useState<string>("");
  const { sessionId } = useContext<any>(SessionIdContext as any);
  const SEND_EMAIL_URL = `${process.env.REACT_APP_API_URL as string}/session/send-results`;
  const SESSION_URL = `${process.env.REACT_APP_API_URL as string}/session/${sessionId as string}/results/token`;

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleSendResults = (): void => {
    const dataResults = "Estos son los datos del correo";
    const dataText = JSON.stringify(dataResults);

    fetch(SEND_EMAIL_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ recipient: email, dataResults: dataText }),
    })
      .then((res) => {
        if (res.status !== 200) {
          console.error("La respuesta del servidor no fue la esperada. El correo no se ha enviado.");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      })
      .finally(() => {
        onClose();
      });
  };

  const getResults = async (): Promise<void> => {
    fetch(SESSION_URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(async (res) => {
        if (res.status !== 200) {
          console.error("La respuesta del servidor no fue la esperada. Los resultados no se han cargado.");
        } else {
          console.log("Resultados cargados correctamente.");
          const data = await res.json();
          setResults(data);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  useEffect(() => {
    void getResults();
  }, []);

  return (
    <div className="results-page">
      <Box className="results-page__container">
        <ResultsGlobal results={results}></ResultsGlobal>
        <Divider className="results-page__horizontal-divider" />
        <Box className="results-page__categories">
          <ResultsCategory></ResultsCategory>
          <ResultsCategory></ResultsCategory>
          <ResultsCategory></ResultsCategory>
          <ResultsCategory></ResultsCategory>
          <ResultsCategory></ResultsCategory>
        </Box>
        <Button {...nextButton} w="fit-content" m="40px 0px 0px 0px" onClick={onOpen}>
          Guardar resultados
        </Button>
        <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent m="auto 20px">
            <ModalHeader>Guardar resultados</ModalHeader>
            <ModalCloseButton />
            <ModalBody p="20px 20px">
              <FormControl>
                <FormLabel textAlign="center" p="0px 5px">Te enviaremos un email con un enlace para que puedas consultar tus resultados cuando quieras.</FormLabel>
                <Input ref={initialRef} m="20px 0px 0px 0px" placeholder="Escribe tu email" value={email} onChange={handleEmailChange}/>
              </FormControl>
            </ModalBody>
            <Flex alignItems="center" margin="0px auto">
              <Switch colorScheme="teal" size="md" />
              <Link marginLeft="10px" href="https://nailted.com/es/legal/privacy" isExternal>
                Política de privacidad
              </Link>
            </Flex>
            <ModalFooter>
              <Button {...sendButton} p="25px 4px" colorScheme="blue" m="10px auto" onClick={handleSendResults}>
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
