import { Box, Text, Flex, CircularProgress, CircularProgressLabel, FormLabel, useDisclosure, Modal, ModalOverlay, ModalContent, ModalCloseButton, ModalHeader, ModalBody, ModalFooter, Button } from "@chakra-ui/react";
import "../../styles/layouts/ResultsCategory.scss";
import { BiSolidPlusCircle } from "react-icons/bi";
import { useState, useEffect } from "react";

const ResultsCategory = ({ resultsDetails, circlePosition }: any): React.JSX.Element => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [progress, setProgress] = useState(0);
  const [circleSize, setCircleSize] = useState(100); // Tamaño predeterminado del círculo
  const adaptiveDesignChange = 951;
  const possibleMarks = resultsDetails?.category?.mark;
  const targetScore = resultsDetails?.score;
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

  const getScoreTip = () => {
    for (const mark of possibleMarks) {
      if (targetScore >= mark.min && targetScore <= mark.max) {
        return mark.tip;
      }
    }
  };

  const updateCircleSize = () => {
    if (window.innerWidth > adaptiveDesignChange) {
      setCircleSize(140);
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
    if (progress < targetScore) {
      const timer = setInterval(() => {
        const newProgress = progress + increment;
        setProgress(newProgress);
      }, intervalTime);

      return () => {
        clearInterval(timer);
      };
    }
  }, [progress, targetScore, increment, intervalTime]);

  return (
    <div className="results-category page">
      <Flex
        display="flex"
        flexDirection="column"
        alignItems="center"
        margin="5px"
        marginTop="10px"
        onClick={() => {
          onOpen();
        }}
      >
        {window.innerWidth < adaptiveDesignChange && (
          <Box display="flex" flexWrap="wrap">
            <FormLabel fontWeight="extrabold" margin="0 5px 0 0" textAlign="left" as="legend">
              {resultsDetails?.category?.name}
            </FormLabel>
          </Box>
        )}
        <Flex>
          {window.innerWidth > adaptiveDesignChange && circlePosition === "right" && (
            <Flex flexDirection="column">
              <FormLabel fontWeight="extrabold" fontSize="30" padding="5px" margin="0 5px 0 0" textAlign="right" as="legend" >
                {resultsDetails?.category?.name}
              </FormLabel>
              <Flex fontWeight="400" fontSize="18px" padding="5px">
                {getScoreTip()}
              </Flex>
            </Flex>
          )}
          <CircularProgress className="results-category__progress-circle" value={progress} color={getProgressColor(progress)} size={circleSize} margin={circleSize > adaptiveDesignChange ? "40px 40px" : "5px 5px"} thickness="8px">
            <CircularProgressLabel fontWeight={500}>{`${progress}%`}</CircularProgressLabel>
          </CircularProgress>
          {window.innerWidth > adaptiveDesignChange && circlePosition === "left" && (
            <Flex flexDirection="column">
              <FormLabel fontWeight="extrabold" fontSize="30" padding="5px" margin="0 5px 0 0" textAlign="left" as="legend">
                {resultsDetails?.category?.name}
              </FormLabel>
              <Flex fontWeight="400" fontSize="18px" padding="5px">
                {getScoreTip()}
              </Flex>
            </Flex>
          )}
        </Flex>

        {window.innerWidth < adaptiveDesignChange && (
          <Box display="flex" alignItems="center" flexWrap="wrap" margin="0 0 0 5px">
            <Text className="results-category__text-info">Info</Text>
            <BiSolidPlusCircle className="results-category__btn-info" />
          </Box>
        )}
      </Flex>

      {window.innerWidth <= adaptiveDesignChange && (
        <Modal onClose={onClose} isOpen={isOpen} isCentered>
          <ModalOverlay />
          <ModalContent m="auto 20px">
            <ModalHeader>{resultsDetails?.category?.name}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <p>{getScoreTip()}</p>
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

export default ResultsCategory;
