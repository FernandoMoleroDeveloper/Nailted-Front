import { Box, Image } from "@chakra-ui/react";
import { SessionIdContext } from "../../App";
import { useContext, useEffect, useState } from "react";
import ResultsCategory from "../../components/Results/ResultsCategory";
import ResultsGlobal from "../../components/Results/ResultsGlobal";

const PdfPage = (): React.JSX.Element => {
  const { sessionId } = useContext<any>(SessionIdContext as any);
  console.log(sessionId);
  const [results, setResults] = useState<any>();

  const SESSION_URL = `${process.env.REACT_APP_API_URL as string}/session/${sessionId as string}/results/token`;
  // const SESSION_URL = `${process.env.REACT_APP_API_URL as string}/session/64b811a1ebadc9a51b925ef3/results/token`;

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

  return (
    <>
      <Box className="results-page__container">
        <ResultsGlobal results={results}></ResultsGlobal>
        <Box className="results-page__categories">
          {results?.categoryScore?.map((categoryScore: any) => {
            return <ResultsCategory key={categoryScore._id} resultsDetails={categoryScore}></ResultsCategory>;
          })}
        </Box>
        <Box>
          <Image src="https://nailted.com/assets/images/logo.svg" alt="Logo" className="home-page__logo"></Image>
        </Box>
      </Box>
    </>
  );
};

export default PdfPage;
