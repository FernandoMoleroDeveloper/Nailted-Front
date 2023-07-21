import { Box, Text, Flex, CircularProgress, CircularProgressLabel, useDisclosure, Modal, ModalOverlay, ModalContent, ModalCloseButton, ModalHeader, ModalBody, ModalFooter, Button } from "@chakra-ui/react";
import "../../styles/layouts/ResultsCategory.scss";
import { BiSolidPlusCircle } from "react-icons/bi";
import { useState, useEffect } from "react";

const ResultsGlobal = ({ results }: any): React.JSX.Element => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [text, setText] = useState("");
  const [title, setTitle] = useState("");
  const [circleSize, setCircleSize] = useState(100);
  const [progress, setProgress] = useState(0);
  const adaptiveDesignChange = 951;
  const targetProgress = results?.globalScore;
  const increment = 1;
  const intervalTime = 30;

  const getProgressColor = (progress: number): string => {
    const colors = [
      [255, 0, 0],
      [255, 150, 0],
      [0, 200, 0],
    ];

    const segmentSize = 100 / (colors.length - 1);
    const segmentIndex = Math.floor(progress / segmentSize);
    const segmentProgress = (progress % segmentSize) / segmentSize;
    const startColor = colors[segmentIndex];
    const endColor = segmentIndex < colors.length - 1 ? colors[segmentIndex + 1] : startColor;

    const color = startColor.map((startValue, index) => {
      const endValue = endColor[index];
      const value = Math.round(startValue + (endValue - startValue) * segmentProgress);
      return value;
    });

    return `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
  };

  const updateCircleSize = () => {
    if (window.innerWidth > adaptiveDesignChange) {
      setCircleSize(200);
    } else {
      setCircleSize(110);
    }
  };

  useEffect(() => {
    updateCircleSize(); // Actualizar el tamaño inicial del círculo
    window.addEventListener("resize", updateCircleSize); // Escuchar eventos de cambio de tamaño del navegador
    return () => {
      window.removeEventListener("resize", updateCircleSize); // Limpiar el evento al desmontar el componente
    };
  }, []);

  useEffect(() => {
    if (progress < targetProgress) {
      const timer = setInterval(() => {
        const newProgress = progress + increment;
        setProgress(newProgress);
      }, intervalTime);

      return () => {
        clearInterval(timer);
      };
    }
  }, [progress, targetProgress, increment, intervalTime, window.innerWidth]);

  return (
    <div className="results-category page">
      <Flex
        display="flex"
        flexDirection="column"
        alignItems="center"
        margin="5px"
        onClick={() => {
          onOpen();
          setText(results?.globalTip?.tip);
          setTitle("Resultado global");
        }}
      >
        <Text fontSize="24px" textColor="#199bf6" fontWeight="extrabold" margin="20px auto" textAlign="center" as="legend">
          Resultado global
        </Text>
        <CircularProgress className="results-page__progress-circle" value={progress} color={getProgressColor(progress)} size={circleSize} thickness="10px">
          <CircularProgressLabel fontWeight={500}>{progress}%</CircularProgressLabel>
        </CircularProgress>
        {window.innerWidth <= adaptiveDesignChange ? (
          <Box display="flex" alignItems="center" flexWrap="wrap" margin="0 0 0 5px">
            <Text className="results-category__text-info">Info</Text>
            <BiSolidPlusCircle className="results-category__btn-info" />
          </Box>
        ) : (
          <Box>
            <Text fontSize="20px" fontWeight="400">
              {results?.globalTip?.tip}
            </Text>
          </Box>
        )}
      </Flex>
      {window.innerWidth <= adaptiveDesignChange && (
        <Modal onClose={onClose} isOpen={isOpen} isCentered>
          <ModalOverlay />
          <ModalContent m="auto 20px">
            <ModalHeader>{title}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <p>{text}</p>
            </ModalBody>
            <ModalFooter>
              <Button onClick={onClose}>Cerrar</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </div>
  );
};

export default ResultsGlobal;
