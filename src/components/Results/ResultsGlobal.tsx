import { Box, Text, Flex, CircularProgress, CircularProgressLabel, useDisclosure, Modal, ModalOverlay, ModalContent, ModalCloseButton, ModalHeader, ModalBody, ModalFooter, Button } from "@chakra-ui/react";
import "../../styles/layouts/ResultsCategory.scss";
import { BiSolidPlusCircle } from "react-icons/bi";
import { useState, useEffect } from "react";

const ResultsGlobal = (): React.JSX.Element => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [text, setText] = useState("");
  const [title, setTitle] = useState("");
  const [progress, setProgress] = useState(0);
  const targetProgress = 55;
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
  }, [progress, targetProgress, increment, intervalTime]);

  return (
    <div className="results-category page">
      <Flex
        display="flex"
        flexDirection="column"
        alignItems="center"
        margin="5px"
        onClick={() => {
          onOpen();
          setText("Direction text");
          setTitle("Direction");
        }}
      >
        <Text fontSize="24px" textColor="#199bf6" fontWeight="extrabold" margin="20px auto" textAlign="center" as="legend">
          Resultado general
        </Text>
        <CircularProgress className="results-page__progress-circle" value={progress} color={getProgressColor(progress)} size="150px" thickness="10px">
          <CircularProgressLabel>{progress}%</CircularProgressLabel>
        </CircularProgress>
        <Box display="flex" alignItems="center" flexWrap="wrap" margin="0 0 0 5px">
          <Text className="results-category__text-info">Info</Text>
          <BiSolidPlusCircle className="results-category__btn-info" />
        </Box>
      </Flex>
      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent m="auto 20px">
          <ModalHeader>{title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <p>{text}</p>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default ResultsGlobal;
