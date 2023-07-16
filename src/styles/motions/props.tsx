import { motion } from "framer-motion";
import { FaAnglesLeft, FaAnglesRight } from "react-icons/fa6";

// Boton azul estandar como el del home
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

// Boton siguiente
export const nextButton = {
  rightIcon: <FaAnglesRight />,
  fontSize: 20,
  color: "#ffff",
  borderRadius: 30,
  backgroundColor: "#199bf6",
  _hover: { backgroundColor: "#0469da" },
  className: "quizz-page__next center"
}

// Boton atras
export const previousButton = {
  leftIcon: <FaAnglesLeft />,
  fontSize: 20,
  color: "#199bf6",
  borderRadius: 30,
  backgroundColor: "#ffff",
}

// Boton atras oculto
export const hiddenButton = {
  // leftIcon: <FaAnglesLeft />,
  fontSize: 20,
  color: "white",
  borderRadius: 30,
  backgroundColor: "white",
}

// Boton de seleccion multiple sin activar
export const selectionBoxesButton = {
  border: "2px solid #199bf6",
  backgroundColor: "#fff",
  transition: "background-color 0.3s ease, color 0.3s ease",
  _active: { bg: "#199bf6", color: "#fff", transition: "background-color 0.3s ease, color 0.3s ease" },
  color: "#199bf6",
  borderRadius: "30px",
};

// Boton de seleccion multiple activado
export const selectionBoxesButtonActive = {
  border: "2px solid #199bf6",
  backgroundColor: "#199bf6",
  transition: "background-color 0.3s ease, color 0.3s ease",
  _active: { bg: "#199bf6", color: "#fff", transition: "background-color 0.3s ease, color 0.3s ease" },
  transform: "scale(0.98)",
  color: "#fff",
  borderRadius: "30px"
};

// Slide para que aparezca desde un lateral
export const slideX = (direction: string, duration: string, delay: string): any => {
  let initialPosition = {};

  if (direction === "right") {
    initialPosition = { x: "100%" };
  } else if (direction === "left") {
    initialPosition = { x: "-100%" };
  }

  return {
    initial: initialPosition,
    animate: { x: 0 },
    transition: { duration, delay, ease: "easeOut" },
    delay
  };
};

// Slide para que aparezca desde arriba o abajo
export const slideY = (side: string, duration: string, delay: string): any => {
  let initialPosition = {};

  if (side === "up") {
    initialPosition = { y: "100%" };
  } else if (side === "down") {
    initialPosition = { y: "-100%" };
  }

  return {
    initial: initialPosition,
    animate: { y: 0 },
    transition: { duration, delay, ease: "easeOut" },
    delay
  };
};

// Transicion de entrada y aumento
export const transitionIn = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1 },
  transition: {
    duration: 0.2,
    ease: "easeOut",
  }
}
