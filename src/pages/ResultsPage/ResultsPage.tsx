import { Box, Button, CircularProgress, CircularProgressLabel, Divider, FormControl, FormHelperText, FormLabel, Progress } from "@chakra-ui/react";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import "./ResultsPage.scss";
import { blueButton } from "../../styles/motions/props";

const ResultsPage = (): JSX.Element => {
  return (
    <div className="results-page page">
      <Box className="results-page__header" boxShadow="md" p="3">
        <Header></Header>
      </Box>
      <Progress value={20} size="xs" colorScheme="#0469da" />
      <Box className="results-page__container">
        <FormControl as="fieldset">
          <FormLabel fontSize="24px" textColor="#199bf6" fontWeight="extrabold" margin="0px auto" textAlign="center" as="legend">
            Resultado general
          </FormLabel>
          <CircularProgress className="results-page__progress-circle" value={49.2} color="orange.400" size="150px" thickness="10px">
            <CircularProgressLabel>49,2%</CircularProgressLabel>
          </CircularProgress>
          <Divider className="results-page__horizontal-divider" />
          <Box display="flex" flexWrap="wrap">
            <Box width="40%" display="flex" alignItems="center">
              <CircularProgress className="results-page__progress-circle" value={62} color="green.400" size="65px" thickness="8px">
                <CircularProgressLabel>62%</CircularProgressLabel>
              </CircularProgress>
              <Box display="flex" flexWrap="wrap" margin="0 0 0 5px">
                <FormLabel fontWeight="extrabold" margin="0px" textAlign="left" as="legend">
                  Direction
                </FormLabel>
                <FormLabel>Prueba</FormLabel>
              </Box>
            </Box>
            <Box width="40%" display="flex" alignItems="center">
              <CircularProgress className="results-page__progress-circle" value={48} color="orange.400" size="65px" thickness="8px">
                <CircularProgressLabel>48%</CircularProgressLabel>
              </CircularProgress>
              <Box display="flex" flexWrap="wrap" margin="0 0 0 5px">
                <FormLabel fontWeight="extrabold" margin="0px" textAlign="left" as="legend">
                  Feedback
                </FormLabel>
                <FormLabel>Prueba</FormLabel>
              </Box>
            </Box>
            <Box width="40%" display="flex" alignItems="center">
              <CircularProgress className="results-page__progress-circle" value={36} color="orange.400" size="65px" thickness="8px">
                <CircularProgressLabel>36%</CircularProgressLabel>
              </CircularProgress>
              <Box display="flex" flexWrap="wrap" margin="0 0 0 5px">
                <FormLabel fontWeight="extrabold" margin="0px" textAlign="left" as="legend">
                  Recognition
                </FormLabel>
                <FormLabel>Prueba</FormLabel>
              </Box>
            </Box>
            <Box width="40%" display="flex" alignItems="center">
              <CircularProgress className="results-page__progress-circle" value={22} color="red.400" size="65px" thickness="8px">
                <CircularProgressLabel>22%</CircularProgressLabel>
              </CircularProgress>
              <Box display="flex" flexWrap="wrap" margin="0 0 0 5px">
                <FormLabel fontWeight="extrabold" margin="0px" textAlign="left" as="legend">
                  Wellness
                </FormLabel>
                <FormLabel>Prueba</FormLabel>
              </Box>
            </Box>
            <Box width="40%" display="flex" alignItems="center">
              <CircularProgress className="results-page__progress-circle" value={78} color="green.400" size="65px" thickness="8px">
                <CircularProgressLabel>78%</CircularProgressLabel>
              </CircularProgress>
              <Box display="flex" flexWrap="wrap" margin="0 0 0 5px">
                <FormLabel fontWeight="extrabold" margin="0px" textAlign="left" as="legend">
                  Career
                </FormLabel>
                <FormLabel>Prueba</FormLabel>
              </Box>
            </Box>
          </Box>
          <FormHelperText>Be better, my friend!</FormHelperText>
          <Button {...blueButton} className="results-page__button center">
            Siguiente
          </Button>
        </FormControl>
      </Box>
      <Box className="results-page__footer">
        <Footer></Footer>
      </Box>
    </div>
  );
};
export default ResultsPage;
