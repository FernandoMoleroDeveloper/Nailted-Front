import { Box, Divider, Button, useDisclosure, useToast, Image } from "@chakra-ui/react";
import "../../styles/layouts/ResultsPage.scss";
import ResultsCategory from "./CategoryScore/CategoryScore";
import { useContext, useEffect, useRef, useState } from "react";
import { nextButton } from "../../styles/motions/props";
import { SessionIdContext, TokenContext } from "../../App";
import ResultsGlobal from "./GlobalScore/GlobalScore";
import { useLocation } from "react-router";
import QueryString from "qs";
import { useNavigate } from "react-router-dom";
import SendMailModal from "../SendMailModal/SendMailModal";

const Results = (): React.JSX.Element => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const { sessionId } = useContext<any>(SessionIdContext as any);
  const { token } = useContext<any>(TokenContext as any);
  const [results, setResults] = useState<any>();
  const [correctEmail, setCorrectEmail] = useState<any | undefined>();
  const [emailSent, setEmailSent] = useState<boolean>(false);
  const [policyAccepted, setPolicyAccepted] = useState<boolean | undefined>(undefined);
  const initialRef = useRef<HTMLInputElement>(null);
  const [email, setEmail] = useState<string>("");
  const [companyName, setCompanyName] = useState<string>("");
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = QueryString.parse(location.search, { ignoreQueryPrefix: true });
  const localOrPropOrParamSessionId: string = sessionId || queryParams.id || localStorage.getItem("storedSessionId");
  const localOrPropOrParamToken: string = token || queryParams.owner || localStorage.getItem("storedToken");
  const SEND_EMAIL_URL = `${process.env.REACT_APP_API_URL as string}/session/${localOrPropOrParamSessionId}/send-results`;
  const SESSION_URL = `${process.env.REACT_APP_API_URL as string}/session/${localOrPropOrParamSessionId}/results`;

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
    setCorrectEmail(undefined);
  };

  const handleCompanyNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCompanyName(event.target.value);
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
        body: JSON.stringify({ email, dataResults: results, companyName }),
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
            position: "top",
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
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token: localOrPropOrParamToken }),
    })
      .then(async (res) => {
        if (res.status !== 200) {
          console.error("La respuesta del servidor no fue la esperada. Los resultados no se han cargado.");
        } else {
          const data = await res.json();
          setResults(data);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  useEffect(() => {
    if (localOrPropOrParamSessionId && localOrPropOrParamToken) {
      void getResults();
    }
    if (emailSent) {
      onClose();
    }
    if (queryParams.id) {
      localStorage.setItem("storedSessionId", queryParams.id as string);
      localStorage.setItem("storedToken", queryParams.token as string);
      navigate("/results");
    }
    if (!localOrPropOrParamSessionId) {
      navigate("/");
    }
  }, [emailSent, localOrPropOrParamSessionId, window.innerWidth]);

  return (
    <div className="results-page">
      <Box className="results-page__container">
        <Box>
          <Image src="https://nailted.com/assets/images/logo.svg" alt="Logo" width="200px" margin="20px"></Image>
        </Box>
        <ResultsGlobal results={results}></ResultsGlobal>
        <Divider className="results-page__horizontal-divider" />
        <Box className="results-page__categories">
          {results?.categoryScore?.map((categoryScore: any, index: number) => {
            return <ResultsCategory key={categoryScore._id} resultsDetails={categoryScore} circlePosition={index % 2 === 0 ? "left" : "right"}></ResultsCategory>;
          })}
        </Box>
        <Button {...nextButton} w="fit-content" m="40px 0px 40px 0px" onClick={onOpen}>
          Guardar resultados
        </Button>
        <SendMailModal initialRef={initialRef} isOpen={isOpen} onClose={onClose} correctEmail={correctEmail} setPolicyAccepted={setPolicyAccepted} policyAccepted={policyAccepted} companyName={companyName} handleCompanyNameChange={handleCompanyNameChange} email={email} handleEmailChange={handleEmailChange} handleSendResults={handleSendResults}></SendMailModal>
      </Box>
    </div>
  );
};
export default Results;
