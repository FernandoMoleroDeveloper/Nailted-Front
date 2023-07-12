import { Box, FormLabel } from "@chakra-ui/react";
import "../SelectionBoxes/SelectionBoxes.scss";
import SingleBox from "./SingleBox/SingleBox";
import { useEffect, useState } from "react";

interface SelectionBoxesProps {
  onAnswer: (answer: boolean) => void;
}

const SelectionBoxes = ({ onAnswer }: SelectionBoxesProps): JSX.Element => {
  const [hasSelectedBox, setHasSelectedBox] = useState(false);
  useEffect(() => {
    onAnswer(hasSelectedBox);
  }, [hasSelectedBox]);

  return (
    <>
      <FormLabel textAlign="center" as="legend" fontSize="25px" fontWeight="extrabold" m="15">
        ¿Cómo describirías tu relación con tu supervisor y que cosas cambiarías?
      </FormLabel>
      <Box className="selection-boxes__container">
        <SingleBox
          onSelect={(value) => {
            if (value) setHasSelectedBox(true);
          }}
        ></SingleBox>
        <SingleBox
          onSelect={(value) => {
            if (value) setHasSelectedBox(true);
          }}
        ></SingleBox>
        <SingleBox
          onSelect={(value) => {
            if (value) setHasSelectedBox(true);
          }}
        ></SingleBox>
        <SingleBox
          onSelect={(value) => {
            if (value) setHasSelectedBox(true);
          }}
        ></SingleBox>
        <SingleBox
          onSelect={(value) => {
            if (value) setHasSelectedBox(true);
          }}
        ></SingleBox>
        <SingleBox
          onSelect={(value) => {
            if (value) setHasSelectedBox(true);
          }}
        ></SingleBox>
      </Box>
    </>
  );
};

export default SelectionBoxes;
