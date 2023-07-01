import { FormLabel } from "@chakra-ui/react";
import { useState } from "react";
import "../../styles/layouts/NumberComponent2.scss";

const NumberComponent2 = (): JSX.Element => {
  const [value, setValue] = useState(0);

  const incrementValue = (): void => {
    if (value < 10) {
      setValue((prevValue) => prevValue + 1);
    }
  };

  const decrementValue = (): void => {
    if (value > 0) {
      setValue((prevValue) => prevValue - 1);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    let newValue = Number(e.target.value);
    if (newValue < 0) {
      newValue = 0;
    } else if (newValue > 10) {
      newValue = 10;
    }
    setValue(newValue);
  };

  return (
    <div>
      <FormLabel textAlign="center" as="legend" fontSize="25px" fontWeight="extrabold" m="15">
        Puntua de 0 a 10 tu satisfacción con la empresa
      </FormLabel>
      <div className="number-component__container">
        <button className="number-component__contador-menos" onClick={decrementValue}>
          -
        </button>
        <div className="number-component__container-input">
          <input type="number" placeholder="5" className="number-component__input" value={value} onChange={handleInputChange} min="0" max="10"/>
        </div>
        <button className="number-component__contador-mas" onClick={incrementValue}>
          +
        </button>
      </div>
    </div>
  );
};

export default NumberComponent2;
