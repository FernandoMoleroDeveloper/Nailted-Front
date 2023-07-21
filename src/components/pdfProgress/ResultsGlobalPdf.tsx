import { Text, Flex, CircularProgress, CircularProgressLabel } from "@chakra-ui/react";
import "../../styles/layouts/ResultsCategory.scss";

const ResultsGlobal = ({ results }: any): React.JSX.Element => {
  const progress = results?.globalScore || 0;

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

  return (
    <div className="results-category page">
      <Flex display="flex" flexDirection="column" alignItems="center" margin="5px">
        <Text fontSize="24px" textColor="#199bf6" fontWeight="extrabold" margin="20px auto" textAlign="center" as="legend">
          Resultado general
        </Text>
        <CircularProgress className="results-page__progress-circle" value={progress} color={getProgressColor(progress)} size="150px" thickness="10px">
          <CircularProgressLabel fontWeight={500}>{Math.ceil(progress)}%</CircularProgressLabel>
        </CircularProgress>
      </Flex>
    </div>
  );
};

export default ResultsGlobal;
