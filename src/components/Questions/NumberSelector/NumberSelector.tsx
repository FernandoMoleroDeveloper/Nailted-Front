import { FormLabel } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import "../../../styles/layouts/NumberSelector.scss";

const NumberSelector = ({ sessionId, question, response, setResponse, setHasAnswered }: any): JSX.Element => {
  const [value, setValue] = useState(question?.selectedNumber?.max / 2);

  const updateResponse = async (): Promise<void> => {
    await setResponse({
      question: question._id,
      session: sessionId,
      numeric: value,
    });
  }

  useEffect(() => {
    void updateResponse();
    setHasAnswered(true);
  }, [sessionId, value]);

  const incrementValue = (): void => {
    if (value < question?.selectedNumber?.max) {
      const newValue = value + 1;
      setValue(newValue);
    }
  };

  const decrementValue = (): void => {
    if (value > question?.selectedNumber?.min) {
      const newValue = value - 1;
      setValue(newValue);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const newValue = Number(e.target.value);
    // TODO
    // if (newValue < question?.selectedNumber?.max) {
    //   newValue = question?.selectedNumber?.max;
    // } else if (newValue > question?.selectedNumber?.min) {
    //   newValue = question?.selectedNumber?.min;
    // }
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
      <div>
        Min: {question?.selectedNumber?.min} / Max: {question?.selectedNumber?.max}
      </div>
    </div>
  );
};

export default NumberSelector;
