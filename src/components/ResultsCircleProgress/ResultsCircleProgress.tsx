import { CircularProgress, CircularProgressLabel } from "@chakra-ui/progress";

const ResultsCicleProgress = ({ progress, globalCircleSize, categoryCircleSize, category }: any): React.JSX.Element => {
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

  // console.log("Category: ", categoryCircleSize);
  // console.log("Global: ", globalCircleSize);

  return (
    <CircularProgress className="results-page__progress-circle" value={progress} color={getProgressColor(progress)} size={category === "category" ? categoryCircleSize : globalCircleSize} thickness="10px">
      <CircularProgressLabel fontWeight={500}>{progress}%</CircularProgressLabel>
    </CircularProgress>
  );
};

export default ResultsCicleProgress;
