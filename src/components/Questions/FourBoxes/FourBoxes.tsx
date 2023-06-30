import { Box } from "@chakra-ui/react";
import "../FourBoxes/FourBoxes.scss";

const FourBoxes = (): JSX.Element => {
  return (
    <>
      <span>Esto es un texto de pregunta</span>
      <Box className="four-boxes__container">
        <Box className="four-boxes__option">
          <span>Texto de la opcion 1</span>
        </Box>
        <Box className="four-boxes__option">
          <span>Texto de la opcion 2</span>
        </Box>
        <Box className="four-boxes__option">
          <span>Texto de la opcion 3</span>
        </Box>
        <Box className="four-boxes__option">
          <span>Texto de la opcion 4</span>
        </Box>
      </Box>
    </>
  );
};

export default FourBoxes;
