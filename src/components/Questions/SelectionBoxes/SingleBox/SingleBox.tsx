import { Flex } from "@chakra-ui/react";
import { selectionBoxesButton, selectionBoxesButtonActive } from "../../../../styles/motions/props";
import "../SingleBox/SingleBox.scss";
import { useState } from "react";

const SingleBox = (): JSX.Element => {
  const [active, setActive] = useState(false);

  const toggleActive = (): void => {
    setActive(!active);
  };

  return (
    <Flex {...(active ? selectionBoxesButtonActive : selectionBoxesButton)} className="selection-boxes__option" onClick={toggleActive}>
      <Flex className="selection-boxes__text">Texto de la opcion.</Flex>
    </Flex>
  );
};

export default SingleBox;
