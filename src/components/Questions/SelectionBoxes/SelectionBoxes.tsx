import { Box, FormLabel } from "@chakra-ui/react";
import "../SelectionBoxes/SelectionBoxes.scss";
import { motion } from "framer-motion";
import SingleBox from "./SingleBox/SingleBox";
// import { useState } from "react";

const SelectionBoxes = (): JSX.Element => {
  return (
    <>
      <motion.div
        className="box"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.8,
          delay: 0.1,
          ease: [0, 0.71, 0.2, 1.01],
        }}
      >
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
      </motion.div>
    </>
  );
};

export default SelectionBoxes;
