import { Box, FormLabel } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import "../../../styles/layouts/NumberSelector.scss";

const NumberSelector = ({ sessionId, question, previousResponse, setQuestionResponse, setHasUserAnswered }: any): React.JSX.Element => {
  const [value, setValue] = useState<number>(question?.selectedNumber?.max as number / 2);
  const step: number = Math.round(question?.selectedNumber?.max as number / 20);

  const composeResponse = async (): Promise<void> => {
    await setQuestionResponse({
      question: question._id,
      session: sessionId,
      numeric: value,
    });
  }

  useEffect(() => {
    if (previousResponse === undefined) {
      setValue(question?.selectedNumber?.max / 2);
    } else {
      setValue(previousResponse?.numeric);
    }
  }, [previousResponse]);

  useEffect(() => {
    void composeResponse();
    setHasUserAnswered(true);
  }, [sessionId, value]);

  const incrementValue = (): void => {
    const nextValue = value + step;
    if (nextValue <= question?.selectedNumber?.max) {
      const remainder = nextValue % step;
      const newValue = nextValue - remainder;
      setValue(newValue);
    } else {
      setValue(question?.selectedNumber?.max);
    }
  };

  const decrementValue = (): void => {
    const previousValue = value - step;
    if (previousValue >= question?.selectedNumber?.min) {
      const remainder = previousValue % step;
      const newValue = previousValue + (remainder === 0 ? 0 : step - remainder);
      setValue(newValue);
    } else {
      setValue(question?.selectedNumber?.min);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (e.target.value < question?.selectedNumber?.min) {
      e.target.value = question?.selectedNumber?.min;
    }
    if (e.target.value > question?.selectedNumber?.max) {
      e.target.value = question?.selectedNumber?.max;
    }
    const newValue = Number(e.target.value);
    setValue(newValue);
  };

  return (
    <div>
      <FormLabel textAlign="center" as="legend" fontSize="25px" fontWeight="extrabold" m="15">
        {question?.questionText}
      </FormLabel>
      <div className="number-component__container">
        <button className="number-component__contador-menos" onClick={decrementValue}>
          -
        </button>
        <div className="number-component__container-input">
          <input type="number" className="number-component__input" value={value} min={question?.selectedNumber?.min} max={question?.selectedNumber?.max} onChange={handleInputChange} />
        </div>
        <button className="number-component__contador-mas" onClick={incrementValue}>
          +
        </button>
      </div>
      <Box fontSize={15} fontWeight="400" color="grey">
        Min: {question?.selectedNumber?.min} / Max: {question?.selectedNumber?.max}
      </Box>
    </div>
  );
};

export default NumberSelector;
