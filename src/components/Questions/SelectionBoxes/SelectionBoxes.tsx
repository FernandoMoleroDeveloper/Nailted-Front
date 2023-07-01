import { Box, FormLabel } from "@chakra-ui/react";
import "../SelectionBoxes/SelectionBoxes.scss";
import SingleBox from "./SingleBox/SingleBox";
// import { useState } from "react";

const SelectionBoxes = (): JSX.Element => {
  return (
    <>
      <FormLabel textAlign="center" as="legend" fontSize="25px" fontWeight="extrabold" m="15">
        ¿Cómo describirías tu relación con tu supervisor y que cosas cambiarías?
      </FormLabel>
      <Box className="selection-boxes__container">
        <SingleBox></SingleBox>
        <SingleBox></SingleBox>
        <SingleBox></SingleBox>
        <SingleBox></SingleBox>
        <SingleBox></SingleBox>
        <SingleBox></SingleBox>
      </Box>
    </>
  );
};

export default SelectionBoxes;
