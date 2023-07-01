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

export const selectionBoxesButton = {
  border: "2px solid #199bf6",
  backgroundColor: "#fff",
  transition: "background-color 0.3s ease, color 0.3s ease",
  _active: { bg: "#199bf6", color: "#fff", transition: "background-color 0.3s ease, color 0.3s ease" },
  color: "#199bf6",
  borderRadius: "30px",
};

export const selectionBoxesButtonActive = {
  border: "2px solid #199bf6",
  backgroundColor: "#199bf6",
  transition: "background-color 0.3s ease, color 0.3s ease",
  _active: { bg: "#199bf6", color: "#fff", transition: "background-color 0.3s ease, color 0.3s ease" },
  transform: "scale(0.98)",
  color: "#fff",
  borderRadius: "30px"
};

// export const nextButton = {
//   as: motion.div,
//   height: "50px",
//   width: "fit-content",
//   transition: "background-color 0.3s",
//   border: "3px solid transparent",
//   px: "50px",
//   borderRadius: "70px",
//   fontSize: "16px",
//   fontWeight: "semibold",
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
// };

// export const backButton = {

// };
