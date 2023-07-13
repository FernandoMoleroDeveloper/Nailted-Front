import { Flex } from "@chakra-ui/react";
import { selectionBoxesButton, selectionBoxesButtonActive } from "../../../../styles/motions/props";
import "../SingleBox/SingleBox.scss";

interface option {
  _id: string;
  optionText: string;
  score: number;
}

const SingleBox = ({ option, optionsSelected, setOptionsSelected, multiSelection }: any): JSX.Element => {
  const selectOption = (): void => {
    if (multiSelection) {
      // Si multiSelection es true, se permite la selección múltiple
      if (optionsSelected.includes(option)) {
        // Si la opción ya está seleccionada, la eliminamos del estado
        setOptionsSelected(optionsSelected.filter((optionSelected: option) => optionSelected !== option));
      } else {
        // Si la opción no está seleccionada, la agregamos al estado
        setOptionsSelected([...optionsSelected, option]);
      }
    } else {
      // Si multiSelection es false, se permite seleccionar solo una opción
      setOptionsSelected([option]);
    }
  };

  return (
    <Flex {...(optionsSelected?.includes(option) ? selectionBoxesButtonActive : selectionBoxesButton)} className="selection-boxes__option" onClick={selectOption}>
      <Flex className="selection-boxes__text">{option.optionText}</Flex>
    </Flex>
  );
};

export default SingleBox;
