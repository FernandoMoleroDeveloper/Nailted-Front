import { Box, Image, Text, Flex, Divider } from "@chakra-ui/react";
import { SessionIdContext } from "../../App";
import { useContext, useEffect, useState } from "react";
import ResultsCategoryPdf from "../../components/pdfProgress/ResultsCategoryPdf";
import ResultsGlobalPdf from "../../components/pdfProgress/ResultsGlobalPdf";
import logo from "../../assets/nailted-logo.png";
import badge from "../../assets/badge.svg";
import signature from "../../assets/signature.png";
import "../../styles/layouts/PdfPage.scss";

const PdfPage = (): React.JSX.Element => {
  const { sessionId } = useContext<any>(SessionIdContext as any);
  console.log(sessionId);
  const [results, setResults] = useState<any>();

  const SESSION_URL = `${process.env.REACT_APP_API_URL as string}/session/${sessionId as string}/results/token`;

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
  }, []);

  const getCurrentDate = (): string => {
    const currentDate = new Date();
    const day = String(currentDate.getDate()).padStart(2, "0");
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const year = currentDate.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <div className="pdf-page__background">
      <Box>
        <Box className="pdf-page__imgbox">
          <Image src={logo} alt="Logo" className="pdf-page__logo"></Image>
          <Text as="cite" fontSize="xl" fontWeight="400" color="blackAlpha.400">
            Más que una herramienta, una manera de hacer las cosas
          </Text>
        </Box>
        <Box className="pdf-page__container">
          <Box alignItems="center" display="flex" flexDirection="column">
            <Text className="pdf-page__title">CERTIFICADO</Text>
            <Text className="pdf-page__subtitle">Este decumento certifica que ha realizado con exito nuestro formulario de cultura empresarial</Text>
            <ResultsGlobalPdf results={results}></ResultsGlobalPdf>
          </Box>

          <Box className="pdf-page__categories">
            {results?.categoryScore?.map((categoryScore: any) => {
              return <ResultsCategoryPdf key={categoryScore._id} resultsDetails={categoryScore}></ResultsCategoryPdf>;
            })}
          </Box>
          <Flex justifyContent="space-around" gap="20px" alignItems="center">
            <Box alignItems="center" display="flex" flexDirection="column" borderBottom="1px" margin="30px">
              <Text fontSize="xl" as="b">
                Fecha
              </Text>
              <Text fontWeight="400" color="black" fontSize="xl">
                {getCurrentDate()}
              </Text>
            </Box>
            <Image src={badge} alt="Logo" className="pdf-page__badge"></Image>
            <Box alignItems="center" display="flex" flexDirection="column" borderBottom="1px" margin="30px">
              <Text fontSize="xl" as="b">
                Firma
              </Text>
              <Image src={signature} alt="Logo" className="pdf-page__signature"></Image>
            </Box>
          </Flex>

          <Box alignItems="center" display="flex" flexDirection="column">
            <Text fontSize="xl" fontWeight="400" color="blackAlpha.400" textAlign="center" marginBottom="25px">
              "La plataforma de employee engagement para equipos exigentes que buscan la mejor experiencia de empleado"
            </Text>
          </Box>
        </Box>
        <Divider color="#d1effd" orientation="horizontal" marginBottom="500px" />
      </Box>
    </div>
  );
};

export default PdfPage;
