import { motion } from "framer-motion";

export const blueButton = {
  as: motion.div,
  height: "50px",
  width: "fit-content",
  transition: "background-color 0.3s",
  border: "3px solid transparent",
  px: "50px",
  borderRadius: "70px",
  fontSize: "16px",
  fontWeight: "semibold",
  bg: "#179bf6",
  color: "#ffff",
  _hover: { bg: "#0069D9" },
  _active: {
    boxShadow: "0 0 0 3px #179bf6",
    transition: "box-shadow 0.2s",
  },
  _focus: {
    boxShadow: "0 0 0 3px #179bf6",
  },
};

export const fourBoxesButton = {
  as: motion.div,
  transition: "background-color 0.3s",
  border: "3px solid transparent",
  borderRadius: "15px",
  bg: "#179bf6",
  color: "#ffff",
  _hover: { bg: "#0069D9" },
  _active: {
    boxShadow: "0 0 0 3px #179bf6",
    transition: "box-shadow 0.2s",
  },
  _focus: {
    boxShadow: "0 0 0 3px #179bf6",
  },
}

// export const fourBoxesButtonActive = {
//   as: motion.div,
//   transition: "background-color 0.3s",
//   border: "3px solid transparent",
//   borderRadius: "15px",
//   bg: "#179bf6",
//   color: "#ffff",
//   _hover: { bg: "#0069D9" },
//   _active: {
//     boxShadow: "0 0 0 3px #179bf6",
//     transition: "box-shadow 0.2s",
//   },
//   _focus: {
//     boxShadow: "0 0 0 3px #179bf6",
//   },
// }

export const nextButton = {
  as: motion.div,
  height: "50px",
  width: "fit-content",
  transition: "background-color 0.3s",
  border: "3px solid transparent",
  px: "50px",
  borderRadius: "70px",
  fontSize: "16px",
  fontWeight: "semibold",
  bg: "#179bf6",
  color: "#ffff",
  _hover: { bg: "#0069D9" },
  _active: {
    boxShadow: "0 0 0 3px #179bf6",
    transition: "box-shadow 0.2s",
  },
  _focus: {
    boxShadow: "0 0 0 3px #179bf6",
  },
};

export const backButton = {

};
