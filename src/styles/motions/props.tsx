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
  _hover: { bg: "#199bf6", color: "#fff" },
  color: "#199bf6",
  borderRadius: "30px",
  // _active: {
  //   bg: "#0469da",
  //   transform: "scale(0.98)",
  //   borderColor: "#0469da",
  // },
  // _focus: {
  //   bg: "#0469da",
  //   transform: "scale(0.98)",
  //   borderColor: "#0469da",
  //   color: "#fff"
  // }
};

export const selectionBoxesButtonActive = {
  border: "2px solid #199bf6",
  backgroundColor: "#199bf6",
  _hover: { bg: "#199bf6", color: "#fff" },
  transform: "scale(0.98)",
  color: "#fff",
  borderRadius: "30px"
};

// export const selectionBoxesButtonActive = {
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
