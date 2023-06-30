import { Box } from "@chakra-ui/react";
// import { useState } from "react";
import "../FourBoxes/FourBoxes.scss";

const FourBoxes = (): JSX.Element => {
  // const [active, setActive] = useState(false);

  return (
    <>
      <span>Esto es un texto de pregunta</span>
      <Box className="four-boxes__container">
        {/* <Box className={ active ? "four-boxes__option" : "four-boxes__option--active"} onClick={() => { setActive(!active) } } >
          <span>Texto de la opcion que es relativamente largo y cabe en el boton a pesar de ello.</span>
        </Box>
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
        </Box> */}
      </Box>
    </>
  );
};

export default FourBoxes;
