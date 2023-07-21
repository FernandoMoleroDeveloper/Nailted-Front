import { Box } from "@chakra-ui/react";
import Results from "../../components/Results/Results";
import "../../styles/layouts/ResultsPage.scss";

const ResultsPage = (): React.JSX.Element => {
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
