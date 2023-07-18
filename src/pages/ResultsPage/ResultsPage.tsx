import { Box } from "@chakra-ui/layout";
import Results from "../../components/Results/Results";
import "../../styles/layouts/ResultsPage.scss";
import { useEffect, useState } from "react";

const ResultsPage = (): React.JSX.Element => {
  const SESSION_URL = `${process.env.REACT_APP_API_URL as string}/session/1545648974654648/results/token`;
  const [results, setResults] = useState({});

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
    console.log(results);
  }, []);

  return (
    <>
      <Box className="results-page__container">
        <Box className="results-page__formulary">
          <Results></Results>
        </Box>
      </Box>
    </>
  );
};

export default ResultsPage;
