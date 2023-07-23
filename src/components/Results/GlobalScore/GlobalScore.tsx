import { Box, Text, Flex, useDisclosure } from "@chakra-ui/react";
import "../../../styles/layouts/CategoryScore.scss";
import { BiSolidPlusCircle } from "react-icons/bi";
import { useState, useEffect } from "react";
import ResultsModal from "../../ResultsModal/ResultsModal";
import ResultsCicleProgress from "../../ResultsCircleProgress/ResultsCircleProgress";

const GlobalScore = ({ results }: any): React.JSX.Element => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [text, setText] = useState("");
  const [title, setTitle] = useState("");
  const [circleSize, setCircleSize] = useState(100);
  const [progress, setProgress] = useState(0);
  const adaptiveDesignChange = 951;
  const targetProgress = results?.globalScore;
  const increment = 1;
  const intervalTime = 30;

  const updateCircleSize = () => {
    if (window.innerWidth > adaptiveDesignChange) {
      setCircleSize(200);
    } else {
      setCircleSize(170);
    }
  };

  useEffect(() => {
    updateCircleSize();
    window.addEventListener("resize", updateCircleSize);
    return () => {
      window.removeEventListener("resize", updateCircleSize);
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
        <ResultsCicleProgress globalCircleSize={circleSize} progress={progress}></ResultsCicleProgress>
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
        <ResultsModal onClose={onClose} isOpen={isOpen} title={title} text={text}></ResultsModal>
      )}
    </div>
  );
};

export default GlobalScore;
