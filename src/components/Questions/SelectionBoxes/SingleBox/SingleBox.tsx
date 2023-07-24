import { Flex } from "@chakra-ui/react";
import { selectionBoxesButton, selectionBoxesButtonActive } from "../../../../styles/motions/props";
import "../../../../styles/layouts/SingleBox.scss";
import { useEffect } from "react";

interface Option {
  _id: string;
  optionText: string;
  score: number;
}

const SingleBox = ({ option, optionSelected, setOptionSelected, multiSelection }: any): React.JSX.Element => {
  const addOptionToSelection = async (): Promise<void> => {
    optionSelected?.length > 0 ? await setOptionSelected([...optionSelected, option]) : await setOptionSelected([option]);
  }

  useEffect(() => {
    console.log("En sinlgebox: ", optionSelected?.length);
  }, [optionSelected])

  const selectOption = async (): Promise<void> => {
    if (multiSelection) {
      if (optionSelected?.includes(option)) {
        setOptionSelected(optionSelected?.filter((optionSelected: Option) => optionSelected !== option));
      } else {
        await addOptionToSelection();
      }
    } else {
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
