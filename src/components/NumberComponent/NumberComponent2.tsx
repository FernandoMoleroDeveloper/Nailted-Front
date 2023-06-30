import { FormLabel } from "@chakra-ui/react";
import { useState } from "react";
import "../../styles/layouts/NumberComponent2.scss";

const NumberComponent2 = (): JSX.Element => {
  const [value, setValue] = useState(0);

  const incrementValue = (): void => {
    setValue((prevValue) => prevValue + 1);
  };

  const decrementValue = (): void => {
    setValue((prevValue) => prevValue - 1);
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
          <input
            placeholder="0"
            className="number-component__input"
            value={value}
            onChange={(e) => {
              setValue(Number(e.target.value));
            }}
          />
        </div>
        <button className="number-component__contador-mas" onClick={incrementValue}>
          +
        </button>
      </div>
    </div>
  );
};

export default NumberComponent2;
