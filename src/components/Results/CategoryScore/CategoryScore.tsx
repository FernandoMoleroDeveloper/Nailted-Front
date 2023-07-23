import { Box, Text, Flex, FormLabel, useDisclosure } from "@chakra-ui/react";
import "../../../styles/layouts/CategoryScore.scss";
import { BiSolidPlusCircle } from "react-icons/bi";
import { useState, useEffect } from "react";
import ResultsModal from "../../ResultsModal/ResultsModal";
import ResultsCicleProgress from "../../ResultsCircleProgress/ResultsCircleProgress";

const CategoryScore = ({ resultsDetails, circlePosition }: any): React.JSX.Element => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [progress, setProgress] = useState(0);
  const [circleSize, setCircleSize] = useState(100); // Tamaño predeterminado del círculo
  const adaptiveDesignChange = 951;
  const categoryName = resultsDetails?.category?.name;
  const possibleMarks = resultsDetails?.category?.mark;
  const targetScore = Math.ceil(resultsDetails?.score);
  const increment = 1;
  const intervalTime = 30;

  const getScoreTip = () => {
    for (const mark of possibleMarks) {
      if (targetScore >= mark.min && targetScore <= mark.max) {
        console.log(resultsDetails.category)
        console.log(possibleMarks);
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
    updateCircleSize();
    window.addEventListener("resize", updateCircleSize);
    return () => {
      window.removeEventListener("resize", updateCircleSize);
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
            <FormLabel fontWeight="extrabold" fontSize="20" padding="0px" margin="0 5px 0 0" textAlign="left" as="legend">
              {categoryName}
            </FormLabel>
          </Box>
        )}
        <Flex>
          {window.innerWidth > adaptiveDesignChange && circlePosition === "right" && (
            <Flex flexDirection="column">
              <FormLabel fontWeight="extrabold" fontSize="25" padding="0px" margin="0 5px 0 0" textAlign="right" as="legend" >
                {categoryName}
              </FormLabel>
              <Flex fontWeight="400" fontSize="18px" padding="5px">
                {getScoreTip()}
              </Flex>
            </Flex>
          )}
          <ResultsCicleProgress categoryCircleSize={circleSize} progress={progress} category={"category"}></ResultsCicleProgress>
          {window.innerWidth > adaptiveDesignChange && circlePosition === "left" && (
            <Flex flexDirection="column">
              <FormLabel fontWeight="extrabold" fontSize="25" padding="0px" margin="0 5px 0 0" textAlign="left" as="legend">
                {categoryName}
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
        <ResultsModal onClose={onClose} isOpen={isOpen} getScoreTip={getScoreTip()} categoryName={categoryName}></ResultsModal>
      )}
    </div>
  );
};

export default CategoryScore;
