import { Box, Text, CircularProgress, CircularProgressLabel, Divider } from "@chakra-ui/react";
import "../../styles/layouts/ResultsPage.scss";
import ResultsCategory from "./ResultsCategory";

const Results = (): JSX.Element => {
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
      </Box>
    </div>
  );
};
export default Results;
