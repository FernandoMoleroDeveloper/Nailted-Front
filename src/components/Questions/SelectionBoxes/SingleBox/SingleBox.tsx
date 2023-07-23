import { Flex } from "@chakra-ui/react";
import { selectionBoxesButton, selectionBoxesButtonActive } from "../../../../styles/motions/props";
import "../../../../styles/layouts/SingleBox.scss";

interface Option {
  _id: string;
  optionText: string;
  score: number;
}

const SingleBox = ({ option, optionSelected, setOptionSelected, multiSelection }: any): React.JSX.Element => {
  const addOptionToSelection = async (): Promise<void> => {
    optionSelected?.length > 0 ? await setOptionSelected([...optionSelected, option]) : await setOptionSelected([option]);
  }

  const selectOption = async (): Promise<void> => {
    if (multiSelection) {
      // Si multiSelection es true, se permite la selección múltiple
      if (optionSelected?.includes(option)) {
        // Si la opción ya está seleccionada, la eliminamos del estado
        setOptionSelected(optionSelected?.filter((optionSelected: Option) => optionSelected !== option));
      } else {
        // Si la opción no está seleccionada, la agregamos al estado
        await addOptionToSelection();
      }
    } else {
      // Si multiSelection es false, se permite seleccionar solo una opción
      setOptionSelected([option]);
    }
  };

  return (
    <Flex {...(optionSelected?.includes(option) ? selectionBoxesButtonActive : selectionBoxesButton)} className="selection-boxes__option" onClick={selectOption}>
      <Flex className="selection-boxes__text">{option.optionText}</Flex>
    </Flex>
  );
};

export default SingleBox;
