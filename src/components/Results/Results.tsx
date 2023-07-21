import { Box, Divider, Button, Modal, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, ModalBody, FormControl, FormLabel, Input, ModalFooter, useDisclosure, Switch, Link, Flex, SlideFade, useToast, Image } from "@chakra-ui/react";
import "../../styles/layouts/ResultsPage.scss";
import ResultsCategory from "./ResultsCategory";
import { useContext, useEffect, useRef, useState } from "react";
import { nextButton, sendButton } from "../../styles/motions/props";
import { SessionIdContext } from "../../App";
import ResultsGlobal from "./ResultsGlobal";
import { useNavigate } from "react-router-dom";

const Results = (): React.JSX.Element => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const { sessionId } = useContext<any>(SessionIdContext as any);
  const [results, setResults] = useState<any>();
  const [correctEmail, setCorrectEmail] = useState<any | undefined>();
  const [emailSent, setEmailSent] = useState<boolean>(false);
  const [policyAccepted, setPolicyAccepted] = useState<boolean | undefined>(undefined);
  const initialRef = useRef<HTMLInputElement>(null);
  const [email, setEmail] = useState<string>("");
  const navigate = useNavigate();
  const localOrPropSessionId: string = sessionId || localStorage.getItem("storedSessionId");
  const SEND_EMAIL_URL = `${process.env.REACT_APP_API_URL as string}/session/${localOrPropSessionId}/send-results`;
  const SESSION_URL = `${process.env.REACT_APP_API_URL as string}/session/${localOrPropSessionId}/results/token`;

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
    setCorrectEmail(undefined);
  };

  const checkValidEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSendResults = (): void => {
    if (policyAccepted === true && checkValidEmail()) {
      onClose();
      fetch(SEND_EMAIL_URL, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, dataResults: results }),
      })
        .then((res) => {
          if (res.status !== 200) {
            console.error("La respuesta del servidor no fue la esperada. El correo no se ha enviado.");
          }
          setEmailSent(true);
          setEmail("");
        })
        .catch((error) => {
          console.error("Error:", error);
        })
        .finally(() => {
          toast({
            title: "Correo enviado",
            description: "Se han enviado los resultados por correo.",
            status: "info",
            isClosable: true,
            position: "top"
          });
          setEmailSent(false);
          setPolicyAccepted(undefined);
        });
    } else if (policyAccepted === undefined && !checkValidEmail()) {
      setCorrectEmail(false);
      setPolicyAccepted(false);
    } else if (policyAccepted === undefined && checkValidEmail()) {
      setPolicyAccepted(false);
      setCorrectEmail(true);
    } else if (!checkValidEmail()) {
      setCorrectEmail(false);
    }
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
          const data = await res.json();
          setResults(data);
          console.log("Resultados cargados correctamente.");
          console.log(data);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  useEffect(() => {
    void getResults();
    if (emailSent) emailSent && onClose(); // sobra el if?
    if (!localOrPropSessionId) {
      navigate("/");
    }
  }, [emailSent, localOrPropSessionId]);

  return (
    <div className="results-page">
      <Box className="results-page__container">
        <Box>
          <Image src="https://nailted.com/assets/images/logo.svg" alt="Logo" width="200px" margin="20px"></Image>
        </Box>
        <ResultsGlobal results={results}></ResultsGlobal>
        <Divider className="results-page__horizontal-divider" />
        <Box className="results-page__categories">
          {
            results?.categoryScore?.map((categoryScore: any, index: number) => {
              return <ResultsCategory key={categoryScore._id} resultsDetails={categoryScore} circlePosition={index % 2 === 0 ? "left" : "right"}></ResultsCategory>
            })
          }
        </Box>
        <Button {...nextButton} w="fit-content" m="40px 0px 40px 0px" onClick={onOpen}>
          Guardar resultados
        </Button>
        <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent m="auto 20px">
            <ModalHeader>Guardar resultados</ModalHeader>
            <ModalCloseButton />
            <ModalBody p="20px 20px">
              <FormControl>
                <FormLabel textAlign="center" p="0px 5px">
                  Te enviaremos un email con un enlace para que puedas consultar tus resultados cuando quieras.
                </FormLabel>
                <Input ref={initialRef} m="20px 0px 0px 0px" placeholder="Escribe tu email" value={email} onChange={handleEmailChange} />
                <SlideFade in={correctEmail === false}>
                  <Box textAlign="center" color="red">
                    Introduce un email válido
                  </Box>
                </SlideFade>
              </FormControl>
            </ModalBody>
            <Flex alignItems="center" margin="0px auto">
              <Switch
                colorScheme="teal"
                size="md"
                onChange={() => {
                  setPolicyAccepted(!policyAccepted);
                }}
              />
              <Link marginLeft="10px" href="https://nailted.com/es/legal/privacy" isExternal>
                Política de privacidad
              </Link>
            </Flex>
            <SlideFade in={policyAccepted === false}>
              <Box textAlign="center" color="red">
                Debes aceptar la política de privacidad.
              </Box>
            </SlideFade>
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
